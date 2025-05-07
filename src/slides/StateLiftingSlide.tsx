import React from "react";
import { Card, Typography, Space, Divider } from "antd";
import TaskManager from "@/components/features/state-lifting/TaskManager"; // Use alias

const { Title, Paragraph } = Typography;

/**
 * Renders a slide demonstrating state management using React Context
 * for the TaskManager example.
 *
 * @returns {JSX.Element} The StateLiftingSlide component.
 */
const StateLiftingSlide: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title={<Title level={3}>State Management with Context</Title>}>
        <Paragraph>
          This example now uses React Context (<code>TaskContext.tsx</code>) to
          manage the task list state instead of prop drilling.
        </Paragraph>
        <Paragraph>
          The <code>TaskProvider</code> wraps the <code>TaskManager</code>{" "}
          content. Components like <code>AddTaskForm</code> and{" "}
          <code>TaskList</code> use custom hooks (e.g., <code>useAddTask</code>,{" "}
          <code>useTasks</code>) to access state and actions from the context.
        </Paragraph>
        <Paragraph>
          State updates still use Immer for immutability within the context
          provider. We've also replaced <code>useContextSelector</code> with
          standard <code>useContext</code>
          to resolve potential compatibility issues.
        </Paragraph>
      </Card>
      <TaskManager />
    </Space>
  );
};

export default StateLiftingSlide;
