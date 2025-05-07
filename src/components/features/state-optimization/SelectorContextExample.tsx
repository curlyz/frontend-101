import React from "react";
import { Card, Typography } from "antd";
import { useOptimizationContext_Standard } from "@/contexts/OptimizationContext";
import CounterDisplay from "@/components/common/CounterDisplay";
import CounterControls from "@/components/common/CounterControls";

const { Title, Paragraph } = Typography;

/**
 * Demonstrates optimized re-renders using standard Context with React.memo.
 * Only the memoized child component whose props change re-renders.
 */
const SelectorContextExample: React.FC = () => {
  console.log("Rendering ContextExampleWithMemo...");

  // Use the standard context hook
  const { state, increment1, increment2 } = useOptimizationContext_Standard();

  return (
    <Card title={<Title level={5}>Optimized (useContext + React.memo)</Title>}>
      <Paragraph>
        Uses standard <code>useContext</code>, but the child display component (
        <code>CounterDisplay</code>) is wrapped in <code>React.memo</code>. Only
        the child whose props (<code>value</code>) actually change will
        re-render (check console).
      </Paragraph>
      <CounterDisplay label="Counter 1 (Memo)" value={state.count1} />
      <CounterDisplay label="Counter 2 (Memo)" value={state.count2} />
      <CounterControls increment1={increment1} increment2={increment2} />
      {/* We *could* display unrelated state here, but it doesn't affect child rendering */}
      {/* <Paragraph style={{ marginTop: '10px', fontSize: 'smaller', color: 'grey' }}>
        Unrelated State: {state.unrelated}
      </Paragraph> */}
    </Card>
  );
};

export default SelectorContextExample;
