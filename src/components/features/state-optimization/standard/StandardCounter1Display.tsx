import React from "react";
import { Typography, Card, Button, Space } from "antd";
import { useStandardOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";

const { Title, Text } = Typography;

/**
 * Displays counter1 from the standard context and allows incrementing it.
 * Demonstrates how standard context consumers re-render.
 * This component is intentionally NOT memoized to show standard context behavior.
 * Uses Ant Design components for UI.
 */
const StandardCounter1Display: React.FC = () => {
  const { counter1, dispatch } = useStandardOptimizationContext();

  return (
    <Card size="small" style={{ borderColor: "lightgray" }}>
      <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
        Counter 1 (Standard Context)
      </Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>
          Value: {counter1}
          <RenderCounter componentId="StandardCounter1Display" />
        </Text>
        <Button onClick={() => dispatch({ type: "INCREMENT_COUNTER1" })} block>
          Increment Counter 1
        </Button>
      </Space>
    </Card>
  );
};

export default StandardCounter1Display;
