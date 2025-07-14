import React from "react";
import {
  Home,
  Info,
  Scan,
  Package,
  ArrowRightLeft,
  FileText,
  LayoutDashboard,
  CloudDownload,
  Github,
  User,
  LogOut,
  LogIn,
  Lightbulb,
  Settings,
  AlertCircle,
  BookOpen,
  Wrench,
  Smartphone,
  Server,
  Layout,
  Shield,
  Share,
  Zap,
  Monitor,
  Link,
  Sliders,
  FileCode,
  ArrowUpDown,
  Upload,
  Video,
  Wifi,
  Globe,
  Bot,
} from "lucide-react";
import type { RouteItem } from "@/types/categories";

export const categorizedRoutes: RouteItem[] = [
  // Frontend Development
  {
    path: "/frontend",
    name: "Frontend Development",
    icon: <Package />,
    categoryId: "frontend",
    routes: [
      {
        path: "/frontend/tools",
        name: "Dev Tools Helpers",
        icon: <Lightbulb />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/scan",
        name: "React Scan",
        icon: <Scan />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/performance",
        name: "Performance Hooks",
        icon: <LayoutDashboard />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/batching",
        name: "State Update Batching",
        icon: <BookOpen />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/state",
        name: "React Context",
        icon: <Settings />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/redux-concepts",
        name: "Redux Concepts",
        icon: <BookOpen />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/redux",
        name: "Redux Demo",
        icon: <Zap />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/context",
        name: "Props Drilling",
        icon: <Share />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/props",
        name: "Props Management",
        icon: <Share />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/forms",
        name: "Form Handling",
        icon: <FileText />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/routing",
        name: "Layouts & Routing",
        icon: <Layout />,
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
        icon: <Monitor />,
        categoryId: "frontend",
      },
      {
        path: "/frontend/server-components",
        name: "Server Components",
        icon: <CloudDownload />,
        categoryId: "frontend",
      },
    ],
  },

  // Package Management & Build Tools
  {
    path: "/frontend/packages",
    name: "Package Management",
    icon: <Globe />,
    categoryId: "development-tools",
  },
  {
    path: "/frontend/package-demo",
    name: "Package Demo",
    icon: <Globe />,
    categoryId: "development-tools",
  },
  {
    path: "/frontend/npm-yarn",
    name: "NPM vs Yarn",
    icon: <Globe />,
    categoryId: "development-tools",
  },
  {
    path: "/frontend/build",
    name: "Build & Deployment",
    icon: <Wrench />,
    categoryId: "development-tools",
  },
  {
    path: "/frontend/kubb",
    name: "Kubb OpenAPI",
    icon: <Server />,
    categoryId: "development-tools",
  },

  // Network & Security
  {
    path: "/frontend/network-onclick",
    name: "Network in onClick",
    icon: <AlertCircle />,
    categoryId: "network-security",
  },
  {
    path: "/frontend/data",
    name: "Data Fetching",
    icon: <CloudDownloadOutlined />,
    categoryId: "network-security",
  },
  {
    path: "/frontend/network",
    name: "Network Protocols",
    icon: <Globe />,
    categoryId: "network-security",
  },
  {
    path: "/frontend/idempotency",
    name: "Idempotency",
    icon: <Server />,
    categoryId: "network-security",
  },
  {
    path: "/frontend/security",
    name: "Frontend Security",
    icon: <AlertCircle />,
    categoryId: "network-security",
  },
  {
    path: "/frontend/cors",
    name: "CORS Scenarios",
    icon: <Shield />,
    categoryId: "network-security",
  },

  // Mobile & Desktop
  {
    path: "/frontend/mobile",
    name: "Capacitor Mobile",
    icon: <Smartphone />,
    categoryId: "mobile-desktop",
  },
  {
    path: "/frontend/electron",
    name: "Electron",
    icon: <Monitor />,
    categoryId: "mobile-desktop",
  },
  {
    path: "/frontend/pwa",
    name: "PWA Example",
    icon: <Smartphone />,
    categoryId: "mobile-desktop",
  },

  // AI & LLMs
  {
    name: "AI & LLMs",
    path: "/ai",
    icon: <Bot />,
    categoryId: "ai-llms",
    routes: [
      {
        path: "/ai/intro",
        name: "What is AI?",
        icon: <Info />,
        categoryId: "ai-llms",
      },
      {
        path: "/ai/llms",
        name: "What are LLMs?",
        icon: <BookOpen />,
        categoryId: "ai-llms",
      },
      {
        path: "/ai/capabilities",
        name: "LLM Capabilities",
        icon: <Wrench />,
        categoryId: "ai-llms",
      },
      {
        path: "/ai/myths",
        name: "Common Misconceptions",
        icon: <AlertCircle />,
        categoryId: "ai-llms",
      },
      {
        path: "/ai/resources",
        name: "Learning Resources",
        icon: <BookOpen />,
        categoryId: "ai-llms",
      },
      {
        path: "/ai/compare",
        name: "Model Comparison",
        icon: <FileCode />,
        categoryId: "ai-llms",
      },
      {
        path: "/ai/pricing",
        name: "Pricing Comparison",
        icon: <ArrowUpDown />,
        categoryId: "ai-llms",
      },
      {
        path: "/ai/prompts",
        name: "Prompt Engineering",
        icon: <Upload />,
        categoryId: "ai-llms",
      },
    ],
  },
];
