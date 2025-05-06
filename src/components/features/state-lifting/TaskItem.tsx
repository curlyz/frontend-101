import React, { useState, useCallback } from "react";
import { Checkbox, Input, Button, Space, Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { produce } from "immer";
import type { Task } from "./TaskContext";

interface TaskItemProps {
  task: Task;
  onChange: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onSetPriority: (
    taskId: number,
    priority: Task["metadata"]["priority"],
  ) => void;
}

/**
 * Renders a single task item with controls for editing, deleting,
 * and marking as done.
 *
 * @param {TaskItemProps} props Component props.
 * @returns {JSX.Element} The TaskItem component.
 */
const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onChange,
  onDelete,
  onSetPriority,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = useCallback(() => {
    if (editText.trim().length === 0) {
      // Optionally revert or show an error
      setEditText(task.text); // Revert if empty
      setIsEditing(false);
      return;
    }
    // Use immer produce for the state update within the onChange handler
    // This ensures the parent receives an immutable object
    onChange(
      produce(task, (draft: Task) => {
        draft.text = editText.trim();
      }),
    );
    setIsEditing(false);
  }, [task, editText, onChange]);

  const handleCancel = useCallback(() => {
    setEditText(task.text); // Revert changes
    setIsEditing(false);
  }, [task.text]);

  const handleToggleDone = useCallback(() => {
    onChange(
      produce(task, (draft: Task) => {
        draft.done = !task.done;
      }),
    );
  }, [task, onChange]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [task.id, onDelete]);

  const handlePriorityChange = useCallback(
    (value: Task["metadata"]["priority"]) => {
      onSetPriority(task.id, value);
      // Alternatively, if you want to update the nested metadata directly here:
      // onChange(produce(task, draft => {
      //   draft.metadata.priority = value;
      // }));
    },
    [task.id, onSetPriority],
  );

  let taskContent;
  if (isEditing) {
    taskContent = (
      <Space.Compact style={{ width: "100%" }}>
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onPressEnter={handleSave} // Save on Enter key
        />
        <Button
          icon={<SaveOutlined />}
          onClick={handleSave}
          aria-label="Save Task"
        />
        <Button
          icon={<CloseOutlined />}
          onClick={handleCancel}
          aria-label="Cancel Edit"
        />
      </Space.Compact>
    );
  } else {
    taskContent = (
      <Space style={{ flexGrow: 1, justifyContent: "space-between" }}>
        <span
          style={{
            textDecoration: task.done ? "line-through" : "none",
            opacity: task.done ? 0.5 : 1,
          }}
        >
          {task.text}
        </span>
        <Space>
          <Select
            value={task.metadata.priority}
            size="small"
            onChange={handlePriorityChange}
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
            style={{ minWidth: 80 }}
          />
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => setIsEditing(true)}
            aria-label="Edit Task"
          />
        </Space>
      </Space>
    );
  }

  return (
    <Space style={{ width: "100%" }}>
      <Checkbox checked={task.done} onChange={handleToggleDone} />
      {taskContent}
      <Button
        size="small"
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        danger
        aria-label="Delete Task"
      />
    </Space>
  );
};

export default TaskItem;
