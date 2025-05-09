import React, { useEffect } from "react";
import {
  Card,
  Typography,
  Space,
  Divider,
  Alert,
  Row,
  Col,
  List,
  Spin,
} from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";
import RefDomAccess from "@/components/features/performance/RefDomAccess";
import MemoizedCalculation from "@/components/features/performance/MemoizedCalculation";
import CallbackParent from "@/components/features/performance/CallbackParent";
import ListVirtualizationDemo from "@/components/features/performance/ListVirtualizationDemo";
import ListKeysDemo from "@/components/features/performance/ListKeysDemo";
import ThrottleDebounceDemo from "@/components/features/performance/ThrottleDebounceDemo";

const { Title, Paragraph, Text } = Typography;

const codeSnippetStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  maxHeight: "300px",
  overflow: "auto",
};

// Define Mermaid Diagram Strings Here
const THROTTLE_WAIT = 500; // ms - TODO: Consider passing these from props if needed
const DEBOUNCE_WAIT = 500; // ms - TODO: Consider passing these from props if needed
const listKeysDiagram = `
sequenceDiagram
    participant React as React (Diffing Algorithm)
    participant OldVTree as Old Virtual DOM Tree
    participant NewVTree as New Virtual DOM Tree
    participant DOM

    alt With Stable Unique Keys (e.g., item.id)
        React->>OldVTree: Compares children based on keys
        React->>NewVTree: Identifies moved/added/removed items
        Note over React: Item A (key='a') moved from index 0 to 1. Item B (key='b') remains.
        React->>DOM: Reorders/updates existing DOM nodes efficiently. State preserved for existing keyed items.
    end

    alt With Index as Keys
        React->>OldVTree: Compares children based on index
        React->>NewVTree: Sees list[0] (old A) became list[0] (new C)
        Note over React: If item A moved and C inserted at start, React might think A updated to C, B to A.
        React->>DOM: May unnecessarily re-render/destroy/recreate DOM nodes. State can be misapplied or lost.
    end
`;

const standardListDiagram = `
sequenceDiagram
    participant User
    participant ScrollContainer as Scrollable Div
    participant React as React Render
    participant DOM

    User->>ScrollContainer: Initial Load / Scrolls
    React->>React: Receives all N items
    React->>DOM: Renders all N DOM nodes
    DOM-->>ScrollContainer: Displays all N items (many off-screen)
    Note over React, DOM: High memory usage, potentially slow updates if N is large.
`;

const virtualizedListDiagram = `
sequenceDiagram
    participant User
    participant ReactWindow as FixedSizeList (react-window)
    participant React as React Render
    participant DOM

    User->>ReactWindow: Initial Load / Scrolls
    ReactWindow->>ReactWindow: Calculates visible window (e.g., items k to k+m)
    ReactWindow->>React: Passes only visible items (m << N) to render
    React->>DOM: Renders/updates only m DOM nodes
    DOM-->>ReactWindow: Displays m items, positioned correctly
    Note over ReactWindow, DOM: Low memory usage, fast updates regardless of total N. DOM nodes are recycled/reused.
`;

const lazyLoadingDiagram = `
sequenceDiagram
    participant User
    participant App as Main Application
    participant BundleJS as Main Bundle (bundle.js)
    participant LazyChunkJS as Lazy Chunk (heavyComponent.chunk.js)
    participant ReactSuspense as React.Suspense
    participant HeavyComponent

    App->>BundleJS: Initial Load
    BundleJS-->>App: Main app UI renders (without HeavyComponent)

    User->>App: Clicks "Load Heavy Component"
    App->>ReactSuspense: Triggers rendering of lazy component
    ReactSuspense->>LazyChunkJS: Requests heavyComponent.chunk.js (if not cached)
    activate LazyChunkJS
    ReactSuspense-->>App: Shows Fallback UI (e.g., Spinner)
    LazyChunkJS-->>ReactSuspense: Chunk loaded, HeavyComponent code available
    deactivate LazyChunkJS
    
    ReactSuspense->>HeavyComponent: Renders HeavyComponent
    HeavyComponent-->>App: HeavyComponent UI displayed
    Note over App, LazyChunkJS: Subsequent loads might use cached chunk.
`;

