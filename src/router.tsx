import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ReactScanSlide from "./slides/ReactScanSlide";
// import ComponentDemoSlide from "./slides/ComponentDemoSlide"; // Removed unused import
import StateLiftingSlide from "./slides/StateLiftingSlide";
import FormHandlingSlide from "./slides/FormHandlingSlide";
import PerformanceSlide from "./slides/PerformanceSlide";
import DataFetchingSlide from "./slides/DataFetchingSlide";
import ReduxDemoSlide from "./slides/ReduxDemoSlide";
import StateOptimizationSlide from "./slides/StateOptimizationSlide";
import PackageManagerSlide from "./slides/PackageManagerSlide/PackageManagerSlide";
import NetworkRequestInOnClickSlide from "./slides/NetworkRequestInOnClick/NetworkRequestInOnClickSlide";
import NotFoundSlide from "./slides/NotFoundSlide";
import IdempotencySlide from "./slides/IdempotencySlide";
import FrontendSecuritySlide from "./slides/FrontendSecuritySlide";
import PWASlide from "./slides/PWASlide";
import DeveloperToolsSlide from "./slides/DeveloperToolsSlide";
import CORSSlide from "./slides/CORSSlide";

// Import newly created placeholder slide components
import ReduxConceptsSlide from "./slides/MarkdownSlides/ReduxConceptsSlide";
import ClientComponentsSlide from "./slides/MarkdownSlides/ClientComponentsSlide";
import ServerComponentsSlide from "./slides/MarkdownSlides/ServerComponentsSlide";
import PkgMgtOverviewSlide from "./slides/MarkdownSlides/PkgMgtOverviewSlide";
import NpmVsYarnSlide from "./slides/MarkdownSlides/NpmVsYarnSlide";
import BuildDeploySlide from "./slides/MarkdownSlides/BuildDeploySlide";
import CapacitorSlide from "./slides/MarkdownSlides/CapacitorSlide";
import KubbSlide from "./slides/MarkdownSlides/KubbSlide";
import LayoutAndRoutingSlide from "./slides/MarkdownSlides/LayoutAndRoutingSlide";
import PropsDrillingSlide from "./slides/MarkdownSlides/PropsDrillingSlide";
import StateUpdateBatchingSlide from "./slides/MarkdownSlides/StateUpdateBatchingSlide";
import ElectronSlide from "./slides/MarkdownSlides/ElectronSlide";
import NuqsSlide from "./slides/MarkdownSlides/NuqsSlide";

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
        path: "state-update-batching",
        element: <StateUpdateBatchingSlide />,
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
        path: "redux-concepts",
        element: <ReduxConceptsSlide />,
      },
      // {
      //   path: "state-mgt-conclusion",
      //   element: <StateMgtConclusionSlide />,
      // },
      {
        path: "client-components",
        element: <ClientComponentsSlide />,
      },
      {
        path: "server-components",
        element: <ServerComponentsSlide />,
      },
      {
        path: "pkg-mgt-overview",
        element: <PkgMgtOverviewSlide />,
      },
      {
        path: "npm-vs-yarn",
        element: <NpmVsYarnSlide />,
      },
      {
        path: "build-deploy",
        element: <BuildDeploySlide />,
      },
      {
        path: "kubb",
        element: <KubbSlide />,
      },
      {
        path: "layout-routing",
        element: <LayoutAndRoutingSlide />,
      },
      {
        path: "props-drilling",
        element: <PropsDrillingSlide />,
      },
      {
        path: "state-batching",
        element: <StateUpdateBatchingSlide />,
      },
      {
        path: "idempotency",
        element: <IdempotencySlide />,
      },
      {
        path: "frontend-security",
        element: <FrontendSecuritySlide />,
      },
      {
        path: "pwa",
        element: <PWASlide />,
      },
      {
        path: "electron",
        element: <ElectronSlide />,
      },
      {
        path: "capacitor",
        element: <CapacitorSlide />,
      },
      {
        path: "nuqs",
        element: <NuqsSlide />,
      },
      {
        path: "developer-tools",
        element: <DeveloperToolsSlide />,
      },
      {
        path: "cors",
        element: <CORSSlide />,
      },
      {
        path: "*",
        element: <NotFoundSlide />,
      },
    ],
  },
]);
