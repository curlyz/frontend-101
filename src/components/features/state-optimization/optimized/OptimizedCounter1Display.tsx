import React from "react";
import { useContextSelector } from "use-context-selector";
import { Typography, Card } from "antd"; // Import antd components
import { OptimizedOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";

const { Title, Text } = Typography;

/**
 * Displays counter1 using the optimized context with useContextSelector.
 * Only re-renders if counter1 changes.
 * Uses Ant Design components for UI.
 */
const OptimizedCounter1DisplayInner: React.FC = () => {
  const counter1 = useContextSelector(
    OptimizedOptimizationContext,
    (ctx) => ctx?.counter1 ?? 0,
  );

  return (
    <Card size="small" style={{ borderColor: "lightgreen" }}>
      <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
        {" "}
        {/* Adjusted level for nesting */}
        Counter 1 (Optimized Display Only)
      </Title>
      <Text>
        Value: {counter1}
        <RenderCounter componentId="OptimizedCounter1Display" />
      </Text>
      {/* Button removed, actions are now centralized in ControlPanel */}
    </Card>
  );
};

const OptimizedCounter1Display = React.memo(OptimizedCounter1DisplayInner);

export default OptimizedCounter1Display;
