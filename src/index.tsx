import { createGlobalStyle } from "styled-components";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #011627;
    color: #19609c;
  }

  a,
  button,
  input,
  textarea {
    color: #19609c;
    border-color: #19609c;
  }

  hr {
    border-color: #19609c;
  }

  button:hover {
    opacity: 0.8;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(17, 64, 104, 0.2);
  }

  ::-webkit-scrollbar-thumb {
    background: #114068;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #563c7e;
  }

  input:focus-visible {
    outline: none;
  }

  textarea:focus-visible {
    outline: none;
  }

  input:focus {
    border: 2px solid #1a639f !important;
  }

  textarea::-webkit-resizer {
    border-width: 3px;
    border-color: transparent;
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
