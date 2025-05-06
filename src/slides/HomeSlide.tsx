import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

/**
 * Renders a placeholder Home slide.
 *
 * @returns {JSX.Element} The Home slide component.
 */
const HomeSlide: React.FC = () => {
  return (
    <Card title={<Title level={3}>🏠 Home</Title>} bordered={false}>
      <Paragraph>This is the placeholder home slide content.</Paragraph>
    </Card>
  );
};

export default HomeSlide;
