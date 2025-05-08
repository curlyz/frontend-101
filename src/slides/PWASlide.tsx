import React, { useEffect } from "react";
import {
  Card,
  Typography,
  Space,
  Divider,
  Alert,
  Row,
  Col,
  List,
  Steps,
} from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";
import {
  ThunderboltOutlined,
  FileAddOutlined,
  ControlOutlined,
  ExperimentOutlined,
  SafetyCertificateOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text, Link } = Typography;
const { Step } = Steps;

const codeSnippetStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  maxHeight: "350px",
  overflow: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
};

const pwaComponentsDiagram = `
graph LR
    User[User]
    Browser[Browser]
    AppShell[App Shell UI]
    
    subgraph PWA_Technologies ["PWA Technologies"]
        direction LR
        Manifest["Web App Manifest (manifest.json)"]
        ServiceWorker["Service Worker (sw.js)"]
        Workbox[Workbox Library]
    end

    subgraph StaticAssets ["Static Assets (Exported Site)"]
        direction TB
        HTML[index.html]
        CSS[styles.css]
        JS[app.js]
        Images[images/*]
    end

    User -- Interacts with --> Browser
    Browser -- Reads --> Manifest
    Manifest -- Defines --> AppShell
    Browser -- Registers & Controls --> ServiceWorker
    ServiceWorker -- Powered by --> Workbox
    Workbox -- Precaches & Serves --> StaticAssets
    ServiceWorker -- Intercepts Network Requests --> ServiceWorker
    ServiceWorker -- Serves from Cache/Network --> Browser
    Browser -- Renders --> AppShell
    
    note right of HTML "Crucial: Site must be exportable to static assets!" 
    classDef static fill:#e6ffed,stroke:#333,stroke-width:1px;
    class HTML,CSS,JS,Images static;
`;

const manifestJsonExample = `
// public/manifest.json
{
  "name": "My Awesome Static PWA",
  "short_name": "AwesomePWA",
  "description": "A demonstration of a PWA from a static site.",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#007bff"
}
`;

const manifestLinkHtml = `
<!-- public/index.html -->
<head>
  ...
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#007bff" />
  ...
</head>
`;

// Using vite-plugin-pwa as it's common for Vite projects (like this one)
const viteConfigPwaPlugin = `
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // 1. Import

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ // 2. Add and configure plugin
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2,woff}'], // Precaching strategy
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/api\.example\.com\/.*/i, // Example API caching
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              }
            }
          }
        ]
      },
      manifest: {
        // Your manifest options (can also be in a separate manifest.json)
        name: 'My Awesome Static PWA',
        short_name: 'AwesomePWA',
        description: 'A Vite PWA example.',
        theme_color: '#007bff',
        icons: [
          {
            src: 'pwa-192x192.png', // Path relative to public directory
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
`;

// --- NEW: Service Worker Lifecycle Diagram ---
const serviceWorkerLifecycleDiagram = `
sequenceDiagram
    participant B as Browser
    participant SW as Service Worker Script (sw.js)
    participant C as Cache Storage
    participant N as Network

    Note over B, SW: Initial Page Load / Registration
    B->>SW: navigator.serviceWorker.register('/sw.js')
    SW-->>B: Registration Promise
    
    Note over B, SW: Installation Phase (on successful registration)
    B->>SW: Install Event
    SW->>C: Perform setup (e.g., precache static assets via Workbox)
    alt Precaching Successful
        SW-->>B: Install Complete
    else Precaching Failed
        SW-->>B: Install Failed (SW discarded)
    end

    Note over B, SW: Activation Phase (after install, when no older SW controls page)
    B->>SW: Activate Event
    SW->>SW: Clean up old caches, claim clients
    SW-->>B: Activation Complete (SW now controls pages in scope)

    Note over B, SW: Subsequent Page Loads / Fetches
    B->>SW: Fetch Event (for resource in scope, e.g., /styles.css)
    SW->>C: Check Cache Strategy (e.g., CacheFirst via Workbox)
    alt Resource in Cache
        C-->>SW: Cached Response
        SW-->>B: Serve from Cache
    else Resource NOT in Cache
        SW->>N: Request Resource from Network
        N-->>SW: Network Response
        alt Caching Enabled (e.g., runtime caching via Workbox)
             SW->>C: Store Response in Cache
        end
        SW-->>B: Serve from Network
    end
`;

