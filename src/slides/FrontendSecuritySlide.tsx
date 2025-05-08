import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Space,
  Divider,
  Alert,
  Row,
  Col,
  Input,
  Button,
  Tabs,
  List,
} from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";
import DOMPurify from "dompurify";

const { Title, Paragraph, Text, Link } = Typography;
const { TabPane } = Tabs;

const codeSnippetStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  maxHeight: "300px",
  overflow: "auto",
};

const diagramReflectedXSS = `
sequenceDiagram
    participant User
    participant MaliciousSite as Malicious Site / Link
    participant VulnerableApp as Vulnerable Frontend App
    participant Browser

    MaliciousSite->>User: Tricks user to click link: vulnerable.com/search?query=<script>alert('XSS')</script>
    User->>Browser: Clicks link
    Browser->>VulnerableApp: GET /search?query=<script>alert('XSS')</script>
    activate VulnerableApp
    VulnerableApp->>VulnerableApp: Renders search query directly into HTML (e.g., innerHTML)
    VulnerableApp-->>Browser: HTML Response with embedded malicious script
    deactivate VulnerableApp
    Browser->>Browser: Executes malicious script from query
    Browser->>User: Shows alert('XSS') (or worse, steals cookies)
`;

const diagramOutputEncoding = `
sequenceDiagram
    participant UserInput as User Input: <script>alert('XSS')</script>
    participant FrontendApp as Frontend App (with Output Encoding)
    participant BrowserRender as Browser Rendering Engine
    participant DOM

    UserInput-->>FrontendApp: Input received
    activate FrontendApp
    FrontendApp->>FrontendApp: Process input, e.g., userInput = "&lt;script&gt;alert('XSS')&lt;/script&gt;" (HTML Entity Encoded)
    FrontendApp-->>BrowserRender: Sends encoded string to be rendered in HTML context
    deactivate FrontendApp
    activate BrowserRender
    BrowserRender->>DOM: Treats encoded string as literal text, not executable script
    DOM-->>User: Displays: <script>alert('XSS')</script> (harmless text)
    deactivate BrowserRender
    Note right of DOM: Malicious script is not executed.
`;

/**
 * @function XSSDemo
 * @description Interactive demo for XSS vulnerabilities and prevention.
 */
