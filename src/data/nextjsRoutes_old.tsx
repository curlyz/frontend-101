import React from "react";
import {
  Scan,
  LayoutDashboard,
  ArrowRightLeft,
  CloudDownload,
  FileText,
  Github,
  Settings,
  Shield,
  Globe,
  Wrench,
  Smartphone,
  Server,
  AlertCircle,
  Zap,
  BookOpen,
  Layout,
  Share,
  Link,
  User,
  Monitor,
  Package,
  Bot,
  Info,
  FileCode,
  DollarSign,
  Edit,
} from "lucide-react";
import type { RouteItem } from "@/types/categories";

export const nextjsRoutes: RouteItem[] = [
  // Frontend Category
  {
    name: "Frontend Development",
    path: "/frontend",
    icon: React.createElement(Package),
    categoryId: "frontend",
    routes: [
      {
        path: "/frontend/scan",
        name: "React Scan",
        icon: React.createElement(Scan),
        categoryId: "frontend",
      },
      {
        path: "/frontend/performance",
        name: "Performance Hooks",
        icon: React.createElement(LayoutDashboard),
        categoryId: "frontend",
      },
      {
        path: "/frontend/state",
        name: "State Lifting",
        icon: React.createElement(ArrowRightLeft),
        categoryId: "frontend",
      },
      {
        path: "/frontend/data",
        name: "Data Fetching",
        icon: React.createElement(CloudDownload),
        categoryId: "frontend",
      },
      {
        path: "/frontend/forms",
        name: "Form Handling",
        icon: React.createElement(FileText),
        categoryId: "frontend",
      },
      {
        path: "/frontend/redux",
        name: "Redux Demo",
        icon: React.createElement(Github),
        categoryId: "frontend",
      },
      {
        path: "/frontend/context",
        name: "React Context",
        icon: React.createElement(Settings),
        categoryId: "frontend",
      },
      {
        path: "/frontend/security",
        name: "Frontend Security",
        icon: <Shield />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/cors",
        name: "CORS Scenarios",
        icon: <Globe />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/tools",
        name: "Developer Tools",
        icon: <Wrench />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/pwa",
        name: "PWA Example",
        icon: <Smartphone />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/idempotency",
        name: "Idempotency",
        icon: <Server />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/batching",
        name: "State Batching",
        icon: <Zap />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/redux-concepts",
        name: "Redux Concepts",
        icon: <BookOpen />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/routing",
        name: "Layouts & Routing",
        icon: <Layout />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/packages",
        name: "Package Management",
        icon: <Globe />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/npm-yarn",
        name: "NPM vs Yarn",
        icon: <Globe />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/build",
        name: "Build & Deploy",
        icon: <Wrench />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/kubb",
        name: "Kubb OpenAPI",
        icon: <Server />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/network",
        name: "Network Protocols",
        icon: <Globe />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/mobile",
        name: "Mobile (Capacitor)",
        icon: <Smartphone />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/electron",
        name: "Electron Desktop",
        icon: <Monitor />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/props",
        name: "Props Drilling",
        icon: <Share />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/url-state",
        name: "URL State (Nuqs)",
        icon: <Link />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/client-components",
        name: "Client Components",
        icon: <User />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/server-components",
        name: "Server Components",
        icon: <CloudDownload />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/network-onclick",
        name: "Network in onClick",
        icon: <AlertCircle />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/package-demo",
        name: "Package Demo",
        icon: <Globe />,
        categoryId: "frontend",
      },
    ],
  },

  // AI Category
  {
    name: "AI & LLMs",
    path: "/ai",
    icon: <Bot />,
    categoryId: "ai",
    routes: [
      {
        path: "/ai/intro",
        name: "What is AI?",
        icon: <Info />,
        categoryId: "ai",
      },
      {
        path: "/ai/llms",
        name: "What are LLMs?",
        icon: <BookOpen />,
        categoryId: "ai",
      },
      {
        path: "/ai/capabilities",
        name: "LLM Capabilities",
        icon: <Zap />,
        categoryId: "ai",
      },
      {
        path: "/ai/myths",
        name: "Common Myths",
        icon: <AlertCircle />,
        categoryId: "ai",
      },
      {
        path: "/ai/resources",
        name: "Learning Resources",
        icon: <BookOpen />,
        categoryId: "ai",
      },
      {
        path: "/ai/compare",
        name: "Model Comparison",
        icon: <FileCode />,
        categoryId: "ai",
      },
      {
        path: "/ai/pricing",
        name: "Pricing Comparison",
        icon: <DollarSign />,
        categoryId: "ai",
      },
      {
        path: "/ai/prompts",
        name: "Prompt Engineering",
        icon: <Edit />,
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
