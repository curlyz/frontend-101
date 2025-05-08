import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router"; // Import the router
import { AppProviders } from "./providers/AppProviders"; // Import the providers wrapper

import "./index.css";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // StrictMode is now handled within AppProviders
  <AppProviders>
    <RouterProvider router={router} />
  </AppProviders>,
);
