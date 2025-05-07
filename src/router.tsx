import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ReactScanSlide from "./slides/ReactScanSlide";
import ComponentDemoSlide from "./slides/ComponentDemoSlide";
import StateLiftingSlide from "./slides/StateLiftingSlide";
import FormHandlingSlide from "./slides/FormHandlingSlide";
import PerformanceSlide from "./slides/PerformanceSlide";
import DataFetchingSlide from "./slides/DataFetchingSlide";
import ReduxDemoSlide from "./slides/ReduxDemoSlide";
import StateOptimizationSlide from "./slides/StateOptimizationSlide";
import PackageManagerSlide from "./slides/PackageManagerSlide/PackageManagerSlide";
import NetworkRequestInOnClickSlide from "./slides/NetworkRequestInOnClick/NetworkRequestInOnClickSlide";
import NotFoundSlide from "./slides/NotFoundSlide";

/**
 * Defines the application's routes using React Router.
 *
 * @returns {Router} The configured router instance.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/react-scan" />,
      },
      {
        path: "react-scan",
        element: <ReactScanSlide />,
      },
      {
        path: "component-demo",
        element: <ComponentDemoSlide />,
      },
      {
        path: "state-lifting",
        element: <StateLiftingSlide />,
      },
      {
        path: "form-handling",
        element: <FormHandlingSlide />,
      },
      {
        path: "performance",
        element: <PerformanceSlide />,
      },
      {
        path: "state-optimization",
        element: <StateOptimizationSlide />,
      },
      {
        path: "data-fetching",
        element: <DataFetchingSlide />,
      },
      {
        path: "redux-demo",
        element: <ReduxDemoSlide />,
      },
      {
        path: "package-managers",
        element: <PackageManagerSlide />,
      },
      {
        path: "network-in-onclick",
        element: <NetworkRequestInOnClickSlide />,
      },
      {
        path: "*",
        element: <NotFoundSlide />,
      },
    ],
  },
]);
