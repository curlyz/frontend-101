import React from "react";
import { Typography, Card, List, Tag, Divider, Row, Col } from "antd";
import {
  CodeOutlined,
  LayoutOutlined,
  ShareAltOutlined,
  BranchesOutlined,
  FolderOpenOutlined,
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
  const folderStructure = `
src/
├── App.tsx                 // Main application component, sets up router
├── main.tsx                // Vite entry point
│
├── assets/                 // Static assets (images, fonts)
│
├── components/
│   ├── common/             // Truly reusable UI (Button, Modal, etc.)
│   └── features/           // Components specific to a feature/domain
│
├── contexts/               // React Context API providers
│
├── hooks/                  // Custom React hooks
│
├── layouts/                // ★ Common page layouts
│   ├── MainLayout.tsx      // Example: Header, Footer, Sidebar, Outlet
│   └── AuthLayout.tsx      // Example: Layout for login/signup pages
│
├── pages/ (or views/)      // ★ Route-specific components/pages
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ProductDetailsPage.tsx
│   └── NotFoundPage.tsx
│
├── router/                 // ★ Routing configuration
│   └── index.tsx           // (or AppRouter.tsx) Defines route hierarchy
│
├── services/ (or api/)     // API call functions, data fetching logic
│
├── store/                  // Global state management (Redux, Zustand)
│
├── styles/                 // Global styles, themes
│
└── utils/                  // Utility functions, helpers
  `;

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
          <FolderOpenOutlined style={{ marginRight: "8px" }} />
          Typical Project Folder Structure
        </Title>
        <Paragraph>
          While structures can vary, here's a common and effective way to
          organize a Vite + React project, emphasizing where layout and routing
          files typically reside. Key folders are marked with ★.
        </Paragraph>
        <SyntaxHighlighter
          language="bash"
          style={atomDark}
          customStyle={codeStyle}
          showLineNumbers
        >
          {folderStructure.trim()}
        </SyntaxHighlighter>
        <Paragraph style={{ marginTop: "16px" }}>
          This organization helps in separating concerns: layouts define the
          common chrome, pages are the content for specific routes, and the
          router ties them together.
        </Paragraph>
      </Card>

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
          <Card style={{ height: "100%" }}>
            <Title level={3}>
              <LayoutOutlined style={{ marginRight: "8px" }} />
              The Common Layout Pattern with <Tag>{"<Outlet />"}</Tag>
            </Title>
            <Paragraph>
              A very common pattern is to have a main layout component (e.g.,{" "}
              <code>MainLayout.tsx</code>) that defines the shared structure of
              most pages (header, footer, navigation).
            </Paragraph>
            <Paragraph>
              This layout component then uses the <code>{"<Outlet />"}</code>{" "}
              component from React Router DOM at the position where the specific
              page content should be rendered.
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
          <Card style={{ height: "100%" }}>
            <Title level={3}>
              <BranchesOutlined style={{ marginRight: "8px" }} />
              Router Configuration with Layouts
            </Title>
            <Paragraph>
              In your router setup, you define a route for the layout component.
              Child routes are then nested within this layout route. When a
              child route is active, its component is rendered by the{" "}
              <code>{"<Outlet />"}</code> in the parent layout.
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

      <Card style={{ marginTop: "32px" }}>
        <Title level={3}>Benefits</Title>
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
    </div>
  );
};

export default LayoutAndRoutingSlide;
