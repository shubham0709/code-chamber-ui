import { ContentCopy, GetApp, Language, Launch, Settings, Share } from "@mui/icons-material";
import {
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";

interface SettingsEditorProps {
  title: string;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  settings: { language: string }; // Define more settings if needed
  onChangeSettings: (event: SelectChangeEvent<string>) => void;
}
const SettingsEditor = ({
  title,
  onChangeTitle,
  settings,
  onChangeSettings,
}: SettingsEditorProps) => {
  return (
    <div className="flex flex-col gap-2 p-2 w-full h-full">
      <div className="flex flex-row justify-left items-center gap-2">
        <Settings />
        <p className="text-lg">Settings</p>
      </div>
      <div className="flex flex-col gap-5 mt-4">
        <FormControl fullWidth>
          <TextField size="small" label="Title" value={title} onChange={onChangeTitle} />
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Language</InputLabel>
          <Select
            name="language"
            id="demo-simple-select"
            value={settings.language}
            label="Language"
            onChange={onChangeSettings}
          >
            {[
              "apex",
              "azcli",
              "bat",
              "c",
              "clojure",
              "coffeescript",
              "cpp",
              "csharp",
              "csp",
              "css",
              "dockerfile",
              "fsharp",
              "go",
              "graphql",
              "handlebars",
              "html",
              "ini",
              "java",
              "javascript",
              "json",
              "kotlin",
              "less",
              "lua",
              "markdown",
              "msdax",
              "mysql",
              "objective-c",
              "pascal",
              "perl",
              "pgsql",
              "php",
              "plaintext",
              "postiats",
              "powerquery",
              "powershell",
              "pug",
              "python",
              "r",
              "razor",
              "redis",
              "redshift",
              "ruby",
              "rust",
              "sb",
              "scheme",
              "scss",
              "shell",
              "sol",
              "sql",
            ].map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default SettingsEditor;
