import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "../code-editor/CodeEditor";
import SettingsEditor from "../code-editor/settings-editor/SettingsEditor";
import Toolbar from "../code-editor/toolbar/Toolbar";
import { getSnippetById } from "../../Redux/App/app.actions";
import { AxiosError } from "axios";
import { SelectChangeEvent } from "@mui/material";

import { io } from "socket.io-client";
import { baseURL } from "../../Redux/App/app.actions";
import { useSelector } from "react-redux";
import { rootStateType } from "../../Redux/Store";
import { debounce, downloadFileWithExtension } from "../../utils";

const socket = io(baseURL);

const SnippetEditor = () => {
  const { id } = useParams();
  const authToken = useSelector((state: rootStateType) => state.auth.token);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [snippet, setSnippet] = useState<any>(null);

  // Define debounced functions for socket emits
  const debouncedEmitContent = useCallback(
    debounce((content) => {
      socket.emit("editContent", { token: authToken, snippetId: id, content });
    }, 500),
    [authToken, id]
  );

  const debouncedEmitSettings = useCallback(
    debounce((name, value) => {
      socket.emit("editSettings", {
        token: authToken,
        snippetId: id,
        settings: { ...snippet.settings, [name]: value },
      });
    }, 500),
    [authToken, id, snippet]
  );

  const debouncedEmitTitle = useCallback(
    debounce((title) => {
      socket.emit("editTitle", { token: authToken, snippetId: id, title });
    }, 500),
    [authToken, id]
  );

  const handleChangeContent = (content: string | undefined) => {
    setSnippet((prev) => ({ ...prev, content }));
    debouncedEmitContent(content);
  };

  const handleChangeSettings = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setSnippet((prev) => ({
      ...prev,
      settings: { ...prev.settings, [name]: value },
    }));
    debouncedEmitSettings(name, value);
  };

  const handleChangeTitle = (titleChangeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = titleChangeEvent.target;
    setSnippet((prev) => ({ ...prev, title: value }));
    debouncedEmitTitle(value);
  };

  const handleClickCopyContent = async () => {
    await navigator.clipboard.writeText(snippet.content);
  };
  const handleClickCopyLink = async () => {
    const baseURL = window.location.origin; // Dynamically get the current website's base URL
    const snippetId = snippet._id; // Assuming snippet._id contains the unique identifier

    // Construct the complete URL
    const url = `${baseURL}/snippet/${snippetId}`;

    // Copy the URL to the clipboard
    try {
      await navigator.clipboard.writeText(url);
      console.log("URL copied to clipboard:", url);
    } catch (error) {
      console.error("Failed to copy URL to clipboard:", error);
    }
  };

  const handleClickDownloadFile = () => {
    console.log({ snippet });
    const language = snippet.settings.language;
    const content = snippet.content;
    console.log({ language, content });
    downloadFileWithExtension(language, content);
  };

  const addSocketListeners = useCallback(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    if (id) {
      socket.emit("joinRoom", { token: authToken, snippetId: id });
      socket.on("contentChanged", ({ snippetId, content }) => {
        setSnippet((prev) => ({ ...prev, content }));
        console.log({ snippetId, content });
      });
      socket.on("titleChanged", ({ snippetId, title }) => {
        setSnippet((prev) => ({ ...prev, title }));
        console.log({ snippetId, title });
      });
      socket.on("settingsChanged", ({ snippetId, settings }) => {
        setSnippet((prev) => ({ ...prev, settings }));
        console.log({ snippetId, settings });
      });

      socket.on("activeUsersUpdated", (data) => {
        console.log({ activeUsers: { data } });
      });
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      // Remove event listeners here
    };
  }, [id, authToken]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getSnippetById(id)
        .then((res) => {
          setSnippet(res.data);
          setIsLoading(false);
          setError(null);
        })
        .catch((err: AxiosError) => {
          setError(err);
          setIsLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    addSocketListeners();
    return () => {
      addSocketListeners();
    };
  }, [id, addSocketListeners]);

  if (!snippet) {
    return <p>No Snippet</p>;
  }

  return (
    <div className="flex flex-row w-full min-h-screen">
      <div className="w-3/4 min-h-screen">
        <div className="w-full flex flex-row items-center justify-end bg-gray-800">
          <Toolbar
            handleClickCopyContent={handleClickCopyContent}
            handleClickCopyLink={handleClickCopyLink}
            handleClickDownloadFile={handleClickDownloadFile}
          />
        </div>
        <CodeEditor
          value={snippet.content || ""}
          onChange={handleChangeContent}
          language={snippet.settings?.language}
        />
      </div>
      <div className="w-1/4 min-h-screen">
        <SettingsEditor
          title={snippet.title || ""}
          onChangeTitle={handleChangeTitle}
          settings={snippet.settings || { language: "" }}
          onChangeSettings={handleChangeSettings}
        />
      </div>
    </div>
  );
};

export default SnippetEditor;
