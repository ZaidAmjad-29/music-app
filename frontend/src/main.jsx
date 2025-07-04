import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PostProvider } from "./components/PostProvider.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PostProvider>
      <App />
    </PostProvider>
  </StrictMode>
);
