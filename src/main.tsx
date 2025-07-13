import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./typography.css";
import App from "./app.tsx";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element to start with");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
