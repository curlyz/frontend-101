import React, { useEffect } from "react";
import { Card, Typography, List, Divider, Tag, Row, Col, Alert } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RocketOutlined, CodeOutlined, BulbOutlined } from "@ant-design/icons";
import ReferenceLink from "../components/common/ReferenceLink";
import mermaid from "mermaid";

const { Title, Paragraph, Text, Link } = Typography;

const codeSnippetStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  maxHeight: "400px",
  overflow: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
};

const viteCodeInspectorPluginInstall = `
npm install code-inspector-plugin -D
# or
yarn add code-inspector-plugin -D
# or
pnpm add code-inspector-plugin -D
`;

const viteCodeInspectorPluginUsage = `
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Assuming a React project
import { codeInspectorPlugin } from 'code-inspector-plugin';

export default defineConfig({
  plugins: [
    react(),
    codeInspectorPlugin({
      bundler: 'vite',
      // Optional: define a specific key combination
      // hotKeys: ['control', 'shift'], // Example: Ctrl+Shift
      // openInEditor: 'cursor', // If you want to specify Cursor IDE
    }),
  ],
});
`;

const DeveloperToolsSlide: React.FC = () => {
  useEffect(() => {
    try {
      mermaid.initialize({ startOnLoad: true, theme: "neutral" });
    } catch (e) {
      console.error("Mermaid initialization error on DeveloperToolsSlide:", e);
    }
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        <BulbOutlined style={{ marginRight: "10px" }} />
        Developer Tools: Bridging Browser to Code
      </Title>

      <Alert
        message="Enhancing Development Workflow"
        description="These tools help you quickly navigate from a UI element you see in the browser directly to its underlying source code in your IDE, significantly speeding up debugging and iteration."
        type="info"
        showIcon
        style={{ marginBottom: "24px" }}
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <CodeOutlined style={{ marginRight: 8 }} /> Code Inspector
                Plugin
              </>
            }
            hoverable
          >
            <Paragraph>
              The <Text strong>code-inspector-plugin</Text> (often found as{" "}
              <Tag>vite-code-inspector-plugin</Tag> for Vite projects) is a
              powerful development utility. It integrates with your build
              process (like Vite or Webpack) to enable direct navigation from a
              clicked element in your browser to its source code in your IDE.
            </Paragraph>
            <Paragraph>
              <Text strong>Key Features:</Text>
              <List size="small" style={{ marginLeft: 20, marginTop: 8 }}>
                <List.Item>
                  Activates by pressing a key combination (e.g., Option+Shift or
                  Alt+Shift) and then clicking an element.
                </List.Item>
                <List.Item>
                  Supports various frameworks like React, Vue, Svelte, Solid,
                  and Astro.
                </List.Item>
                <List.Item>
                  Compatible with popular IDEs including VS Code, WebStorm, and
                  Cursor.
                </List.Item>
                <List.Item>
                  Helps identify component boundaries and locate code swiftly.
                </List.Item>
              </List>
            </Paragraph>
            <Paragraph>
              Check out the plugin on NPM:{" "}
              <ReferenceLink href="https://www.npmjs.com/package/code-inspector-plugin">
                code-inspector-plugin
              </ReferenceLink>
            </Paragraph>
            <Divider>Installation</Divider>
            <SyntaxHighlighter
              language="bash"
              style={atomDark}
              customStyle={codeSnippetStyle}
            >
              {viteCodeInspectorPluginInstall.trim()}
            </SyntaxHighlighter>
            <Divider>Example Usage (Vite)</Divider>
            <SyntaxHighlighter
              language="typescript"
              style={atomDark}
              customStyle={codeSnippetStyle}
            >
              {viteCodeInspectorPluginUsage.trim()}
            </SyntaxHighlighter>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <RocketOutlined style={{ marginRight: 8 }} /> LocatorJS
              </>
            }
            hoverable
          >
            <Paragraph>
              <Text strong>LocatorJS</Text> offers a similar "click-to-code"
              functionality. It helps you instantly jump from a component in
              your browser to its definition in your codebase.
            </Paragraph>
            <Paragraph>
              <Text strong>Key Features:</Text>
              <List size="small" style={{ marginLeft: 20, marginTop: 8 }}>
                <List.Item>
                  Can be used as a <Text strong>browser extension</Text>{" "}
                  (Chrome, Firefox, Edge) for zero-config setup with many React
                  stacks.
                </List.Item>
                <List.Item>
                  Also available as a library for deeper integration (e.g., via
                  Babel plugin for certain setups).
                </List.Item>
                <List.Item>
                  Supports React, Preact, Solid, Vue (experimental), and Svelte
                  (experimental).
                </List.Item>
                <List.Item>
                  Typically activated by holding Option/Alt and clicking a
                  component.
                </List.Item>
              </List>
            </Paragraph>
            <Paragraph>
              Visit the official website:{" "}
              <ReferenceLink href="https://www.locatorjs.com/">
                LocatorJS Homepage
              </ReferenceLink>
            </Paragraph>
            <Paragraph>
              The browser extension offers a very convenient way to get started,
              often requiring no changes to your project's codebase.
            </Paragraph>
            <Alert
              type="success"
              message="Tip for LocatorJS Extension"
              description="If using the LocatorJS browser extension, ensure it's enabled and correctly configured for your IDE. It often works best with React DevTools installed."
              showIcon
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>
      </Row>

      <Divider style={{ marginTop: "32px" }} />
      <Title level={4}>Why Use These Tools?</Title>
      <Paragraph>
        Both <Text code>code-inspector-plugin</Text> and{" "}
        <Text code>LocatorJS</Text> address a common pain point in web
        development: the time spent manually hunting for the source code of a
        visual element. By providing a direct bridge, they:
      </Paragraph>
      <List>
        <List.Item>
          ✅ <Text strong>Boost Productivity:</Text> Significantly reduce
          context switching and search time.
        </List.Item>
        <List.Item>
          ✅ <Text strong>Simplify Debugging:</Text> Quickly identify and
          inspect the code responsible for specific UI parts.
        </List.Item>
        <List.Item>
          ✅ <Text strong>Aid Onboarding:</Text> Help new developers understand
          codebase structure faster by visually connecting UI to code.
        </List.Item>
        <List.Item>
          ✅ <Text strong>Improve Code Exploration:</Text> Make it easier to
          explore unfamiliar codebases.
        </List.Item>
      </List>
      <Paragraph style={{ marginTop: "16px" }}>
        While they have slightly different approaches (build-time integration
        vs. browser extension/library), their core goal is to streamline the
        developer experience. Consider trying them out to see which fits your
        workflow best!
      </Paragraph>

      <Alert
        message="Further Learning"
        description={
          <Paragraph>
            Beyond these specific tools, master your browser's built-in
            developer tools and the React Developer Tools:
            <a
              href="https://developer.chrome.com/docs/devtools/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Chrome DevTools
            </a>
            ,
            <a
              href="https://firefox-source-docs.mozilla.org/devtools-user/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firefox Developer Tools
            </a>
            , and the
            <a
              href="https://react.dev/learn/react-developer-tools"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              React Developer Tools
            </a>
            .
          </Paragraph>
        }
        type="success"
        showIcon
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default DeveloperToolsSlide;
