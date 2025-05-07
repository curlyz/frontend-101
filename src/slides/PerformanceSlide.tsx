import React from "react";
import { Card, Typography, Space, Divider } from "antd";
import RefDomAccess from "@/components/features/performance/RefDomAccess";
import MemoizedCalculation from "@/components/features/performance/MemoizedCalculation";
import CallbackParent from "@/components/features/performance/CallbackParent";
import ListVirtualizationDemo from "@/components/features/performance/ListVirtualizationDemo";
import LazyLoadingDemo from "@/components/features/performance/LazyLoadingDemo";
import ListKeysDemo from "@/components/features/performance/ListKeysDemo";
import ThrottleDebounceDemo from "@/components/features/performance/ThrottleDebounceDemo";

const { Title, Paragraph, Text } = Typography;

/**
 * Renders a slide demonstrating various React performance optimization techniques.
 *
 * @returns {JSX.Element} The PerformanceSlide component.
 */
const PerformanceSlide: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title={<Title level={3}>React Performance Optimizations 🚀</Title>}>
        <Paragraph>
          This slide explores key techniques to enhance the performance of your
          React applications. Effective optimization leads to faster load times,
          smoother interactions, and a better overall user experience.
        </Paragraph>
        <Paragraph>We will cover:</Paragraph>
        <ul>
          <li>
            <Text strong>
              <code>useRef</code>:
            </Text>{" "}
            Accessing DOM elements or storing mutable values without causing
            re-renders.
          </li>
          <li>
            <Text strong>
              <code>useMemo</code>:
            </Text>{" "}
            Memoizing expensive calculations to recompute only when dependencies
            change.
          </li>
          <li>
            <Text strong>
              <code>useCallback</code>:
            </Text>{" "}
            Memoizing callback functions for stable references, often with{" "}
            <code>React.memo</code>.
          </li>
          <li>
            <Text strong>List Virtualization (Windowing):</Text> Rendering only
            visible items in long lists.
          </li>
          <li>
            <Text strong>Lazy Loading Components:</Text> Using{" "}
            <code>React.lazy</code> and <code>Suspense</code> to load components
            on demand.
          </li>
          <li>
            <Text strong>List Keys:</Text> The importance of stable and unique{" "}
            <code>key</code> props for efficient list updates and state
            preservation.
          </li>
          <li>
            <Text strong>Throttling & Debouncing:</Text> Optimizing event
            handlers for high-frequency events.
          </li>
        </ul>
      </Card>

      <RefDomAccess />
      <Divider />
      <MemoizedCalculation />
      <Divider />
      <CallbackParent />
      <Divider />
      <ListVirtualizationDemo />
      <Divider />
      {/* <LazyLoadingDemo /> */}
      <Divider />
      <ListKeysDemo />
      <Divider />
      <ThrottleDebounceDemo />
    </Space>
  );
};

export default PerformanceSlide;
