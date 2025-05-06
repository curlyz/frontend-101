import React, { useState } from "react";
import { Button, Card, Space, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

/**
 * A simple counter component demonstrating useState.
 *
 * @returns {JSX.Element} The Counter component.
 */
const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);

  return (
    <Card title={<Title level={4}>Counter (useState)</Title>} size="small">
      <Space direction="vertical" align="center" style={{ width: "100%" }}>
        <Text style={{ fontSize: "2em", fontWeight: "bold" }}>{count}</Text>
        <Space>
          <Button
            icon={<MinusOutlined />}
            onClick={decrement}
            aria-label="Decrement"
          />
          <Button
            icon={<PlusOutlined />}
            onClick={increment}
            aria-label="Increment"
          />
        </Space>
      </Space>
    </Card>
  );
};

export default Counter;
