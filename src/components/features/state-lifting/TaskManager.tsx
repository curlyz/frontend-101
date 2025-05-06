import React from "react";
// import { useState, useCallback } from 'react';
// import { produce } from 'immer';
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import { Card, Divider, Space, Typography } from "antd";
import { TaskProvider } from "./TaskContext"; // Import the provider

const { Title } = Typography; // Restore Title import

/* // Remove old interface definitions, they are in TaskContext.tsx now
interface Task {
  id: number;
  text: string;
}

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
}

interface TaskListProps {
  tasks: Task[];
}
*/

// let nextId = 0; // ID generation is now handled in TaskContext

/**
 * Main component to manage and display tasks.
 * It now acts as the provider for the TaskContext.
 *
 * @returns {JSX.Element} The TaskManager component.
 */
const TaskManager: React.FC = () => {
  /* // State and add logic moved to TaskContext
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = useCallback((text: string) => {
    setTasks(
      produce((draft) => {
        draft.push({ id: nextId++, text });
      })
    );
  }, []); // Dependency array is empty because produce handles accessing current state
  */

  return (
    // Wrap the components with the provider
    <TaskProvider>
      <Card title={<Title level={4}>Task Manager (Context)</Title>}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <AddTaskForm />
          <Divider />
          <TaskList />
        </Space>
      </Card>
    </TaskProvider>
  );
};

export default TaskManager;
