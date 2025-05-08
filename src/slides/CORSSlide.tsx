import React, { useEffect } from "react";
import {
  Card,
  Typography,
  Divider,
  Tag,
  Row,
  Col,
  Alert,
  Steps,
  List,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  SecurityScanOutlined,
  InteractionOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ApiOutlined,
  WarningOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ReferenceLink from "../components/common/ReferenceLink";
import mermaid from "mermaid";

const { Title, Paragraph, Text, Link } = Typography;
const { Step } = Steps;

const codeSnippetStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  marginTop: "16px",
  maxHeight: "300px",
  overflow: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
};

// Define interface for structured header information
interface HeaderInfo {
  id: string;
  name: string;
  direction: "Request" | "Response" | "Info";
  details: string | React.ReactNode;
}

// Define columns for the headers table
const headerTableColumns: ColumnsType<HeaderInfo> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string, record: HeaderInfo) =>
      record.direction === "Info" ? (
        <Text strong>{text}</Text>
      ) : (
        <Text code>{text}</Text>
      ),
  },
  {
    title: "Direction/Type",
    dataIndex: "direction",
    key: "direction",
    render: (_text: any, record: HeaderInfo) => {
      const directionValue = record.direction;
      let color = "default";
      if (directionValue === "Request") color = "geekblue";
      else if (directionValue === "Response") color = "green";
      else if (directionValue === "Info") color = "purple";
      return <Tag color={color}>{directionValue}</Tag>;
    },
  },
  {
    title: "Details / Example Value",
    dataIndex: "details",
    key: "details",
    width: "60%", // Give more space to details
  },
];

// --- Scenario 1: Same-Origin ---
const sameOriginDiagram = `
sequenceDiagram
    participant Browser
    participant ServerA as Server (example.com)
    Browser->>ServerA: GET /data (Origin: example.com)
    Note over Browser,ServerA: Same Origin (No CORS check needed)
    ServerA-->>Browser: 200 OK [Data]
`;
const sameOriginClient = `
// Running on https://example.com
fetch('/data') // No origin specified, defaults to same-origin
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
`;
const sameOriginServer = `
// Server at https://example.com
// No CORS headers needed for same-origin requests.
// Just handle the request and send the response.

app.get('/data', (req, res) => {
  res.json({ message: 'This is same-origin data!' });
});
`;

// --- Scenario 2: Simple Success ---
const simpleSuccessDiagram = `
sequenceDiagram
    participant Browser
    participant ServerB as Server (api.example.com)
    Browser->>ServerB: GET /resource (Origin: app.example.com)
    Note over Browser,ServerB: Cross-Origin Request
    ServerB-->>Browser: 200 OK [Data] (Header: Access-Control-Allow-Origin: app.example.com)
    Note over Browser,ServerB: Browser checks ACAO header, allows response.
`;
const simpleSuccessClient = `
// Running on https://app.example.com
fetch('https://api.example.com/resource') // Cross-origin simple GET
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error)); // Error won't typically show server details due to CORS block
`;
const simpleSuccessServer = `
// Server at https://api.example.com
app.use((req, res, next) => {
  // Allow requests specifically from app.example.com
  res.setHeader('Access-Control-Allow-Origin', 'https://app.example.com');
  // Or allow any origin (less secure for APIs)
  // res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/resource', (req, res) => {
  res.json({ message: 'Cross-origin data delivered!' });
});
`;

// --- Scenario 3: Simple Failure ---
const simpleFailureDiagram = `
sequenceDiagram
    participant Browser
    participant ServerB as Server (api.example.com)
    Browser->>ServerB: GET /resource (Origin: app.example.com)
    Note over Browser,ServerB: Cross-Origin Request
    ServerB-->>Browser: 200 OK [Data] (No ACAO Header!)
    Note over Browser,ServerB: Browser blocks response due to missing ACAO header.
    Browser->>Browser: CORS Error in Console
`;
const simpleFailureServer = `
// Server at https://api.example.com
// *** Missing Access-Control-Allow-Origin header! ***

app.get('/resource', (req, res) => {
  // Server sends data, but browser will block it from client script
  res.json({ message: 'You cannot access this cross-origin!' });
});
`;

