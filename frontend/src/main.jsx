import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CooksyProvider } from "./context/CooksyContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CooksyProvider>
      <App />
    </CooksyProvider>
  </StrictMode>
);