import React, { useEffect } from "react";
import DatumLogo from "@/assets/logo_white.png";
import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  ScanOutlined,
  CodeSandboxOutlined,
  SwapOutlined,
  FormOutlined,
  DashboardOutlined,
  CloudDownloadOutlined,
  GithubOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  BulbOutlined,
  ControlOutlined,
  AlertOutlined,
  ReadOutlined,
  ToolOutlined,
  MobileOutlined,
  ApiOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import { Button, Space, Avatar, Dropdown, Tooltip } from "antd";
import { useThemeMode, useToggleTheme } from "@/contexts/ThemeContext";
import {
  useIsAuthenticated,
  useUser,
  useLogin,
  useLogout,
} from "@/contexts/AuthContext";

// Define routes for ProLayout
const proLayoutRoutes = {
  path: "/",
  routes: [
    {
      path: "/react-scan",
      name: "React Scan",
      icon: <ScanOutlined />,
    },
    {
      path: "/performance",
      name: "Performance Hooks",
      icon: <DashboardOutlined />,
    },
    {
      path: "/state-optimization",
      name: "State Optimization",
      icon: <ControlOutlined />,
    },
    {
      path: "/data-fetching",
      name: "Data Fetching",
      icon: <CloudDownloadOutlined />,
    },
    {
      path: "/redux-demo",
      name: "Redux Demo",
      icon: <ControlOutlined />,
    },
    {
      path: "/package-managers",
      name: "Package Managers",
      icon: <CodeSandboxOutlined />,
    },
    {
      path: "/network-in-onclick",
      name: "Network in onClick",
      icon: <AlertOutlined />,
    },
    // Flattened Slide Routes
    {
      path: "/redux-concepts",
      name: "Redux Concepts Slide",
      icon: <ReadOutlined />,
    },
    {
      path: "/state-mgt-conclusion",
      name: "State Mgt. Conclusion Slide",
      icon: <InfoCircleOutlined />,
    },
    {
      path: "/client-components",
      name: "Client Components Slide",
      icon: <UserOutlined />,
    },
    {
      path: "/server-components",
      name: "Server Components Slide",
      icon: <CloudDownloadOutlined />,
    },
    {
      path: "/pkg-mgt-overview",
      name: "Pkg Mgt. Overview Slide",
      icon: <CodeSandboxOutlined />,
    },
    {
      path: "/npm-vs-yarn",
      name: "npm vs Yarn Slide",
      icon: <SwapOutlined />,
    },
    {
      path: "/build-deploy",
      name: "Build & Deployment Slide",
      icon: <ToolOutlined />,
    },
    {
      path: "/capacitor",
      name: "Capacitor Mobile Slide",
      icon: <MobileOutlined />,
    },
    {
      path: "/kubb",
      name: "Kubb OpenAPI Slide",
      icon: <ApiOutlined />,
    },
    {
      path: "/layout-routing",
      name: "Layouts & Routing",
      icon: <LayoutOutlined />,
    },
  ],
};

/**
 * Provides the main application layout using @ant-design/pro-layout
 * with a sidebar for slide navigation and a content area.
 *
 * @returns {JSX.Element} The MainLayout component.
 */
const MainLayout: React.FC = () => {
  const location = useLocation();
  const themeMode = useThemeMode();
  const toggleTheme = useToggleTheme();
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const login = useLogin();
  const logout = useLogout();

  // Use environment variable for title, with fallback
  const appTitle = import.meta.env.VITE_APP_TITLE || "Frontend 101";

  // Hotkey effect to toggle theme
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault(); // Prevent browser shortcuts (e.g., search)
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleTheme]); // Re-run effect if toggleTheme changes (should be stable)

  const handleLogin = () => {
    login({ id: "1", name: "Demo User", email: "demo@example.com" });
  };

  const avatarProps = {
    icon: <UserOutlined />,
    src: user?.email
      ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`
      : undefined,
    title: user?.name || "Not Logged In",
    size: "small" as const,
  };

  const authMenuItems = [
    isAuthenticated
      ? {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Logout",
          onClick: logout,
        }
      : {
          key: "login",
          icon: <LoginOutlined />,
          label: "Login",
          onClick: handleLogin,
        },
  ];

  return (
    <div
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title={""}
        logo={<img src={DatumLogo} alt="Datum Logo" />}
        layout="mix"
        navTheme={themeMode === "light" ? "light" : "realDark"}
        fixSiderbar
        siderWidth={208}
        location={{
          pathname: location.pathname,
        }}
        route={proLayoutRoutes}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <Dropdown menu={{ items: authMenuItems }} key="auth-dropdown">
              <Space style={{ cursor: "pointer" }}>
                <Avatar {...avatarProps} />
                <span>{avatarProps.title}</span>
              </Space>
            </Dropdown>,
            <Tooltip title="View Source on GitHub" key="github-link">
              <a
                href="https://github.com/your-repo/frontend-101"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubOutlined
                  style={{ fontSize: "20px", color: "inherit" }}
                />
              </a>
            </Tooltip>,
          ];
        }}
      >
        <PageContainer
          header={{
            title: null,
            breadcrumb: {},
          }}
          style={{
            minHeight: "calc(100vh - 56px)",
            padding: 24,
            background: themeMode === "light" ? "#fff" : undefined,
          }}
        >
          <Outlet />
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default MainLayout;
