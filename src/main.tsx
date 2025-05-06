import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import "antd/dist/reset.css";
import { queryClient } from "./queryClient";
import MainLayout from "./layouts/MainLayout"; // Use the new layout
import ReactScanSlide from "./slides/ReactScanSlide"; // Import the new slide
// import Slide1 from "./slides/Slide1"; // Comment out or remove unused old slides/layouts if needed
// import Slide2 from "./slides/Slide2";
// import RootLayout from "./RootLayout";

// Define routes using the new MainLayout
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Use MainLayout as the root element
    children: [
      {
        // Redirect base path to the first slide
        index: true,
        element: <Navigate replace to="/react-scan" />,
      },
      {
        path: "react-scan", // Route for React Scan slide
        element: <ReactScanSlide />,
      },
      // Add routes for other slides here as children of MainLayout
      // {
      //   path: "code-inspector",
      //   element: <CodeInspectorSlide />, // Create this component
      // },
      // {
      //   path: "slide1",
      //   element: <Slide1 />,
      // },
      // {
      //   path: "slide2",
      //   element: <Slide2 />,
      // },
    ],
  },
]);

// Render the app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
