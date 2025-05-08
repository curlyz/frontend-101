import React, { useEffect } from "react";
import {
  Typography,
  Card,
  List,
  Row,
  Col,
  Tag,
  Alert,
  Table,
  Divider,
} from "antd";
import {
  CloudServerOutlined,
  CodeOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
  SlidersOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";

const { Title, Paragraph, Text } = Typography;

const codeSnippetStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  maxHeight: "400px",
  overflow: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
};

const rscDataFlowDiagram = `
graph TD
    subgraph Browser
        B1[Client Navigates/Requests URL] --> B2{React Client Runtime}
        B2 --> B5[Render Client Components & Merge RSC Stream]
        B5 --> B6[Interactive UI]
    end

    subgraph Server
        S1[Receives Request] --> S2{React Server e.g. Next.js}
        S2 --> S3[Execute Server Components .tsx/.jsx]
        S3 -- Direct Data Access --> S_DB[(Database/APIs/File System)]
        S3 --> S4[Generate RSC Payload Stream]
        S2 -. Streams Payload .-> B2
    end

    B1 -. HTTP Request .-> S1
    S4 -. RSC Payload Special Format .-> B2

    style S3 fill:#ccf,stroke:#333,stroke-width:2px
    style B5 fill:#cff,stroke:#333,stroke-width:2px
    style S_DB fill:#f9f,stroke:#333,stroke-width:2px
`;

/**
 * @function ServerComponentsSlide
 * @description A React functional component explaining React Server Components (RSCs).
 * It covers their definition, benefits, characteristics, use cases, and how they combine with Client Components.
 * @returns {React.ReactElement} The ServerComponentsSlide component.
 * @example
 * <ServerComponentsSlide />
 */