// --- Scenario 4: Preflight Success ---
const preflightSuccessDiagram = `
sequenceDiagram
    participant Browser
    participant ServerB as Server (api.example.com)
    Note over Browser,ServerB: Browser sees PUT request or custom header... needs preflight!
    Browser->>ServerB: OPTIONS /resource (Origin: app.example.com, Access-Control-Request-Method: PUT, Access-Control-Request-Headers: X-Custom-Header)
    ServerB-->>Browser: 204 No Content (Headers: ACAO: app.example.com, ACAM: PUT, ACAH: X-Custom-Header)
    Note over Browser,ServerB: Preflight OK! Browser proceeds with actual request.
    Browser->>ServerB: PUT /resource (Origin: app.example.com, Header: X-Custom-Header)
    ServerB-->>Browser: 200 OK [Data] (Header: ACAO: app.example.com)
    Note over Browser,ServerB: Browser checks ACAO, allows response.
`;
const preflightSuccessClient = `
// Running on https://app.example.com
fetch('https://api.example.com/resource', {
  method: 'PUT', // Non-simple method triggers preflight
  headers: {
    'Content-Type': 'application/json', // Non-simple header value triggers preflight
    'X-Custom-Header': 'some-value' // Custom header triggers preflight
  },
  body: JSON.stringify({ data: 'update' })
})
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
`;
const preflightSuccessServer = `
// Server at https://api.example.com
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://app.example.com');
  // Handle OPTIONS (preflight) requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Must include PUT
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header'); // Must include custom header(s)
    // Optional: Cache preflight response
    // res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    return res.status(204).end(); // Respond to OPTIONS with 204 No Content
  }
  next();
});

app.put('/resource', (req, res) => {
  console.log('Custom Header:', req.headers['x-custom-header']);
  res.json({ message: 'Resource updated via PUT!' });
});
`;

// --- Scenario 5: Preflight Failure ---
const preflightFailureDiagram = `
sequenceDiagram
    participant Browser
    participant ServerB as Server (api.example.com)
    Browser->>ServerB: OPTIONS /resource (Origin: app.example.com, Access-Control-Request-Method: DELETE)
    Note over Browser,ServerB: Server allows PUT but not DELETE
    ServerB-->>Browser: 204 No Content (Headers: ACAO: app.example.com, ACAM: PUT)
    Note over Browser,ServerB: Preflight Failed! (DELETE method not allowed). Browser stops here.
    Browser->>Browser: CORS Error (Method DELETE not allowed)
`;
const preflightFailureClient = `
// Running on https://app.example.com
fetch('https://api.example.com/resource', {
  method: 'DELETE' // This method is not allowed by the server below
})
  .then(response => console.log('This will not be reached'))
  .catch(error => console.error('CORS Error (preflight failed):', error));
`;
const preflightFailureServer = `
// Server at https://api.example.com
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://app.example.com');
  if (req.method === 'OPTIONS') {
    // *** Server only allows PUT, not DELETE ***
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  next();
});

// DELETE handler might exist, but preflight blocks the request
app.delete('/resource', (req, res) => {
  res.json({ message: 'Resource deleted (theoretically)' });
});
`;

// --- Scenario 6: Credentialed Success ---
const credSuccessDiagram = `
sequenceDiagram
    participant Browser
    participant ServerB as Server (api.example.com)
    Note over Browser,ServerB: Request includes credentials, preflight likely needed.
    Browser->>ServerB: OPTIONS /user-data (Origin: app.example.com, ACRH: true)
    ServerB-->>Browser: 204 No Content (Headers: ACAO: app.example.com, ACAC: true, ACAM: GET, ACAH: Cookie)
    Note over Browser,ServerB: Preflight OK for credentials.
    Browser->>ServerB: GET /user-data (Origin: app.example.com, Cookie: session=...)
    ServerB-->>Browser: 200 OK [User Data] (Header: ACAO: app.example.com, ACAC: true, Vary: Origin)
    Note over Browser,ServerB: Browser checks ACAO & ACAC, allows response.
`;
const credSuccessClient = `
// Running on https://app.example.com
fetch('https://api.example.com/user-data', {
  credentials: 'include' // Send cookies, Authorization headers etc.
})
  .then(response => response.json())
  .then(data => console.log('User Data:', data))
  .catch(error => console.error('Error:', error));
`;
const credSuccessServer = `
// Server at https://api.example.com
app.use((req, res, next) => {
  // *** MUST be specific origin, NOT '*' for credentials ***
  res.setHeader('Access-Control-Allow-Origin', 'https://app.example.com');
  // *** MUST be true to allow credentials ***
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  // Important for caching proxies when origin matters
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Add any other headers needed
    return res.status(204).end();
  }
  next();
});

app.get('/user-data', (req, res) => {
  // Access cookies or auth headers here (e.g., req.cookies, req.headers.authorization)
  console.log('Credentials received:', req.headers.cookie);
  res.json({ user: 'Demo', id: 123 });
});
`;

