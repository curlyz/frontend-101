import React from "react";
import { Card, Typography, Row, Col, Divider } from "antd";
import { OptimizationProvider } from "@/contexts/OptimizationContext";
import StandardContextExample from "@/components/features/state-optimization/StandardContextExample";
import SelectorContextExample from "@/components/features/state-optimization/SelectorContextExample";

const { Title, Paragraph } = Typography;

/**
 * Renders a slide demonstrating the performance difference between
 * standard useContext and use-context-selector.
 *
 * @returns {JSX.Element} The StateOptimizationSlide component.
 */
const StateOptimizationSlide: React.FC = () => {
  return (
    <Card title={<Title level={3}>State Management Optimization</Title>}>
      <Paragraph>
        This slide demonstrates how <code>use-context-selector</code> can
        prevent unnecessary re-renders compared to standard{" "}
        <code>React.useContext</code>.
      </Paragraph>
      <Paragraph>
        Open your browser's console. When you click buttons in the "Standard"
        example, both counters re-render (log messages appear). In the
        "Optimized" example, only the counter whose state actually changes will
        re-render.
      </Paragraph>

      <Divider>Comparison</Divider>

      {/* Provider wraps both examples */}
      <OptimizationProvider>
        <Row gutter={16}>
          <Col span={12}>
            <StandardContextExample />
          </Col>
          <Col span={12}>
            <SelectorContextExample />
          </Col>
        </Row>
      </OptimizationProvider>
    </Card>
  );
};

export default StateOptimizationSlide;