const serviceWorkerRegistrationSnippet = `
// src/main.tsx (or your app's entry point)
// If using vite-plugin-pwa with injectRegister: 'auto', this might be handled automatically.
// Otherwise, you might use something like this:

// import { registerSW } from 'virtual:pwa-register';

// const updateSW = registerSW({
//   onNeedRefresh() {
//     if (confirm("New content available. Reload?")) {
//       updateSW(true);
//     }
//   },
//   onOfflineReady() {
//     console.log('App is ready to work offline');
//   },
// });

// For a manual setup (less common with vite-plugin-pwa):
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
*/
`;

const PWASlide: React.FC = () => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      title: "HTTPS Prerequisite",
      icon: <SafetyCertificateOutlined />,
      content: (
        <Paragraph>
          Progressive Web Apps require your site to be served over{" "}
          <Text strong>HTTPS</Text>. Most modern hosting platforms (Netlify,
          Vercel, GitHub Pages) provide this automatically. For local
          development, <code>localhost</code> is usually treated as secure.
        </Paragraph>
      ),
    },
    {
      title: "Create Web App Manifest (manifest.json)",
      icon: <FileAddOutlined />,
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Paragraph>
            The Web App Manifest is a JSON file that tells the browser about
            your PWA and how it should behave when 'installed' on the user's
            device. It includes information like the app's name, icons, start
            URL, display mode, and theme colors.
          </Paragraph>
          <Paragraph>
            Create a <code>manifest.json</code> file (typically in your{" "}
            <code>public</code> directory) and link it in the{" "}
            <code>&lt;head&gt;</code> of your <code>index.html</code>.
          </Paragraph>
          <Title level={5}>
            Example: <code>public/manifest.json</code>
          </Title>
          <SyntaxHighlighter
            language="json"
            style={atomDark}
            customStyle={codeSnippetStyle}
            showLineNumbers
          >
            {manifestJsonExample.trim()}
          </SyntaxHighlighter>
          <Title level={5}>
            Example: Linking in <code>index.html</code>
          </Title>
          <SyntaxHighlighter
            language="html"
            style={atomDark}
            customStyle={codeSnippetStyle}
            showLineNumbers
          >
            {manifestLinkHtml.trim()}
          </SyntaxHighlighter>
          <Alert
            type="info"
            message="Note: If using a PWA plugin like vite-plugin-pwa, it can often generate and inject the manifest for you based on its configuration."
            showIcon
          />
        </Space>
      ),
    },
    {
      title: "Implement Service Worker with Workbox (via vite-plugin-pwa)",
      icon: <ControlOutlined />,
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          {/* --- Enhanced Explanation --- */}
          <Title level={5}>What is a Service Worker?</Title>
          <Paragraph>
            A Service Worker is a script that your browser runs in the
            background, separate from a web page. Think of it as a{" "}
            <Text strong>programmable network proxy</Text> built into the
            browser. It allows you to intercept and handle network requests,
            manage caches, and enable features that don't need a visible web
            page or user interaction, like push notifications (though that's
            more advanced).
          </Paragraph>
          <Paragraph>
            Service Workers have a distinct <Text strong>lifecycle</Text>{" "}
            (Register, Install, Activate) and operate within a defined{" "}
            <Text strong>scope</Text>. Once activated, a Service Worker can
            control pages loaded within its scope.
          </Paragraph>

          <Title level={5}>Service Worker Lifecycle Overview</Title>
          <div
            className="mermaid"
            style={{
              textAlign: "center",
              padding: "10px",
              border: "1px solid #f0f0f0",
              borderRadius: "4px",
              marginTop: "10px",
              marginBottom: "10px",
              background: "#fff",
            }}
          >
            {serviceWorkerLifecycleDiagram} // Inserted new diagram here
          </div>

          <Title level={5}>Why Use Workbox?</Title>
          <Paragraph>
            Writing Service Worker logic manually can be complex and
            error-prone, especially for caching.
            <Text strong>Workbox</Text> is a set of libraries from Google that
            abstracts away much of this complexity. It provides production-ready
            strategies for:
            <List size="small" style={{ marginLeft: 20, marginTop: 8 }}>
              <List.Item>
                ✅ <Text strong>Precaching:</Text> Automatically downloading and
                caching specified static assets (like your HTML, CSS, JS) during
                the Service Worker's 'install' phase.
              </List.Item>
              <List.Item>
                ✅ <Text strong>Runtime Caching:</Text> Intercepting requests
                made while the app is running (e.g., for API calls, images) and
                applying caching strategies like CacheFirst, NetworkFirst,
                StaleWhileRevalidate.
              </List.Item>
              <List.Item>
                ✅ Easier integration with build tools (like Vite via{" "}
                <code>vite-plugin-pwa</code> or Webpack via{" "}
                <code>workbox-webpack-plugin</code>).
              </List.Item>
            </List>
          </Paragraph>

          <Divider />

          <Paragraph>
            For Vite projects (like this one),{" "}
            <Link href="https://vite-pwa-org.netlify.app/" target="_blank">
              <code>vite-plugin-pwa</code>
            </Link>{" "}
            is a popular choice. It uses Workbox under the hood and can automate
            much of the setup, including generating the service worker (
            <code>sw.js</code>) and handling its registration.
          </Paragraph>
          <Title level={5}>
            Example: <code>vite.config.ts</code> with{" "}
            <code>vite-plugin-pwa</code>
          </Title>
          <SyntaxHighlighter
            language="typescript"
            style={atomDark}
            customStyle={codeSnippetStyle}
            showLineNumbers
          >
            {viteConfigPwaPlugin.trim()}
          </SyntaxHighlighter>
          <Paragraph>
            The <code>workbox</code> configuration above shows how to precache
            all static assets (<code>globPatterns</code>) and set up runtime
            caching for API calls (less relevant for purely static sites unless
            they fetch external data).
          </Paragraph>
        </Space>
      ),
    },
    {
      title: "Test and Audit Your PWA",
      icon: <ExperimentOutlined />,
      content: (
        <Paragraph>
          Use your browser's developer tools to test your PWA. In Chrome
          DevTools, the <Text strong>Lighthouse</Text> tab can run an audit for
          PWA criteria. The <Text strong>Application</Text> tab shows
          information about the manifest, service workers (you can
          unregister/update here), and storage. Verify installability, offline
          access (simulate offline in DevTools), and manifest properties.
        </Paragraph>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        Transforming a Static Site into a PWA <ThunderboltOutlined />
      </Title>
      <Alert
        type="success"
        icon={<InfoCircleOutlined />}
        style={{ marginBottom: "20px" }}
        message={
          <Text strong>Key Prerequisite: Static Exportable Website</Text>
        }
        description="The steps outlined here are most straightforward when your website can be built/exported into a collection of static assets (HTML, CSS, JavaScript, images). This allows the Service Worker to reliably cache and serve the entire application shell and its content for offline use. Dynamic, server-rendered sites require more complex PWA strategies."
      />

      <Card title="PWA Core Components Overview" style={{ marginBottom: 24 }}>
        <Paragraph>
          A PWA enhances a static website with app-like features. The diagram
          below shows the main technologies involved.
        </Paragraph>
        <div
          className="mermaid"
          style={{
            textAlign: "center",
            padding: "10px",
            border: "1px solid #f0f0f0",
            borderRadius: "4px",
            marginTop: "10px",
            marginBottom: "10px",
            background: "#fff",
          }}
        >
          {pwaComponentsDiagram}
        </div>
      </Card>

      <Title level={3} style={{ marginTop: "30px", marginBottom: "20px" }}>
        Step-by-Step PWA Conversion
      </Title>
      <Steps direction="vertical" current={-1}>
        {steps.map((step, index) => (
          <Step
            key={index}
            title={step.title}
            icon={step.icon}
            description={step.content}
          />
        ))}
      </Steps>

      <Divider />
      <Title level={4}>Further Considerations</Title>
      <List itemLayout="horizontal">
        <List.Item>
          <List.Item.Meta
            avatar={<InfoCircleOutlined />}
            title="Update Strategy"
            description="How will users get updates to your PWA when you deploy new code? vite-plugin-pwa handles this with options like 'autoUpdate'."
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<InfoCircleOutlined />}
            title="Offline Experience Beyond Caching"
            description="For more dynamic offline experiences (e.g., submitting a form while offline to sync later), you'd need more advanced Service Worker logic (e.g., Background Sync API)."
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<InfoCircleOutlined />}
            title="Push Notifications"
            description="A powerful PWA feature, but requires significant backend setup (Push Service, VAPID keys) and user permission. Typically beyond the scope of a simple static site PWA conversion."
          />
        </List.Item>
      </List>
    </div>
  );
};

export default PWASlide;
