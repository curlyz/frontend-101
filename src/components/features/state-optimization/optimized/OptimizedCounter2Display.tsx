import React from "react";
import { useContextSelector } from "use-context-selector";
import { Typography, Card } from "antd";
import { OptimizedOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";

const { Title, Text } = Typography;

/**
 * Displays counter2 using the optimized context with useContextSelector.
 * Only re-renders if counter2 changes.
 * Uses Ant Design components for UI.
 */
const OptimizedCounter2DisplayInner: React.FC = () => {
  const counter2 = useContextSelector(
    OptimizedOptimizationContext,
    (ctx) => ctx?.counter2 ?? 0,
  );
  // Dispatch is no longer subscribed to or used here.
  // Actions to change counter2 should come from the shared ControlPanel.

  return (
    <Card size="small" style={{ borderColor: "lightgreen" }}>
      <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
        Counter 2 (Optimized Display Only)
      </Title>
      <Text>
        Value: {counter2}
        <RenderCounter componentId="OptimizedCounter2Display" />
      </Text>
    </Card>
  );
};

const OptimizedCounter2Display = React.memo(OptimizedCounter2DisplayInner);

export default OptimizedCounter2Display;
