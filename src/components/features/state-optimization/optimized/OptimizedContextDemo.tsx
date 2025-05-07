import React from "react";
import { Typography, Space } from "antd";
import OptimizedCounter1Display from "./OptimizedCounter1Display";
import OptimizedCounter2Display from "./OptimizedCounter2Display";
import OptimizedText1Display from "./OptimizedText1Display";
import OptimizedText2Display from "./OptimizedText2Display";

const { Title, Paragraph } = Typography;

/**
 * Container component for the Optimized React Context (use-context-selector) demonstration.
 * It groups components that use useContextSelector to subscribe to specific parts of the context,
 * demonstrating how this avoids unnecessary re-renders.
 * Uses Ant Design components for UI.
 */
const OptimizedContextDemo: React.FC = () => {
  return (
    <div
      style={{
        padding: "10px",
        border: "2px dashed green",
        borderRadius: "5px",
      }}
    >
      <Title level={3} style={{ marginTop: 0, marginBottom: "10px" }}>
        Optimized <code>use-context-selector</code> Demo
      </Title>
      <Paragraph>
        These components use <code>useContextSelector</code> from the{" "}
        <code>use-context-selector</code> library. Each component selects only
        the specific pieces of state it needs. Notice how updating one value
        (e.g., Counter 1) <em>only</em> causes the component displaying Counter
        1 to re-render. Other components remain unaffected, showcasing the
        performance benefit.
      </Paragraph>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <OptimizedCounter1Display />
        <OptimizedCounter2Display />
        <OptimizedText1Display />
        <OptimizedText2Display />
      </Space>
    </div>
  );
};

export default OptimizedContextDemo;
