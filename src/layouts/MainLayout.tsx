import React, { useEffect, useCallback } from "react";
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
  SecurityScanOutlined,
  ShareAltOutlined,
  ThunderboltOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Button, Space, Avatar, Dropdown, Tooltip } from "antd";
import { useThemeMode, useToggleTheme } from "@/contexts/ThemeContext";
import {
  useIsAuthenticated,
  useUser,
  useLogin,
  useLogout,
} from "@/contexts/AuthContext";
import { triggerCelebrationConfetti } from "@/utils/confetti";

// Define routes for ProLayout
const proLayoutRoutes = {
  path: "/",
  routes: [
    {
      path: "/developer-tools",
      name: "Dev Tools Helpers",
      icon: <BulbOutlined />,
    },
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
      path: "/state-update-batching",
      name: "State Update Batching",
      icon: <ReadOutlined />,
    },
    {
      path: "/props-drilling",
      name: "Props Drilling Slide",
      icon: <ShareAltOutlined />,
    },
    {
      path: "/state-optimization",
      name: "React Context Slide",
      icon: <ControlOutlined />,
    },
    {
      path: "/redux-concepts",
      name: "Redux Concepts Slide",
      icon: <ReadOutlined />,
    },
    // {
    //   path: "/state-mgt-conclusion",
    //   name: "State Mgt. Conclusion Slide",
    //   icon: <InfoCircleOutlined />,
    // },
    {
      path: "/network-in-onclick",
      name: "Network in onClick",
      icon: <AlertOutlined />,
    },
    {
      path: "/data-fetching",
      name: "Data Fetching",
      icon: <CloudDownloadOutlined />,
    },
    {
      path: "/layout-routing",
      name: "Layouts & Routing",
      icon: <LayoutOutlined />,
    },

    {
      path: "/state-batching",
      name: "State Update Batching",
      icon: <ThunderboltOutlined />,
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
      path: "/electron",
      name: "Electron Slide",
      icon: <DesktopOutlined />,
    },
    {
      path: "/idempotency",
      name: "Idempotency Slide",
      icon: <ApiOutlined />,
    },
    {
      path: "/frontend-security",
      name: "Frontend Security",
      icon: <AlertOutlined />,
    },
    {
      path: "/pwa",
      name: "PWA Example",
      icon: <MobileOutlined />,
    },
    {
      path: "/cors",
      name: "CORS Scenarios",
      icon: <SecurityScanOutlined />,
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
    const handleThemeKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleThemeKeyDown);
    return () => {
      window.removeEventListener("keydown", handleThemeKeyDown);
    };
  }, [toggleTheme]);

  // Hotkey effect for confetti
  const handleConfettiKeyDown = useCallback((event: KeyboardEvent) => {
    console.log(
      `[MainLayout] Confetti KeyDown: ${event.key}, Meta: ${event.metaKey}, Ctrl: ${event.ctrlKey}`,
    );
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "i") {
      console.log("[MainLayout] Cmd/Ctrl + I for confetti detected");
      event.preventDefault();
      triggerCelebrationConfetti();
      // TODO: Add applause sound here
      console.log("[MainLayout] Applause and Confetti! (Sound pending)");
    }
  }, []); // Empty dependency array as confetti trigger is self-contained

  useEffect(() => {
    console.log("[MainLayout] Confetti useEffect called");
    window.addEventListener("keydown", handleConfettiKeyDown);
    return () => {
      window.removeEventListener("keydown", handleConfettiKeyDown);
    };
  }, [handleConfettiKeyDown]); // Re-attach if handleConfettiKeyDown changes (it won't due to useCallback([]) but good practice)

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
        width: "100vw",
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
                href="https://github.com/curlyz/frontend-101"
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
