import React from "react";
import { Card, Spin, Alert, Typography } from "antd";
import useFetch from "@/hooks/useFetch";

const { Title, Paragraph, Text } = Typography;

// Define the expected shape of the fetched data (Post)
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Fetches a single post using the useFetch custom hook.
 * Displays loading and error states provided by the hook.
 *
 * @returns {JSX.Element} The SimpleDataFetcher component.
 */
const SimpleDataFetcher: React.FC = () => {
  // Use the custom hook to fetch data
  const {
    data: post,
    isLoading,
    error,
  } = useFetch<Post>("https://jsonplaceholder.typicode.com/posts/1");
  // The hook now manages isLoading, error, and data states

  return (
    <Card
      title={<Title level={4}>Simple Data Fetcher (useFetch Hook)</Title>}
      size="small"
    >
      {isLoading && (
        <Spin tip="Loading post...">
          <div
            style={{
              padding: 50,
              background: "rgba(0, 0, 0, 0.05)",
              borderRadius: 4,
            }}
          ></div>
        </Spin>
      )}
      {error && !isLoading && (
        <Alert
          message="Error Fetching Post"
          description={error.message || "Could not load data."}
          type="error"
          showIcon
        />
      )}
      {!isLoading && !error && post && (
        <div>
          <Title level={5}>{post.title}</Title>
          <Paragraph>{post.body}</Paragraph>
          <Text type="secondary">User ID: {post.userId}</Text>
        </div>
      )}
      {!isLoading && !error && !post && (
        <Alert
          message="No Post Data"
          description="The post data could not be loaded."
          type="warning"
          showIcon
        />
      )}
    </Card>
  );
};

export default SimpleDataFetcher;
