import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Provider as ReduxProvider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/Store.ts";

const darkTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <ReduxProvider store={store}>
          <div>
            <CssBaseline />
            <App />
          </div>
        </ReduxProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
