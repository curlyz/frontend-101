import React from "react";
import { List, Typography } from "antd";
import TaskItem from "./TaskItem";
import {
  useTasks,
  useChangeTask,
  useDeleteTask,
  useSetPriority,
} from "./TaskContext";

const { Text } = Typography;

/**
 * Displays the list of tasks.
 * Uses hooks from TaskContext to get tasks and handlers.
 *
 * @returns {JSX.Element} The TaskList component.
 */
const TaskList: React.FC = () => {
  const tasks = useTasks();
  const changeTask = useChangeTask();
  const deleteTask = useDeleteTask();
  const setPriority = useSetPriority();

  if (tasks.length === 0) {
    return <Text type="secondary">No tasks yet!</Text>;
  }

  return (
    <List
      size="small"
      bordered
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item key={task.id}>
          <TaskItem
            task={task}
            onChange={changeTask}
            onDelete={deleteTask}
            onSetPriority={setPriority}
          />
        </List.Item>
      )}
    />
  );
};

export default TaskList;
