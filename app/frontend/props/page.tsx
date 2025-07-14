"use client";

import React, { useEffect } from "react";
import { Divider, Alert } from "antd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ShareAltOutlined,
  ApartmentOutlined,
  NodeIndexOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import mermaid from "mermaid";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Title, Paragraph, Text, Link } from "@/components/ui/typography";
import { CheckCircle } from "lucide-react";

const codeBlockStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  padding: "10px",
  whiteSpace: "pre-wrap", // Use pre-wrap to respect newlines and wrap long lines
  overflow: "auto",
  maxHeight: "400px",
};

/**
 * @function PropsDrillingSlide
 * @description A React functional component explaining prop drilling, its drawbacks,
 * and common solutions like React Context or state management libraries.
 * @returns {React.ReactElement} The PropsDrillingSlide component.
 */
export default function Page() {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100); // Small delay to ensure DOM is ready for Mermaid
    return () => clearTimeout(timer);
  }, []);

  const propDrillingDiagram = `
graph TD
    A[ParentComponent: Owns Data]
    subgraph IntermediateComponents ["Intermediate Components (Don't Need Data)"]
        direction TB
        B[ChildComponentOne]
        C[ChildComponentTwo]
    end
    D[GrandchildComponent: Needs Data]

    A -- "data" --> B;
    B -- "data (passed down)" --> C;
    C -- "data (passed down again)" --> D;

    classDef owner fill:#D1F2EB,stroke:#1ABC9C,stroke-width:2px;
    classDef intermediate fill:#FDEDEC,stroke:#E74C3C,stroke-width:1px;
    classDef consumer fill:#EBF5FB,stroke:#3498DB,stroke-width:2px;

    class A owner;
    class B,C intermediate;
    class D consumer;
`;

  const propDrillingExample = `
// ParentComponent.js
function ParentComponent() {
  const data = "Hello from Parent!";
  return <ChildComponentOne data={data} />;
}

// ChildComponentOne.js (doesn't use data)
function ChildComponentOne({ data }) {
  return <ChildComponentTwo data={data} />;
}

// ChildComponentTwo.js (doesn't use data)
function ChildComponentTwo({ data }) {
  return <GrandchildComponent data={data} />;
}

// GrandchildComponent.js (finally uses data)
function GrandchildComponent({ data }) {
  return <p>{data}</p>;
}
  `;

  const contextSolutionExample = `
// data-context.js
import React, { createContext, useContext } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children, value }) => (
  <DataContext.Provider value={value}>
    {children}
  </DataContext.Provider>
);

export const useData = () => useContext(DataContext);

// ParentComponent.js
import { DataProvider } from "@/data-context';

function ParentComponent() {
  const data = "Hello from Parent via Context!";
  return (
    <DataProvider value={data}>
      <ChildComponentOne />
    </DataProvider>
  );
}

// ChildComponentOne.js (doesn't need to know about data)
function ChildComponentOne() {
  return <ChildComponentTwo />;
}

// ChildComponentTwo.js (doesn't need to know about data)
function ChildComponentTwo() {
  return <GrandchildComponent />;
}

// GrandchildComponent.js (consumes data directly via context)
import { useData } from "@/data-context';

function GrandchildComponent() {
  const data = useData();
  return <p>{data}</p>;
}
  `;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        <ShareAltOutlined style={{ marginRight: "10px" }} />{" "}
        {"Understanding Prop"}
        {"Drilling"}
      </Title>

      <Card style={{ marginBottom: "24px" }}>
        <CardHeader>
          <CardTitle>
            <Title level={3}>
              <ApartmentOutlined style={{ marginRight: "8px" }} />{" "}
              {"What is Prop"}
              {"Drilling?"}
            </Title>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Paragraph>
            {"Prop drilling (also known as "}&quot;{"threading"}&quot;
            {") is a situation"}
            {
              "in React where you pass props down through multiple layers of nested"
            }
            {"components, even if some of those intermediate components don"}
            &apos;{"t"}
            {
              "directly use the props themselves. They simply act as carriers to"
            }
            {"get the data to a deeply nested component that does need it."}
          </Paragraph>
          <Paragraph>
            {
              "While it might seem straightforward for small component trees, prop"
            }
            {"drilling can become cumbersome and lead to issues in larger"}
            {"applications."}
          </Paragraph>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: "24px" }}>
        <CardHeader>
          <CardTitle>
            <Title level={4}>{"Visualizing Prop Drilling"}</Title>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Paragraph>
            {"The diagram below illustrates how data is passed down through"}
            {"intermediate components that don"}&apos;{"t consume it."}
          </Paragraph>
          <div
            className="mermaid"
            style={{ textAlign: "center", marginBottom: "16px" }}
          >
            {propDrillingDiagram}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>{"Example: Prop Drilling in Action"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Paragraph>
                {"Here"}&apos;
                {"s a code snippet demonstrating prop drilling. Notice"}
                {"how "}
                <Text code>{"ChildComponentOne"}</Text>
                {" and"} <Text code>{"ChildComponentTwo"}</Text>
                {" pass the"} <Text code>{"data"}</Text>{" "}
                {"prop without using it."}
              </Paragraph>
              <SyntaxHighlighter
                language="jsx"
                style={atomDark}
                customStyle={codeBlockStyle}
                showLineNumbers
              >
                {propDrillingExample.trim()}
              </SyntaxHighlighter>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>{"Solution: Using React Context"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Paragraph>
                {
                  "React Context provides a way to pass data through the component"
                }
                {
                  "tree without having to pass props down manually at every level."
                }
                {"The "}
                <Text code>{"GrandchildComponent"}</Text>{" "}
                {"can directly access"}
                {"the data."}
              </Paragraph>
              <SyntaxHighlighter
                language="jsx"
                style={atomDark}
                customStyle={codeBlockStyle}
                showLineNumbers
              >
                {contextSolutionExample.trim()}
              </SyntaxHighlighter>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card style={{ marginTop: "24px", marginBottom: "24px" }}>
        <CardHeader>
          <CardTitle>
            <Title level={3}>
              <WarningOutlined style={{ marginRight: "8px" }} />{" "}
              {"Drawbacks of"}
              {"Prop Drilling"}
            </Title>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "Component Reusability: Intermediate components become less reusable as they are tightly coupled with props they don't need.",
              "Refactoring Difficulty: If the data shape changes or a prop needs to be renamed, you might have to update many intermediate components.",
              "Code Verbosity: Passing props through many layers can make the codebase more verbose and harder to follow.",
              "Performance: While typically minor, unnecessary re-renders can occur in intermediate components if not carefully managed with memoization (e.g., React.memo).",
              "Developer Experience: It can be tedious to trace where props originate and how they are passed down, especially in large codebases.",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2 py-2">
                <WarningOutlined style={{ color: "orange", marginRight: 8 }} />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Title level={3}>
              <CheckCircleOutlined style={{ marginRight: "8px" }} /> {"When to"}
              {"Address Prop Drilling"}
            </Title>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Paragraph>
            {"Not all prop passing is prop drilling. Passing props one or two"}
            {"levels deep is often fine and the simplest solution. Consider"}
            {"addressing prop drilling when:"}
          </Paragraph>
          <div className="space-y-3">
            {[
              "Props are passed through 3+ levels of components that don't use them.",
              "Refactoring becomes a pain due to prop threading.",
              "Component reusability is significantly impacted.",
              "You are considering global state management for the data anyway.",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2 py-2">
                <CheckCircleOutlined
                  style={{ color: "green", marginRight: 8 }}
                />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert
        message="Further Learning"
        description={
          <span>
            {"For more detailed information on managing data flow and avoiding"}
            {
              "prop drilling in React, explore the official documentation on"
            }{" "}
            <a
              href="https://react.dev/learn/passing-data-deeply-with-context"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"React Context"}
            </a>
            {" and concepts like "}
            <a
              href="https://react.dev/learn/composition-vs-inheritance"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"Composition"}
            </a>
            {"."}
          </span>
        }
        type="info"
        showIcon
        style={{ marginTop: 20 }}
      />
    </div>
  );
}
