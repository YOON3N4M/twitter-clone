import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./components/Router";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import { legacy_createStore as createStore } from "redux";
import { createGlobalStyle } from "styled-components";

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);
