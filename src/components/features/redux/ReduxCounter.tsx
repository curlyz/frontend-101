import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from "@/store/features/counterSlice"; // Import actions and selector
import { Button, InputNumber, Space, Card, Typography } from "antd";
import type { AppDispatch } from "@/store"; // Import AppDispatch type if needed for typing dispatch

const { Title, Text } = Typography;

/**
 * A counter component that interacts with the Redux store.
 * Uses useSelector to read state and useDispatch to dispatch actions.
 *
 * @returns {JSX.Element} The ReduxCounter component.
 */
const ReduxCounter: React.FC = () => {
  // Use useSelector to get the current count from the store
  const count = useSelector(selectCount);
  // Get the dispatch function
  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch is recommended

  const [incrementAmount, setIncrementAmount] = useState<number>(2);

  return (
    <Card title={<Title level={4}>Redux Counter Example</Title>} size="small">
      <Space direction="vertical">
        <Space>
          <Button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            -
          </Button>
          <Text
            strong
            style={{ fontSize: "1.5em", minWidth: "40px", textAlign: "center" }}
          >
            {count}
          </Text>
          <Button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            +
          </Button>
        </Space>
        <Space>
          <InputNumber
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={(value) => setIncrementAmount(value ?? 0)}
          />
          <Button
            onClick={() => dispatch(incrementByAmount(incrementAmount || 0))}
          >
            Add Amount
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default ReduxCounter;
