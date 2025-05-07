import React from "react";
import { Typography, Space } from "antd";
import StandardCounter1Display from "./StandardCounter1Display";
import StandardCounter2Display from "./StandardCounter2Display";
import StandardText1Display from "./StandardText1Display";
import StandardText2Display from "./StandardText2Display";

const { Title, Paragraph } = Typography;

/**
 * Container component for the Standard React Context demonstration.
 * It groups components that use the standard React.useContext hook,
 * demonstrating the typical re-render behavior.
 * Uses Ant Design components for UI.
 */
const StandardContextDemo: React.FC = () => {
  return (
    <div
      style={{
        padding: "10px",
        border: "2px dashed red",
        borderRadius: "5px",
      }}
    >
      <Title level={3} style={{ marginTop: 0, marginBottom: "10px" }}>
        Standard <code>React.useContext</code> Demo
      </Title>
      <Paragraph>
        These components use the standard <code>React.useContext</code> hook.
        Updating any value in the shared context (e.g., Counter 1) will cause
        <em>all</em> components consuming this context to re-render, even if
        they don&apos;t directly use the changed piece of state. This highlights
        potential performance issues in larger applications.
      </Paragraph>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <StandardCounter1Display />
        <StandardCounter2Display />
        <StandardText1Display />
        <StandardText2Display />
      </Space>
    </div>
  );
};

export default StandardContextDemo;
