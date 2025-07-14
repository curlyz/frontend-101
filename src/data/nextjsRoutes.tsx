import React from "react";
import { createIcon } from "@/utils/iconMapping";
import type { RouteItem } from "@/types/categories";

export const nextjsRoutes: RouteItem[] = [
  // Frontend Category
  {
    name: "Frontend Development",
    path: "/frontend",
    icon: createIcon("CodeSandboxOutlined"),
    categoryId: "frontend",
    routes: [
      {
        path: "/frontend/scan",
        name: "React Scan",
        icon: createIcon("ScanOutlined"),
        categoryId: "frontend",
      },
      {
        path: "/frontend/performance",
        name: "Performance Hooks",
        icon: React.createElement(DashboardOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/state",
        name: "State Lifting",
        icon: React.createElement(SwapOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/data",
        name: "Data Fetching",
        icon: React.createElement(CloudDownloadOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/forms",
        name: "Form Handling",
        icon: React.createElement(FormOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/redux",
        name: "Redux Demo",
        icon: React.createElement(GithubOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/context",
        name: "React Context",
        icon: React.createElement(ControlOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/security",
        name: "Frontend Security",
        icon: React.createElement(SecurityScanOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/cors",
        name: "CORS Scenarios",
        icon: React.createElement(GlobalOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/tools",
        name: "Developer Tools",
        icon: React.createElement(ToolOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/pwa",
        name: "PWA Example",
        icon: React.createElement(MobileOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/idempotency",
        name: "Idempotency",
        icon: React.createElement(ApiOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/batching",
        name: "State Batching",
        icon: React.createElement(ThunderboltOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/redux-concepts",
        name: "Redux Concepts",
        icon: React.createElement(ReadOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/routing",
        name: "Layouts & Routing",
        icon: React.createElement(LayoutOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/packages",
        name: "Package Management",
        icon: React.createElement(GlobalOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/npm-yarn",
        name: "NPM vs Yarn",
        icon: React.createElement(GlobalOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/build",
        name: "Build & Deploy",
        icon: React.createElement(ToolOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/kubb",
        name: "Kubb OpenAPI",
        icon: React.createElement(ApiOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/network",
        name: "Network Protocols",
        icon: React.createElement(GlobalOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/mobile",
        name: "Mobile (Capacitor)",
        icon: React.createElement(MobileOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/electron",
        name: "Electron Desktop",
        icon: React.createElement(DesktopOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/props",
        name: "Props Drilling",
        icon: React.createElement(ShareAltOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/url-state",
        name: "URL State (Nuqs)",
        icon: React.createElement(LinkOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/client-components",
        name: "Client Components",
        icon: React.createElement(UserOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/server-components",
        name: "Server Components",
        icon: React.createElement(CloudDownloadOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/network-onclick",
        name: "Network in onClick",
        icon: React.createElement(AlertOutlined),
        categoryId: "frontend",
      },
      {
        path: "/frontend/package-demo",
        name: "Package Demo",
        icon: React.createElement(GlobalOutlined),
        categoryId: "frontend",
      },
    ],
  },

  // AI Category
  {
    name: "AI & LLMs",
    path: "/ai",
    icon: React.createElement(RobotOutlined),
    categoryId: "ai",
    routes: [
      {
        path: "/ai/intro",
        name: "What is AI?",
        icon: React.createElement(InfoCircleOutlined),
        categoryId: "ai",
      },
      {
        path: "/ai/llms",
        name: "What are LLMs?",
        icon: React.createElement(ReadOutlined),
        categoryId: "ai",
      },
      {
        path: "/ai/capabilities",
        name: "LLM Capabilities",
        icon: React.createElement(ThunderboltOutlined),
        categoryId: "ai",
      },
      {
        path: "/ai/myths",
        name: "Common Myths",
        icon: React.createElement(AlertOutlined),
        categoryId: "ai",
      },
      {
        path: "/ai/resources",
        name: "Learning Resources",
        icon: React.createElement(ReadOutlined),
        categoryId: "ai",
      },
      {
        path: "/ai/compare",
        name: "Model Comparison",
        icon: React.createElement(SolutionOutlined),
        categoryId: "ai",
      },
      {
        path: "/ai/pricing",
        name: "Pricing Comparison",
        icon: React.createElement(DollarCircleOutlined),
        categoryId: "ai",
      },
      {
        path: "/ai/prompts",
        name: "Prompt Engineering",
        icon: React.createElement(EditOutlined),
        categoryId: "ai",
      },
    ],
  },
];

export const getRoutesByCategory = (categoryId: string): RouteItem[] => {
  const category = nextjsRoutes.find(
    (route) => route.categoryId === categoryId,
  );
  return category?.routes || [];
};

export const getAllRoutes = (): RouteItem[] => {
  return nextjsRoutes.reduce((all, category) => {
    if (category.routes) {
      return [...all, ...category.routes];
    }
    return all;
  }, [] as RouteItem[]);
};

export const getAllCategories = (): RouteItem[] => {
  return nextjsRoutes;
};
