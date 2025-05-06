import React from "react";
import { Card, Typography, Space } from "antd";
import TaskManager from "@/components/features/state-lifting/TaskManager"; // Use alias

const { Title, Paragraph } = Typography;

/**
 * Renders a slide demonstrating state lifting and immutable updates
 * using the TaskManager example.
 *
 * @returns {JSX.Element} The StateLiftingSlide component.
 */
const StateLiftingSlide: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title={<Title level={3}>State Lifting & Immutable Updates</Title>}>
        <Paragraph>
          This example demonstrates lifting state up to a parent component (
          <code>TaskManager</code>) which manages a list of tasks.
        </Paragraph>
        <Paragraph>
          Child components (<code>AddTaskForm</code>, <code>TaskList</code>,{" "}
          <code>TaskItem</code>) receive state and handler functions as props.
        </Paragraph>
        <Paragraph>
          State updates are performed immutably using the{" "}
          <a
            href="https://immerjs.github.io/immer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Immer
          </a>{" "}
          library via the <code>produce</code> function. This simplifies
          updating arrays and nested objects without direct mutation.
        </Paragraph>
      </Card>
      <TaskManager />
    </Space>
  );
};

export default StateLiftingSlide;
