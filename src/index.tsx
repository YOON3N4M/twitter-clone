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

const GlobalStyle = createGlobalStyle`

 body {  

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #EBEEF1;
    color:black;
   font-weight: 100;

   
  }
  *{
    box-sizing: border-box;
    &::-webkit-scrollbar {
    display: none;
  }
  }
  a{
    text-decoration: none;
    color:inherit;
  }
  button{
    background: none;
    border: none;
  }
  input, textarea, button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
}

`;

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <Router />
  </Provider>
);
