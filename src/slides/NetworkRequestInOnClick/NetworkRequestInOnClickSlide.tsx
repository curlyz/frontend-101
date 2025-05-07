import React, { useState } from "react";
import { Typography, Button, Card, Alert, Space, Row, Col } from "antd";
import { CodeDisplay } from "../../components/common/CodeDisplay";

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

const exampleReactCode = `
import React, { useState } from 'react';
import { Button, Space } from 'antd';

interface CounterProps {
  initialValue?: number;
}

const SimpleCounter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);

  return (
    <Space direction="vertical" align="center">
      <Text style={{ fontSize: '24px' }}>Count: {count}</Text>
      <Space>
        <Button onClick={decrement}>Decrement</Button>
        <Button type="primary" onClick={increment}>Increment</Button>
      </Space>
    </Space>
  );
};

export default SimpleCounter;
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

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Problem: Network Requests Directly in onClick Handlers
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Card title="Demonstration of Bad Practice">
              <Paragraph>
                Clicking the button below simulates a network request handled
                directly within the `onClick` event. Observe how the UI might
                become unresponsive or provide poor feedback during the
                simulated delay.
              </Paragraph>
              <Space direction="vertical" style={{ width: "100%" }}>
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
            title="Example React Component (MDX Style Code Block)"
            style={{ height: "100%" }}
          >
            <CodeDisplay code={exampleReactCode} language="tsx" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NetworkRequestInOnClickSlide;
