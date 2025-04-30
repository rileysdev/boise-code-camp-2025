import { RebootClientProvider } from "@reboot-dev/reboot-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
const url =
  (process.env.REACT_APP_REBOOT_URL as string) || "http://localhost:9991";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RebootClientProvider url={url}>
      <App />
    </RebootClientProvider>
  </StrictMode>
);
