import React, { useState } from "react";
import {
  Card,
  Spin,
  Alert,
  Typography,
  InputNumber,
  Space,
  Button,
  Divider,
} from "antd";
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
 * Fetches post data based on a user-provided ID using the enhanced useFetch hook.
 * Demonstrates dependency array usage and manual refetch.
 *
 * @returns {JSX.Element} The DependentFetcher component.
 */
const DependentFetcher: React.FC = () => {
  const [postId, setPostId] = useState<number>(1);
  const [url, setUrl] = useState<string | null>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );

  // Fetch data using the hook. The fetch re-runs when 'url' changes.
  const {
    data: post,
    isLoading,
    error,
    refetch,
  } = useFetch<Post>(
    url,
    { retryAttempts: 2, retryDelay: 500 }, // Add retry options
    [postId], // Dependency array - re-fetch implicitly when postId changes URL
    // We could also directly use postId here and construct url inside useEffect in hook, but this way is simpler for demo
  );

  const handleFetchClick = () => {
    // Construct the new URL and set it to trigger the fetch
    setUrl(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    // Note: The refetch() function returned by the hook could also be used
    // if we didn't want to rely solely on the URL/dependency change.
    // Example: refetch();
  };

  return (
    <Card
      title={<Title level={4}>Dependent Data Fetcher (useFetch Hook)</Title>}
      size="small"
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Paragraph>
          Enter a Post ID (1-100) and click 'Fetch' to load its data using the
          enhanced <code>useFetch</code> hook. The fetch automatically re-runs
          when the URL changes. Retries are enabled.
        </Paragraph>
        <Space>
          <Text>Post ID:</Text>
          <InputNumber
            min={1}
            max={100} // Max posts on JSONPlaceholder
            value={postId}
            onChange={(value) => setPostId(value ?? 1)} // Update the ID state
          />
          <Button type="primary" onClick={handleFetchClick} loading={isLoading}>
            Fetch Post
          </Button>
          <Button onClick={refetch} disabled={isLoading || !url}>
            Refetch Current
          </Button>
        </Space>

        <Divider />

        {/* Loading State */}
        {isLoading && (
          <Spin tip={`Loading post ${postId}...`}>
            <div
              style={{
                padding: 50,
                background: "rgba(0, 0, 0, 0.05)",
                borderRadius: 4,
              }}
            ></div>
          </Spin>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Alert
            message={`Error Fetching Post ${postId}`}
            description={error.message || "Could not load data."}
            type="error"
            showIcon
          />
        )}

        {/* Success State */}
        {!isLoading && !error && post && (
          <div>
            <Title level={5}>
              {post.id}: {post.title}
            </Title>
            <Paragraph>{post.body}</Paragraph>
            <Text type="secondary">User ID: {post.userId}</Text>
          </div>
        )}

        {/* Handle case where loading finished, no error, but no post data */}
        {!isLoading && !error && !post && url && (
          <Alert
            message="No Post Data Found"
            description={`Could not find data for post ID ${postId}.`}
            type="warning"
            showIcon
          />
        )}
      </Space>
    </Card>
  );
};

export default DependentFetcher;
