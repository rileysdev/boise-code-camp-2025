import { RebootClientProvider } from "@reboot-dev/reboot-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
const url = "http://127.0.0.1:9991";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RebootClientProvider url={url}>
      <App />
    </RebootClientProvider>
  </StrictMode>
);
