import React from "react";
import { Card, Typography, List } from "antd";

const { Title, Paragraph, Text } = Typography;

/**
 * Renders a presentation slide explaining the React Scan tool.
 * Uses Ant Design components for styling.
 *
 * @returns {JSX.Element} The React Scan slide component.
 */
const ReactScanSlide: React.FC = () => {
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
    </Card>
  );
};

export default ReactScanSlide;