const ServerComponentsSlide: React.FC = () => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "default" });
    const element = document.getElementById("rsc-data-flow-diagram");
    if (element && element.getAttribute("data-processed") !== "true") {
      element.innerHTML = rscDataFlowDiagram;
      try {
        mermaid.run({ nodes: [element] });
      } catch (e) {
        console.error("Mermaid rendering error:", e);
        element.innerHTML = "Error rendering diagram.";
      }
    }
  }, []);

  const mainIdeas = [
    "React Server Components (RSC) render on the server.",
    "Server-Side Rendering (SSR) in RSC context: server sends HTML/special format to client.",
    "Benefits: improved initial load, reduced JS bundle, better performance.",
    "Characteristics: run on server, no client JS bundle for own logic, can access server resources.",
    "Use cases: performance optimization, reducing JS, static-like pages.",
    "Combine Client and Server Components for balanced performance and interactivity.",
  ];

  const rscFlow = [
    {
      icon: <DesktopOutlined />,
      title: "Browser requests page.",
      description: "User action triggers navigation.",
    },
    {
      icon: <CloudServerOutlined />,
      title: "Server executes RSCs, generates HTML/format.",
      description: "React renders components on the server.",
    },
    {
      icon: <CodeOutlined />,
      title: "Server sends HTML/format to browser.",
      description: "Output is streamed or sent once ready.",
    },
    {
      icon: <DesktopOutlined style={{ color: "#52c41a" }} />,
      title: "Browser renders HTML quickly.",
      description: "Fast initial paint for the user.",
    },
    {
      icon: <SlidersOutlined />,
      title: "Minimal JS loads for Client Components (if any).",
      description: "Client-side interactivity is hydrated where needed.",
    },
  ];

  const comparisonColumns = [
    { title: "Feature", dataIndex: "feature", key: "feature", width: "30%" },
    { title: "Client Component", dataIndex: "client", key: "client" },
    { title: "Server Component", dataIndex: "server", key: "server" },
  ];

  const comparisonData = [
    {
      key: "1",
      feature: "Execution Environment",
      client: "Browser",
      server: "Server",
    },
    {
      key: "2",
      feature: "State & Lifecycle (useState, useEffect)",
      client: "Yes",
      server: "No (directly)",
    },
    {
      key: "3",
      feature: "Browser APIs (window, document)",
      client: "Yes",
      server: "No (directly)",
    },
    {
      key: "4",
      feature: "Adds to Client JS Bundle",
      client: "Yes",
      server: "No (for its own logic)",
    },
    {
      key: "5",
      feature: "Access Backend Resources Directly",
      client: "No (via API call)",
      server: "Yes",
    },
  ];

  const rscUseCases = [
    {
      icon: <ThunderboltOutlined />,
      text: "Optimize for initial page load and perceived performance.",
    },
    {
      icon: <BarChartOutlined />,
      text: "Reduce the client-side JavaScript bundle size.",
    },
    {
      icon: <DatabaseOutlined />,
      text: "Access backend data sources directly during rendering.",
    },
    {
      icon: <InfoCircleOutlined />,
      text: "Render parts of your UI that are not highly interactive.",
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2}>React Server Components (RSCs)</Title>
      <Paragraph>
        React Server Components (RSCs) are a newer paradigm in React
        (popularized by frameworks like Next.js with its App Router) that allows
        components to run exclusively on the server. This offers benefits like
        reduced client-side JavaScript, direct backend access, and improved
        performance for non-interactive parts of your application.
      </Paragraph>

      <Card title="Main Ideas to Convey" style={{ marginBottom: 20 }}>
        <List
          dataSource={mainIdeas}
          renderItem={(item) => (
            <List.Item>
              <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} />{" "}
              {item}
            </List.Item>
          )}
        />
      </Card>

      <Card title="RSC Data & Rendering Flow" style={{ marginBottom: 20 }}>
        <div
          id="rsc-data-flow-diagram"
          className="mermaid"
          style={{
            textAlign: "center",
            padding: "10px",
            backgroundColor: "#fafafa",
          }}
        >
          {/* Diagram rendered by useEffect */}
        </div>
        <Paragraph style={{ marginTop: "10px" }}>
          <Text strong>Key Flow:</Text>
          <ol>
            <li>Client requests a route.</li>
            <li>
              Server executes relevant Server Components. These components can
              directly fetch data (e.g., from a database or API) or access
              server-side resources.
            </li>
            <li>
              Server Components render to a special intermediate format (RSC
              Payload/Stream), not directly to HTML for all cases.
            </li>
            <li>This payload is streamed/sent to the client.</li>
            <li>
              On the client, React merges the RSC payload with any Client
              Components (`'use client'`).
            </li>
            <li>
              Client Components hydrate and become interactive, while Server
              Component parts are already rendered.
            </li>
          </ol>
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} md={12}>
          <Card
            title="Conceptual RSC/SSR Flow (Previous Idea)"
            style={{ height: "100%" }}
          >
            <Paragraph>
              <Text strong>Previously Illustrated As:</Text> (This list provides
              a step-by-step view, complemented by the diagram above.)
            </Paragraph>
            <List
              itemLayout="horizontal"
              dataSource={rscFlow}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={React.cloneElement(item.icon, {
                      style: { fontSize: "24px" },
                    })}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Visual Idea: Hybrid Approach" style={{ height: "100%" }}>
            <Paragraph>
              Illustrate a page layout with some parts highlighted as{" "}
              <Tag color="geekblue">Server Component (Static Content)</Tag>
              and others as{" "}
              <Tag color="purple">Client Component (Interactive)</Tag>.
            </Paragraph>
            <div
              style={{
                border: "1px dashed #ccc",
                padding: "10px",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              <Text strong>Page Layout</Text>
              <div
                style={{
                  background: "#000",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "4px",
                }}
              >
                <Tag color="geekblue">Header (Server Component)</Tag>
              </div>
              <Row gutter={8}>
                <Col span={16}>
                  <div
                    style={{
                      background: "#000",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    <Tag color="geekblue">Main Content (Server Component)</Tag>
                    <Paragraph>Static text, product info, etc.</Paragraph>
                    <div
                      style={{
                        background: "#000",
                        padding: "8px",
                        margin: "8px 0",
                        borderRadius: "4px",
                        border: "1px solid #ffe58f",
                      }}
                    >
                      <Tag color="purple">
                        Interactive Chart (Client Component)
                      </Tag>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    style={{
                      background: "#000",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    <Tag color="purple">Sidebar Filters (Client Component)</Tag>
                  </div>
                </Col>
              </Row>
              <div
                style={{
                  background: "#000",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "4px",
                }}
              >
                <Tag color="geekblue">Footer (Server Component)</Tag>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        title="Client vs. Server Component Comparison"
        style={{ marginBottom: 20 }}
      >
        <Table
          columns={comparisonColumns}
          dataSource={comparisonData}
          pagination={false}
          size="middle"
          bordered
        />
      </Card>

      <Card title="Content Summary" style={{ marginBottom: 20 }}>
        <Paragraph>
          React Server Components (RSCs) are a newer type of component that
          render on the server. Their output (which can be a special format, not
          just HTML) is then sent to the client. This approach can significantly
          improve initial page load times, reduce the amount of JavaScript sent
          to the browser, and enhance overall application performance.
        </Paragraph>
        <Divider>Key Characteristics of Server Components</Divider>
        <List>
          <List.Item>
            <DatabaseOutlined style={{ marginRight: 8, color: "#1890ff" }} />{" "}
            They execute on the server, meaning their code doesn't contribute to
            the client-side JavaScript bundle (for their own logic).
          </List.Item>
          <List.Item>
            <CloudServerOutlined style={{ marginRight: 8, color: "#1890ff" }} />{" "}
            They can directly access server-side resources like databases, file
            systems, or internal APIs without needing to expose API endpoints.
          </List.Item>
          <List.Item>
            <InfoCircleOutlined style={{ marginRight: 8, color: "#faad14" }} />{" "}
            They cannot use state (like <Text code>useState</Text>) or lifecycle
            effects (<Text code>useEffect</Text>) directly, as these are
            client-side concepts. They also cannot use browser-only APIs.
          </List.Item>
        </List>

        <Divider>Use Server Components When You Want To:</Divider>
        <List
          dataSource={rscUseCases}
          renderItem={(item) => (
            <List.Item>
              {React.cloneElement(item.icon, {
                style: { color: "#1890ff", marginRight: 8 },
              })}{" "}
              {item.text}
            </List.Item>
          )}
        />
        <Alert
          message="Hybrid Approach"
          description="Modern React frameworks (like Next.js) allow you to seamlessly combine Server Components and Client Components. This hybrid approach lets you build applications that are fast to load (thanks to RSCs) while still offering rich interactivity where needed (thanks to Client Components)."
          type="info"
          showIcon
          style={{ marginTop: 20 }}
        />
      </Card>

      <Card title="Code Examples & Concepts" style={{ marginBottom: 20 }}>
        <Alert
          message="Note: The exact file structure and API (e.g., for data fetching) for Server Components often depend on the framework being used (like Next.js App Router). These are general conceptual examples."
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        <Title level={4}>1. Basic Server Component</Title>
        <Paragraph>
          Server Components run on the server and can directly access
          server-side resources or perform async operations. They do not use
          React hooks like <code>useState</code> or <code>useEffect</code> and
          don't have interactivity that runs on the client.
        </Paragraph>
        <SyntaxHighlighter
          language="tsx"
          style={atomDark}
          customStyle={codeSnippetStyle}
          showLineNumbers
        >
          {`// Example: app/components/ServerMessage.tsx (conceptual path)

// Simulate a server-side data fetching function
async function getMessageFromServer() {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
  return "Hello from the Server Component! Data fetched at " + new Date().toLocaleTimeString();
}

// This is an async Server Component
export default async function ServerMessage() {
  const message = await getMessageFromServer();

  return (
    <div style={{ padding: '10px', border: '1px solid #a0d911', borderRadius: '4px', backgroundColor: '#f6ffed' }}>
      <p>{message}</p>
      <p><small>This component rendered on the server.</small></p>
    </div>
  );
}`}
        </SyntaxHighlighter>

        <Title level={4} style={{ marginTop: 20 }}>
          2. Client Component
        </Title>
        <Paragraph>
          Client Components are the traditional React components we are familiar
          with. They are marked with the <Text code>{"use client"}</Text>{" "}
          directive at the top of the file. They run on the client, can use
          state, effects, and handle browser events.
        </Paragraph>
        <SyntaxHighlighter
          language="tsx"
          style={atomDark}
          customStyle={codeSnippetStyle}
          showLineNumbers
        >
          {`// Example: app/components/InteractiveCounter.tsx
'use client'; // Directive to mark this as a Client Component

import React, { useState, useEffect } from 'react';

export default function InteractiveCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("InteractiveCounter mounted or count updated on client.");
  }, [count]);

  return (
    <div style={{ padding: '10px', border: '1px solid #1890ff', borderRadius: '4px', backgroundColor: '#e6f7ff' }}>
      <p>Client Counter: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment (Client)</button>
      <p><small>This component is interactive on the client.</small></p>
    </div>
  );
}`}
        </SyntaxHighlighter>

        <Title level={4} style={{ marginTop: 20 }}>
          3. Interleaving Server and Client Components
        </Title>
        <Paragraph>
          Server and Client components can be seamlessly interleaved. A Server
          Component can import and render a Client Component, and vice-versa
          (though a Client Component importing a Server Component often means
          the Server Component's children are passed, and the Server Component
          itself still runs on the server).
        </Paragraph>
        <SyntaxHighlighter
          language="tsx"
          style={atomDark}
          customStyle={codeSnippetStyle}
          showLineNumbers
        >
          {`// Example: app/page.tsx (conceptual Next.js App Router page)
import ServerMessage from './components/ServerMessage';
import InteractiveCounter from './components/InteractiveCounter';
import SharedCard from './components/SharedCard'; // Assume SharedCard is a neutral component

export default function MyPage() {
  // This is a Server Component by default in Next.js App Router
  return (
    <div>
      <Title level={3}>Server & Client Component Demo</Title>
      
      <SharedCard title="Rendered by Server (as child of MyPage)">
        <Paragraph>This content is part of MyPage (Server Component).</Paragraph>
      </SharedCard>

      {/* ServerMessage will execute on the server */}
      <ServerMessage /> 

      <Divider />

      {/* InteractiveCounter will be sent to client and hydrate */}
      <InteractiveCounter />

      <SharedCard title="Another Server-Rendered Section">
         <Paragraph>More static content rendered on the server.</Paragraph>
      </SharedCard>
    </div>
  );
}`}
        </SyntaxHighlighter>

        <Title level={4} style={{ marginTop: 20 }}>
          4. Shared Components
        </Title>
        <Paragraph>
          These are components that don't use any server-specific features (like
          direct data access) or client-specific features (like hooks or browser
          event handlers). They can be imported and used by both Server and
          Client Components. They render differently based on where they are
          imported.
        </Paragraph>
        <SyntaxHighlighter
          language="tsx"
          style={atomDark}
          customStyle={codeSnippetStyle}
          showLineNumbers
        >
          {`// Example: app/components/SharedCard.tsx
import React from 'react';

// This component uses no client hooks and no server-specific features.
// It can be imported into both Server and Client Components.
export default function SharedCard({ title, children }) {
  return (
    <div style={{ 
      border: '1px solid #d9d9d9', 
      padding: '16px', 
      margin: '16px 0', 
      borderRadius: '4px' 
    }}>
      {title && <Title level={5}>{title}</Title>}
      {children}
    </div>
  );
}`}
        </SyntaxHighlighter>
      </Card>

      <Card
        title="Important Considerations / Trade-offs"
        style={{ marginBottom: 20 }}
      >
        <List size="small" style={{ marginTop: "8px" }}>
          <List.Item>
            ✅ <Text strong>Server Components can import and render:</Text>{" "}
            Other Server Components, Client Components, and traditional React
            components (that don't use client-only features).
          </List.Item>
          <List.Item>
            ✅{" "}
            <Text strong>
              Client Components (<Text code>{"use client"}</Text>) can import
              and render:
            </Text>{" "}
            Other Client Components and traditional React components.
          </List.Item>
          <List.Item>
            ❌{" "}
            <Text strong>
              Client Components <Text strong>cannot directly import</Text>{" "}
              Server Components.
            </Text>{" "}
            Server Components are executed on the server; their "code" doesn't
            exist on the client in an importable module form. They render to a
            description of the UI that is sent to the client.
          </List.Item>
        </List>
        <Paragraph>
          To make this work, Client Components are marked with a{" "}
          <Text code>{"use client"}</Text> directive at the top of their file.
          This tells the bundler that this component (and any components it
          imports that are not Server Components) have client-side interactivity
          and their code needs to be sent to the browser.
        </Paragraph>
      </Card>

      <Paragraph style={{ marginTop: 20, textAlign: "center", color: "grey" }}>
        Presentation Status: Ready for Review
      </Paragraph>
    </div>
  );
};

export default ServerComponentsSlide;
