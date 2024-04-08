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

const socket = io(baseURL);

const SnippetEditor = () => {
  const { id } = useParams();
  const authToken = useSelector((state: rootStateType) => state.auth.token);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [snippet, setSnippet] = useState(null);

  console.log({ isLoading, error });

  const handleChangeContent = (content: string | undefined) => {
    setSnippet((prev) => ({ ...prev, content }));
    socket.emit("editContent", { token: authToken, snippetId: id, content: content });
  };

  const handleChangeSettings = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setSnippet((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [name]: value,
      },
    }));

    socket.emit("editSettings", {
      token: authToken,
      snippetId: id,
      settings: {
        ...snippet.settings,
        [name]: value,
      },
    });
  };

  const handleChangeTitle = (titleChangeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = titleChangeEvent.target;
    setSnippet((prev) => ({ ...prev, title: value }));
    socket.emit("editTitle", { token: authToken, snippetId: id, title: value });
  };

  const handleClickCopyContent = () => {};
  const handleClickCopyLink = () => {};
  const handleClickDownloadFile = () => {};

  const addSocketListeners = useCallback(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    if (id) {
      socket.emit("joinRoom", { snippetId: id });
      socket.on("contentChanged", ({ snippetId, content }) => {
        setSnippet((prev) => ({ ...prev, content: content }));
        console.log({ snippetId, content });
      });
      socket.on("titleChanged", ({ snippetId, title }) => {
        setSnippet((prev) => ({ ...prev, title: title }));
        console.log({ snippetId, title });
      });
      socket.on("settingsChanged", ({ snippetId, settings }) => {
        setSnippet((prev) => ({ ...prev, settings: settings }));
        console.log({ snippetId, settings });
      });
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      // Remove event listeners here
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setIsloading(() => true);
      getSnippetById(id)
        .then((res) => {
          setSnippet(() => res.data);
          setIsloading(() => false);
          setError(null);
        })
        .catch((err: AxiosError) => {
          setError(err);
        })
        .finally(() => {
          setIsloading(() => false);
        });
    }
  }, [id]);

  useEffect(() => {
    addSocketListeners();

    return () => {
      // Clean up event listeners
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
          value={snippet?.content || ""}
          onChange={handleChangeContent}
          language={snippet?.settings?.language}
        />
      </div>
      <div className="w-1/4 min-h-screen">
        <SettingsEditor
          title={snippet?.title || ""}
          onChangeTitle={handleChangeTitle}
          settings={snippet?.settings || { language: "" }}
          onChangeSettings={handleChangeSettings}
        />
      </div>
    </div>
  );
};

export default SnippetEditor;
