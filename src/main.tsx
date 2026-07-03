import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Kino } from "react-kino";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Kino>
      <App />
    </Kino>
  </StrictMode>,
);
