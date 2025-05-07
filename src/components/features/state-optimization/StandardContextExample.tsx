import React from "react";
import { Card, Typography } from "antd";
import { useOptimizationContext_Standard } from "@/contexts/OptimizationContext";
import CounterDisplay from "@/components/common/CounterDisplay";
import CounterControls from "@/components/common/CounterControls";

const { Title, Paragraph } = Typography;

/**
 * Demonstrates component re-renders using standard React Context.
 * All displays re-render even if only one part of the state changes.
 */
const StandardContextExample: React.FC = () => {
  console.log("Rendering StandardContextExample...");

  // Consume the entire context value
  const { state, increment1, increment2 } = useOptimizationContext_Standard();

  return (
    <Card title={<Title level={5}>Standard useContext</Title>}>
      <Paragraph>
        Uses standard <code>useContext</code>. Both counters below re-render
        (check console) when either button is clicked, even though the display
        component is memoized.
      </Paragraph>
      <CounterDisplay label="Counter 1 (Standard)" value={state.count1} />
      <CounterDisplay label="Counter 2 (Standard)" value={state.count2} />
      <CounterControls increment1={increment1} increment2={increment2} />
      <Paragraph
        style={{ marginTop: "10px", fontSize: "smaller", color: "grey" }}
      >
        Unrelated State: {state.unrelated}
      </Paragraph>
    </Card>
  );
};

export default StandardContextExample;
