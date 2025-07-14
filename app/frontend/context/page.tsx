"use client";

import React, { useEffect } from "react";
import { Row, Col, Divider, List } from "antd";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import mermaid from "mermaid";

import { Title, Paragraph, Text } from "@/components/ui/typography";

/**
 * Wrapper for the Standard Context Demo and its Control Panel.
 * It uses the StandardStateProvider to manage state and passes dispatch to the ControlPanel.
 */
const StandardDemoWithControls: React.FC = () => {
  const { dispatch } = useStandardOptimizationContext();
  return (
    <div className="flex flex-col gap-6 w-full">
      <ControlPanel dispatch={dispatch} />
      <StandardContextDemo />
    </div>
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
    <div className="flex flex-col gap-6 w-full">
      <ControlPanel dispatch={dispatch} />
      <OptimizedContextDemo />
    </div>
  );
};

const takeaways = [
  "Each demonstration (Standard and Optimized) now operates on a completely separate instance of the state. Interacting with the controls for one demo will not affect the other.",
  <span key="takeaway-standard">
    <strong>{"Standard Context:"}</strong>{" "}
    {"When any part of its specific context"}
    {"value changes, all components consuming that "}
    <em>{"particular instance"}</em> {"of"}
    {"the standard context re-render, if they don"}&apos;{"t implement further"}
    {"memoization."}
  </span>,
  <span key="takeaway-optimized">
    <strong>
      <code>{"use-context-selector"}</code>
      {":"}
    </strong>{" "}
    {"Components subscribing to specific parts of"}{" "}
    <em>{"this particular instance"}</em> {"of the optimized context will only"}
    {"re-render if their selected part of the state changes."}
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
import { useStandardContext } from "@/StandardContext';

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
import { OptimizedContext } from "@/OptimizedContext';

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

// Added Mermaid diagram definition
const contextRerenderDiagram = `
graph TD
    subgraph StandardContext ["Standard Context Update (e.g., Update Text1)"]
        direction TB
        Update1["Update Context Value (Text1)"] --> Provider1[Standard Provider]
        Provider1 --> ConsumerA1["Consumer A (Needs Counter1)"]
        Provider1 --> ConsumerB1["Consumer B (Needs Text1)"]
        Provider1 --> ConsumerC1["Consumer C (Needs Both)"]
        
        ConsumerA1 -->|"Re-renders ❌ (Unnecessary)"| ConsumerA1
        ConsumerB1 -->|"Re-renders ✅ (Necessary)"| ConsumerB1
        ConsumerC1 -->|"Re-renders ✅ (Necessary)"| ConsumerC1
        
        classDef rerender fill:#f9d,stroke:#e11,stroke-width:2px;
        class ConsumerA1 rerender;
    end
    
    subgraph OptimizedContext ["use-context-selector Update (e.g., Update Text1)"]
        direction TB
        Update2["Update Context Value (Text1)"] --> Provider2[Optimized Provider]
        Provider2 -- Selector: Counter1 --> ConsumerA2["Consumer A (Selects Counter1)"]
        Provider2 -- Selector: Text1 --> ConsumerB2["Consumer B (Selects Text1)"]
        Provider2 -- Selector: Both --> ConsumerC2["Consumer C (Selects Both)"]
        
        ConsumerA2 -->|"No Re-render ✅ (Optimized)"| ConsumerA2
        ConsumerB2 -->|"Re-renders ✅ (Necessary)"| ConsumerB2
        ConsumerC2 -->|"Re-renders ✅ (Necessary)"| ConsumerC2
        
        classDef noRerender fill:#dfd,stroke:#1a1,stroke-width:1px;
        class ConsumerA2 noRerender;
    end

`;

/**
 * A presentation slide demonstrating React context performance optimization techniques.
 * It compares standard React context with the `use-context-selector` library,
 * now with two separate, isolated state management instances, using Ant Design for UI.
 * Includes code snippets to illustrate implementation differences.
 */
const StateOptimizationSlide: React.FC = () => {
  // Added useEffect for Mermaid initialization
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });
    const timer = setTimeout(() => {
      try {
        mermaid.run(); // Renders all elements with class="mermaid"
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ marginBottom: "20px" }}>
        {"React Context Performance: Standard vs."}{" "}
        <code>{"use-context-selector"}</code> {"(Isolated States)"}
      </Title>
      <Paragraph style={{ marginBottom: "20px" }}>
        {
          "This demonstration highlights the performance differences between using"
        }
        {"standard React context and an optimized approach with the"}{" "}
        <code>{"use-context-selector"}</code>{" "}
        {"library. Each demo now runs with its"}
        {"own isolated state and controls. Pay attention to the component"}
        {
          "highlights (via react-scan) and render counts when interacting with the"
        }
        {"controls for each section independently. The diagram below visually"}
        {"contrasts the re-render behavior."}
      </Paragraph>

      {/* Added Mermaid Diagram Section */}
      <Card style={{ marginBottom: 24 }}>
        <CardHeader>
          <CardTitle>{"Re-Render Behavior Comparison"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Paragraph>
            {
              "When a value in the standard context changes, all consumers re-render."
            }
            {"With "}
            <code>{"use-context-selector"}</code>
            {", only components selecting the"}
            {"changed value re-render."}
          </Paragraph>
          <div
            className="mermaid"
            style={{
              textAlign: "center",
              padding: "10px",
              border: "1px solid #f0f0f0",
              borderRadius: "4px",
              marginTop: 16,
              background: "#fff",
            }}
          >
            {contextRerenderDiagram}
          </div>
        </CardContent>
      </Card>

      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card>
            <CardHeader>
              <CardTitle>{"Standard Context Demo (Isolated State)"}</CardTitle>
            </CardHeader>
            <CardContent>
              <StandardStateProvider>
                <StandardDemoWithControls />
              </StandardStateProvider>
            </CardContent>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card>
            <CardHeader>
              <CardTitle>
                {
                  "Optimized Context (use-context-selector) Demo (Isolated State)"
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OptimizedStateProvider>
                <OptimizedDemoWithControls />
              </OptimizedStateProvider>
            </CardContent>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <CardHeader>
          <CardTitle>{"Code Snippets: Conceptual Setup"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Title level={5}>{"Standard Context"}</Title>
              <SyntaxHighlighter
                language="jsx"
                style={atomDark}
                customStyle={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {standardContextSetupCode}
              </SyntaxHighlighter>
              <SyntaxHighlighter
                language="jsx"
                style={atomDark}
                customStyle={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  marginTop: "10px",
                }}
              >
                {standardComponentCode}
              </SyntaxHighlighter>
            </Col>
            <Col xs={24} md={12}>
              <Title level={5}>
                {"Optimized Context (use-context-selector)"}
              </Title>
              <SyntaxHighlighter
                language="jsx"
                style={atomDark}
                customStyle={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {optimizedContextSetupCode}
              </SyntaxHighlighter>
              <SyntaxHighlighter
                language="jsx"
                style={atomDark}
                customStyle={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  marginTop: "10px",
                }}
              >
                {optimizedComponentCode}
              </SyntaxHighlighter>
            </Col>
          </Row>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{"Key Takeaways"}</CardTitle>
        </CardHeader>
        <CardContent>
          <List
            dataSource={takeaways}
            renderItem={(item) => (
              <List.Item>
                <Text>{item}</Text>
              </List.Item>
            )}
          />
        </CardContent>
      </Card>

      <Alert variant="default" style={{ marginTop: 20 }}>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>{"Further Learning:"}</strong> {"To further understand state"}
          {"management and optimization in React, explore the official"}
          {"documentation on"}
          <a
            href="https://react.dev/learn/separating-data-and-ui"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "4px" }}
          >
            {"Separating Data and UI"}
          </a>
          {" and investigate libraries like "}
          <a
            href="https://github.com/dai-shi/use-context-selector"
            target="_blank"
            rel="noopener noreferrer"
          >
            {"use-context-selector"}
          </a>
          {" for fine-grained context updates."}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default function Page() {
  return <StateOptimizationSlide />;
}
