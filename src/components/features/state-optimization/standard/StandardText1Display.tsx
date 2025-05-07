import React from "react";
import { Typography, Card, Input, Space } from "antd"; // Import antd components
import { useStandardOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";

const { Title, Text } = Typography;

/**
 * Displays text1 from the standard context and allows updating it.
 * Demonstrates how standard context consumers re-render.
 * This component is intentionally NOT memoized to show standard context behavior.
 * Uses Ant Design components for UI.
 */
const StandardText1Display: React.FC = () => {
  const { text1, dispatch } = useStandardOptimizationContext();

  // Local state for input, if needed, but for direct context update, it's fine like this
  // const [inputValue, setInputValue] = React.useState(text1); // Could be used for debouncing etc.

  return (
    <Card size="small" style={{ borderColor: "lightgray" }}>
      <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
        Text 1 (Standard Context)
      </Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>
          Value: {text1}
          <RenderCounter componentId="StandardText1Display" />
        </Text>
        <Input
          value={text1}
          onChange={(e) => {
            // setInputValue(e.target.value); // If using local state for input
            dispatch({ type: "UPDATE_TEXT1", payload: e.target.value });
          }}
          placeholder="Update Text 1"
        />
      </Space>
    </Card>
  );
};

export default StandardText1Display;
