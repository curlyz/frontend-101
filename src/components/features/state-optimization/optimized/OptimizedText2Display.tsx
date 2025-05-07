import React from "react";
import { useContextSelector } from "use-context-selector";
import { Typography, Card } from "antd";
import { OptimizedOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";
// import HighlightOnRender from "../../../common/HighlightOnRender"; // Removed

const { Title, Text } = Typography;

/**
 * Displays text2 using the optimized context with useContextSelector.
 * Only re-renders if text2 changes.
 * Uses Ant Design components for UI.
 */
const OptimizedText2DisplayInner: React.FC = () => {
  const text2 = useContextSelector(
    OptimizedOptimizationContext,
    (ctx) => ctx?.text2 ?? "",
  );

  return (
    <Card size="small" style={{ borderColor: "lightblue" }}>
      <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
        Text 2 (Optimized Display Only)
      </Title>
      <Text>
        Value: {text2}
        <RenderCounter componentId="OptimizedText2Display" />
      </Text>
    </Card>
  );
};

const OptimizedText2Display = React.memo(OptimizedText2DisplayInner);

// Removed HighlightOnRender wrapper

export default OptimizedText2Display; // Export the memoized component directly
