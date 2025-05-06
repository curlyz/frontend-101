import React, { useState, useMemo } from "react";
import { Card, InputNumber, Button, Typography, Space } from "antd";

const { Title, Text } = Typography;

/**
 * Simulates an expensive calculation based on an input number.
 * @param {number} num - The input number.
 * @returns {number} The result of the simulated expensive calculation.
 */
const expensiveCalculation = (num: number): number => {
  console.log("Performing expensive calculation...");
  // Simulate a delay or complex computation
  let result = 0;
  for (let i = 0; i < num * 1000000; i++) {
    result += Math.sin(i) * Math.cos(i);
  }
  return Math.floor(result + num * 2); // Include num to make result dependent
};

/**
 * Demonstrates useMemo to avoid re-running expensive calculations
 * unless dependencies change.
 *
 * @returns {JSX.Element} The MemoizedCalculation component.
 */
const MemoizedCalculation: React.FC = () => {
  const [number, setNumber] = useState<number>(5);
  const [triggerRender, setTriggerRender] = useState<number>(0); // State to trigger re-renders unrelated to the calculation

  // useMemo caches the result of expensiveCalculation.
  // It only recalculates when 'number' changes.
  const calculationResult = useMemo(() => {
    return expensiveCalculation(number);
  }, [number]);

  const handleTriggerRender = () => {
    setTriggerRender((c) => c + 1);
  };

  return (
    <Card
      title={<Title level={4}>Expensive Calculation (useMemo)</Title>}
      size="small"
    >
      <Space direction="vertical">
        <Space>
          <Text>Input Number:</Text>
          <InputNumber
            min={1}
            max={20} // Keep max reasonable for demo performance
            value={number}
            onChange={(value) => setNumber(value ?? 1)} // Handle null case
          />
        </Space>
        <Text strong>Calculation Result (Memoized): {calculationResult}</Text>
        <Text>
          Check the console. 'Performing expensive calculation...' only logs
          when the input number changes, not when the component re-renders for
          other reasons (like clicking the button below).
        </Text>
        <Space>
          <Button onClick={handleTriggerRender}>Trigger Re-render</Button>
          <Text>Render Count: {triggerRender}</Text>
        </Space>
      </Space>
    </Card>
  );
};

export default MemoizedCalculation;
