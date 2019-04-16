import "typeface-roboto"; // eslint-disable-line import/extensions
import React from "react";
import { loadableReady } from "@loadable/component";
import { hydrate, render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import primary from "@material-ui/core/colors/lightGreen";
import secondary from "@material-ui/core/colors/lime";
import AppShell from "./components/AppShell";
import reducer from "./reducers";
import "./i18n";
import "./app.css";

if (process.env.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
}

const rootElement = document.getElementById("app");
const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary[700],
    },
    secondary: {
      main: secondary[500],
    },
  },
  typography: {
    useNextVariants: true,
  },
});
const store = createStore(reducer());

const app = (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
);

if (process.env.NODE_ENV === "production") {
  loadableReady(() => {
    hydrate(app, rootElement);
  });
} else {
  render(app, rootElement);
}