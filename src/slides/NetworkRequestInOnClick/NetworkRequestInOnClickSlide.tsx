import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  Alert,
  Space,
  Row,
  Col,
  Divider,
} from "antd";
import { CodeDisplay } from "../../components/common/CodeDisplay";
import mermaid from "mermaid";

const { Title, Paragraph, Text } = Typography;

/**
 * Simulates a network request with a delay.
 * @param {number} delay - The duration of the delay in milliseconds.
 * @returns {Promise<string>} A promise that resolves with a success message after the delay.
 */
const simulateNetworkRequest = (delay: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, delay);
  });
};

const badNetworkHandlerCode = `
import React, { useState } from 'react';
import { Button, Text, Space } from 'antd';

// Assume simulateNetworkRequest exists and returns a Promise
// const simulateNetworkRequest = (delay) => new Promise(...);

const BadNetworkButton: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 🚨 PROBLEM: Async logic, state updates directly in the handler
  const handleClickDirectRequest = async () => {
    setMessage(''); // Reset message
    setIsLoading(true); // Set loading state
    console.log('Starting direct network request...');

    try {
      // Simulate network delay
      const response = await simulateNetworkRequest(2000);
      setMessage(response); // Update message state on success
      console.log('Direct network request finished.');
    } catch (error) {
      setMessage('Error fetching data.'); // Update message state on error
      console.error('Error in direct request:', error);
    } finally {
      setIsLoading(false); // Ensure loading state is turned off
    }
  };

  return (
    <Space direction="vertical">
      <Button
        type="primary"
        onClick={handleClickDirectRequest} // Network call initiated here
        loading={isLoading}
      >
        {isLoading ? 'Fetching...' : 'Fetch Data (Bad Way)'}
      </Button>
      {message && <Text>{message}</Text>}
    </Space>
  );
};

export default BadNetworkButton;
`;

// Define the Mermaid diagram string
const problematicFlowDiagram = `
sequenceDiagram
    participant User
    participant ButtonUI as Button UI
    participant onClickHandler as onClick Handler (Main Thread)
    participant Network as Network/Async Operation
    participant ReactState as React State

    User->>ButtonUI: Clicks Button
    activate ButtonUI
    ButtonUI->>onClickHandler: Executes Handler Directly
    deactivate ButtonUI
    activate onClickHandler

    onClickHandler->>ReactState: setMessage('')
    onClickHandler->>ReactState: setIsLoading(true)
    Note over onClickHandler: UI might stutter/block here before await!

    onClickHandler->>Network: Initiates Request (await...)
    activate Network
    Note over onClickHandler: Handler execution PAUSED

    Network-->>onClickHandler: Response Received (Promise Resolved)
    deactivate Network

    Note over onClickHandler: Handler execution RESUMED
    onClickHandler->>ReactState: setMessage(response or error)
    onClickHandler->>ReactState: setIsLoading(false)

    deactivate onClickHandler
    ReactState-->>ButtonUI: Trigger Re-render
`;

/**
 * @function NetworkRequestInOnClickSlide
 * @description Demonstrates the bad effects of putting network requests directly in an onClick handler,
 *              and displays an example React component using CodeDisplay.
 * @returns {JSX.Element} The NetworkRequestInOnClickSlide component.
 */
const NetworkRequestInOnClickSlide: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickDirectRequest = async () => {
    setMessage("");
    setIsLoading(true);
    try {
      const startTime = Date.now();
      console.log("Starting direct network request...");
      let response = "Failed to fetch";
      const delay = 2000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      response = "Data fetched successfully after simulated delay!";
      setMessage(response);
      const endTime = Date.now();
      console.log(
        `Direct network request finished in ${endTime - startTime}ms.`,
      );
    } catch (error) {
      setMessage("Error fetching data.");
      console.error("Error in direct request:", error);
    }
    setIsLoading(false);
  };

  // Initialize and render Mermaid diagram on mount
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
    });
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Space
      style={{ padding: "20px", width: "100%" }}
      direction="vertical"
      size="large"
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Problem: Network Requests Directly in onClick Handlers
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Card title="Demonstration of Bad Practice">
              <Paragraph>
                Clicking the button below simulates a network request handled
                directly within the `onClick` event. Observe how the UI might
                become unresponsive or provide poor feedback during the
                simulated delay.
              </Paragraph>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                <Button
                  type="primary"
                  onClick={handleClickDirectRequest}
                  loading={isLoading}
                >
                  {isLoading
                    ? "Fetching Data (Bad Way).."
                    : "Fetch Data (Bad Way)"}
                </Button>
                {message && (
                  <Text
                    type={message.startsWith("Error") ? "danger" : "success"}
                  >
                    {message}
                  </Text>
                )}
              </Space>
            </Card>

            <Card title="Why is this problematic?">
              <Alert
                message="Key Issues with Direct Network Calls in Event Handlers:"
                type="warning"
                description={
                  <ul>
                    <li>
                      <Text strong>UI Unresponsiveness:</Text> If the request
                      (or processing) is synchronous or blocks the main thread,
                      the entire UI can freeze. Users get a stuck interface.
                    </li>
                    <li>
                      <Text strong>Poor User Experience:</Text> Lack of
                      immediate feedback (like loading indicators) makes the app
                      feel slow and unresponsive, even if it doesn't totally
                      freeze.
                    </li>
                    <li>
                      <Text strong>Complex State Management:</Text> Managing
                      loading states, error states, and data states directly
                      within the handler becomes messy and error-prone as
                      complexity grows.
                    </li>
                    <li>
                      <Text strong>No Easy Cancellation:</Text> Aborting
                      requests (e.g., if the user navigates away) is difficult
                      to implement cleanly.
                    </li>
                    <li>
                      <Text strong>Harder to Test:</Text> Components become
                      harder to unit test as UI logic is tightly coupled with
                      data fetching logic.
                    </li>
                  </ul>
                }
              />
              <Paragraph style={{ marginTop: "15px" }}>
                <Text strong>Better Approaches:</Text> Use state management for
                loading/error states, and trigger asynchronous operations from
                effects (e.g., `useEffect` for initial load) or use dedicated
                data fetching libraries (like React Query, SWR, or Redux Toolkit
                Query) which handle these concerns elegantly.
              </Paragraph>
            </Card>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Example Code (Problematic Pattern)"
            style={{ height: "100%" }}
          >
            <CodeDisplay code={badNetworkHandlerCode} language="tsx" />
          </Card>
        </Col>
      </Row>

      <Divider />

      <div
        className="mermaid"
        style={{
          textAlign: "center",
          backgroundColor: "#eee",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        {problematicFlowDiagram}
      </div>
    </Space>
  );
};

export default NetworkRequestInOnClickSlide;
