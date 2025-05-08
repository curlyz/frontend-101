import React, { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Card,
  List,
  Row,
  Col,
  Button,
  Space,
  Statistic,
  Divider,
  Tag,
  Alert,
} from "antd";
import {
  ThunderboltOutlined,
  SyncOutlined,
  ExperimentOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import mermaid from "mermaid";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import HighlightOnRender from "@/components/common/HighlightOnRender"; // Assuming you have this for visual feedback

const { Title, Paragraph, Text, Link } = Typography;

const codeBlockStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  padding: "10px",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  maxHeight: "350px",
};

let syncRenderCount = 0;
let asyncRenderCount = 0;

/**
 * @function StateUpdateBatchingSlide
 * @description Explains and demonstrates React's state update batching.
 * @returns {React.ReactElement} The StateUpdateBatchingSlide component.
 */
const StateUpdateBatchingSlide: React.FC = () => {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const [renderIndicator, setRenderIndicator] = useState(0); // Used to track actual renders for display

  const [asyncCountA, setAsyncCountA] = useState(0);
  const [asyncCountB, setAsyncCountB] = useState(0);
  const [asyncRenderIndicator, setAsyncRenderIndicator] = useState(0);

  // Track renders for the synchronous updates demo
  useEffect(() => {
    syncRenderCount++;
    setRenderIndicator(syncRenderCount);
  }, [countA, countB]); // This effect runs when countA or countB change

  // Track renders for the asynchronous updates demo
  useEffect(() => {
    asyncRenderCount++;
    setAsyncRenderIndicator(asyncRenderCount);
  }, [asyncCountA, asyncCountB]);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100);
    // Reset counters on unmount or change
    return () => {
      clearTimeout(timer);
      syncRenderCount = 0;
      asyncRenderCount = 0;
    };
  }, []);

  const handleSyncUpdates = () => {
    console.log("--- Handling Synchronous Updates ---");
    setCountA((c) => c + 1); // Update 1
    console.log("Called setCountA(c => c + 1)");
    setCountB((c) => c + 1); // Update 2
    console.log("Called setCountB(c => c + 1)");
    // React will batch these two updates into a single re-render.
  };

  const handleMultipleSyncUpdates = () => {
    console.log("--- Handling Multiple Synchronous Updates ---");
    setCountA((c) => c + 1); // Update 1
    setCountA((c) => c + 1); // Update 2 (same state setter)
    setCountB((c) => c + 5); // Update 3
    setCountB((c) => c + 5); // Update 4 (same state setter)
    console.log("Called setCountA twice and setCountB twice");
    // Still batched into a single re-render. The latest update for each state variable wins.
  };

  const handleAsyncUpdates = () => {
    console.log("--- Handling Asynchronous Updates (setTimeout) ---");
    setTimeout(() => {
      console.log(
        "Inside setTimeout: calling setAsyncCountA and setAsyncCountB",
      );
      setAsyncCountA((c) => c + 1);
      setAsyncCountB((c) => c + 1);
      // In React 18+, these are automatically batched.
      // In React <18, without ReactDOM.unstable_batchedUpdates, these might cause two re-renders.
    }, 0);
  };

  const resetCounts = () => {
    setCountA(0);
    setCountB(0);
    setAsyncCountA(0);
    setAsyncCountB(0);
    syncRenderCount = 0; // Reset counter
    asyncRenderCount = 0;
    setRenderIndicator(0);
    setAsyncRenderIndicator(0);
    console.log("--- Counts and Render Tallies Reset ---");
  };

  const batchingDiagram = `
graph LR
    subgraph BeforeBatching["Traditional Approach (Simplified - Multiple Renders)"]
        direction LR
        E1["Event Handler"]
        S1["setStateA(1)"] --> R1["Render Pass 1"]
        S2["setStateB(2)"] --> R2["Render Pass 2"]
        E1 --> S1
        E1 --> S2
    end

    subgraph AfterBatching["React Batching (Single Render)"]
        direction LR
        E2["Event Handler"]
        SB1["setStateA(1)"]
        SB2["setStateB(2)"]
        E2 --> SB1
        E2 --> SB2
        subgraph GroupedUpdates["Updates Batched"]
           direction LR
            SB1 -.-> Collect
            SB2 -.-> Collect["Collected Updates"]
         end
        Collect --> RSingle["Single Render Pass"]
    end

    classDef event fill:#D1F2EB,stroke:#1ABC9C;
    classDef state fill:#EBF5FB,stroke:#3498DB;
    classDef render fill:#FDEDEC,stroke:#E74C3C;
    class E1,E2 event;
    class S1,S2,SB1,SB2 state;
    class R1,R2,RSingle render;
`;

  const syncUpdatesCode = `
const [countA, setCountA] = useState(0);
const [countB, setCountB] = useState(0);

// This effect tracks renders for this specific demo section
useEffect(() => {
  // syncRenderCount++; (global or ref to track for demo)
  // setRenderIndicator(syncRenderCount);
  console.log('Component re-rendered (Sync Demo)');
}, [countA, countB]);

const handleSyncUpdates = () => {
  setCountA(c => c + 1); // Update 1
  setCountB(c => c + 1); // Update 2
  // React batches these into one re-render.
};
  `;

  const asyncUpdatesCodeReact18 = `
const [asyncCountA, setAsyncCountA] = useState(0);
const [asyncCountB, setAsyncCountB] = useState(0);

// This effect tracks renders for this specific demo section
useEffect(() => {
  // asyncRenderCount++; (global or ref to track for demo)
  // setAsyncRenderIndicator(asyncRenderCount);
  console.log('Component re-rendered (Async Demo)');
}, [asyncCountA, asyncCountB]);

const handleAsyncUpdates = () => {
  setTimeout(() => {
    setAsyncCountA(c => c + 1);
    setAsyncCountB(c => c + 1);
    // In React 18+, these are also batched!
  }, 0);
};
  `;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        <ThunderboltOutlined style={{ marginRight: "10px" }} /> React State
        Update Batching
      </Title>

      <Card style={{ marginBottom: "24px" }}>
        <Title level={3}>
          <InfoCircleOutlined style={{ marginRight: "8px" }} /> What is State
          Update Batching?
        </Title>
        <Paragraph>
          React's state update batching is a performance optimization where
          multiple <Text code>setState</Text> calls within a single synchronous
          block (like an event handler) are grouped together into a single
          re-render. This prevents unnecessary intermediate re-renders, leading
          to better performance and a smoother user experience.
        </Paragraph>
        <Paragraph>
          Historically, batching was primarily guaranteed within React event
          handlers. However, starting with <Text strong>React 18</Text>,
          automatic batching has been extended to updates inside of timeouts,
          promises, native event handlers, and any other event, significantly
          improving consistency.
        </Paragraph>
      </Card>

      <Card style={{ marginBottom: "24px" }}>
        <Title level={4}>Visualizing Batching</Title>
        <Paragraph>
          The diagram illustrates how React groups multiple state updates into a
          single render pass, compared to a hypothetical scenario without
          batching.
        </Paragraph>
        <div
          className="mermaid"
          style={{ textAlign: "center", marginBottom: "16px" }}
        >
          {batchingDiagram}
        </div>
      </Card>

      <Title level={3} style={{ marginTop: "32px", marginBottom: "16px" }}>
        <ExperimentOutlined /> Interactive Demo
      </Title>
      <Button onClick={resetCounts} style={{ marginBottom: "16px" }}>
        Reset All Counts & Render Tallies
      </Button>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            title="Synchronous Updates (Batched)"
            style={{ height: "100%" }}
          >
            <HighlightOnRender>
              <Paragraph>
                Count A: <Text strong>{countA}</Text>
              </Paragraph>
              <Paragraph>
                Count B: <Text strong>{countB}</Text>
              </Paragraph>
              <Statistic
                title="Render Tally (This Section)"
                value={renderIndicator}
                prefix={<SyncOutlined />}
              />
              <Paragraph style={{ marginTop: "10px", color: "gray" }}>
                This tally increments each time this specific component section
                would re-render due to changes in Count A or Count B.
              </Paragraph>
            </HighlightOnRender>
            <Space
              direction="vertical"
              style={{ marginTop: "16px", width: "100%" }}
            >
              <Button onClick={handleSyncUpdates} type="primary" block>
                Update A & B (Once Each)
              </Button>
              <Button onClick={handleMultipleSyncUpdates} block>
                Update A & B (Multiple Times Each)
              </Button>
            </Space>
            <Divider>Code</Divider>
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              customStyle={codeBlockStyle}
              showLineNumbers
            >
              {syncUpdatesCode.trim()}
            </SyntaxHighlighter>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="Async Updates (Batched in React 18+)"
            style={{ height: "100%" }}
          >
            <HighlightOnRender>
              <Paragraph>
                Async Count A: <Text strong>{asyncCountA}</Text>
              </Paragraph>
              <Paragraph>
                Async Count B: <Text strong>{asyncCountB}</Text>
              </Paragraph>
              <Statistic
                title="Render Tally (This Section)"
                value={asyncRenderIndicator}
                prefix={<SyncOutlined />}
              />
              <Paragraph style={{ marginTop: "10px", color: "gray" }}>
                This tally increments each time this specific component section
                would re-render due to changes in Async Count A or Async Count
                B.
              </Paragraph>
            </HighlightOnRender>
            <Space style={{ marginTop: "16px" }}>
              <Button onClick={handleAsyncUpdates} type="primary">
                Update Async A & B (via setTimeout)
              </Button>
            </Space>
            <Alert
              message="React 18+ Automatic Batching"
              description="In React 18 and later, updates within timeouts, promises, etc., are automatically batched. In older versions, this might have resulted in multiple renders without manual batching."
              type="info"
              showIcon
              style={{ marginTop: "16px" }}
            />
            <Divider>Code</Divider>
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              customStyle={codeBlockStyle}
              showLineNumbers
            >
              {asyncUpdatesCodeReact18.trim()}
            </SyntaxHighlighter>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: "24px" }}>
        <Title level={3}>
          <CheckCircleOutlined style={{ marginRight: "8px" }} /> Benefits of
          Batching
        </Title>
        <List
          dataSource={[
            "Performance: Reduces the number of re-renders, leading to a faster and more responsive UI.",
            "Consistency: Ensures a more predictable state by applying multiple changes before re-rendering.",
            "Prevents UI Jank: Avoids jarring UI updates that could occur if the component re-rendered multiple times in quick succession for intermediate states.",
            "Simpler Code (React 18+): Developers no longer need to manually batch updates in async operations using `ReactDOM.unstable_batchedUpdates()` for most common scenarios.",
          ]}
          renderItem={(item) => (
            <List.Item>
              <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} />{" "}
              {item}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default StateUpdateBatchingSlide;
