import React, { useEffect } from "react";
import { Card, Typography, Space, Row, Col, Divider, Alert } from "antd";
import ReduxCounter from "@/components/features/redux/ReduxCounter";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";

const { Title, Paragraph, Text } = Typography;

const reduxFlowDiagram = `
graph LR
    subgraph BrowserView ["View (ReduxCounter.tsx)"]
        direction LR
        CompUI[UI: Buttons, Count Display]
        HookSelector[useSelector(selectCount)]
        HookDispatch[useDispatch()]
    end

    subgraph ReduxStore ["Redux Store & Logic"]
        direction TB
        Store[Store (store.index.ts)]
        Slice[counterSlice.ts]
        Reducer[Reducer: increment()]
        ActionCreator[Action: incrementAction]
    end
    
    CompUI -- User Clicks Button --> HookDispatch
    HookDispatch -- Dispatches --> ActionCreator
    ActionCreator --> Reducer
    Reducer -- Updates State --> Slice
    Slice -- Part of --> Store
    Store -- Provides State --> HookSelector
    HookSelector -- Returns Count --> CompUI

    note right of Slice "Immer for Immutability"
`;

const counterSliceSnippet = `
// src/store/features/counterSlice.ts (Key Parts)
import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => { state.value += 1; },
    // decrement and incrementByAmount also exist
  },
});

export const { increment } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export default counterSlice.reducer;
`;

const reduxCounterSnippet = `
// src/components/features/redux/ReduxCounter.tsx (Key Parts)
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, selectCount } from "@/store/features/counterSlice";
import { Button } from "antd";

const ReduxCounter: React.FC = () => {
  const count = useSelector(selectCount); // Select state
  const dispatch = useDispatch();        // Get dispatch

  return (
    <Button onClick={() => dispatch(increment())}> {/* Dispatch action */}
      Increment: {count}
    </Button>
  );
};
export default ReduxCounter;
`;

const storeConfigSnippet = `
// src/store/index.ts (Key Parts)
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
`;

const codeSnippetStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  maxHeight: "350px",
  overflow: "auto",
};

/**
 * Renders a slide demonstrating Redux Toolkit integration with diagrams and code snippets.
 *
 * @returns {JSX.Element} The ReduxDemoSlide component.
 */
const ReduxDemoSlide: React.FC = () => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Redux Toolkit Demo: Simple Counter
      </Title>

      <Card title="Redux Data Flow">
        <Paragraph>
          This diagram illustrates the basic data flow in Redux when the counter
          is incremented.
        </Paragraph>
        <div
          className="mermaid"
          style={{
            textAlign: "center",
            padding: "10px",
            border: "1px solid #f0f0f0",
            borderRadius: "4px",
            marginTop: "10px",
            marginBottom: "20px",
            background: "#fff",
          }}
        >
          {reduxFlowDiagram}
        </div>
      </Card>

      <Row gutter={[16, 24]}>
        <Col xs={24} md={8}>
          <Card title="1. Counter Slice" style={{ height: "100%" }}>
            <Paragraph>
              <code>counterSlice.ts</code> defines the state, reducers, and
              actions.
            </Paragraph>
            <SyntaxHighlighter
              language="typescript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {counterSliceSnippet.trim()}
            </SyntaxHighlighter>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="2. Component Usage" style={{ height: "100%" }}>
            <Paragraph>
              <code>ReduxCounter.tsx</code> uses hooks to interact with the
              store.
            </Paragraph>
            <SyntaxHighlighter
              language="typescript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {reduxCounterSnippet.trim()}
            </SyntaxHighlighter>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="3. Store Configuration" style={{ height: "100%" }}>
            <Paragraph>
              <code>store/index.ts</code> configures the main Redux store.
            </Paragraph>
            <SyntaxHighlighter
              language="typescript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {storeConfigSnippet.trim()}
            </SyntaxHighlighter>
          </Card>
        </Col>
      </Row>

      <Divider>Interactive Demo</Divider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <ReduxCounter />
      </div>

      <Card title={<Title level={4}>Original Explanation (Summary)</Title>}>
        <Paragraph>
          A simple counter slice (
          <code>src/store/features/counterSlice.ts</code>) manages the count.
          The <code>ReduxCounter</code> component uses <code>useSelector</code>{" "}
          to read the count and <code>useDispatch</code> to dispatch
          increment/decrement actions. The store is configured in{" "}
          <code>src/store/index.ts</code> using <code>configureStore</code>, and
          the app is wrapped with the Redux <code>Provider</code> in{" "}
          <code>src/main.tsx</code>.
        </Paragraph>
      </Card>

      <Alert
        message="Further Learning"
        description={
          <Paragraph>
            To dive deeper into Redux Toolkit, its features, and best practices,
            visit the official
            <a
              href="https://redux-toolkit.js.org/introduction/getting-started"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Redux Toolkit Documentation
            </a>
            .
          </Paragraph>
        }
        type="success"
        showIcon
        style={{ marginTop: 20 }}
      />
    </Space>
  );
};

export default ReduxDemoSlide;
