import React, { useRef, useEffect } from "react";
import { Card, Input, Button, Space, Typography, type InputRef } from "antd";

const { Title } = Typography;

/**
 * Demonstrates using useRef to access a DOM element (Input) directly
 * and focus it programmatically.
 *
 * @returns {JSX.Element} The RefDomAccess component.
 */
const RefDomAccess: React.FC = () => {
  const inputRef = useRef<InputRef>(null);

  const handleFocusClick = () => {
    inputRef.current?.focus();
  };

  // Example: Focus on initial mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Card title={<Title level={4}>DOM Access (useRef)</Title>} size="small">
      <Space>
        <Input ref={inputRef} placeholder="Click button to focus me" />
        <Button onClick={handleFocusClick}>Focus Input</Button>
      </Space>
    </Card>
  );
};

export default RefDomAccess;
