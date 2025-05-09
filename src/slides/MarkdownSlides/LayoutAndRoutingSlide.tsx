import React from "react";
import {
  Typography,
  Card,
  List,
  Tag,
  Divider,
  Row,
  Col,
  Tree,
  Table,
  Alert,
} from "antd";
import type { TreeProps, TableProps } from "antd";
import {
  CodeOutlined,
  LayoutOutlined,
  ShareAltOutlined,
  BranchesOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  FileTextOutlined,
  SettingOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const { Title, Paragraph, Text } = Typography;

const codeStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
};

const LayoutAndRoutingSlide: React.FC = () => {
  const projectTreeData: TreeProps["treeData"] = [
    {
      title: "src",
      key: "src",
      icon: <FolderOpenOutlined />,
      children: [
        {
          title: "App.tsx",
          key: "src-app",
          icon: <SettingOutlined />,
          isLeaf: true,
        },
        {
          title: "main.tsx",
          key: "src-main",
          icon: <SettingOutlined />,
          isLeaf: true,
        },
        { title: "assets", key: "src-assets", icon: <FolderOutlined /> },
        {
          title: "components",
          key: "src-components",
          icon: <FolderOutlined />,
          children: [
            {
              title: "common",
              key: "src-components-common",
              icon: <FolderOutlined />,
            },
            {
              title: "features",
              key: "src-components-features",
              icon: <FolderOutlined />,
            },
          ],
        },
        {
          title: "contexts",
          key: "src-contexts",
          icon: <FolderOutlined />,
          children: [
            {
              title: "ThemeContext.tsx",
              key: "src-contexts-theme",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
          ],
        },
        {
          title: "hooks",
          key: "src-hooks",
          icon: <FolderOutlined />,
          children: [
            {
              title: "useCustomHook.tsx",
              key: "src-hooks-custom",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
          ],
        },
        {
          title: "layouts (★)",
          key: "src-layouts",
          icon: <FolderOutlined />,
          children: [
            {
              title: "MainLayout.tsx",
              key: "src-layouts-main",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
            {
              title: "AuthLayout.tsx (Optional)",
              key: "src-layouts-auth",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
          ],
        },
        {
          title: "pages (or views) (★)",
          key: "src-pages",
          icon: <FolderOutlined />,
          children: [
            {
              title: "HomePage.tsx",
              key: "src-pages-home",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
            {
              title: "AboutPage.tsx",
              key: "src-pages-about",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
            {
              title: "ProductDetailsPage.tsx",
              key: "src-pages-product",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
            {
              title: "NotFoundPage.tsx",
              key: "src-pages-notfound",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
          ],
        },
        {
          title: "router (★)",
          key: "src-router",
          icon: <FolderOutlined />,
          children: [
            {
              title: "index.tsx (or AppRouter.tsx)",
              key: "src-router-index",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
          ],
        },
        {
          title: "services (or api)",
          key: "src-services",
          icon: <FolderOutlined />,
        },
        { title: "styles", key: "src-styles", icon: <FolderOutlined /> },
        { title: "utils", key: "src-utils", icon: <FolderOutlined /> },
      ],
    },
  ];

  const mainLayoutExample = `
// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd'; // Assuming Ant Design
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        <Title level={3} style={{ color: 'white', margin: 0, marginRight: 'auto' }}>AppLogo</Title>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} style={{ lineHeight: '64px' }}>
          <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="/about"><Link to="/about">About</Link></Menu.Item>
          {/* Add other main navigation links here */}
        </Menu>
      </Header>
      <Layout>
        {/* Optional Sider Example */}
        {/* 
        <Sider width={200} theme="light">
          <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="sider-link1">Sider Link 1</Menu.Item>
            <Menu.Item key="sider-link2">Sider Link 2</Menu.Item>
          </Menu>
        </Sider>
        */}
        <Content style={{ padding: '24px', margin: 0 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 360 }}>
            <Outlet /> {/* ★ Child routes will render here ★ */}
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        My App ©{new Date().getFullYear()} Created with Ant Design & React Router
      </Footer>
    </Layout>
  );
};

export default MainLayout;
  `;

  const routerConfigExample = `
// src/router/index.tsx (or AppRouter.tsx)
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ProductDetailsPage from '@/pages/ProductDetailsPage';
import NotFoundPage from '@/pages/NotFoundPage';
// import AuthLayout from '@/layouts/AuthLayout'; // Optional
// import LoginPage from '@/pages/LoginPage'; // Optional

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // MainLayout applies to all its children
    errorElement: <NotFoundPage />, // Or a more specific error boundary
    children: [
      { index: true, element: <HomePage /> }, // Default page for '/'
      { path: 'about', element: <AboutPage /> },
      { path: 'products/:productId', element: <ProductDetailsPage /> },
      // Add more routes under MainLayout here
    ],
  },
  // Example of a different layout for auth pages (optional)
  /*
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      // { path: 'register', element: <RegisterPage /> },
    ],
  },
  */
  { path: '*', element: <NotFoundPage /> }, // Catch-all for 404
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

// src/App.tsx would then use <AppRouter />
// import AppRouter from './router';
// function App() { return <AppRouter />; }

// src/main.tsx would render <App />
  `;

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        <LayoutOutlined style={{ marginRight: "10px" }} />
        Structuring Your Vite + React App: Layouts & Routing
      </Title>
      <Paragraph
        style={{ textAlign: "center", fontSize: "1.1em", marginBottom: "32px" }}
      >
        A well-organized structure using common layouts and React Router DOM is
        key to building scalable and maintainable Single Page Applications
        (SPAs).
      </Paragraph>

      <Card style={{ marginBottom: "32px" }}>
        <Title level={3}>
          <ShareAltOutlined style={{ marginRight: "8px" }} />
          React Router DOM: Core Concepts
        </Title>
        <Paragraph>
          <a
            href="https://reactrouter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Router DOM
          </a>{" "}
          is the standard library for routing in React applications. Key
          components include:
        </Paragraph>
        <List
          itemLayout="horizontal"
          dataSource={[
            {
              term: "<BrowserRouter>",
              definition:
                "Wraps your entire application or the part of it that needs routing. Uses the HTML5 history API.",
            },
            {
              term: "<Routes>",
              definition:
                "A container for a set of <Route> elements. It picks the best match and renders that route's component.",
            },
            {
              term: "<Route path='/...' element={<Component />}>",
              definition:
                "Defines a mapping between a URL path and a React component. Can be nested.",
            },
            {
              term: "<Link to='/...'> / <NavLink to='/...'>",
              definition:
                "Provide declarative, accessible navigation. NavLink can style active links.",
            },
            {
              term: "<Outlet />",
              definition:
                "Crucial for nested routes and layouts. Renders the matched child route's component within a parent route's layout. (More on this below!)",
            },
            {
              term: "useNavigate()",
              definition:
                "A hook for programmatic navigation (e.g., after a form submission).",
            },
            {
              term: "useParams()",
              definition:
                "A hook to access URL parameters (e.g., /products/:id).",
            },
            {
              term: "useLocation()",
              definition: "A hook that returns the current location object.",
            },
            {
              term: "useSearchParams()",
              definition:
                "A hook for reading and modifying the query string in the URL.",
            },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Text strong>
                    <Tag color="blue">{item.term}</Tag>
                  </Text>
                }
                description={item.definition}
              />
            </List.Item>
          )}
        />
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Layout Components" style={{ marginBottom: 20 }}>
            <Paragraph>
              Layout components act as reusable wrappers for different sections
              of your application.
            </Paragraph>
            <List size="small" style={{ marginBottom: "16px" }}>
              <List.Item>
                <LayoutOutlined style={{ marginRight: 8 }} />{" "}
                <Text strong>Purpose:</Text> Define the common UI structure
                (header, footer, sidebar, navigation) shared across multiple
                pages.
              </List.Item>
              <List.Item>
                <CodeOutlined style={{ marginRight: 8 }} />{" "}
                <Text strong>Dynamic Content:</Text> Use the{" "}
                <Text code>{`<Outlet />`}</Text> component (from{" "}
                <Text code>react-router-dom</Text>) as a placeholder where the
                content of the currently matched child route will be rendered.
              </List.Item>
              <List.Item>
                <BranchesOutlined style={{ marginRight: 8 }} />{" "}
                <Text strong>Application:</Text> You can have multiple layouts
                (e.g., one for main app sections, another for authentication
                pages).
              </List.Item>
            </List>
            <Paragraph>
              Below is an example of a <Text code>MainLayout.tsx</Text> using
              Ant Design components:
            </Paragraph>
            <SyntaxHighlighter
              language="tsx"
              style={atomDark}
              customStyle={codeStyle}
              showLineNumbers
            >
              {mainLayoutExample.trim()}
            </SyntaxHighlighter>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Routing Configuration" style={{ marginBottom: 20 }}>
            <Paragraph>
              The router configuration maps URL paths to your page components,
              often integrating layout components to structure the application.
            </Paragraph>
            <List size="small" style={{ marginBottom: "16px" }}>
              <List.Item>
                <ToolOutlined style={{ marginRight: 8 }} />{" "}
                <Text strong>Library:</Text> Commonly implemented using{" "}
                <Text code>react-router-dom</Text> (v6+ shown here with data
                routers like <Text code>createBrowserRouter</Text>).
              </List.Item>
              <List.Item>
                <ShareAltOutlined style={{ marginRight: 8 }} />{" "}
                <Text strong>Mapping:</Text> Defines route objects, associating
                a URL <Text code>path</Text> with a React{" "}
                <Text code>element</Text> (often a page component).
              </List.Item>
              <List.Item>
                <LayoutOutlined style={{ marginRight: 8 }} />{" "}
                <Text strong>Layout Integration:</Text> Parent routes can
                specify a layout component. Child routes defined within its{" "}
                <Text code>children</Text> array will render inside that
                layout\'s <Text code>{`<Outlet />`}</Text>.
              </List.Item>
              <List.Item>
                <BranchesOutlined style={{ marginRight: 8 }} />{" "}
                <Text strong>Nesting:</Text> Supports defining child routes for
                hierarchical UIs.
              </List.Item>
              <List.Item>
                <SettingOutlined style={{ marginRight: 8 }} />{" "}
                <Text strong>Features:</Text> Handles dynamic path segments
                (e.g., <Text code>path: \':productId\'</Text>), index routes
                (defaults for parent paths), error elements, and more.
              </List.Item>
            </List>
            <Paragraph>
              Here's an example configuration using{" "}
              <Text code>createBrowserRouter</Text>:
            </Paragraph>
            <SyntaxHighlighter
              language="tsx"
              style={atomDark}
              customStyle={codeStyle}
              showLineNumbers
            >
              {routerConfigExample.trim()}
            </SyntaxHighlighter>
            <Paragraph style={{ marginTop: "16px" }}>
              This approach keeps your page components clean (they don't need to
              repeat layout code) and makes it easy to manage shared UI
              elements. You can even have multiple distinct layouts for
              different sections of your application (e.g., a public layout and
              an admin panel layout).
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* --- NEW COMPARISON SECTION --- */}
      <Divider style={{ margin: "32px 0" }} />

      <Card style={{ marginBottom: "32px" }}>
        <Title level={3}>
          <BranchesOutlined style={{ marginRight: "8px" }} />
          Comparison: React Router DOM vs. Next.js App Router
        </Title>
        <Paragraph>
          While this slide focuses on <Text code>react-router-dom</Text> for
          client-side routing in a Vite/SPA context, it's useful to understand
          how its approach compares to the routing paradigm in a full-stack
          framework like Next.js (specifically its App Router).
        </Paragraph>
        <ComparisonTable />
      </Card>
      {/* --- END NEW COMPARISON SECTION --- */}

      <Card style={{ marginTop: "32px" }}>
        <Title level={3}>
          Benefits of This Approach (with React Router DOM)
        </Title>
        <List
          dataSource={[
            "DRY (Don't Repeat Yourself): Common UI elements are defined once in the layout.",
            "Maintainability: Easier to update shared elements across many pages.",
            "Consistency: Ensures a consistent look and feel for sections of your application.",
            "Clear Separation of Concerns: Page components focus on their specific content, while layouts handle the overall structure.",
            "Scalability: Easier to add new pages that conform to existing layouts.",
          ]}
          renderItem={(item) => (
            <List.Item>
              <Text>{item}</Text>
            </List.Item>
          )}
        />
      </Card>

      <Alert
        message="Further Learning"
        description={
          <Paragraph>
            For more detailed information on React Router, its features, and
            advanced usage patterns, visit the official
            <a
              href="https://reactrouter.com/en/main/start/tutorial"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              React Router Documentation
            </a>
            .
          </Paragraph>
        }
        type="success"
        showIcon
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

// --- Comparison Table Component and Data ---
interface ComparisonDataType {
  key: string;
  feature: string;
  reactRouterDom: React.ReactNode;
  nextJsAppRouter: React.ReactNode;
}

const comparisonColumns: TableProps<ComparisonDataType>["columns"] = [
  {
    title: "Feature",
    dataIndex: "feature",
    key: "feature",
    render: (text) => <Text strong>{text}</Text>,
    width: "25%",
  },
  {
    title: "React Router DOM (v6 Data Routers)",
    dataIndex: "reactRouterDom",
    key: "reactRouterDom",
    width: "37.5%",
  },
  {
    title: "Next.js App Router",
    dataIndex: "nextJsAppRouter",
    key: "nextJsAppRouter",
    width: "37.5%",
  },
];

const comparisonData: ComparisonDataType[] = [
  {
    key: "1",
    feature: "Routing Paradigm",
    reactRouterDom: (
      <>
        <Paragraph>
          Configuration-based (JavaScript/TypeScript objects or JSX routes).
        </Paragraph>
        <Paragraph>
          <Text code>createBrowserRouter</Text> or{" "}
          <Text code>&lt;BrowserRouter&gt;</Text> with{" "}
          <Text code>&lt;Routes&gt;</Text> and <Text code>&lt;Route&gt;</Text>{" "}
          components.
        </Paragraph>
      </>
    ),
    nextJsAppRouter: (
      <>
        <Paragraph>
          File-system based routing. Folders and special files (
          <Text code>page.tsx</Text>, <Text code>layout.tsx</Text>,{" "}
          <Text code>route.ts</Text>) define routes.
        </Paragraph>
        <Paragraph>Convention over configuration.</Paragraph>
      </>
    ),
  },
  {
    key: "2",
    feature: "Layouts",
    reactRouterDom: (
      <>
        <Paragraph>
          Nested routes with parent routes acting as layouts, using the{" "}
          <Text code>&lt;Outlet /&gt;</Text> component to render children.
        </Paragraph>
        <Paragraph>Explicitly defined in the route configuration.</Paragraph>
      </>
    ),
    nextJsAppRouter: (
      <>
        <Paragraph>
          Special <Text code>layout.tsx</Text> files in directories apply to
          segments and their children.
        </Paragraph>
        <Paragraph>
          Layouts automatically wrap <Text code>page.tsx</Text> and child
          layouts. Supports Route Groups for organizing layouts without
          affecting URL paths.
        </Paragraph>
      </>
    ),
  },
  {
    key: "3",
    feature: "Data Fetching",
    reactRouterDom: (
      <>
        <Paragraph>
          Client-side focus: <Text code>useEffect</Text>, custom hooks, or
          integrated libraries (SWR, React Query).
        </Paragraph>
        <Paragraph>
          Data Routers introduce <Text code>loader</Text> functions for
          route-level data fetching (can run server-side in SSR environments).
        </Paragraph>
      </>
    ),
    nextJsAppRouter: (
      <>
        <Paragraph>
          Server-centric by default, especially with Server Components. Data
          fetched directly in Server Components (async/await).
        </Paragraph>
        <Paragraph>
          Client Components can fetch data traditionally. Route Handlers (
          <Text code>route.ts</Text>) for API endpoints.
        </Paragraph>
      </>
    ),
  },
  {
    key: "4",
    feature: "Server Components",
    reactRouterDom: (
      <>
        <Paragraph>
          Primarily for Client Components. RSCs are not a built-in concept.
        </Paragraph>
        <Paragraph>
          Can be integrated with manual SSR setup or frameworks that support
          RSCs alongside <Text code>react-router-dom</Text>.
        </Paragraph>
      </>
    ),
    nextJsAppRouter: (
      <>
        <Paragraph>
          Built around React Server Components by default. Pages and layouts are
          RSCs unless opted into Client Components with{" "}
          <Text code>{"use client"}</Text>.
        </Paragraph>
        <Paragraph>
          Enables server-side rendering of components without shipping their JS
          to the client.
        </Paragraph>
      </>
    ),
  },
  {
    key: "5",
    feature: "Primary Use Case",
    reactRouterDom: (
      <>
        <Paragraph>
          Client-Side Rendered (CSR) Single Page Applications (SPAs).
        </Paragraph>
        <Paragraph>
          Can be used in Server-Side Rendered (SSR) apps when integrated with a
          Node.js backend or meta-framework.
        </Paragraph>
      </>
    ),
    nextJsAppRouter: (
      <>
        <Paragraph>
          Full-stack React applications with integrated SSR, SSG, ISR, and API
          routes.
        </Paragraph>
        <Paragraph>
          Optimized for performance, SEO, and developer experience with a rich
          feature set.
        </Paragraph>
      </>
    ),
  },
];

const ComparisonTable: React.FC = () => (
  <Table
    columns={comparisonColumns}
    dataSource={comparisonData}
    pagination={false}
    bordered
    size="small"
  />
);

export default LayoutAndRoutingSlide;
