import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  language?: string;
  disabled?: boolean;
  height?: string | number;
}

const CodeEditor = ({
  value = "",
  onChange,
  language = "javascript",
  disabled = false,
  height = "100vh",
}: CodeEditorProps) => {
  return (
    <MonacoEditor
      height={height}
      defaultLanguage={language}
      language={language}
      theme="vs-dark" // Set the dark theme
      value={value}
      onChange={onChange}
      options={{
        readOnly: disabled,
        minimap: { enabled: false }, // Disable minimap if needed
        padding: { top: 10, bottom: 10 }, // Add padding
        roundedSelection: true, // Enable rounded selection
      }}
    />
  );
};

export default CodeEditor;
