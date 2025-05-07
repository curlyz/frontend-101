import React from "react";
import { Typography, Card, Input, Space } from "antd";
import { useStandardOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";

const { Title, Text } = Typography;

/**
 * Displays text2 from the standard context and allows updating it.
 * Demonstrates how standard context consumers re-render.
 * This component is intentionally NOT memoized to show standard context behavior.
 * Uses Ant Design components for UI.
 */
const StandardText2Display: React.FC = () => {
  const { text2, dispatch } = useStandardOptimizationContext();

  return (
    <Card size="small" style={{ borderColor: "lightgray" }}>
      <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
        Text 2 (Standard Context)
      </Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>
          Value: {text2}
          <RenderCounter componentId="StandardText2Display" />
        </Text>
        <Input
          value={text2}
          onChange={(e) => {
            dispatch({ type: "UPDATE_TEXT2", payload: e.target.value });
          }}
          placeholder="Update Text 2"
        />
      </Space>
    </Card>
  );
};

export default StandardText2Display;
