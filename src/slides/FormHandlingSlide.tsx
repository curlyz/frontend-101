import React from "react";
import { Card, Typography, Space } from "antd";
import MultiStepForm from "@/components/features/MultiStepForm"; // Use alias

const { Title, Paragraph } = Typography;

/**
 * Renders a slide demonstrating the MultiStepForm component
 * which uses the custom useForm hook.
 *
 * @returns {JSX.Element} The FormHandlingSlide component.
 */
const FormHandlingSlide: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title={<Title level={3}>Form Handling with Custom Hook</Title>}>
        <Paragraph>
          This example shows a multi-step form whose state is managed by the
          custom <code>useForm</code> hook.
        </Paragraph>
        <Paragraph>
          It demonstrates handling various input types (text, select, checkbox,
          radio), basic validation per step, conditional fields, and a final
          submission state.
        </Paragraph>
      </Card>
      <MultiStepForm />
    </Space>
  );
};

export default FormHandlingSlide;
