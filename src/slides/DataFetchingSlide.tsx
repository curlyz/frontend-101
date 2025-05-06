import React from "react";
import { Card, Typography, Space, Divider } from "antd";
import SimpleDataFetcher from "@/components/features/data-fetching/SimpleDataFetcher";
import DependentFetcher from "@/components/features/data-fetching/DependentFetcher";

const { Title, Paragraph } = Typography;

/**
 * Renders a slide demonstrating basic data fetching with useEffect.
 *
 * @returns {JSX.Element} The DataFetchingSlide component.
 */
const DataFetchingSlide: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title={<Title level={3}>Data Fetching with useEffect</Title>}>
        <Paragraph>
          This example uses the <code>useEffect</code> hook to fetch data from
          an API (JSONPlaceholder) when the component mounts.
        </Paragraph>
        <Paragraph>
          It manages <code>isLoading</code> state to show a loading indicator.
          Error handling and cleanup will be added in subsequent examples.
        </Paragraph>
      </Card>

      <SimpleDataFetcher />
      <Divider />
      <DependentFetcher />
      {/* Add more data fetching components here later */}
      {/* <Divider /> */}
    </Space>
  );
};

export default DataFetchingSlide;
