import React from "react";
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
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

/**
 * @function ServerComponentsSlide
 * @description A React functional component explaining React Server Components (RSCs).
 * It covers their definition, benefits, characteristics, use cases, and how they combine with Client Components.
 * @returns {React.ReactElement} The ServerComponentsSlide component.
 * @example
 * <ServerComponentsSlide />
 */
const ServerComponentsSlide: React.FC = () => {
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
      <Title level={2}>React Server Components</Title>

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

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} md={12}>
          <Card title="Visual Idea: RSC/SSR Flow" style={{ height: "100%" }}>
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
                  background: "#f0f2f5",
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
                      background: "#e6f7ff",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    <Tag color="geekblue">Main Content (Server Component)</Tag>
                    <Paragraph>Static text, product info, etc.</Paragraph>
                    <div
                      style={{
                        background: "#fffbe6",
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
                      background: "#f6ffed",
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
                  background: "#f0f2f5",
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
      <Paragraph style={{ marginTop: 20, textAlign: "center", color: "grey" }}>
        Presentation Status: Ready for Review
      </Paragraph>
    </div>
  );
};

export default ServerComponentsSlide;
