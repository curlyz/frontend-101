import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Spin, Result, Typography } from "antd";

const { Text } = Typography;

interface MarkdownSlideRendererProps {
  filePath: string;
}

/**
 * A component that fetches markdown content from a given path (relative to the public folder)
 * and renders it using react-markdown with GitHub Flavored Markdown support.
 * Uses Ant Design components for loading/error states.
 * @param {MarkdownSlideRendererProps} props - Component props.
 * @param {string} props.filePath - The path to the markdown file (e.g., '/docs/slides/my-slide.md').
 * @returns {JSX.Element} The rendered markdown content or loading/error state.
 */
const MarkdownSlideRenderer: React.FC<MarkdownSlideRendererProps> = ({
  filePath,
}) => {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${filePath}: ${response.statusText} (status: ${response.status})`,
          );
        }
        const text = await response.text();
        setMarkdown(text);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred while fetching markdown.");
        }
        console.error("Error fetching markdown for path:", filePath, err);
      }
      setLoading(false);
    };

    fetchMarkdown();
  }, [filePath]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <Spin tip="Loading slide content...">
          <div style={{ padding: "50px" }} />
        </Spin>
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Error Loading Slide Content"
        subTitle={<Text type="danger">Details: {error}</Text>}
      />
    );
  }

  return (
    <div className="markdown-slide-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownSlideRenderer;