// --- Scenario 7: Credentialed Failure (Wildcard) ---
const credFailureDiagram = `
sequenceDiagram
    participant Browser
    participant ServerB as Server (api.example.com)
    Browser->>ServerB: GET /user-data (Origin: app.example.com, Cookie: session=...)
    Note over Browser,ServerB: Request has credentials, but server responds with ACAO: *
    ServerB-->>Browser: 200 OK [User Data] (Header: ACAO: *, ACAC: true)
    Note over Browser,ServerB: Browser blocks response! ACAO cannot be '*' with ACAC: true.
    Browser->>Browser: CORS Error in Console
`;
const credFailureServer = `
// Server at https://api.example.com
app.use((req, res, next) => {
  // *** WRONG: Cannot use wildcard '*' with credentials ***
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
     res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
     return res.status(204).end();
   }
  next();
});

app.get('/user-data', (req, res) => {
  res.json({ user: 'Demo', id: 123 });
});
`;

// --- Scenario 8: Dev Proxy ---
const devProxyDiagram = `
sequenceDiagram
    participant Browser
    participant DevServer as Vite Dev Server (localhost:5173)
    participant ApiServer as Actual API Server (api.example.com)

    Browser->>DevServer: GET /api/data (Origin: localhost:5173)
    Note over Browser,DevServer: Request looks same-origin to browser
    DevServer->>ApiServer: GET /data (Origin: localhost:5173 or configured)
    Note over DevServer,ApiServer: Dev Server proxies the request
    ApiServer-->>DevServer: 200 OK [Data] (May or may not have CORS headers)
    Note over DevServer: Dev Server receives response
    DevServer-->>Browser: 200 OK [Data] (No CORS headers needed from Dev Server)
    Note over Browser: Browser receives response as if it was same-origin.
`;
const devProxyClient = `
// Running on http://localhost:5173
// Request goes to the *proxy* path configured in Vite
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log('Data via proxy:', data))
  .catch(error => console.error('Proxy Error:', error));
`;
const devProxyServer = `
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with /api to api.example.com
      '/api': {
        target: 'https://api.example.com', // Your actual API server
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix before forwarding
        // secure: false, // Set to false to allow proxying to HTTPS with invalid certs (dev only!)
      },
    },
  },
});

// Actual API server at api.example.com does NOT need CORS headers
// for requests coming *from the Vite proxy*, as the proxy makes the request server-to-server.
`;

