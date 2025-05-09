import React, { useEffect } from "react";
import {
  Card,
  Typography,
  Space,
  Divider,
  List,
  Row,
  Col,
  Tag,
  Alert,
  Descriptions,
} from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";
import {
  InfoCircleOutlined,
  SwapOutlined,
  ArrowRightOutlined,
  WifiOutlined,
  LockOutlined,
  CloudDownloadOutlined,
  MessageOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const codeBlockStyle: React.CSSProperties = {
  borderRadius: "6px",
  padding: "1rem",
  fontSize: "0.85rem",
  margin: "1rem 0",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  textAlign: "left",
};

const httpDiagram = `
sequenceDiagram
    participant C as Client
    participant S as Server
    Title HTTP/HTTPS Request-Response

    C->>S: 1. TCP Handshake (for new connection)
    activate S
    S-->>C: TCP ACK
    deactivate S

    C->>S: 2. HTTP GET /resource
    activate S
    S->>S: Process Request
    S-->>C: 3. HTTP 200 OK <br/> Content-Type: application/json <br/> { "data": "..." }
    deactivate S
    Note over C,S: Connection may be kept alive or closed
`;

const websocketDiagram = `
sequenceDiagram
    participant C as Client
    participant S as Server
    Title WebSocket Communication

    C->>S: 1. HTTP GET /chat (Upgrade: websocket)
    activate S
    S-->>C: 2. HTTP 101 Switching Protocols
    deactivate S
    Note over C,S: WebSocket Connection Established (Persistent, Full-Duplex)

    C->>S: 3. Client sends message (JSON/Text/Binary)
    activate S
    S->>S: Process message
    S-->>C: 4. Server sends message (e.g., broadcast to clients)
    deactivate S

    S->>C: 5. Server sends another message (e.g., real-time update)
    activate S
    deactivate S
    C->>S: 6. Client sends another message
    activate S
    deactivate S
    
    Note over C,S: Connection remains open until explicitly closed by Client or Server
`;

const sseDiagram = `
sequenceDiagram
    participant C as Client
    participant S as Server
    Title Server-Sent Events (SSE)

    C->>S: 1. HTTP GET /updates (Accept: text/event-stream)
    activate S
    S-->>C: 2. HTTP 200 OK <br/> Content-Type: text/event-stream <br/> Connection: keep-alive
    deactivate S
    Note over C,S: SSE Connection Established (Persistent, Server-to-Client)

    S->>C: 3. event: message <br/> data: {"update": "Item A sold!"}
    activate S
    deactivate S
    
    S->>C: 4. event: notification <br/> data: {"alert": "New stock arrived"} <br/> id: 123
    activate S
    deactivate S

    S->>C: 5. data: Just a simple string data
    activate S
    deactivate S
    
    Note over C,S: Client listens for events. Connection stays open. <br/> Server can send events periodically or when data changes.
`;

const httpCode = `
// Client-side (browser fetch)
fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log('HTTP Data:', data))
  .catch(error => console.error('HTTP Error:', error));

// Server-side (Node.js/Express example)
// app.get('/api/data', (req, res) => {
//   res.json({ message: 'Hello from server!' });
// });
`;

const websocketCode = `
// Client-side
const socket = new WebSocket('wss://example.com/chat');

socket.onopen = () => {
  console.log('WebSocket connection established.');
  socket.send(JSON.stringify({ type: 'join', room: 'general' }));
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('WebSocket message received:', message);
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

socket.onclose = () => {
  console.log('WebSocket connection closed.');
};
`;

const sseCode = `
// Client-side
const eventSource = new EventSource('/api/updates');

eventSource.onmessage = (event) => {
  // Generic message event
  console.log('SSE generic message:', event.data);
  // const data = JSON.parse(event.data); // If data is JSON, ensure it is valid before parsing
  // Process data
};

eventSource.addEventListener('notification', (event) => {
  // Custom named event
  console.log('SSE "notification" event:', event.data);
  // const notification = JSON.parse(event.data); // If data is JSON, ensure it is valid
  // Display notification
});

eventSource.onerror = (error) => {
  console.error('SSE error:', error);
  // Handle error, e.g., EventSource will attempt to reconnect by default
  if (eventSource.readyState === EventSource.CLOSED) {
    console.log('SSE connection closed by server or max retries reached.');
  }
};
`;

/**
 * Renders a slide explaining various network protocols relevant to frontend development.
 *
 * @returns {JSX.Element} The NetworkProtocolsSlide component.
 */
const NetworkProtocolsSlide: React.FC = () => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "neutral",
      fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
    });
    const timer = setTimeout(() => {
      try {
        const mermaidElements = Array.from(
          document.querySelectorAll<HTMLElement>(".mermaid"),
        );
        if (mermaidElements.length > 0) {
          mermaid.run({ nodes: mermaidElements });
        }
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ padding: "20px", width: "100%" }}
    >
      <Card>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          <WifiOutlined style={{ marginRight: 8 }} />
          Understanding Network Protocols in Frontend
        </Title>
        <Paragraph style={{ textAlign: "center" }}>
          Frontend applications communicate with servers and other services
          using various network protocols. Each protocol has distinct
          characteristics making it suitable for different communication
          patterns. This slide covers HTTP/HTTPS, WebSockets, and Server-Sent
          Events (SSE).
        </Paragraph>
      </Card>

      {/* HTTP/HTTPS Section */}
      <Card
        title={
          <Space>
            <SwapOutlined />
            <Text strong>
              HTTP/HTTPS (HyperText Transfer Protocol / Secure)
            </Text>
          </Space>
        }
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <Paragraph>
              The foundation of data communication for the World Wide Web. HTTP
              is an application-layer protocol for transmitting hypermedia
              documents, such as HTML. HTTPS is the secure version, encrypting
              the communication channel using TLS/SSL.
            </Paragraph>
            <Title level={5}>Key Characteristics:</Title>
            <List
              size="small"
              dataSource={[
                {
                  icon: <InfoCircleOutlined />,
                  text: "Request-Response Model: Client sends a request, server sends a response.",
                },
                {
                  icon: <InfoCircleOutlined />,
                  text: "Stateless: Each request from client to server is treated independently by default (can use cookies/sessions for state).",
                },
                {
                  icon: <InfoCircleOutlined />,
                  text: "Versions: HTTP/1.1 (persistent connections, pipelining), HTTP/2 (multiplexing, header compression, server push), HTTP/3 (QUIC-based, improved performance).",
                },
                {
                  icon: <LockOutlined />,
                  text: "Security: HTTPS uses encryption to protect data in transit.",
                },
                {
                  icon: <CloudDownloadOutlined />,
                  text: "Use Cases: Fetching web pages, APIs (REST, GraphQL), downloading files, submitting forms.",
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    {item.icon}
                    {item.text}
                  </Space>
                </List.Item>
              )}
            />
            <Title level={5} style={{ marginTop: 16 }}>
              Example Usage (Fetch API):
            </Title>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={codeBlockStyle}
            >
              {httpCode}
            </SyntaxHighlighter>
          </Col>
          <Col xs={24} md={12}>
            <div
              className="mermaid"
              style={{
                textAlign: "center",
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                padding: 16,
                background: "#f9f9f9",
                overflowX: "auto",
              }}
            >
              {httpDiagram}
            </div>
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* WebSockets Section */}
      <Card
        title={
          <Space>
            <MessageOutlined />
            <Text strong>WebSockets</Text>
          </Space>
        }
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <Paragraph>
              Provides a full-duplex communication channel over a single,
              long-lived TCP connection. It allows for real-time, bidirectional
              data exchange between client and server.
            </Paragraph>
            <Title level={5}>Key Characteristics:</Title>
            <List
              size="small"
              dataSource={[
                {
                  icon: <SwapOutlined />,
                  text: "Bidirectional & Full-Duplex: Client and server can send messages independently and simultaneously.",
                },
                {
                  icon: <InfoCircleOutlined />,
                  text: "Persistent Connection: Established via an HTTP handshake, then upgraded to a TCP connection.",
                },
                {
                  icon: <InfoCircleOutlined />,
                  text: "Low Latency: Ideal for applications requiring fast, continuous updates.",
                },
                {
                  icon: <InfoCircleOutlined />,
                  text: "Protocols: \`ws://\` (unsecure) and \`wss://\` (secure).",
                },
                {
                  icon: <CloudDownloadOutlined />,
                  text: "Use Cases: Real-time chat, live gaming, collaborative editing, financial data streams.",
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    {item.icon}
                    {item.text}
                  </Space>
                </List.Item>
              )}
            />
            <Title level={5} style={{ marginTop: 16 }}>
              Example Usage:
            </Title>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={codeBlockStyle}
            >
              {websocketCode}
            </SyntaxHighlighter>
          </Col>
          <Col xs={24} md={12}>
            <div
              className="mermaid"
              style={{
                textAlign: "center",
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                padding: 16,
                background: "#f9f9f9",
                overflowX: "auto",
              }}
            >
              {websocketDiagram}
            </div>
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* Server-Sent Events (SSE) Section */}
      <Card
        title={
          <Space>
            <NotificationOutlined />
            <Text strong>Server-Sent Events (SSE)</Text>
          </Space>
        }
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <Paragraph>
              Enables a server to push data to a client unilaterally once an
              initial client connection has been established. It's a standard
              for one-way, server-to-client communication over HTTP.
            </Paragraph>
            <Title level={5}>Key Characteristics:</Title>
            <List
              size="small"
              dataSource={[
                {
                  icon: <ArrowRightOutlined />,
                  text: "Unidirectional: Server sends data to the client; client cannot send data back via SSE (uses HTTP for initial connection).",
                },
                {
                  icon: <InfoCircleOutlined />,
                  text: "Persistent Connection: Built on top of HTTP, keeps connection open for server updates.",
                },
                {
                  icon: <InfoCircleOutlined />,
                  text: "Automatic Reconnection: Browsers automatically attempt to reconnect if the connection is lost.",
                },
                {
                  icon: <InfoCircleOutlined />,
                  text: "Event Types: Supports named events and event IDs for tracking.",
                },
                {
                  icon: <CloudDownloadOutlined />,
                  text: "Use Cases: Live notifications (social media updates, news feeds), stock tickers, real-time dashboards (monitoring).",
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    {item.icon}
                    {item.text}
                  </Space>
                </List.Item>
              )}
            />
            <Title level={5} style={{ marginTop: 16 }}>
              Example Usage:
            </Title>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={codeBlockStyle}
            >
              {sseCode}
            </SyntaxHighlighter>
          </Col>
          <Col xs={24} md={12}>
            <div
              className="mermaid"
              style={{
                textAlign: "center",
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                padding: 16,
                background: "#f9f9f9",
                overflowX: "auto",
              }}
            >
              {sseDiagram}
            </div>
          </Col>
        </Row>
      </Card>

      <Alert
        message="Further Learning & Considerations"
        type="info"
        showIcon
        description={
          <Space direction="vertical">
            <Paragraph>To dive deeper, explore these topics:</Paragraph>
            <List size="small">
              <List.Item>
                <Text>
                  <strong>HTTP/2 & HTTP/3:</strong> Investigate performance
                  improvements like multiplexing, header compression, and QUIC.
                  Read more at{" "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MDN: Evolution of HTTP
                  </a>
                  .
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                  <strong>WebSockets Deep Dive:</strong> Understand
                  subprotocols, message framing, and scaling strategies. Check
                  out{" "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MDN: WebSockets API
                  </a>
                  .
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                  <strong>Server-Sent Events Details:</strong> Learn about event
                  formatting, error handling, and last event ID. Visit{" "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MDN: Using Server-Sent Events
                  </a>
                  .
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                  <strong>Choosing the Right Protocol:</strong> Consider factors
                  like data directionality, frequency of updates, latency
                  requirements, and server capabilities.
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                  <strong>WebRTC (Web Real-Time Communication):</strong> For
                  peer-to-peer communication of audio, video, and generic data.
                  Explore{" "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MDN: WebRTC API
                  </a>
                  .
                </Text>
              </List.Item>
            </List>
            <Paragraph>
              Modern applications often use a combination of these protocols.
              For example, HTTP for initial page load and API calls, WebSockets
              for chat, and SSE for notifications.
            </Paragraph>
          </Space>
        }
        style={{ marginTop: 20 }}
      />
    </Space>
  );
};

export default NetworkProtocolsSlide;
