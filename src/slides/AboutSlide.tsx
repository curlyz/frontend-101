import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

/**
 * Renders a placeholder About slide.
 *
 * @returns {JSX.Element} The About slide component.
 */
const AboutSlide: React.FC = () => {
  return (
    <Card title={<Title level={3}>ℹ️ About</Title>} bordered={false}>
      <Paragraph>
        This section will explain the purpose of this presentation app.
      </Paragraph>
    </Card>
  );
};

export default AboutSlide;
