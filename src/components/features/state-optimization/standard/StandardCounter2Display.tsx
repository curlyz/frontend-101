import React from "react";
import { Typography, Card, Button, Space } from "antd";
import { useStandardOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";

const { Title, Text } = Typography;

/**
 * Displays counter2 from the standard context and allows incrementing it.
 * Demonstrates how standard context consumers re-render.
 * This component is intentionally NOT memoized to show standard context behavior.
 * Uses Ant Design components for UI.
 */
const StandardCounter2Display: React.FC = () => {
  const { counter2, dispatch } = useStandardOptimizationContext();

  return (
    <Card size="small" style={{ borderColor: "lightgray" }}>
      <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
        Counter 2 (Standard Context)
      </Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>
          Value: {counter2}
          <RenderCounter componentId="StandardCounter2Display" />
        </Text>
        <Button onClick={() => dispatch({ type: "INCREMENT_COUNTER2" })} block>
          Increment Counter 2
        </Button>
      </Space>
    </Card>
  );
};

export default StandardCounter2Display;
