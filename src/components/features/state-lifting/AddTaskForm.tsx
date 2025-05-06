import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAddTask } from "./TaskContext"; // Import the context hook

/**
 * Form component for adding new tasks.
 * Uses the useAddTask hook from TaskContext.
 *
 * @returns {JSX.Element} The AddTaskForm component.
 */
const AddTaskForm: React.FC = () => {
  const addTask = useAddTask(); // Get the addTask function from context
  const [text, setText] = useState<string>("");
  const [form] = Form.useForm(); // To reset the form field

  const handleSubmit = () => {
    if (text.trim().length === 0) {
      return; // Don't add empty tasks
    }
    addTask(text.trim()); // Use the function from context
    setText(""); // Clear input after adding
    form.resetFields(); // Reset Ant Design form field
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="inline">
      <Form.Item
        name="taskText"
        style={{ flexGrow: 1 }} // Allow input to take available space
        rules={[{ required: true, message: "Please enter a task!" }]} // Basic validation
      >
        <Input
          placeholder="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTaskForm;
