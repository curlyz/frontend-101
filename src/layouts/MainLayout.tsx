import React from "react";
import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  ScanOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons"; // Import new icons
// import { theme } from 'antd'; // theme.useToken might not be needed directly with ProLayout

// Define routes for ProLayout. The structure is slightly different.
const proLayoutRoutes = {
  path: "/",
  routes: [
    {
      path: "/home", // Match route path
      name: "Home", // Used for the menu item label
      icon: <HomeOutlined />,
    },
    {
      path: "/about", // Match route path
      name: "About", // Used for the menu item label
      icon: <InfoCircleOutlined />,
    },
    {
      path: "/react-scan",
      name: "React Scan", // Used for the menu item label
      icon: <ScanOutlined />,
    },
    {
      path: "/component-demo", // Match route path
      name: "Component Demo", // Used for the menu item label
      icon: <CodeSandboxOutlined />,
    },
    // Add more slides here following the ProLayout route structure
    // {
    //   path: '/code-inspector',
    //   name: 'Code Inspector',
    //   icon: <CodeOutlined />,
    // },
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
  // ProLayout typically uses its own theme tokens or Ant Design's default context
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  return (
    <div
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="Frontend 101" // Set your presentation title
        logo="/logo.svg" // Optional: Add a path to your logo in public/
        layout="mix" // 'side', 'top', or 'mix' (recommended)
        siderWidth={208}
        location={{
          // Pass location for route matching
          pathname: location.pathname,
        }}
        route={proLayoutRoutes} // Pass the route configuration
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          // Link component for internal navigation
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        // Collapsed state is handled internally by default
        // You can control it with `collapsed` and `onCollapse` props if needed
      >
        {/* PageContainer provides padding and card styling consistent with ProLayout */}
        <PageContainer
          header={{
            // Hide the default PageContainer header if you only want the slide content
            title: null,
            breadcrumb: {},
          }}
          style={{
            // Use PageContainer's background, or customize if needed
            // background: colorBgContainer,
            // borderRadius: borderRadiusLG,
            minHeight: "calc(100vh - 56px)", // Adjust based on ProLayout header height
            padding: 24, // Default padding, adjust if needed
          }}
        >
          {/* Outlet renders the matched child route component (the slide) */}
          <Outlet />
        </PageContainer>
        {/* ProLayout has its own footer capabilities via the `footerRender` prop */}
      </ProLayout>
    </div>
  );
};

export default MainLayout;
