import React, { useEffect } from "react";
import { Typography, Card, Row, Col, List, Tag, Space, Divider } from "antd";
import {
  CodeOutlined,
  ApiOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  CloudServerOutlined,
  RetweetOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import MarkdownSlideRenderer from "@/components/common/MarkdownSlideRenderer";
import mermaid from "mermaid";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const { Title, Paragraph, Text, Link } = Typography;

const kubbWorkflowDiagram = `
graph LR
    A["OpenAPI Spec<br>(openapi.yaml)"] --> B((Kubb Core Engine));
    B --> C{Plugins Configured via kubb.config.ts};
    C -- "@kubb/swagger-ts" --> F["TypeScript Types<br>(User, Post, etc.)"];
    C -- "@kubb/swagger-client" --> E["Typed API Client<br>(client.get(...))"];
    C -- "@kubb/swagger-swr" --> D["Generated SWR Hooks<br>(useGetUserById, etc.)"];
    C -- "@kubb/swagger-zod" --> G["Zod Schemas<br>(UserSchema, etc.)"];
    
    D --> H[Your Frontend Application];
    E --> H;
    F --> H;
    G --> H;

    classDef spec fill:#f9f,stroke:#333,stroke-width:2px;
    classDef engine fill:#bdf,stroke:#333,stroke-width:2px;
    classDef config fill:#ff9,stroke:#333,stroke-width:2px;
    classDef output fill:#9f9,stroke:#333,stroke-width:2px;
    classDef app fill:#ccf,stroke:#333,stroke-width:2px;

    class A spec;
    class B engine;
    class C config;
    class D,E,F,G output;
    class H app;
`;
const keyOutputsData = [
  {
    id: "ts",
    title: "TypeScript Types",
    icon: <FileTextOutlined />,
    description:
      "Generates precise TypeScript interfaces and types directly from your OpenAPI schemas. This enforces type safety for all API request payloads and response data within your frontend application.",
    code: `// Example: src/gen/models/User.ts
export type User = {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
};`,
  },
  {
    id: "client",
    title: "Typed API Client",
    icon: <CloudServerOutlined />,
    description:
      "Creates a fully typed API client (e.g., using Axios or Fetch). Each API operation becomes a typed function, ensuring that parameters and return values align with your OpenAPI specification and generated types.",
    code: `// Example: src/gen/clients/UserClient.ts
import { client } from '@/lib/axiosInstance'; // Your custom Axios instance
import type { User } from '../models/User';

export async function getUserById(id: number): Promise<User> {
  const response = await client.get<User>(\`/api/users/\${id}\`);
  return response.data;
}`,
  },
  {
    id: "swr",
    title: "Data-Fetching Hooks (SWR)",
    icon: <RetweetOutlined />,
    description:
      "For React applications, Kubb generates custom SWR hooks (or TanStack Query hooks) tailored to your API endpoints. These hooks simplify data fetching, caching, revalidation, and server state management.",
    code: `// Example: src/gen/swr/useGetUserById.ts
import useSWR from 'swr';
import { client } from '@/lib/axiosInstance';
import type { User } from '../models/User';

export function useGetUserById(id: number | null) {
  const swrKey = id ? \`/api/users/\${id}\` : null;
  return useSWR<User, Error>(
    swrKey,
    async (url: string) => client.get<User>(url).then(res => res.data)
  );
}`,
  },
  {
    id: "zod",
    title: "Validation Schemas (Zod)",
    icon: <SafetyOutlined />,
    description:
      "Produces Zod schemas from your OpenAPI definitions. Zod is a TypeScript-first schema declaration and validation library, enabling robust runtime validation of API responses or request bodies, ensuring data integrity.",
    code: `// Example: src/gen/zod/UserSchema.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  email: z.string().email(),
  isActive: z.boolean().optional(),
});`,
  },
];
const benefitsData = [
  {
    icon: (
      <SafetyCertificateOutlined
        style={{ color: "#52c41a", fontSize: "28px" }}
      />
    ),
    title: "End-to-End Type Safety",
    description:
      "Eliminates guesswork and runtime errors by ensuring type consistency from backend schema to frontend code.",
  },
  {
    icon: <SyncOutlined style={{ color: "#1890ff", fontSize: "28px" }} />,
    title: "Reduced Boilerplate",
    description:
      "Automates the tedious creation of client-side types, API service functions, and data-fetching hooks.",
  },
  {
    icon: (
      <CheckCircleOutlined style={{ color: "#faad14", fontSize: "28px" }} />
    ),
    title: "API-Frontend Sync",
    description:
      "Keeps your frontend tightly coupled with the API contract, making updates and refactoring safer and faster.",
  },
  {
    icon: (
      <ThunderboltOutlined style={{ color: "#722ed1", fontSize: "28px" }} />
    ),
    title: "Accelerated Development",
    description:
      "Focus on building features instead of writing repetitive API integration logic. Get productive immediately.",
  },
  {
    icon: <ApiOutlined style={{ color: "#eb2f96", fontSize: "28px" }} />,
    title: "Highly Adaptable",
    description:
      "Extensible plugin system supports various HTTP clients, data-fetching libraries, and validation tools.",
  },
  {
    icon: <CodeOutlined style={{ color: "#8c8c8c", fontSize: "28px" }} />,
    title: "Maintainable Code",
    description:
      "Generated code is organized and predictable, making it easier to understand, debug, and maintain.",
  },
];

const KubbSlide: React.FC = () => {
  // The path here assumes that markdown files from `docs/slides` are copied
  // to `public/docs/slides` during the build process, making them accessible
  // at a root-relative path when the app is served.
  const markdownFilePath = "/docs/slides/08_01_kubb_openapi_generation.md";

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const coreKubbWorkflowCard = (
    <Card title="Core Kubb Workflow" style={{ marginBottom: "32px" }}>
      <Paragraph>
        The process starts with your <Tag color="purple">openapi.yaml</Tag>.
        Kubb parses this definition and, through a highly configurable plugin
        system (<Tag color="gold">kubb.config.ts</Tag>), generates the specific
        code artifacts needed for your frontend application.
      </Paragraph>
      <div
        className="mermaid"
        style={{
          textAlign: "center",
          padding: "10px",
          border: "1px solid #f0f0f0",
          borderRadius: "4px",
          marginTop: 16,
          background: "#fff",
        }}
      >
        {kubbWorkflowDiagram}
      </div>
    </Card>
  );

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        <CodeOutlined /> Automating Frontend Code with Kubb & OpenAPI
      </Title>
      <Paragraph
        style={{ textAlign: "center", fontSize: "1.1em", marginBottom: "32px" }}
      >
        Streamline your development workflow by generating type-safe clients,
        hooks, and schemas directly from your API specification.
      </Paragraph>

      {coreKubbWorkflowCard}

      <Card style={{ marginBottom: "32px" }}>
        <Row gutter={[32, 24]} align="middle">
          <Col xs={24} md={10}>
            <Title level={3} style={{ marginTop: 0 }}>
              What is Kubb?
            </Title>
            <Paragraph>
              Kubb is a powerful, low-level TypeScript SDK and CLI tool. It
              leverages your OpenAPI specification to automatically generate
              essential client-side code. This includes:
            </Paragraph>
            <ul>
              <li>
                <Text strong>TypeScript types</Text> for request/response
                models.
              </li>
              <li>
                Typed <Text strong>API client functions</Text> (e.g., for Axios
                or Fetch).
              </li>
              <li>
                Data-fetching <Text strong>hooks</Text> (e.g., for SWR or
                TanStack Query).
              </li>
              <li>
                <Text strong>Validation schemas</Text> (e.g., for Zod).
              </li>
            </ul>
            <Paragraph>
              By automating this boilerplate, Kubb ensures type safety, reduces
              manual effort, and keeps your frontend perfectly synchronized with
              your API contract.
            </Paragraph>
          </Col>
          <Col xs={24} md={14}>
            {/* The Core Kubb Workflow card was here, now moved to the top */}
          </Col>
        </Row>
      </Card>

      <Title
        level={3}
        style={{ textAlign: "center", marginTop: "40px", marginBottom: "24px" }}
      >
        Key Code Generation Capabilities
      </Title>
      <Row gutter={[24, 24]}>
        {keyOutputsData.map((item) => (
          <Col xs={24} md={12} key={item.id}>
            <Card
              title={
                <Space>
                  <span
                    role="img"
                    aria-label={item.title}
                    style={{ fontSize: "1.5em" }}
                  >
                    {item.icon}
                  </span>{" "}
                  {item.title}
                </Space>
              }
              hoverable
            >
              <Paragraph>{item.description}</Paragraph>
              <SyntaxHighlighter
                language="typescript"
                style={atomDark}
                customStyle={{ borderRadius: "4px", fontSize: "0.85em" }}
                showLineNumbers
              >
                {item.code.trim()}
              </SyntaxHighlighter>
            </Card>
          </Col>
        ))}
      </Row>

      <Title
        level={3}
        style={{ textAlign: "center", marginTop: "40px", marginBottom: "24px" }}
      >
        Configuration Example
      </Title>
      <Card style={{ marginBottom: "32px" }}>
        <Paragraph>
          Kubb is configured using a <Tag>kubb.config.ts</Tag> (or{" "}
          <Tag>.js</Tag>) file in your project root. This allows for a flexible,
          code-first setup:
        </Paragraph>
        <SyntaxHighlighter
          language="typescript"
          style={atomDark}
          customStyle={{
            borderRadius: "4px",
            fontSize: "0.85em",
            marginBottom: "16px",
          }}
          showLineNumbers
        >
          {`// kubb.config.ts (Simplified Example)
import { defineConfig } from '@kubb/core';
import createClient from '@kubb/swagger-client';
import createSWR from '@kubb/swagger-swr';
import createTS from '@kubb/swagger-ts';
import createZod from '@kubb/swagger-zod';

export default defineConfig(async () => {
  return {
    root: '.', // Project root, usually current directory
    input: {
      // Path to your OpenAPI specification file or a URL
      path: './openapi.yml',
    },
    output: {
      // Base directory for generated files
      path: './src/gen',
      clean: true, // Clean output directory before each generation
    },
    plugins: [
      // Generates TypeScript types from schemas
      createTS({ output: { path: 'models' } }), 
      // Generates typed client (e.g., Axios functions)
      createClient({
        output: { path: 'clients' },
        client: { importPath: '@/lib/axiosInstance' } // Path to your custom Axios instance
      }),
      // Generates SWR hooks for React components
      createSWR({
        output: { path: 'swr' },
        client: { importPath: '../clients' }, // Relative path to generated client
        // Other SWR specific options like Zod validation
        zod: { schemasPath: '../zod' }
      }),
      // Generates Zod schemas for runtime validation
      createZod({ output: { path: 'zod' } }),
    ],
  };
});`}
        </SyntaxHighlighter>
        <Paragraph>
          Run Kubb via <Tag>npx kubb</Tag> or a script in your{" "}
          <Tag>package.json</Tag> (e.g.,{" "}
          <Text code>"generate:client": "kubb"</Text>). It processes the{" "}
          <Text code>input</Text>, applies the configured{" "}
          <Text code>plugins</Text>, and writes the generated code to the{" "}
          <Text code>output.path</Text>.
        </Paragraph>
      </Card>

      <Title
        level={3}
        style={{ textAlign: "center", marginTop: "40px", marginBottom: "20px" }}
      >
        Core Benefits of Using Kubb
      </Title>
      <Row gutter={[24, 24]}>
        {benefitsData.map((benefit) => (
          <Col xs={24} sm={12} md={8} key={benefit.title}>
            <Card hoverable style={{ height: "100%" }}>
              <Space
                direction="vertical"
                align="center"
                style={{ width: "100%", padding: "10px" }}
              >
                {benefit.icon}
                <Title
                  level={5}
                  style={{ marginTop: "8px", textAlign: "center" }}
                >
                  {benefit.title}
                </Title>
                <Paragraph style={{ textAlign: "center", fontSize: "0.9em" }}>
                  {benefit.description}
                </Paragraph>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider style={{ marginTop: "40px", marginBottom: "20px" }} />
      <MarkdownSlideRenderer filePath={markdownFilePath} />
    </div>
  );
};

export default KubbSlide;
