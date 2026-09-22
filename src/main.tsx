import { createRoot } from "react-dom/client";
import { StoreProvider } from "./app/providers/StoreProvider";
import { App } from "./app/App";
// import "./app/styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <App />
  </StoreProvider>,
);
