import React from "react";
import { Typography, Row, Col, Divider, List, Card, Space } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  StandardStateProvider,
  OptimizedStateProvider,
  useStandardOptimizationContext,
  useOptimizedContextSelector,
} from "@/contexts/StateOptimizationContext";
import ControlPanel from "@/components/features/state-optimization/ControlPanel";
import StandardContextDemo from "@/components/features/state-optimization/standard/StandardContextDemo";
import OptimizedContextDemo from "@/components/features/state-optimization/optimized/OptimizedContextDemo";

const { Title, Paragraph, Text } = Typography;

/**
 * Wrapper for the Standard Context Demo and its Control Panel.
 * It uses the StandardStateProvider to manage state and passes dispatch to the ControlPanel.
 */
const StandardDemoWithControls: React.FC = () => {
  const { dispatch } = useStandardOptimizationContext();
  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <ControlPanel dispatch={dispatch} />
      <StandardContextDemo />
    </Space>
  );
};

/**
 * Wrapper for the Optimized Context Demo and its Control Panel.
 * It uses the OptimizedStateProvider to manage state and passes dispatch to the ControlPanel.
 */
const OptimizedDemoWithControls: React.FC = () => {
  const optimizedContext = useOptimizedContextSelector();
  const { dispatch } = optimizedContext;

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <ControlPanel dispatch={dispatch} />
      <OptimizedContextDemo />
    </Space>
  );
};

const takeaways = [
  "Each demonstration (Standard and Optimized) now operates on a completely separate instance of the state. Interacting with the controls for one demo will not affect the other.",
  <span key="takeaway-standard">
    <strong>Standard Context:</strong> When any part of its specific context
    value changes, all components consuming that <em>particular instance</em> of
    the standard context re-render, if they don't implement further memoization.
  </span>,
  <span key="takeaway-optimized">
    <strong>
      <code>use-context-selector</code>:
    </strong>{" "}
    Components subscribing to specific parts of{" "}
    <em>this particular instance</em> of the optimized context will only
    re-render if their selected part of the state changes.
  </span>,
];

const standardContextSetupCode = `
// --- StandardContext.tsx (Illustrative) ---
import React, { useReducer } from 'react';

// 1. Context Creation (Built-in React)
const StandardContext = React.createContext(undefined);

// 2. Provider Component (Manages state and provides context)
export const StandardStateProvider = ({ children }) => {
  const initialState = { counter1: 0, text1: '' /* ...other state */ };
  const reducer = (state, action) => { /* ...your reducer logic... */ };
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = { ...state, dispatch };
  return <StandardContext.Provider value={contextValue}>{children}</StandardContext.Provider>;
};

// 3. Custom Hook (Uses React.useContext)
export const useStandardContext = () => {
  const context = React.useContext(StandardContext);
  if (!context) throw new Error('Outside provider');
  return context;
};
`;

const standardComponentCode = `
// --- StandardDisplayComponent.tsx (Illustrative) ---
import React from 'react';
import { useStandardContext } from './StandardContext';

const StandardDisplay = () => {
  // 4. Consumes ENTIRE context object
  const { counter1, text1 } = useStandardContext();

  // Re-renders if ANY value in StandardContext changes
  console.log('StandardDisplay rendered');
  return (
    <div>
      <Typography.Paragraph>Counter1: {counter1}</Typography.Paragraph>
      <Typography.Paragraph>Text1: {text1}</Typography.Paragraph>
    </div>
  );
};
export default StandardDisplay; // Not typically memoized for demo
`;

const optimizedContextSetupCode = `
// --- OptimizedContext.tsx (Illustrative) ---
import React, { useReducer } from 'react';
import { createContext as createContextSelector, useContextSelector } from 'use-context-selector'; // HIGHLIGHT: use-context-selector related

// 1. Context Creation (use-context-selector)
const OptimizedContext = createContextSelector(undefined); // HIGHLIGHT: use-context-selector related

// 2. Provider Component (Similar state management, different context type)
export const OptimizedStateProvider = ({ children }) => {
  const initialState = { counter1: 0, text1: '' /* ...other state */ };
  const reducer = (state, action) => { /* ...your reducer logic... */ };
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = { ...state, dispatch };
  return <OptimizedContext.Provider value={contextValue}>{children}</OptimizedContext.Provider>;
};

// (Optional) Custom hook to get the whole context if needed by some specific parent
export const useWholeOptimizedContext = () => {
  const context = useContextSelector(OptimizedContext, v => v); // HIGHLIGHT: use-context-selector related
  if (!context) throw new Error('Outside provider');
  return context;
};
`;

