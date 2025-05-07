import React from "react";
import { Button, Space } from "antd";

interface CounterControlsProps {
  increment1: () => void;
  increment2: () => void;
}

/**
 * Renders buttons to increment two different counters.
 */
const CounterControls: React.FC<CounterControlsProps> = ({
  increment1,
  increment2,
}) => {
  return (
    <Space style={{ marginTop: "10px" }}>
      <Button onClick={increment1}>Increment Count 1</Button>
      <Button onClick={increment2}>Increment Count 2</Button>
    </Space>
  );
};

export default CounterControls;
