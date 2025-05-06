import React, { useState } from "react";
import { Card, Form, Input, Button, Typography } from "antd";

const { Title } = Typography;

/**
 * A simple user profile form demonstrating useState for form fields.
 *
 * @returns {JSX.Element} The UserProfileForm component.
 */
const UserProfileForm: React.FC = () => {
  // Use separate useState calls for each field
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  // Alternatively, use a single state object (can lead to more complex updates)
  // const [formData, setFormData] = useState({ name: '', email: '', bio: '' });
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  const handleSubmit = () => {
    console.log("Form Submitted:", { name, email, bio });
    // Here you would typically send the data to an API
    alert(`Submitted:\nName: ${name}\nEmail: ${email}\nBio: ${bio}`);
  };

  return (
    <Card
      title={<Title level={4}>User Profile Form (useState)</Title>}
      size="small"
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Name">
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </Form.Item>
        <Form.Item label="Bio">
          <Input.TextArea
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tell us about yourself"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Profile
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserProfileForm;