const optimizedComponentCode = `
// --- OptimizedDisplayComponent.tsx (Illustrative) ---
import React from 'react';
import { useContextSelector } from 'use-context-selector'; // HIGHLIGHT: use-context-selector related
import { OptimizedContext } from './OptimizedContext';

const OptimizedDisplayCounter1 = () => {
  // 3. Consumes ONLY 'counter1' using a selector function
  const counter1 = useContextSelector( // HIGHLIGHT: use-context-selector related
    OptimizedContext,
    (state) => state?.counter1 ?? 0
  );
  // Re-renders ONLY if 'counter1' changes
  console.log('OptimizedDisplayCounter1 rendered');
  return <Typography.Paragraph>Counter1: {counter1}</Typography.Paragraph>;
};

const OptimizedDisplayText1 = () => {
  // 4. Consumes ONLY 'text1' using a selector function
  const text1 = useContextSelector( // HIGHLIGHT: use-context-selector related
    OptimizedContext,
    (state) => state?.text1 ?? ''
  );
  // Re-renders ONLY if 'text1' changes
  console.log('OptimizedDisplayText1 rendered');
  return <Typography.Paragraph>Text1: {text1}</Typography.Paragraph>;
};

// 5. Components are typically memoized
export const MemoizedOptimizedDisplayCounter1 = React.memo(OptimizedDisplayCounter1);
export const MemoizedOptimizedDisplayText1 = React.memo(OptimizedDisplayText1);
`;

/**
 * A presentation slide demonstrating React context performance optimization techniques.
 * It compares standard React context with the `use-context-selector` library,
 * now with two separate, isolated state management instances, using Ant Design for UI.
 * Includes code snippets to illustrate implementation differences.
 */
const StateOptimizationSlide: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ marginBottom: "20px" }}>
        React Context Performance: Standard vs.{" "}
        <code>use-context-selector</code> (Isolated States)
      </Title>
      <Paragraph style={{ marginBottom: "20px" }}>
        This demonstration highlights the performance differences between using
        standard React context and an optimized approach with the{" "}
        <code>use-context-selector</code> library. Each demo now runs with its
        own isolated state and controls. Pay attention to the component
        highlights (via react-scan) and render counts when interacting with the
        controls for each section independently. The code snippets below
        illustrate the key implementation differences.
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Title level={3} style={{ margin: 0, color: "#007bff" }}>
                Standard Context Demo
              </Title>
            }
            bordered={false}
            style={{ boxShadow: "0 0 5px #007bff30", height: "100%" }}
          >
            <StandardStateProvider>
              <StandardDemoWithControls />
            </StandardStateProvider>
            <Divider>Code: Standard Context Setup</Divider>
            <SyntaxHighlighter
              language="tsx"
              style={atomDark}
              customStyle={{ fontSize: "0.8em", borderRadius: "4px" }}
              showLineNumbers
            >
              {standardContextSetupCode.trim()}
            </SyntaxHighlighter>
            <Divider>Code: Standard Component Consumption</Divider>
            <SyntaxHighlighter
              language="tsx"
              style={atomDark}
              customStyle={{ fontSize: "0.8em", borderRadius: "4px" }}
              showLineNumbers
            >
              {standardComponentCode.trim()}
            </SyntaxHighlighter>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Title level={3} style={{ margin: 0, color: "#28a745" }}>
                Optimized Context Demo (<code>use-context-selector</code>)
              </Title>
            }
            bordered={false}
            style={{ boxShadow: "0 0 5px #28a74530", height: "100%" }}
          >
            <OptimizedStateProvider>
              <OptimizedDemoWithControls />
            </OptimizedStateProvider>
            <Divider>Code: Optimized Context Setup</Divider>
            <SyntaxHighlighter
              language="tsx"
              style={atomDark}
              customStyle={{ fontSize: "0.8em", borderRadius: "4px" }}
              showLineNumbers
            >
              {optimizedContextSetupCode.trim()}
            </SyntaxHighlighter>
            <Divider>Code: Optimized Component Consumption</Divider>
            <SyntaxHighlighter
              language="tsx"
              style={atomDark}
              customStyle={{ fontSize: "0.8em", borderRadius: "4px" }}
              showLineNumbers
            >
              {optimizedComponentCode.trim()}
            </SyntaxHighlighter>
          </Card>
        </Col>
      </Row>

      <Divider style={{ marginTop: "30px", marginBottom: "20px" }} />

      <Title level={4}>Key Takeaways (with Isolated States):</Title>
      <List
        dataSource={takeaways}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <Text>{item}</Text>
          </List.Item>
        )}
        style={{ marginBottom: "20px" }}
      />
      <Paragraph>
        This setup clearly isolates the behavior of each context management
        strategy when operating on its own independent state, allowing for a
        direct comparison of their re-rendering characteristics.
      </Paragraph>
    </div>
  );
};

export default StateOptimizationSlide;
