import React, { useState, useCallback } from "react";
import { Card, Button, Typography, Space } from "antd";
import CallbackChild from "./CallbackChild";

const { Title, Text } = Typography;

/**
 * Demonstrates useCallback to prevent re-creation of functions
 * on every render, which optimizes child components wrapped in React.memo.
 *
 * @returns {JSX.Element} The CallbackParent component.
 */
const CallbackParent: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [otherState, setOtherState] = useState<number>(0); // State to trigger re-renders

  // This function is recreated on every render of CallbackParent
  const handleClickWithoutCallback = () => {
    console.log("Button without useCallback clicked! Count:", count);
    // Potentially do something with count, though not strictly necessary for demo
  };

  // This function is memoized by useCallback.
  // It will only be recreated if 'count' changes.
  const handleClickWithCallback = useCallback(() => {
    console.log("Button WITH useCallback clicked! Count:", count);
    // Potentially do something with count
  }, [count]); // Dependency array ensures stable function unless count changes

  const handleTriggerRender = () => {
    setOtherState((c) => c + 1);
  };

  return (
    <Card
      title={<Title level={4}>Memoized Handlers (useCallback)</Title>}
      size="small"
    >
      <Space direction="vertical">
        <Space>
          <Button onClick={() => setCount((c) => c + 1)}>
            Increment Count
          </Button>
          <Text>Count: {count}</Text>
        </Space>
        <Space>
          <Button onClick={handleTriggerRender}>
            Trigger Parent Re-render
          </Button>
          <Text>Other State: {otherState}</Text>
        </Space>
        <Text>
          Check the console. The 'Child Without Callback' re-renders every time
          the parent re-renders (e.g., when 'Trigger Parent Re-render' or
          'Increment Count' is clicked). The 'Child WITH Callback' only
          re-renders when its actual props change (i.e., when 'Increment Count'
          is clicked, because the callback depends on `count`).
        </Text>
        <div>
          <CallbackChild
            onClick={handleClickWithoutCallback} // New function instance every render
            label="Child Without Callback"
          />
          <CallbackChild
            onClick={handleClickWithCallback} // Stable function instance (unless count changes)
            label="Child WITH Callback"
          />
        </div>
      </Space>
    </Card>
  );
};

export default CallbackParent;
