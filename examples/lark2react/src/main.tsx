import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global, css } from "@emotion/react";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", system-ui, sans-serif;
    line-height: 1.5;
    color: #24292e;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0.5em;
    line-height: 1.25;
  }

  p {
    margin-bottom: 1em;
  }

  code {
    font-family: "SF Mono", Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>,
);
