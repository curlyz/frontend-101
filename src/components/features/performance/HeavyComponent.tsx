import React from "react";
import { Card, Typography, Alert } from "antd";

const { Title, Paragraph } = Typography;

/**
 * @description A component that simulates a 'heavy' component for lazy loading demonstrations.
 * In a real scenario, this might contain complex logic, large libraries, or many sub-components.
 * @returns {JSX.Element} The HeavyComponent.
 */
const HeavyComponent: React.FC = () => {
  // Simulate some delay or heavy computation if needed for visual effect, though not strictly necessary for the concept.
  // For now, it's just a distinct visual block.
  return (
    <Alert
      message={<Title level={5}>🎉 Heavy Component Loaded! 🎉</Title>}
      description={
        <Paragraph>
          This component was loaded on demand using <code>React.lazy()</code>{" "}
          and <code>Suspense</code>. Imagine this component contained a large
          library or complex calculations that you didn't want to include in
          your initial JavaScript bundle.
        </Paragraph>
      }
      type="success"
      showIcon
      style={{ marginTop: 16 }}
    />
  );
};

export default HeavyComponent;