const XSSDemo: React.FC = () => {
  const [userInput, setUserInput] = useState<string>(
    "<img src=x onerror=alert('XSS-Demo!') />",
  );
  const [renderMode, setRenderMode] = useState<
    "unsafe" | "safeText" | "safeDOMPurify" | "react"
  >("unsafe");

  const getRenderedOutput = () => {
    switch (renderMode) {
      case "unsafe":
        // UNSAFE: Directly using innerHTML (for demo purposes ONLY)
        return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
      case "safeText":
        // SAFE: Using textContent equivalent (React does this by default for children)
        return <div>{userInput}</div>; // React JSX automatically encodes string children
      case "safeDOMPurify":
        // SAFE: Using DOMPurify to sanitize HTML
        const cleanHTML = DOMPurify.sanitize(userInput);
        return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
      case "react":
        // SAFE: React's default handling
        return <div>{userInput}</div>;
      default:
        return null;
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input.TextArea
        rows={3}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter HTML/script content here..."
      />
      <Paragraph>
        Try inputs like:
        <ul>
          <li>
            <code>&lt;img src=x onerror=alert('XSS from img!') /&gt;</code>
          </li>
          <li>
            <code>&lt;script&gt;alert('XSS from script!')&lt;/script&gt;</code>
          </li>
          <li>
            <code>
              &lt;a href="javascript:alert('XSS from href!')"&gt;Click
              me&lt;/a&gt;
            </code>
          </li>
        </ul>
      </Paragraph>
      <Tabs
        activeKey={renderMode}
        onChange={(key) => setRenderMode(key as any)}
      >
        <TabPane tab="Unsafe (innerHTML)" key="unsafe">
          <Alert
            type="error"
            message="UNSAFE: This method directly injects HTML and is vulnerable to XSS."
          />
        </TabPane>
        <TabPane tab="Safe (React Default)" key="react">
          <Alert
            type="success"
            message="SAFE: React JSX automatically escapes string content, preventing XSS."
          />
        </TabPane>
        <TabPane tab="Safe (DOMPurify)" key="safeDOMPurify">
          <Alert
            type="success"
            message="SAFE: DOMPurify sanitizes the HTML input, removing malicious parts."
          />
        </TabPane>
      </Tabs>
      <Divider>Rendered Output:</Divider>
      <Card style={{ minHeight: 100, backgroundColor: "#fafafa" }}>
        {getRenderedOutput()}
      </Card>
    </Space>
  );
};

/**
 * @function FrontendSecuritySlide
 * @description A slide explaining XSS and frontend security best practices.
 * @returns {JSX.Element}
 */
const FrontendSecuritySlide: React.FC = () => {
  const mermaidIds = {
    reflectedXSS: "mermaid-reflected-xss",
    outputEncoding: "mermaid-output-encoding",
  };

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "base" });
    const renderMermaid = (id: string, diagramData: string) => {
      const element = document.getElementById(id);
      if (element && element.getAttribute("data-processed") !== "true") {
        element.innerHTML = diagramData.trim();
        try {
          mermaid.run({ nodes: [element] });
        } catch (e) {
          console.error("Mermaid rendering error for ID:", id, e);
          element.innerHTML = "Error rendering diagram.";
        }
      }
    };
    renderMermaid(mermaidIds.reflectedXSS, diagramReflectedXSS);
    renderMermaid(mermaidIds.outputEncoding, diagramOutputEncoding);
  }, [mermaidIds.reflectedXSS, mermaidIds.outputEncoding]);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Cross-Site Scripting (XSS) & Frontend Security ⚔️
        </Title>
        <Paragraph>
          Cross-Site Scripting (XSS) is a widespread vulnerability that allows
          attackers to inject malicious scripts into web pages viewed by other
          users. Understanding and mitigating XSS is fundamental to building
          secure frontend applications.
        </Paragraph>
      </Card>

      <Card title="Reflected XSS Attack Flow">
        <div
          id={mermaidIds.reflectedXSS}
          className="mermaid"
          style={{
            textAlign: "center",
            backgroundColor: "#f0f2f5",
            padding: "16px",
            borderRadius: "4px",
          }}
        />
      </Card>

      <Card title="How Output Encoding Prevents XSS">
        <div
          id={mermaidIds.outputEncoding}
          className="mermaid"
          style={{
            textAlign: "center",
            backgroundColor: "#f0f2f5",
            padding: "16px",
            borderRadius: "4px",
          }}
        />
      </Card>

      <Card>
        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <Divider orientation="left">Interactive XSS Demo</Divider>
            <XSSDemo />
          </Col>
          <Col xs={24} lg={12}>
            <Divider orientation="left">Explanation & Mitigation</Divider>
            <Title level={4}>What is XSS?</Title>
            <Paragraph>
              XSS attacks occur when an attacker manages to inject malicious
              client-side scripts (usually JavaScript) into web pages viewed by
              other users. These scripts can then:
            </Paragraph>
            <List>
              <List.Item>
                Steal sensitive information (session cookies, tokens, personal
                data).
              </List.Item>
              <List.Item>Perform actions on behalf of the user.</List.Item>
              <List.Item>
                Deface websites or redirect users to malicious sites.
              </List.Item>
              <List.Item>Install malware on the user's computer.</List.Item>
            </List>
            <Paragraph>
              Common types include: <Text strong>Reflected XSS</Text> (script
              from current HTTP request), <Text strong>Stored XSS</Text> (script
              from website's database), and <Text strong>DOM-based XSS</Text>{" "}
              (vulnerability in client-side code).
            </Paragraph>

            <Title level={4}>Key Frontend Security Principles</Title>

            <Title level={5}>1. Output Encoding</Title>
            <Paragraph>
              <Text strong>This is the primary defense against XSS.</Text>{" "}
              Always encode data appropriately for the context it's being
              rendered in.
            </Paragraph>
            <List>
              <List.Item>
                <Text strong>HTML Body:</Text> Convert characters like{" "}
                <code>&lt; &gt; & " ' /</code> to their HTML entities (e.g.,{" "}
                <code>&amp;lt;</code>, <code>&amp;gt;</code>). React JSX does
                this automatically for string content within elements.
              </List.Item>
              <List.Item>
                <Text strong>HTML Attributes:</Text> Encode similarly,
                especially for attributes like <code>value</code>,{" "}
                <code>href</code> (for non-JS URLs), <code>src</code>.
              </List.Item>
              <List.Item>
                <Text strong>JavaScript Contexts:</Text> If inserting data into
                a script, use specific JS encoding (e.g., hex encoding, ensure
                it's within quotes if a string).
              </List.Item>
              <List.Item>
                <Text strong>CSS Contexts:</Text> Avoid user input in CSS where
                possible. If necessary, strictly validate and encode.
              </List.Item>
              <List.Item>
                <Text strong>URL Components:</Text> Use{" "}
                <code>encodeURIComponent</code> for query parameters.
              </List.Item>
            </List>
            <Paragraph strong>Unsafe (Raw HTML Injection - Avoid!)</Paragraph>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`const userInput = "<img src=x onerror=alert('XSS') />";
// ❌ DANGEROUS if userInput is attacker-controlled:
document.getElementById('container').innerHTML = userInput;`}
            </SyntaxHighlighter>
            <Paragraph strong>Safer (React - Default Behavior)</Paragraph>
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`const userInput = "<img src=x onerror=alert('XSS') />";
// ✅ SAFE (React escapes this by default):
const MyComponent = () => <div>{userInput}</div>;
// Renders as literal text: <img src=x onerror=alert('XSS') />`}
            </SyntaxHighlighter>
            <Paragraph strong>
              Safer (DOMPurify for HTML Sanitization)
            </Paragraph>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`import DOMPurify from 'dompurify'; // npm install dompurify

const userInput = "<img src=x onerror=alert('XSS') /><p>Hello</p>";
const cleanHTML = DOMPurify.sanitize(userInput);
// ✅ SAFER (DOMPurify removes dangerous tags/attributes):
document.getElementById('container').innerHTML = cleanHTML;
// Result: "<p>Hello</p>" (img tag is removed)`}
            </SyntaxHighlighter>

            <Title level={5}>2. Content Security Policy (CSP)</Title>
            <Paragraph>
              CSP is an HTTP header that allows you to control the resources
              (scripts, styles, images, etc.) a browser is allowed to load for a
              given page. It's a powerful second line of defense.
            </Paragraph>
            <SyntaxHighlighter
              language="http"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com`}
            </SyntaxHighlighter>
            <Paragraph>
              This policy means: Default for all resources is 'self' (same
              origin). Images can be from anywhere. Media from media1/2.com.
              Scripts only from userscripts.example.com.
            </Paragraph>

            <Title level={5}>3. Validate and Sanitize Inputs</Title>
            <Paragraph>
              While output encoding is key for XSS, input validation is crucial
              for overall security and data integrity. Validate data type,
              length, format, range. Sanitize if you must accept HTML (use a
              robust library like DOMPurify).
            </Paragraph>

            <Title level={5}>
              4. Use Trusted Frameworks & Libraries Wisely
            </Title>
            <Paragraph>
              Modern frameworks like React, Angular, and Vue have built-in XSS
              protections (e.g., React's JSX encoding). Understand these
              protections and avoid patterns that bypass them (like using{" "}
              <code>dangerouslySetInnerHTML</code> without proper sanitization).
            </Paragraph>

            <Title level={5}>5. HTTPOnly Cookies</Title>
            <Paragraph>
              If your session tokens are stored in cookies, set the{" "}
              <code>HttpOnly</code> flag. This prevents client-side JavaScript
              from accessing them, mitigating cookie theft via XSS.
            </Paragraph>

            <Title level={5}>6. Other Secure Headers</Title>
            <List>
              <List.Item>
                <Text strong>X-Content-Type-Options: nosniff</Text> - Prevents
                MIME-sniffing attacks.
              </List.Item>
              <List.Item>
                <Text strong>X-Frame-Options: DENY/SAMEORIGIN</Text> - Protects
                against clickjacking.
              </List.Item>
              <List.Item>
                <Text strong>Strict-Transport-Security (HSTS)</Text> - Enforces
                HTTPS.
              </List.Item>
            </List>

            <Title level={5}>7. Regularly Audit Dependencies</Title>
            <Paragraph>
              Use tools like <code>npm audit</code> or <code>yarn audit</code>{" "}
              to check for known vulnerabilities in your project dependencies
              and update them promptly.
            </Paragraph>

            <Alert
              type="warning"
              message={
                <Text>
                  Remember: Frontend security is layered. No single solution is
                  foolproof. Combine these techniques for robust protection.
                </Text>
              }
              showIcon
            />
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default FrontendSecuritySlide;
