import React from "react";
import { Card, Typography, Space, Divider } from "antd";
import RefDomAccess from "@/components/features/performance/RefDomAccess";
import MemoizedCalculation from "@/components/features/performance/MemoizedCalculation";
import CallbackParent from "@/components/features/performance/CallbackParent";

const { Title, Paragraph } = Typography;

/**
 * Renders a slide demonstrating various React performance optimization techniques.
 *
 * @returns {JSX.Element} The PerformanceSlide component.
 */
const PerformanceSlide: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title={<Title level={3}>Performance Optimizations</Title>}>
        <Paragraph>
          React offers hooks like <code>useRef</code>, <code>useMemo</code>, and{" "}
          <code>useCallback</code> to optimize performance by avoiding
          unnecessary computations or re-renders.
        </Paragraph>
        <Paragraph>
          - <code>useRef</code>: Provides direct access to DOM elements or
          stores mutable values without causing re-renders.
        </Paragraph>
        <Paragraph>
          - <code>useMemo</code>: Memoizes the result of expensive calculations,
          recomputing only when dependencies change.
        </Paragraph>
        <Paragraph>
          - <code>useCallback</code>: Memoizes callback functions, preventing
          child components (often wrapped in <code>React.memo</code>) from
          re-rendering unnecessarily when the callback reference remains stable.
        </Paragraph>
      </Card>

      <RefDomAccess />
      <Divider />
      <MemoizedCalculation />
      <Divider />
      <CallbackParent />
    </Space>
  );
};

export default PerformanceSlide;
