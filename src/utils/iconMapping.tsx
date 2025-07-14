import React from "react";
import {
  Search,
  BarChart3,
  ArrowUpDown,
  Download,
  FileText,
  Github,
  Settings,
  Shield,
  Globe,
  Wrench,
  Smartphone,
  Zap,
  AlertTriangle,
  BookOpen,
  Layout,
  Share,
  Link,
  User,
  Monitor,
  Package,
  Bot,
  Info,
  Layers,
  DollarSign,
  Edit,
  Home,
} from "lucide-react";

// Mapping from Ant Design icon names to Lucide React icons
export const iconMap = {
  // Frontend icons
  ScanOutlined: Search,
  DashboardOutlined: BarChart3,
  SwapOutlined: ArrowUpDown,
  CloudDownloadOutlined: Download,
  FormOutlined: FileText,
  GithubOutlined: Github,
  ControlOutlined: Settings,
  SecurityScanOutlined: Shield,
  GlobalOutlined: Globe,
  ToolOutlined: Wrench,
  MobileOutlined: Smartphone,
  ApiOutlined: Zap,
  AlertOutlined: AlertTriangle,
  ThunderboltOutlined: Zap,
  ReadOutlined: BookOpen,
  LayoutOutlined: Layout,
  ShareAltOutlined: Share,
  LinkOutlined: Link,
  UserOutlined: User,
  DesktopOutlined: Monitor,
  CodeSandboxOutlined: Package,

  // AI icons
  RobotOutlined: Bot,
  InfoCircleOutlined: Info,
  SolutionOutlined: Layers,
  DollarCircleOutlined: DollarSign,
  EditOutlined: Edit,

  // General
  HomeOutlined: Home,
};

// Helper function to create icon elements
export const createIcon = (
  iconName: keyof typeof iconMap,
  className: string = "h-4 w-4",
) => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found in iconMap`);
    return React.createElement(Package, { className }); // fallback icon
  }
  return React.createElement(IconComponent, { className });
};

// Type-safe icon names
export type IconName = keyof typeof iconMap;
