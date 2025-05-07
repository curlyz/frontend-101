import React from "react";
import { Card, Typography, Divider, Space } from "antd";
import UserProfile from "../components/features/UserProfile";
import HoverButton from "../components/common/HoverButton";
import CommonCard from "../components/common/CommonCard";
import SimpleList from "../components/common/SimpleList";

const { Title, Paragraph, Text } = Typography;

const demoListData = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" },
  { id: 3, name: "Item Three" },
];

/**
 * Renders a slide demonstrating the component hierarchy and usage
 * of previously created components.
 *
 * @returns {JSX.Element} The ComponentDemoSlide component.
 */
const ComponentDemoSlide: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title={<Title level={3}>🧩 Component Demo</Title>} bordered={false}>
        <Paragraph>
          This slide demonstrates the usage and composition of various
          components created earlier.
        </Paragraph>
      </Card>

      <Divider>CommonCard Examples</Divider>
      <CommonCard title="Loading Card Example" isLoading={true}>
        This content won't be shown while loading.
      </CommonCard>
      <CommonCard
        title="Error Card Example"
        errorMessage="Failed to load content!"
      >
        This content might or might not be shown depending on error handling
        logic.
      </CommonCard>

      <Divider>Composition Example</Divider>
      <CommonCard title="Card with Nested Components">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Paragraph>This card contains other components:</Paragraph>
          <UserProfile userId={1} />
          <Divider dashed />
          <SimpleList
            header={<Text strong>Demo List:</Text>}
            items={demoListData}
            renderItemContent={(item) => (
              <Text>
                {item.name} (ID: {item.id})
              </Text>
            )}
            bordered
          />
          <Divider dashed />
          <HoverButton type="primary" hoverText="Hovering!">
            Hover Me
          </HoverButton>
          <HoverButton type="default">No Hover Text</HoverButton>
        </Space>
      </CommonCard>
    </Space>
  );
};

export default ComponentDemoSlide;
