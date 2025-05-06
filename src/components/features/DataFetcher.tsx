import React, { useState, useEffect } from "react";
import { Card, Spin, Alert, Typography, List } from "antd";

const { Title } = Typography;

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Demonstrates fetching data using useEffect on component mount.
 *
 * @returns {JSX.Element} The DataFetcher component.
 */
const DataFetcher: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // AbortController for cleanup
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5", // Fetch only 5 posts
          { signal }, // Pass signal to fetch
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err);
        }
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      controller.abort(); // Abort the fetch request if component unmounts
      console.log("DataFetcher unmounted, fetch aborted.");
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Card
      title={<Title level={4}>Data Fetcher (useEffect)</Title>}
      size="small"
    >
      {loading && <Spin tip="Loading posts..." />}
      {error && (
        <Alert
          message="Error loading posts"
          description={error.message}
          type="error"
          showIcon
        />
      )}
      {!loading && !error && (
        <List
          dataSource={posts}
          renderItem={(post) => (
            <List.Item>
              <List.Item.Meta title={post.title} description={post.body} />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default DataFetcher;
