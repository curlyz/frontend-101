import React from "react";
import { Typography, Card, Row, Col, List, Tag, Space } from "antd";
import {
  CodeOutlined,
  ApiOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import MarkdownSlideRenderer from "@/components/common/MarkdownSlideRenderer";

const { Title, Paragraph, Text, Link } = Typography;

const codeBlockStyle: React.CSSProperties = {
  backgroundColor: "#f0f2f5",
  padding: "10px",
  borderRadius: "4px",
  overflowX: "auto",
  fontFamily: "monospace",
  fontSize: "0.9em",
  whiteSpace: "pre-wrap",
};

const KubbSlide: React.FC = () => {
  // The path here assumes that markdown files from `docs/slides` are copied
  // to `public/docs/slides` during the build process, making them accessible
  // at a root-relative path when the app is served.
  const markdownFilePath = "/docs/slides/08_01_kubb_openapi_generation.md";

  const benefits = [
    {
      icon: <SafetyCertificateOutlined style={{ color: "#52c41a" }} />,
      title: "Type Safety",
      description:
        "End-to-end type safety from your backend API definition to your frontend code.",
    },
    {
      icon: <SyncOutlined style={{ color: "#1890ff" }} />,
      title: "Reduced Boilerplate",
      description:
        "Automates the creation of repetitive client code, types, and hooks.",
    },
    {
      icon: <CheckCircleOutlined style={{ color: "#faad14" }} />,
      title: "Consistency",
      description:
        "Ensures that your frontend code stays in sync with your API definition.",
    },
    {
      icon: <ThunderboltOutlined style={{ color: "#722ed1" }} />,
      title: "Faster Development",
      description:
        "Spend less time writing and maintaining API interaction code and more time building features.",
    },
    {
      icon: <ApiOutlined style={{ color: "#eb2f96" }} />,
      title: "Adaptability",
      description:
        "Supports various plugins for different needs and client libraries.",
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        <CodeOutlined /> Automating Client Code with Kubb & OpenAPI
      </Title>

      <Card title="What is Kubb?" style={{ marginBottom: "24px" }}>
        <Paragraph>
          Kubb is a powerful, low-level TypeScript SDK and CLI tool designed to
          generate client-side code (like TypeScript types, API clients, and
          data-fetching hooks) directly from an OpenAPI specification. It helps
          automate the creation of code that interacts with your backend APIs,
          ensuring type safety and reducing manual boilerplate.
        </Paragraph>
      </Card>

      <Card
        title="Input: The OpenAPI Specification"
        style={{ marginBottom: "24px" }}
      >
        <Paragraph>
          Kubb takes an OpenAPI specification file (commonly{" "}
          <Tag>openapi.yaml</Tag> or <Tag>openapi.json</Tag>) as its input. This
          file describes your API's endpoints, request/response schemas,
          parameters, and more.
        </Paragraph>
        <Paragraph>
          <Text strong>Visual Idea:</Text> Imagine a flow diagram:{" "}
          <Tag>openapi.yaml</Tag> → Kubb → Generated Code (Types, Client, Hooks,
          Zod).
        </Paragraph>
      </Card>

      <Card
        title="Key Outputs You Can Generate"
        style={{ marginBottom: "24px" }}
      >
        <Paragraph>
          Kubb is highly configurable through plugins, allowing you to generate
          various useful outputs:
        </Paragraph>
        <List
          itemLayout="horizontal"
          dataSource={[
            {
              title: "1. TypeScript Types",
              description:
                "Generates TypeScript interfaces and types based on the schemas defined in your OpenAPI spec. This provides strong typing for your API responses and request payloads.",
            },
            {
              title: "2. HTTP Client",
              description:
                "Can generate a typed API client (e.g., using Axios or the native Fetch API) with methods for each of your API operations. This client will use the generated TypeScript types.",
            },
            {
              title: "3. SWR Hooks (or other data-fetching hooks)",
              description:
                "For React applications, Kubb can generate custom SWR (or React Query, TanStack Query) hooks that are pre-configured for your API endpoints. This simplifies data fetching, caching, and state management related to API calls.",
              code: `// Example of a generated SWR hook (conceptual)\nimport useSWR from 'swr';\nimport client from './client'; // Generated or custom client\n\nexport function useGetUserById(id: string) {\n  return useSWR<User, Error>(\`/users/\${id}\`, () => client.get(\`/users/\${id}\`).then(res => res.data));\n}`,
            },
            {
              title: "4. Zod Schemas",
              description:
                "Generates Zod schemas from your OpenAPI schemas. Zod is a TypeScript-first schema declaration and validation library, allowing for runtime validation of API responses or request bodies, ensuring data integrity.",
              code: `// Example of a generated Zod schema (conceptual)\nimport { z } from 'zod';\n\nexport const UserSchema = z.object({\n  id: z.string().uuid(),\n  name: z.string(),\n  email: z.string().email(),\n});`,
            },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<Text strong>{item.title}</Text>}
                description={<Paragraph>{item.description}</Paragraph>}
              />
              {item.code && (
                <div style={{ marginTop: "10px", width: "100%" }}>
                  <pre style={codeBlockStyle}>{item.code}</pre>
                </div>
              )}
            </List.Item>
          )}
        />
      </Card>

      <Card title="Conceptual Configuration" style={{ marginBottom: "24px" }}>
        <Paragraph>
          Kubb is typically configured via a <Tag>kubb.config.js</Tag> (or{" "}
          <Tag>.ts</Tag>) file in your project root:
        </Paragraph>
        <pre
          style={codeBlockStyle}
        >{`// kubb.config.js (Simplified Example)\nimport { defineConfig } from '@kubb/core'\nimport createClient from '@kubb/swagger-client'\nimport createSWR from '@kubb/swagger-swr'\nimport createTS from '@kubb/swagger-ts'\nimport createZod from '@kubb/swagger-zod'\n\nexport default defineConfig(async () => {\n  return {\n    root: '.\',\n    input: {\n      path: './path/to/your/openapi.yaml', // Or a URL\n    },\n    output: {\n      path: './src/generated',\n      clean: true, // Clean output directory before each run\n    },\n    plugins: [\n      createTS({}),\n      createClient({\n        client: { importPath: '../utils/axiosInstance' } // Path to your custom Axios instance\n      }),\n      createSWR({\n        client: { importPath: '../utils/axiosInstance' },\n        // Other SWR specific options\n      }),\n      createZod({}),\n    ],\n  }\n})`}</pre>
        <Paragraph style={{ marginTop: "10px" }}>
          Then you would typically run Kubb via a CLI command like{" "}
          <Tag>npx kubb</Tag> or a script in your <Tag>package.json</Tag>.
        </Paragraph>
      </Card>

      <Title level={3} style={{ marginTop: "30px", marginBottom: "20px" }}>
        Benefits of Using Kubb
      </Title>
      <Row gutter={[16, 16]}>
        {benefits.map((benefit) => (
          <Col xs={24} sm={12} md={8} key={benefit.title}>
            <Card hoverable>
              <Space
                direction="vertical"
                align="center"
                style={{ width: "100%" }}
              >
                {React.cloneElement(benefit.icon, {
                  style: { ...benefit.icon.props.style, fontSize: "24px" },
                })}
                <Text strong>{benefit.title}</Text>
                <Paragraph style={{ textAlign: "center" }}>
                  {benefit.description}
                </Paragraph>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <MarkdownSlideRenderer filePath={markdownFilePath} />
    </div>
  );
};

export default KubbSlide;