const throttleDebounceDiagram = `
sequenceDiagram
    participant UserEvents as User Typing (Multiple Events)
    participant DirectCall as Direct Handler
    participant ThrottledCall as Throttled Handler (${THROTTLE_WAIT}ms)
    participant DebouncedCall as Debounced Handler (${DEBOUNCE_WAIT}ms)
    participant API

    UserEvents->>DirectCall: Event 1
    DirectCall->>API: Call 1
    UserEvents->>DirectCall: Event 2
    DirectCall->>API: Call 2
    UserEvents->>DirectCall: Event N
    DirectCall->>API: Call N
    Note over DirectCall, API: API called for every event.

    UserEvents->>ThrottledCall: Event 1
    ThrottledCall->>API: Call 1 (executes)
    UserEvents->>ThrottledCall: Event 2 (within ${THROTTLE_WAIT}ms)
    Note over ThrottledCall: Ignored
    UserEvents->>ThrottledCall: Event (after ${THROTTLE_WAIT}ms pass, if events continued)
    ThrottledCall->>API: Call 2 (executes at most once per ${THROTTLE_WAIT}ms)

    UserEvents->>DebouncedCall: Event 1
    Note over DebouncedCall: Timer restarted
    UserEvents->>DebouncedCall: Event 2 (within ${DEBOUNCE_WAIT}ms)
    Note over DebouncedCall: Timer restarted
    UserEvents->>DebouncedCall: Event N (user pauses typing)
    Note over DebouncedCall: ${DEBOUNCE_WAIT}ms timer elapses
    DebouncedCall->>API: Call 1 (executes only after pause)
`;

/**
 * @function PerformanceTopic
 * @description A reusable component to structure each performance topic explanation.
 * Renders Mermaid diagram (if provided) above a two-column layout with demo on left, explanation on right.
 * @param {{ title: string; icon?: React.ReactNode; explanation: React.ReactNode; mermaidDiagram?: string; demoComponent: React.ReactNode; }} props
 * @returns {JSX.Element}
 */
