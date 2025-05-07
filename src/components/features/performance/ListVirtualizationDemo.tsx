import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Space, Alert, Row, Col } from "antd";
import { FixedSizeList, type ListChildComponentProps } from "react-window";
import mermaid from "mermaid";

const { Title, Paragraph, Text } = Typography;

const itemCount = 10000;
const itemHeight = 35;

// Generate a large dataset
const largeListData = Array.from({ length: itemCount }, (_, index) => ({
  id: `item-${index}`,
  text: `Item ${index + 1}`,
}));

interface ListItemProps {
  id: string;
  text: string;
  style?: React.CSSProperties; // For react-window
}

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

// Standard list item renderer
const StandardListItem: React.FC<ListItemProps> = ({ id, text, style }) => {
  // Simple style for visibility
  const itemStyle: React.CSSProperties = {
    padding: "5px",
    borderBottom: "1px solid #eee",
    height: itemHeight - 1, // account for border
    display: "flex",
    alignItems: "center",
    ...style,
  };
  return (
    <div key={id} style={itemStyle}>
      {text}
    </div>
  );
};

// Virtualized list item renderer (for react-window)
const VirtualizedRow: React.FC<ListChildComponentProps> = ({
  index,
  style,
}) => {
  const item = largeListData[index];
  return <StandardListItem id={item.id} text={item.text} style={style} />;
};

/**
 * @description Demonstrates list virtualization (windowing) to optimize rendering of long lists.
 * Shows the difference in performance when rendering a large number of items
 * with and without virtualization.
 * @returns {JSX.Element} The ListVirtualizationDemo component.
 */
const ListVirtualizationDemo: React.FC = () => {
  const [showVirtualized, setShowVirtualized] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "base" }); // Using 'base' for better compatibility
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Note: A simple render count isn't a perfect metric here, as react-window manages its own renders.
  // True impact is better seen with browser dev tools (performance tab, paint flashing).
  // For demo purposes, we can count how many items *would* be in the DOM.

  const StandardList = () => {
    // Simulate re-render tracking if needed, though not truly indicative for comparison with react-window
    React.useEffect(() => {
      setRenderCount(itemCount); // All items are 'rendered' in terms of DOM structure
    }, []);
    return (
      <div style={{ height: 400, overflowY: "auto", border: "1px solid #ccc" }}>
        {largeListData.map((item) => (
          <StandardListItem key={item.id} id={item.id} text={item.text} />
        ))}
      </div>
    );
  };

  const VirtualizedList = () => {
    // For react-window, the number of rendered items is managed internally and is small.
    // We can estimate based on viewport and item size for display purposes.
    React.useEffect(() => {
      setRenderCount(Math.ceil(400 / itemHeight));
    }, []);
    return (
      <FixedSizeList
        height={400}
        itemCount={itemCount}
        itemSize={itemHeight}
        width={"100%"}
      >
        {VirtualizedRow}
      </FixedSizeList>
    );
  };

  return (
    <Card
      title={
        <Title level={4}>
          List Virtualization (Windowing) - {itemCount} Items
        </Title>
      }
    >
      <Paragraph>
        List virtualization renders only a small subset of rows (the "window")
        at any given time. This dramatically improves performance for long lists
        by reducing DOM elements.
      </Paragraph>
      <Paragraph>
        Try scrolling through both lists. Notice the difference in scrollbar
        behavior and, more importantly, inspect the DOM or use browser
        performance tools to see how many elements are actually rendered.
      </Paragraph>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => setShowVirtualized(true)}
          disabled={showVirtualized}
        >
          Show Virtualized List
        </Button>
        <Button
          onClick={() => setShowVirtualized(false)}
          disabled={!showVirtualized}
        >
          Show Standard List
        </Button>
      </Space>

      <Alert
        message={`Currently Displaying: ${showVirtualized ? "Virtualized List" : "Standard List"}`}
        description={
          <Text>
            Approximate items in DOM: <Text strong>{renderCount}</Text>
          </Text>
        }
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Title level={5}>Standard List Rendering</Title>
          <div
            className="mermaid"
            style={{
              textAlign: "center",
              padding: "10px",
              border: "1px solid #f0f0f0",
              borderRadius: "4px",
              backgroundColor: "#999",
            }}
          >
            {standardListDiagram}
          </div>
        </Col>
        <Col span={12}>
          <Title level={5}>Virtualized List Rendering</Title>
          <div
            className="mermaid"
            style={{
              textAlign: "center",
              padding: "10px",
              border: "1px solid #f0f0f0",
              borderRadius: "4px",
              backgroundColor: "#999",
            }}
          >
            {virtualizedListDiagram}
          </div>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          {showVirtualized ? <VirtualizedList /> : <StandardList />}
        </Col>
      </Row>
      <Paragraph style={{ marginTop: 16 }}>
        <Text strong>Impact Metrics:</Text>
        <br />- <Text strong>Standard List:</Text> Renders all {itemCount} items
        in the DOM at once. Can be very slow for large datasets, causing high
        memory usage and sluggish scrolling. Check your browser's developer
        tools: Elements panel will show all items. Performance profiling will
        show long rendering times.
        <br />- <Text strong>Virtualized List:</Text> Renders only the visible
        items (plus a small buffer). For a 400px tall container and 35px item
        height, it's around 12-15 items. Scrolling is smooth, memory usage is
        low. Check your browser's developer tools: Elements panel will show only
        a few items. These items change as you scroll.
      </Paragraph>
    </Card>
  );
};

export default ListVirtualizationDemo;
