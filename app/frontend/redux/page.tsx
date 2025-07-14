"use client";

import React, { useEffect } from "react";
import { Row, Col, Divider } from "antd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import ReduxCounter from "@/components/features/redux/ReduxCounter";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";

import { Title, Text, Paragraph } from "@/components/ui/typography";

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

export default function ReduxCounter() {
  const count = useSelector(selectCount); // Select state
  const dispatch = useDispatch();        // Get dispatch

  return (
    <Button onClick={() => dispatch(increment())}> {/* Dispatch action */}
      Increment: {count}
    </Button>
  );
}
`;

const storeConfigSnippet = `
// src/store/index.ts (Key Parts)
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counterSlice";

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
} as const;

/**
 * Redux Demo Page - demonstrates Redux Toolkit integration with diagrams and code snippets.
 * Next.js App Router page component.
 *
 * @returns {JSX.Element} The Redux demo page component.
 */
export default function ReduxPage(): JSX.Element {
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
    <div className="flex flex-col gap-6 w-full">
      <Title level={2} style={{ textAlign: "center" }}>
        {"Redux Toolkit Demo: Simple Counter"}
      </Title>

      <Card>
        <CardHeader>
          <CardTitle>Redux Data Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <Paragraph>
            {
              "This diagram illustrates the basic data flow in Redux when the counter"
            }
            {"is incremented."}
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
        </CardContent>
      </Card>

      <Row gutter={[16, 24]}>
        <Col xs={24} md={8}>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>1. Counter Slice</CardTitle>
            </CardHeader>
            <CardContent>
              <Paragraph>
                <code>{"counterSlice.ts"}</code>{" "}
                {"defines the state, reducers, and"}
                {"actions."}
              </Paragraph>
              <SyntaxHighlighter
                language="typescript"
                style={atomDark}
                customStyle={codeSnippetStyle}
                showLineNumbers
              >
                {counterSliceSnippet.trim()}
              </SyntaxHighlighter>
            </CardContent>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>2. Component Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <Paragraph>
                <code>{"ReduxCounter.tsx"}</code>{" "}
                {"uses hooks to interact with the"}
                {"store."}
              </Paragraph>
              <SyntaxHighlighter
                language="typescript"
                style={atomDark}
                customStyle={codeSnippetStyle}
                showLineNumbers
              >
                {reduxCounterSnippet.trim()}
              </SyntaxHighlighter>
            </CardContent>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>3. Store Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <Paragraph>
                <code>{"store/index.ts"}</code>{" "}
                {"configures the main Redux store."}
              </Paragraph>
              <SyntaxHighlighter
                language="typescript"
                style={atomDark}
                customStyle={codeSnippetStyle}
                showLineNumbers
              >
                {storeConfigSnippet.trim()}
              </SyntaxHighlighter>
            </CardContent>
          </Card>
        </Col>
      </Row>

      <Divider>{"Interactive Demo"}</Divider>
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

      <Card>
        <CardHeader>
          <CardTitle>
            <Title level={4}>{"Original Explanation (Summary)"}</Title>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Paragraph>
            {"A simple counter slice ("}
            <code>{"src/store/features/counterSlice.ts"}</code>
            {") manages the count."}
            {"The "}
            <code>{"ReduxCounter"}</code>
            {" component uses "}
            <code>{"useSelector"}</code> {"to read the count and "}
            <code>{"useDispatch"}</code> {"to dispatch"}
            {"increment/decrement actions. The store is configured in"}{" "}
            <code>{"src/store/index.ts"}</code>
            {" using "}
            <code>{"configureStore"}</code>
            {", and"}
            {"the app is wrapped with the Redux "}
            <code>{"Provider"}</code>
            {" in"} <code>{"src/main.tsx"}</code>
            {"."}
          </Paragraph>
        </CardContent>
      </Card>

      <Alert variant="default" style={{ marginTop: 20 }}>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>{"Further Learning:"}</strong>{" "}
          {
            "To dive deeper into Redux Toolkit, its features, and best practices,"
          }
          {"visit the official"}
          <a
            href="https://redux-toolkit.js.org/introduction/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "4px" }}
          >
            {"Redux Toolkit Documentation"}
          </a>
          {"."}
        </AlertDescription>
      </Alert>
    </div>
  );
}
