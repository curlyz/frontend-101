// import React, { Suspense, lazy } from "react";
// import React from "react"; // Remove unused import
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd"; // Import ConfigProvider
import { router } from "./router"; // Import the router
import { AppProviders } from "./providers/AppProviders"; // Import the providers wrapper

import "./index.css";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // StrictMode is now handled within AppProviders
  <AppProviders>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Lexend, sans-serif",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </AppProviders>,
);
