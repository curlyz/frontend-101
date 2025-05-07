import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Or choose another theme

/**
 * @interface CodeDisplayProps
 * Props for the CodeDisplay component.
 * @property {string} code - The code string to display.
 * @property {string} [language='typescript'] - The programming language for syntax highlighting.
 */
interface CodeDisplayProps {
  code: string;
  language?: string;
}

/**
 * A component to display code blocks with Markdown rendering and syntax highlighting.
 * It uses react-markdown for rendering Markdown content and react-syntax-highlighter
 * for syntax highlighting within code blocks.
 *
 * @component
 * @param {CodeDisplayProps} props The props for the component.
 * @returns {JSX.Element} The rendered CodeDisplay component.
 */
export const CodeDisplay: React.FC<CodeDisplayProps> = ({
  code,
  language = "typescript",
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={materialDark as any}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {`\`\`\`${language}\n${code}\n\`\`\``}
    </ReactMarkdown>
  );
};

// Optional: Define a display name for easier debugging in React DevTools
CodeDisplay.displayName = "CodeDisplay";
