import { saveAs } from "file-saver";

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// export function downloadFileWithExtension(language: string, content: string) {
//   const languageExtensions = {
//     Apex: ".cls",
//     "Azure CLI": ".azcli",
//     Batch: ".bat",
//     C: ".c",
//     Clojure: ".clj",
//     CoffeeScript: ".coffee",
//     "C++": ".cpp",
//     "C#": ".cs",
//     CSP: ".csp",
//     CSS: ".css",
//     Dockerfile: ".dockerfile",
//     "F#": ".fs",
//     Go: ".go",
//     GraphQL: ".graphql",
//     Handlebars: ".hbs",
//     HTML: ".html",
//     INI: ".ini",
//     Java: ".java",
//     JavaScript: ".js",
//     JSON: ".json",
//     Kotlin: ".kt",
//     Less: ".less",
//     Lua: ".lua",
//     Markdown: ".md",
//     MSDAX: ".msdax",
//     MySQL: ".sql",
//     "Objective-C": ".m",
//     Pascal: ".pas",
//     Perl: ".pl",
//     pgSQL: ".pgsql",
//     PHP: ".php",
//     "Plain Text": ".txt",
//     Postiats: ".dats",
//     "Power Query": ".pq",
//     PowerShell: ".ps1",
//     Pug: ".pug",
//     Python: ".py",
//     R: ".r",
//     Razor: ".cshtml",
//     Redis: ".redis",
//     Redshift: ".sql",
//     Ruby: ".rb",
//     Rust: ".rs",
//     "Salesforce Apex": ".cls",
//     Scheme: ".scm",
//     SCSS: ".scss",
//     Shell: ".sh",
//     Solidity: ".sol",
//     SQL: ".sql",
//   };

//   const extension = languageExtensions[language] || ".txt";
//   if (!extension) {
//     console.error(`Extension not found for language: ${language}`);
//     return;
//   }

//   const blob = new Blob([content], { type: "text/plain" });
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `file.${extension}`;
//   document.body.appendChild(a);
//   a.click();
//   window.URL.revokeObjectURL(url);
//   document.body.removeChild(a);
// }

export const downloadFileWithExtension = (language: string, content: string) => {
  const fileName = `file${getExtension(language)}`;
  console.log("-----", getExtension(language));
  console.log({ fileName });
  const fileContent = `${content}\n`;
  const blob = new Blob([fileContent], { type: `text/${getExtension(language)}` });
  saveAs(blob, fileName);
};

const getExtension = (language) => {
  const languageExtensions = {
    apex: ".cls",
    "azure cli": ".azcli",
    batch: ".bat",
    c: ".c",
    clojure: ".clj",
    coffeescript: ".coffee",
    "c++": ".cpp",
    "c#": ".cs",
    csp: ".csp",
    css: ".css",
    dockerfile: ".dockerfile",
    "f#": ".fs",
    go: ".go",
    graphql: ".graphql",
    handlebars: ".hbs",
    html: ".html",
    ini: ".ini",
    java: ".java",
    javascript: ".js",
    json: ".json",
    kotlin: ".kt",
    less: ".less",
    lua: ".lua",
    markdown: ".md",
    msdax: ".msdax",
    mysql: ".sql",
    "objective-c": ".m",
    pascal: ".pas",
    perl: ".pl",
    pgsql: ".pgsql",
    php: ".php",
    "plain text": ".txt",
    postiats: ".dats",
    "power query": ".pq",
    powershell: ".ps1",
    pug: ".pug",
    python: ".py",
    r: ".r",
    razor: ".cshtml",
    redis: ".redis",
    redshift: ".sql",
    ruby: ".rb",
    rust: ".rs",
    "salesforce apex": ".cls",
    scheme: ".scm",
    scss: ".scss",
    shell: ".sh",
    solidity: ".sol",
    sql: ".sql",
  };

  return languageExtensions[language] || ".txt";
};
