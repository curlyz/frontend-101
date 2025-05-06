import React from "react";
import { Card, Typography, Space } from "antd";
import ReduxCounter from "@/components/features/redux/ReduxCounter";

const { Title, Paragraph } = Typography;

/**
 * Renders a slide demonstrating Redux Toolkit integration.
 *
 * @returns {JSX.Element} The ReduxDemoSlide component.
 */
const ReduxDemoSlide: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title={<Title level={3}>Redux Toolkit Demo</Title>}>
        <Paragraph>
          This example demonstrates integrating Redux Toolkit for state
          management.
        </Paragraph>
        <Paragraph>
          A simple counter slice (
          <code>src/store/features/counterSlice.ts</code>) manages the count.
          The <code>ReduxCounter</code> component uses <code>useSelector</code>{" "}
          to read the count and <code>useDispatch</code> to dispatch
          increment/decrement actions.
        </Paragraph>
        <Paragraph>
          The store is configured in <code>src/store/index.ts</code> using{" "}
          <code>configureStore</code>, and the app is wrapped with the Redux{" "}
          <code>Provider</code> in <code>src/main.tsx</code>.
        </Paragraph>
      </Card>

      <ReduxCounter />
    </Space>
  );
};

export default ReduxDemoSlide;