const CORSSlide: React.FC = () => {
  useEffect(() => {
    try {
      setTimeout(() => mermaid.run(), 100);
    } catch (e) {
      console.error("Mermaid rendering error on CORSSlide:", e);
    }
  }, []);

  const scenarios = [
    {
      key: "1",
      icon: <InteractionOutlined />,
      title: "Scenario 1: Same-Origin Request",
      description: (
        <>
          The simplest case. Your frontend code running on example.com requests
          data from the <em>same</em> domain (example.com).
        </>
      ),
      diagram: sameOriginDiagram,
      clientCode: sameOriginClient,
      serverCode: sameOriginServer,
      outcome: (
        <>
          Success! The browser allows the request automatically because the
          origin is the same. No CORS headers are required from the server.
        </>
      ),
      status: "success",
      headers: [
        {
          id: "s1h1",
          name: "N/A",
          direction: "Info",
          details:
            "No CORS-specific headers are involved in same-origin requests.",
        },
      ],
    },
    {
      key: "2",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      title: "Scenario 2: Simple Cross-Origin Request (Success)",
      description: (
        <>
          Your frontend (<Text code>app.example.com</Text>) requests data from a
          different API domain (<Text code>api.example.com</Text>) using a
          "simple" method (GET, POST, HEAD) and standard headers.
        </>
      ),
      diagram: simpleSuccessDiagram,
      clientCode: simpleSuccessClient,
      serverCode: simpleSuccessServer,
      outcome: (
        <>
          Success! The browser sees the{" "}
          <Text code>Access-Control-Allow-Origin</Text> header from the server
          matching its origin (or <Text code>*</Text>) and allows the frontend
          code to access the response.
        </>
      ),
      status: "success",
      headers: [
        {
          id: "s2h1",
          name: "Origin",
          direction: "Request",
          details: (
            <>
              e.g., <Text code>app.example.com</Text>
            </>
          ),
        },
        {
          id: "s2h2",
          name: "Access-Control-Allow-Origin",
          direction: "Response",
          details: (
            <>
              e.g., <Text code>app.example.com</Text> or <Text code>*</Text>
            </>
          ),
        },
      ],
    },
    {
      key: "3",
      icon: <CloseCircleTwoTone twoToneColor="#eb2f96" />,
      title: "Scenario 3: Simple Cross-Origin Request (Failure)",
      description: (
        <>
          Same setup as Scenario 2, but the API server (
          <Text code>api.example.com</Text>) forgets or is misconfigured and
          does <em>not</em> send the{" "}
          <Text code>Access-Control-Allow-Origin</Text> header.
        </>
      ),
      diagram: simpleFailureDiagram,
      clientCode: simpleSuccessClient, // Client is the same as success
      serverCode: simpleFailureServer,
      outcome: (
        <>
          Failure! Although the server sends a response, the browser blocks your
          frontend JavaScript from accessing it due to the missing{" "}
          <Text code>Access-Control-Allow-Origin</Text> header. You'll see a
          CORS error in the console.
        </>
      ),
      status: "failure",
      headers: [
        {
          id: "s3h1",
          name: "Origin",
          direction: "Request",
          details: (
            <>
              e.g., <Text code>app.example.com</Text>
            </>
          ),
        },
        {
          id: "s3h2",
          name: "Access-Control-Allow-Origin",
          direction: "Response",
          details: (
            <Text strong style={{ color: "red" }}>
              MISSING or incorrect value
            </Text>
          ),
        },
      ],
    },
    {
      key: "4",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      title: "Scenario 4: Preflighted Request (Success)",
      description: (
        <>
          Your frontend (<Text code>app.example.com</Text>) sends a request
          using a "non-simple" method (like PUT) or includes custom headers
          (like <Text code>X-Custom-Header</Text> or{" "}
          <Text code>Content-Type: application/json</Text>).
        </>
      ),
      diagram: preflightSuccessDiagram,
      clientCode: preflightSuccessClient,
      serverCode: preflightSuccessServer,
      outcome: (
        <>
          Success! The browser first sends an <Text code>OPTIONS</Text>{" "}
          (preflight) request. The server responds correctly, allowing the
          method and headers. The browser then sends the actual{" "}
          <Text code>PUT</Text> request, and the server responds with the
          correct <Text code>Access-Control-Allow-Origin</Text>, allowing
          access.
        </>
      ),
      status: "success",
      headers: [
        {
          id: "s4h1",
          name: "Origin",
          direction: "Request",
          details: (
            <>
              <Text strong>(OPTIONS)</Text> e.g.,{" "}
              <Text code>app.example.com</Text>
            </>
          ),
        },
        {
          id: "s4h2",
          name: "Access-Control-Request-Method",
          direction: "Request",
          details: (
            <>
              <Text strong>(OPTIONS)</Text> e.g., <Text code>PUT</Text>
            </>
          ),
        },
        {
          id: "s4h3",
          name: "Access-Control-Request-Headers",
          direction: "Request",
          details: (
            <>
              <Text strong>(OPTIONS)</Text> e.g.,{" "}
              <Text code>Content-Type, X-Custom-Header</Text>
            </>
          ),
        },
        {
          id: "s4h4",
          name: "Access-Control-Allow-Origin",
          direction: "Response",
          details: (
            <>
              <Text strong>(OPTIONS)</Text> e.g.,{" "}
              <Text code>app.example.com</Text>
            </>
          ),
        },
        {
          id: "s4h5",
          name: "Access-Control-Allow-Methods",
          direction: "Response",
          details: (
            <>
              <Text strong>(OPTIONS)</Text> e.g.,{" "}
              <Text code>GET, POST, PUT, OPTIONS</Text>
            </>
          ),
        },
        {
          id: "s4h6",
          name: "Access-Control-Allow-Headers",
          direction: "Response",
          details: (
            <>
              <Text strong>(OPTIONS)</Text> e.g.,{" "}
              <Text code>Content-Type, X-Custom-Header</Text>
            </>
          ),
        },
        {
          id: "s4h7",
          name: "Access-Control-Max-Age",
          direction: "Response",
          details: (
            <>
              <Text strong>(OPTIONS, Optional)</Text> e.g.,{" "}
              <Text code>86400</Text> (caches preflight)
            </>
          ),
        },
        {
          id: "s4h8",
          name: "Origin",
          direction: "Request",
          details: (
            <>
              <Text strong>(Actual PUT)</Text> e.g.,{" "}
              <Text code>app.example.com</Text>
            </>
          ),
        },
        {
          id: "s4h9",
          name: "X-Custom-Header",
          direction: "Request",
          details: (
            <>
              <Text strong>(Actual PUT)</Text> e.g.,{" "}
              <Text code>some-value</Text>
            </>
          ),
        },
        {
          id: "s4h10",
          name: "Content-Type",
          direction: "Request",
          details: (
            <>
              <Text strong>(Actual PUT)</Text> e.g.,{" "}
              <Text code>application/json</Text>
            </>
          ),
        },
        {
          id: "s4h11",
          name: "Access-Control-Allow-Origin",
          direction: "Response",
          details: (
            <>
              <Text strong>(Actual PUT)</Text> e.g.,{" "}
              <Text code>app.example.com</Text>
            </>
          ),
        },
      ],
    },
    {
      key: "5",
      icon: <CloseCircleTwoTone twoToneColor="#eb2f96" />,
      title:
        "Scenario 5: Preflighted Request (Failure - Method/Header Not Allowed)",
      description: (
        <>
          Similar to Scenario 4, but the server's preflight response doesn't
          explicitly allow the requested method (e.g., DELETE) or a custom
          header.
        </>
      ),
      diagram: preflightFailureDiagram,
      clientCode: preflightFailureClient,
      serverCode: preflightFailureServer,
      outcome: (
        <>
          Failure! The browser sends the <Text code>OPTIONS</Text> preflight
          request. The server responds, but doesn't list the{" "}
          <Text code>DELETE</Text> method in{" "}
          <Text code>Access-Control-Allow-Methods</Text>. The browser blocks the
          actual <Text code>DELETE</Text> request from ever being sent. CORS
          error occurs.
        </>
      ),
      status: "failure",
      headers: [
        {
          id: "s5h1",
          name: "Origin",
          direction: "Request",
          details: (
            <>
              <Text strong>(OPTIONS)</Text> e.g.,{" "}
              <Text code>app.example.com</Text>
            </>
          ),
        },
        {
          id: "s5h2",
          name: "Access-Control-Request-Method",
          direction: "Request",
          details: (
            <>
              <Text strong>(OPTIONS)</Text> e.g., <Text code>DELETE</Text>
            </>
          ),
        },
        {
          id: "s5h3",
          name: "Access-Control-Allow-Origin",
          direction: "Response",
          details: (
            <>
              <Text strong>(OPTIONS)</Text> e.g.,{" "}
              <Text code>app.example.com</Text>
            </>
          ),
        },
        {
          id: "s5h4",
          name: "Access-Control-Allow-Methods",
          direction: "Response",
          details: (
            <>
              <Text strong>(OPTIONS)</Text> Server responds with allowed
              methods, e.g., <Text code>GET, POST, PUT</Text>, which{" "}
              <Text strong style={{ color: "red" }}>
                does not include DELETE
              </Text>
            </>
          ),
        },
      ],
    },
    {
      key: "6",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      title: "Scenario 6: Credentialed Request (Success)",
      description: (
        <>
          Your frontend (<Text code>app.example.com</Text>) needs to send
          credentials (like cookies or Authorization headers) with its
          cross-origin request to <Text code>api.example.com</Text>.
        </>
      ),
      diagram: credSuccessDiagram,
      clientCode: credSuccessClient,
      serverCode: credSuccessServer,
      outcome: (
        <>
          Success! The <Text code>credentials: 'include'</Text> flag is set on
          the client. The server responds (often after a preflight) with{" "}
          <Text code>Access-Control-Allow-Credentials: true</Text> and an{" "}
          <Text code>Access-Control-Allow-Origin</Text> header matching the{" "}
          <em>exact</em> client origin (<Text code>app.example.com</Text>). The
          browser allows the response.
        </>
      ),
      status: "success",
      headers: [
        {
          id: "s6h1",
          name: "credentials: 'include'",
          direction: "Info",
          details: "Client-side fetch option.",
        },
        {
          id: "s6h2",
          name: "Origin",
          direction: "Request",
          details: (
            <>
              <Text strong>(OPTIONS, if preflight needed)</Text> e.g.,{" "}
              <Text code>app.example.com</Text>
            </>
          ),
        },
        {
          id: "s6h3",
          name: "Access-Control-Request-Method",
          direction: "Request",
          details: (
            <>
              <Text strong>(OPTIONS, if preflight needed)</Text> e.g.,{" "}
              <Text code>GET</Text>
            </>
          ),
        },
        {
          id: "s6h4",
          name: "Access-Control-Allow-Origin",
          direction: "Response",
          details: (
            <>
              <Text strong>(OPTIONS, if preflight needed)</Text>{" "}
              <Text code>https://app.example.com</Text> (specific origin)
            </>
          ),
        },
        {
          id: "s6h5",
          name: "Access-Control-Allow-Credentials",
          direction: "Response",
          details: (
            <>
              <Text strong>(OPTIONS, if preflight needed)</Text>{" "}
              <Text code>true</Text>
            </>
          ),
        },
        {
          id: "s6h6",
          name: "Access-Control-Allow-Methods",
          direction: "Response",
          details: (
            <>
              <Text strong>(OPTIONS, if preflight needed)</Text> e.g.,{" "}
              <Text code>GET, OPTIONS</Text>
            </>
          ),
        },
        {
          id: "s6h7",
          name: "Origin",
          direction: "Request",
          details: (
            <>
              <Text strong>(Actual GET)</Text> e.g.,{" "}
              <Text code>app.example.com</Text>
            </>
          ),
        },
        {
          id: "s6h8",
          name: "Cookie",
          direction: "Request",
          details: (
            <>
              <Text strong>(Actual GET)</Text> e.g.,{" "}
              <Text code>session=xyz</Text>
            </>
          ),
        },
        {
          id: "s6h9",
          name: "Access-Control-Allow-Origin",
          direction: "Response",
          details: (
            <>
              <Text strong>(Actual GET)</Text>{" "}
              <Text code>https://app.example.com</Text> (specific origin, not{" "}
              <Text code>*</Text>)
            </>
          ),
        },
        {
          id: "s6h10",
          name: "Access-Control-Allow-Credentials",
          direction: "Response",
          details: (
            <>
              <Text strong>(Actual GET)</Text> <Text code>true</Text>
            </>
          ),
        },
        {
          id: "s6h11",
          name: "Vary",
          direction: "Response",
          details: (
            <>
              <Text strong>(Actual GET, Recommended)</Text>{" "}
              <Text code>Origin</Text>
            </>
          ),
        },
      ],
    },
    {
      key: "7",
      icon: <CloseCircleTwoTone twoToneColor="#eb2f96" />,
      title: "Scenario 7: Credentialed Request (Failure - Wildcard Origin)",
      description: (
        <>
          Same credentialed request as Scenario 6, but the server mistakenly
          sends <Text code>Access-Control-Allow-Origin: *</Text> along with{" "}
          <Text code>Access-Control-Allow-Credentials: true</Text>.
        </>
      ),
      diagram: credFailureDiagram,
      clientCode: credSuccessClient, // Client is the same
      serverCode: credFailureServer,
      outcome: (
        <>
          Failure! The browser blocks the response. It's a security violation to
          allow credentials (<Text code>ACAC: true</Text>) when the allowed
          origin is a wildcard (<Text code>ACAO: *</Text>). The server{" "}
          <em>must</em> specify the exact origin.
        </>
      ),
      status: "failure",
      headers: [
        {
          id: "s7h1",
          name: "credentials: 'include'",
          direction: "Info",
          details: "Client-side fetch option.",
        },
        {
          id: "s7h2",
          name: "Origin",
          direction: "Request",
          details: (
            <>
              e.g., <Text code>app.example.com</Text>
            </>
          ),
        },
        {
          id: "s7h3",
          name: "Cookie",
          direction: "Request",
          details: (
            <>
              e.g., <Text code>session=xyz</Text>
            </>
          ),
        },
        {
          id: "s7h4",
          name: "Access-Control-Allow-Origin",
          direction: "Response",
          details: (
            <>
              <Text code>*</Text> (
              <Text strong style={{ color: "red" }}>
                INVALID with credentials
              </Text>
              )
            </>
          ),
        },
        {
          id: "s7h5",
          name: "Access-Control-Allow-Credentials",
          direction: "Response",
          details: (
            <>
              <Text code>true</Text>
            </>
          ),
        },
      ],
    },
    {
      key: "8",
      icon: <SettingOutlined />,
      title: "Scenario 8: Development Proxy Workaround",
      description: (
        <>
          During local development, your frontend (e.g.,{" "}
          <Text code>localhost:5173</Text>) needs to talk to an API (e.g.,{" "}
          <Text code>api.example.com</Text> or <Text code>localhost:8000</Text>)
          that isn't configured for CORS.
        </>
      ),
      diagram: devProxyDiagram,
      clientCode: devProxyClient,
      serverCode: devProxyServer,
      outcome: (
        <>
          Success (Locally)! Your client code makes requests to a local path
          (e.g., <Text code>/api/data</Text>). The development server (Vite,
          Webpack Dev Server) intercepts these requests and forwards them to the{" "}
          <em>actual</em> API server. Since the request from the browser goes to
          the <em>same origin</em> (the dev server), no CORS browser checks
          occur. The dev server handles the cross-origin call server-to-server.
        </>
      ),
      status: "workaround",
      headers: [
        {
          id: "s8h1",
          name: "N/A from Browser to Dev Server",
          direction: "Info",
          details:
            "From the browser's perspective, the request to the dev server (e.g., /api/data) is same-origin. No CORS headers are exchanged between browser and dev server.",
        },
        {
          id: "s8h2",
          name: "Various (Dev Server to Actual API)",
          direction: "Info",
          details:
            "The dev server makes a standard HTTP request to the actual API. CORS headers might be involved here if the actual API expects them from the dev server's origin, but this is transparent to the browser.",
        },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "16px" }}>
        <SecurityScanOutlined style={{ marginRight: "10px" }} />
        Understanding CORS (Cross-Origin Resource Sharing)
      </Title>
      <Paragraph style={{ textAlign: "center", marginBottom: "24px" }}>
        CORS is a browser security feature that restricts web pages from making
        requests to a different domain than the one that served the page. It's
        crucial for security, but often a source of confusion for developers.
        Let's explore common scenarios.
      </Paragraph>

      <Alert
        type="info"
        style={{ marginBottom: 24 }}
        message={<Text strong>Key Concept: Origin</Text>}
        description={
          <>
            An origin is defined by the combination of <Tag>Scheme</Tag>{" "}
            (http/https), <Tag>Hostname</Tag> (example.com), and <Tag>Port</Tag>{" "}
            (80/443/etc.). If any of these differ between your frontend and
            backend, it's a cross-origin request.
          </>
        }
      />

      <Alert
        type="warning"
        style={{ marginBottom: 24 }}
        icon={<ApiOutlined />}
        message={
          <Text strong>When is a Preflight (OPTIONS) Request Needed?</Text>
        }
        description={
          <>
            <Paragraph>
              Browsers automatically send a preflight <Text code>OPTIONS</Text>{" "}
              request before certain cross-origin requests to check if the
              server understands and allows the actual request. This happens if
              your request is NOT a "simple request." A request is NOT simple
              (and thus needs a preflight) if it meets ANY of these conditions:
            </Paragraph>
            <List
              size="small"
              bordered
              dataSource={[
                {
                  title: "Uses Non-Simple HTTP Methods",
                  content: (
                    <>
                      <Text code>PUT</Text>, <Text code>DELETE</Text>,{" "}
                      <Text code>PATCH</Text>, <Text code>CONNECT</Text>,{" "}
                      <Text code>TRACE</Text>, or any custom method.
                    </>
                  ),
                },
                {
                  title: "Includes Non-Simple Headers",
                  content: (
                    <>
                      Any headers other than <Text code>Accept</Text>,{" "}
                      <Text code>Accept-Language</Text>,{" "}
                      <Text code>Content-Language</Text>, or a{" "}
                      <Text code>Content-Type</Text> with values other than{" "}
                      <Text code>application/x-www-form-urlencoded</Text>,{" "}
                      <Text code>multipart/form-data</Text>, or{" "}
                      <Text code>text/plain</Text>. For example, sending{" "}
                      <Text code>Content-Type: application/json</Text> or a
                      custom header like <Text code>X-API-Key</Text> will
                      trigger a preflight.
                    </>
                  ),
                },
                {
                  title: "Involves ReadableStream objects",
                  content: "If the request body uses a ReadableStream object.",
                },
                {
                  title: "Uses Event Listeners on XMLHttpRequestUpload",
                  content:
                    "If any event listeners are registered on an <Text code>XMLHttpRequestUpload</Text> object used in the request.",
                },
              ]}
              renderItem={(item: {
                title: string;
                content: string | React.ReactNode;
              }) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text strong>{item.title}</Text>}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
            <Paragraph style={{ marginTop: 16 }}>
              If the server responds to the <Text code>OPTIONS</Text> request
              with appropriate headers (like{" "}
              <Text code>Access-Control-Allow-Methods</Text>,{" "}
              <Text code>Access-Control-Allow-Headers</Text>, and{" "}
              <Text code>Access-Control-Allow-Origin</Text>) indicating
              permission, the browser then sends the actual request. Otherwise,
              the actual request is blocked.
            </Paragraph>
          </>
        }
      />

      <Title level={3} style={{ marginBottom: "20px" }}>
        Common CORS Scenarios
      </Title>

      <Row gutter={[24, 24]}>
        {scenarios.map((scenario) => (
          <Col span={24} key={scenario.key}>
            <Card
              title={
                <Text strong style={{ fontSize: "1.1em" }}>
                  {scenario.icon} {scenario.title}
                </Text>
              }
              extra={
                scenario.status === "success" ? (
                  <Tag color="success">Success</Tag>
                ) : scenario.status === "failure" ? (
                  <Tag color="error">Failure</Tag>
                ) : scenario.status === "workaround" ? (
                  <Tag color="processing">Dev Workaround</Tag>
                ) : (
                  <Tag color="warning">Info</Tag>
                )
              }
              style={{ marginBottom: 0 }}
              hoverable
            >
              <Paragraph>{scenario.description}</Paragraph>

              {/* Row 1 for Diagram (full width) */}
              <Row gutter={16} style={{ marginBottom: "16px" }}>
                <Col span={24}>
                  <Title level={5}>Request Flow Diagram</Title>
                  <div
                    className="mermaid"
                    style={{
                      padding: "10px",
                      background: "#f9f9f9",
                      borderRadius: "4px",
                      border: "1px solid #eee",
                      textAlign: "center",
                    }}
                  >
                    {scenario.diagram}
                  </div>
                </Col>
              </Row>

              {/* Row 2 for Client and Server code (split) */}
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Title level={5}>Client Code (Example)</Title>
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomDark}
                    customStyle={codeSnippetStyle}
                  >
                    {scenario.clientCode.trim()}
                  </SyntaxHighlighter>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={5}>
                    Server CORS Headers (Example - Node/Express)
                  </Title>
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomDark}
                    customStyle={codeSnippetStyle}
                  >
                    {scenario.serverCode.trim()}
                  </SyntaxHighlighter>
                </Col>
              </Row>

              <Divider dashed />
              <Paragraph>
                <Text strong>Outcome:</Text> {scenario.outcome}
              </Paragraph>
              <Paragraph>
                <Text strong>Key Headers Involved:</Text>
              </Paragraph>
              <Table<HeaderInfo>
                dataSource={scenario.headers as HeaderInfo[]}
                columns={headerTableColumns}
                rowKey="id"
                pagination={false}
                size="small"
                style={{ marginTop: "12px", marginBottom: "12px" }}
                bordered
              />
              {scenario.key === "8" && (
                <Alert
                  type="warning"
                  style={{ marginTop: 16 }}
                  icon={<WarningOutlined />}
                  message="Important Note on Proxies"
                  description="Using a development proxy solves CORS for local development ONLY. You still need to configure correct CORS headers on your actual API server for production deployment when the frontend is served from a different origin."
                />
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <Divider style={{ marginTop: 32 }} />
      <Title level={4}>Further Reading</Title>
      <Paragraph>
        For a deep dive into CORS, the MDN Web Docs are an excellent resource:{" "}
        <ReferenceLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">
          MDN - Cross-Origin Resource Sharing (CORS)
        </ReferenceLink>
        .
      </Paragraph>
    </div>
  );
};

export default CORSSlide;