const PerformanceTopic: React.FC<{
  title: string;
  icon?: React.ReactNode;
  explanation: React.ReactNode;
  mermaidDiagram?: string;
  demoComponent: React.ReactNode;
}> = ({ title, icon, explanation, mermaidDiagram, demoComponent }) => {
  const mermaidId = `mermaid-${title.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}`;

  useEffect(() => {
    if (mermaidDiagram) {
      const element = document.getElementById(mermaidId);
      if (element && element.getAttribute("data-processed") !== "true") {
        element.innerHTML = mermaidDiagram.trim();
        try {
          mermaid.run({ nodes: [element] });
        } catch (e) {
          console.error("Mermaid rendering error for ID:", mermaidId, e);
          element.innerHTML = "Error rendering diagram.";
        }
      }
    }
  }, [mermaidDiagram, mermaidId]);

  return (
    <Card style={{ marginBottom: 24 }}>
      {mermaidDiagram && (
        <div
          id={mermaidId}
          className={"mermaid"}
          style={{ textAlign: "center", backgroundColor: "#eee" }}
        ></div>
      )}

      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <Divider orientation="left">Interactive Demo</Divider>
          {demoComponent}
        </Col>

        <Col xs={24} lg={12}>
          <Divider orientation="left">Explanation</Divider>
          <Title level={4}>
            {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
            {title}
          </Title>
          {explanation}
        </Col>
      </Row>
    </Card>
  );
};

/**
 * Renders a slide demonstrating various React performance optimization techniques.
 *
 * @returns {JSX.Element} The PerformanceSlide component.
 */
const PerformanceSlide: React.FC = () => {
  const LazyLoadingDemo = React.lazy(
    () => import("@/components/features/performance/LazyLoadingDemo"),
  );

  // Initialize mermaid globally once on mount
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "base" });
  }, []);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          React Performance Optimizations 🚀
        </Title>
        <Paragraph>
          This slide explores key techniques to enhance the performance of your
          React applications. Effective optimization leads to faster load times,
          smoother interactions, and a better overall user experience. Each
          section includes an explanation, a code snippet, a concept for a
          diagram, and an interactive demo.
        </Paragraph>
      </Card>

      <PerformanceTopic
        title="useRef: DOM Access & Mutable Values"
        explanation={
          <>
            <Paragraph>
              <code>useRef</code> returns a mutable ref object whose{" "}
              <code>.current</code> property is initialized to the passed
              argument (<code>initialValue</code>). The returned object will
              persist for the full lifetime of the component.
            </Paragraph>
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`// 1. Accessing DOM
const inputRef = useRef(null);
useEffect(() => {
  inputRef.current?.focus();
}, []);
return <input ref={inputRef} />;

// 2. Storing mutable value (no re-render on change)
const timerIdRef = useRef(null);
const startTimer = () => {
  timerIdRef.current = setInterval(tick, 1000);
};
const stopTimer = () => {
  clearInterval(timerIdRef.current);
};`}
            </SyntaxHighlighter>
            <Paragraph strong>Key Use Cases:</Paragraph>
            <List>
              <List.Item>
                <Text strong>Accessing DOM elements:</Text> To interact directly
                with DOM nodes (e.g., focus input, media controls, trigger
                animations).
              </List.Item>
              <List.Item>
                <Text strong>Storing mutable values:</Text> Holding a value that
                can change over time <Text strong>without</Text> causing a
                re-render when it's modified (e.g., timer IDs, previous
                state/props, instance variables).
              </List.Item>
            </List>
            <Paragraph>
              <Text strong>Important Distinction from State:</Text> Unlike state
              (<code>useState</code>), changing a ref's <code>.current</code>{" "}
              property does <Text strong>not</Text> trigger a component
              re-render.
            </Paragraph>
          </>
        }
        demoComponent={<RefDomAccess />}
      />

      <PerformanceTopic
        title="useMemo: Memoizing Expensive Calculations"
        explanation={
          <>
            <Paragraph>
              <code>useMemo</code> is a hook that memoizes the result of a
              function call. It recomputes the memoized value only when one of
              the dependencies in its dependency array has changed. This
              optimization helps to avoid expensive, resource-intensive
              calculations on every render.
            </Paragraph>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`function computeExpensiveValue(a, b) {
  // ... heavy logic ...
  return result;
}

function MyComponent({ a, b }) {
  // result is only recomputed if a or b changes
  const result = useMemo(() => {
    return computeExpensiveValue(a, b);
  }, [a, b]);

  return <div>Result: {result}</div>;
}`}
            </SyntaxHighlighter>
            <Paragraph strong>When to Use:</Paragraph>
            <List>
              <List.Item>
                CPU-intensive calculations that you don't want to re-run if
                their inputs haven't changed.
              </List.Item>
              <List.Item>
                Preventing re-creation of objects or arrays that are passed as
                props to memoized child components (<code>React.memo</code>), if
                their contents don't actually change, to ensure referential
                stability.
              </List.Item>
            </List>
            <Alert
              type="warning"
              message="Caution: Don't overuse useMemo for simple calculations. The overhead might outweigh the benefits. Profile first!"
              showIcon
            />
          </>
        }
        demoComponent={<MemoizedCalculation />}
      />

      <PerformanceTopic
        title="useCallback & React.memo: Memoizing Functions for Stable Props"
        explanation={
          <>
            <Paragraph>
              <Text strong>
                <code>useCallback</code>:
              </Text>{" "}
              Returns a memoized version of a callback function. This memoized
              callback only changes if one of its dependencies has changed.
            </Paragraph>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={{ ...codeSnippetStyle, marginBottom: "8px" }}
              showLineNumbers
            >
              {`// Parent Component
function Parent({ dep1, dep2 }) {
  const memoizedCallback = useCallback(() => {
    doSomething(dep1, dep2);
  }, [dep1, dep2]); // Only changes if dep1 or dep2 change

  return <Child onClick={memoizedCallback} />;
}`}
            </SyntaxHighlighter>
            <Paragraph>
              <Text strong>
                <code>React.memo</code>:
              </Text>{" "}
              A higher-order component (HOC). If your component renders the same
              result given the same props, wrap it in <code>React.memo</code> to
              memoize the rendered output. React will then skip rendering the
              component and reuse the last rendered result if its props haven't
              changed (shallow comparison).
            </Paragraph>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`const MyComponent = ({ prop1, prop2 }) => {
  // ... render logic ...
};

// Memoized version will only re-render if prop1 or prop2 changes
const MemoizedComponent = React.memo(MyComponent);`}
            </SyntaxHighlighter>
            <Paragraph strong>The Synergy:</Paragraph>
            <Paragraph>
              <code>useCallback</code> is crucial when passing callbacks to
              child components wrapped with <code>React.memo</code>. Without it,
              a new function instance is created on each parent render, causing
              the memoized child to re-render unnecessarily.{" "}
              <code>useCallback</code> provides a stable function reference,
              enabling <code>React.memo</code> to work effectively.
            </Paragraph>
          </>
        }
        demoComponent={<CallbackParent />}
      />

      <PerformanceTopic
        title="List Virtualization (Windowing)"
        mermaidDiagram={virtualizedListDiagram}
        explanation={
          <>
            <Paragraph>
              List virtualization (or "windowing") is a technique for
              efficiently rendering large lists of data. Instead of rendering
              all items, only a small, visible subset (the "window") is rendered
              to the DOM. As the user scrolls, items that move out of view are
              unmounted (or recycled), and new items that come into view are
              mounted.
            </Paragraph>
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`import { FixedSizeList } from 'react-window';

const Row = ({ index, style, data }) => (
  <div style={style}>Item {data[index]}</div>
);

const MyList = ({ items }) => (
  <FixedSizeList
    height={400} // Container height
    itemCount={items.length}
    itemSize={35} // Height of each item
    itemData={items} // Pass data to Row component
    width={'100%'}
  >
    {Row}
  </FixedSizeList>
);`}
            </SyntaxHighlighter>
            <Paragraph strong>Benefits:</Paragraph>
            <List>
              <List.Item>
                Dramatically improved rendering performance for long lists.
              </List.Item>
              <List.Item>
                Reduced memory consumption (fewer DOM nodes).
              </List.Item>
              <List.Item>
                Faster initial load time for pages with large lists.
              </List.Item>
            </List>
            <Paragraph>
              Common Libraries: <code>react-window</code>,{" "}
              <code>react-virtualized</code>.
            </Paragraph>
          </>
        }
        demoComponent={<ListVirtualizationDemo />}
      />

      <PerformanceTopic
        title="Lazy Loading Components with React.lazy & Suspense"
        mermaidDiagram={lazyLoadingDiagram}
        explanation={
          <>
            <Paragraph>
              <code>React.lazy</code> lets you render a dynamically imported
              component as a regular one. <code>Suspense</code> lets you specify
              a loading indicator while lazy components are loading.
            </Paragraph>
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`import React, { Suspense } from 'react';

// Dynamically import the component
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <h1>My App</h1>
      {/* Wrap lazy component in Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}`}
            </SyntaxHighlighter>
            <Paragraph strong>Benefits:</Paragraph>
            <List>
              <List.Item>
                <Text strong>Reduced Initial Bundle Size:</Text> Code for lazy
                components isn't in the main bundle, speeding up initial page
                loads.
              </List.Item>
              <List.Item>
                <Text strong>On-Demand Loading:</Text> Components are fetched
                only when needed (e.g., route change, modal open).
              </List.Item>
              <List.Item>
                <Text strong>Improved Perceived Performance:</Text> Users see
                content faster.
              </List.Item>
            </List>
            <Paragraph>
              <code>React.lazy</code> takes a function calling dynamic{" "}
              <code>import()</code>.
            </Paragraph>
          </>
        }
        demoComponent={
          <React.Suspense
            fallback={
              <Card>
                <Spin tip="Loading Demo..." />
              </Card>
            }
          >
            <LazyLoadingDemo />
          </React.Suspense>
        }
      />

      <PerformanceTopic
        title="List Keys: Importance for Reconciliation"
        mermaidDiagram={listKeysDiagram}
        explanation={
          <>
            <Paragraph>
              The <code>key</code> prop helps React identify list items. Keys
              should be <Text strong>stable, unique, and predictable</Text>{" "}
              among siblings for efficient UI updates and state preservation.
            </Paragraph>
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`// ✅ GOOD: Using a stable ID from data
items.map((item) => (
  <ListItem key={item.id} data={item} />
));

// ❌ BAD: Using index when list order can change
items.map((item, index) => (
  <ListItem key={index} data={item} />
));
// (Can lead to state bugs and performance issues)

// 🤔 OK (if list is static and has no IDs)
// items.map((item, index) => <ListItem key={index} ... />);`}
            </SyntaxHighlighter>
            <Paragraph strong>Why Not Index as Key?</Paragraph>
            <Paragraph>
              If list order changes or items are added/removed, using index as a
              key confuses React, leading to potential state bugs and
              inefficient DOM updates.
            </Paragraph>
            <Paragraph>
              <Text strong>Best Practice:</Text> Always use a stable, unique ID
              from your data if available.
            </Paragraph>
          </>
        }
        demoComponent={<ListKeysDemo />}
      />

      <PerformanceTopic
        title="Throttling & Debouncing Event Handlers"
        mermaidDiagram={throttleDebounceDiagram}
        explanation={
          <>
            <Paragraph>
              <Text strong>Throttling:</Text> Executes a function at most once
              per interval. (e.g., limit scroll handler calls).
            </Paragraph>
            <Paragraph>
              <Text strong>Debouncing:</Text> Executes a function only after a
              period of inactivity. (e.g., call search API after user stops
              typing).
            </Paragraph>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`import { throttle, debounce } from 'lodash';

// Throttling Example (e.g., for scroll events)
const handleScroll = () => { /* ... */ };
const throttledScrollHandler = throttle(handleScroll, 200); // Max once per 200ms
window.addEventListener('scroll', throttledScrollHandler);

// Debouncing Example (e.g., for search input)
const handleInputChange = (event) => { /* ... */ };
const debouncedInputHandler = debounce(handleInputChange, 300); // Execute 300ms after last call
inputElement.addEventListener('input', debouncedInputHandler);`}
            </SyntaxHighlighter>
            <Paragraph>
              Both optimize high-frequency events by reducing expensive
              operations.
            </Paragraph>
          </>
        }
        demoComponent={<ThrottleDebounceDemo />}
      />

      <Alert
        message="Further Learning"
        description={
          <Paragraph>
            For more comprehensive information on React performance, consult the
            <a
              href="https://react.dev/reference/react"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              official React Performance Optimization guide
            </a>
            . For a structured approach to web performance, learn about the
            <a
              href="https://web.dev/articles/rail"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              RAIL model
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

export default PerformanceSlide;
