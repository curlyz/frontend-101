import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

interface CounterDisplayProps {
  label: string;
  value: number;
}

/**
 * A simple, memoized component to display a counter value.
 * Logs to the console when it re-renders.
 */
const CounterDisplay: React.FC<CounterDisplayProps> = React.memo(
  ({ label, value }) => {
    console.log(`Rendering ${label}...`);

    return (
      <div
        style={{
          padding: "10px",
          border: "1px solid #eee",
          marginBottom: "10px",
        }}
      >
        <Text strong>{label}: </Text>
        <Text>{value}</Text>
      </div>
    );
  },
);

CounterDisplay.displayName = "CounterDisplay";

export default CounterDisplay;
