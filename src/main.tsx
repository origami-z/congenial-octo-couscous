import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SaltProvider } from "@salt-ds/core";

import "@salt-ds/theme/index.css";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SaltProvider>
      <App />
    </SaltProvider>
  </React.StrictMode>
);
