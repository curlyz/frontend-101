import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  Typography,
  Input,
  Space,
  Statistic,
  Row,
  Col,
  Alert,
} from "antd";
import { throttle, debounce } from "lodash";
import mermaid from "mermaid";

const { Title, Paragraph, Text } = Typography;

const THROTTLE_WAIT = 500; // ms
const DEBOUNCE_WAIT = 500; // ms

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
 * @description Demonstrates throttling and debouncing techniques for optimizing event handlers.
 * Shows how to limit the rate of function execution for high-frequency events like input changes.
 * @returns {JSX.Element} The ThrottleDebounceDemo component.
 */
const ThrottleDebounceDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [directCallCount, setDirectCallCount] = useState(0);
  const [throttledCallCount, setThrottledCallCount] = useState(0);
  const [debouncedCallCount, setDebouncedCallCount] = useState(0);
  const [lastDirectValue, setLastDirectValue] = useState("");
  const [lastThrottledValue, setLastThrottledValue] = useState("");
  const [lastDebouncedValue, setLastDebouncedValue] = useState("");

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "base" });
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Direct API call simulation
  const handleDirectApiCall = (value: string) => {
    console.log("[DIRECT] API Call with:", value);
    setDirectCallCount((prev) => prev + 1);
    setLastDirectValue(value);
  };

  // Throttled API call simulation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleThrottledApiCall = useCallback(
    throttle(
      (value: string) => {
        console.log("[THROTTLED] API Call with:", value);
        setThrottledCallCount((prev) => prev + 1);
        setLastThrottledValue(value);
      },
      THROTTLE_WAIT,
      { leading: true, trailing: true },
    ), // Ensure first and last calls are made if applicable
    [], // No dependencies, throttle function is stable
  );

  // Debounced API call simulation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebouncedApiCall = useCallback(
    debounce((value: string) => {
      console.log("[DEBOUNCED] API Call with:", value);
      setDebouncedCallCount((prev) => prev + 1);
      setLastDebouncedValue(value);
    }, DEBOUNCE_WAIT),
    [], // No dependencies, debounce function is stable
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    handleDirectApiCall(value);
    handleThrottledApiCall(value);
    handleDebouncedApiCall(value);
  };

  return (
    <Card
      title={<Title level={4}>Throttling and Debouncing Input Events</Title>}
    >
      <Paragraph>
        Throttling limits function calls to once per interval. Debouncing calls
        a function only after a period of inactivity. Type rapidly in the input
        below to see the difference in simulated API call counts.
      </Paragraph>

      <div
        className="mermaid"
        style={{
          textAlign: "center",
          padding: "10px",
          border: "1px solid #f0f0f0",
          borderRadius: "4px",
          marginBottom: 16,
        }}
      >
        {throttleDebounceDiagram}
      </div>

      <Input
        placeholder="Type here rapidly..."
        value={inputValue}
        onChange={handleChange}
        style={{ marginBottom: 16 }}
      />

      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="Direct Calls" value={directCallCount} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            Last value: "{lastDirectValue}"
          </Text>
        </Col>
        <Col span={8}>
          <Statistic
            title={`Throttled Calls (max 1 per ${THROTTLE_WAIT}ms)`}
            value={throttledCallCount}
          />
          <Text type="secondary" style={{ fontSize: 12 }}>
            Last value: "{lastThrottledValue}"
          </Text>
        </Col>
        <Col span={8}>
          <Statistic
            title={`Debounced Calls (after ${DEBOUNCE_WAIT}ms pause)`}
            value={debouncedCallCount}
          />
          <Text type="secondary" style={{ fontSize: 12 }}>
            Last value: "{lastDebouncedValue}"
          </Text>
        </Col>
      </Row>

      <Alert
        style={{ marginTop: 20 }}
        message="Impact Metrics & What to Observe:"
        description={
          <>
            <Paragraph>
              - <strong>Direct Calls:</strong> The count increases with every
              keystroke. For operations like API searches, this is highly
              inefficient.
            </Paragraph>
            <Paragraph>
              - <strong>Throttled Calls:</strong> The count increases less
              frequently. The API is called periodically while typing. Useful
              for rate-limiting events that need to provide intermediate updates
              (e.g., tracking scroll position).
            </Paragraph>
            <Paragraph>
              - <strong>Debounced Calls:</strong> The count increases only after
              you pause typing. Ideal for actions that should only occur once
              the user has finished their input (e.g., search suggestions,
              auto-save).
            </Paragraph>
            <Paragraph>
              Check the console logs to see when each simulated API call is made
              and with what value.
            </Paragraph>
          </>
        }
        type="info"
        showIcon
      />
    </Card>
  );
};

export default ThrottleDebounceDemo;
