import React from "react";
import { useContextSelector } from "use-context-selector";
import { Typography, Card } from "antd";
import { OptimizedOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";

const { Title, Text } = Typography;

/**
 * Displays text1 using the optimized context with useContextSelector.
 * Only re-renders if text1 changes.
 * Uses Ant Design components for UI.
 */
const OptimizedText1DisplayInner: React.FC = () => {
  const text1 = useContextSelector(
    OptimizedOptimizationContext,
    (ctx) => ctx?.text1 ?? "",
  );
  // Dispatch and local input state/handler are removed.
  // Actions to change text1 should come from the shared ControlPanel.

  return (
    <Card size="small" style={{ borderColor: "lightblue" }}>
      <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
        Text 1 (Optimized Display Only)
      </Title>
      <Text>
        Value: {text1}
        <RenderCounter componentId="OptimizedText1Display" />
      </Text>
    </Card>
  );
};

const OptimizedText1Display = React.memo(OptimizedText1DisplayInner);

export default OptimizedText1Display;
