import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownSlideRendererProps {
  filePath: string;
}

/**
 * A component that fetches markdown content from a given path (relative to the public folder)
 * and renders it using react-markdown with GitHub Flavored Markdown support.
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
        // Assuming markdown files are copied to the public directory during build,
        // or served from a path accessible via fetch.
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${filePath}: ${response.statusText}`,
          );
        }
        const text = await response.text();
        setMarkdown(text);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error("Error fetching markdown:", err);
      }
      setLoading(false);
    };

    fetchMarkdown();
  }, [filePath]);

  if (loading) {
    return <div>Loading slide content...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error loading slide: {error}</div>;
  }

  // Apply some basic styling for readability
  // More advanced styling can be done via CSS or custom components for react-markdown
  return (
    <div
      className="markdown-slide-content"
      style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownSlideRenderer;
