import React, { useEffect } from "react";
import { Card, Typography, List, Divider, Alert } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";

const { Title, Paragraph, Text } = Typography;

const reactScanWorkflowDiagram = `
graph LR
    A[Developer Codes Component] --> B{React App Running in Browser};
    B -- Vite Plugin --> C(React Scan Tool Active);
    C -- Monitors Re-renders --> D((!));
    D -- Highlights Problematic Component --> B;
    B -- Visual Feedback --> A;
    A -- Investigates & Optimizes --> A;
    
    style D fill:#f00,stroke:#333,stroke-width:2px,color:#fff,font-weight:bold;
    note right of C : Identifies unnecessary re-renders
`;

const viteConfigSnippet = `
// vite.config.ts (Example)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactScan from '@react-scan/vite-plugin-react-scan';

export default defineConfig({
  plugins: [
    react(),
    reactScan(),
  ],
  // ... other Vite config
});
`;

const codeSnippetStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  maxHeight: "300px",
  overflow: "auto",
};

/**
 * Renders a presentation slide explaining the React Scan tool,
 * with a diagram and configuration example.
 * Uses Ant Design components for styling.
 *
 * @returns {JSX.Element} The React Scan slide component.
 */
const ReactScanSlide: React.FC = () => {
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

  const benefits = [
    "Requires no code changes - just install the plugin.",
    "Visually highlights components that re-render unnecessarily.",
    "Helps identify performance bottlenecks caused by reference changes (e.g., inline functions, objects).",
    "Easier to interpret than the standard React Profiler for many common issues.",
    "Provides a programmatic API for integration and reporting.",
  ];

  return (
    <Card
      title={<Title level={3}>Introducing React Scan ⚛️🔍</Title>}
      bordered={false}
      style={{ maxWidth: 800, margin: "auto" }}
    >
      <Paragraph>
        <Text strong>React Scan</Text> is a development tool designed to
        automatically detect and highlight performance issues in your React
        applications directly in the browser during development.
      </Paragraph>
      <Title level={4} style={{ marginTop: 20 }}>
        How it Helps
      </Title>
      <Paragraph>
        The diagram below illustrates the typical workflow where React Scan
        assists in identifying performance issues.
      </Paragraph>
      {/* <div
        className="mermaid"
        style={{
          textAlign: "center",
          padding: "10px",
          border: "1px solid #f0f0f0",
          borderRadius: "4px",
          marginTop: "10px",
          marginBottom: "20px",
          background: "#fff",
        }}
      >
        {reactScanWorkflowDiagram}
      </div> */}
      <Title level={4}>Why Use React Scan?</Title>
      <Paragraph>
        Optimizing React applications can be challenging. Unnecessary re-renders
        are a common source of performance problems, often caused by props
        changing reference (like inline functions or objects) even if their
        value hasn't semantically changed. React Scan makes these issues
        visible.
      </Paragraph>
      <Title level={4}>Key Benefits:</Title>
      <List
        dataSource={benefits}
        renderItem={(item) => (
          <List.Item>
            <Text>✅ {item}</Text>
          </List.Item>
        )}
        size="small"
      />
      <Paragraph style={{ marginTop: 16 }}>
        By integrating <Text code>@react-scan/vite-plugin-react-scan</Text> into
        our Vite setup, we get real-time feedback on component rendering
        behavior, allowing us to proactively address performance bottlenecks.
      </Paragraph>
      <Title level={4} style={{ marginTop: 20 }}>
        Example Configuration (Vite)
      </Title>
      <Paragraph>
        Adding React Scan to a Vite project is straightforward:
      </Paragraph>
      <SyntaxHighlighter
        language="typescript"
        style={atomDark}
        customStyle={codeSnippetStyle}
        showLineNumbers
      >
        {viteConfigSnippet.trim()}
      </SyntaxHighlighter>

      <Alert
        message="Further Learning"
        description={
          <Paragraph>
            To understand more about React component rendering and performance,
            explore the official
            <a
              href="https://react.dev/learn/understanding-your-ui-as-a-tree"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              React Documentation on UI as a Tree
            </a>
            {" and learn about the "}
            <a
              href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Developer Tools
            </a>
            .
          </Paragraph>
        }
        type="success"
        showIcon
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default ReactScanSlide;
