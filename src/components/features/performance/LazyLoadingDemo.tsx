import React, { useState, Suspense, useEffect } from "react";
import { Card, Typography, Button, Spin, Space, Alert } from "antd";
import mermaid from "mermaid";

const { Title, Paragraph, Text } = Typography;

// Lazy load the HeavyComponent
const HeavyComponent = React.lazy(() => import("./HeavyComponent"));

const lazyLoadingDiagram = `
sequenceDiagram
    participant User
    participant App as Main Application
    participant BundleJS as Main Bundle (bundle.js)
    participant LazyChunkJS as Lazy Chunk (heavyComponent.chunk.js)
    participant ReactSuspense as React.Suspense
    participant HeavyComponent

    App->>BundleJS: Initial Load
    BundleJS-->>App: Main app UI renders (without HeavyComponent)

    User->>App: Clicks "Load Heavy Component"
    App->>ReactSuspense: Triggers rendering of lazy component
    ReactSuspense->>LazyChunkJS: Requests heavyComponent.chunk.js (if not cached)
    activate LazyChunkJS
    ReactSuspense-->>App: Shows Fallback UI (e.g., Spinner)
    LazyChunkJS-->>ReactSuspense: Chunk loaded, HeavyComponent code available
    deactivate LazyChunkJS
    
    ReactSuspense->>HeavyComponent: Renders HeavyComponent
    HeavyComponent-->>App: HeavyComponent UI displayed
    Note over App, LazyChunkJS: Subsequent loads might use cached chunk.
`;

/**
 * @description Demonstrates lazy loading of components using React.lazy and Suspense.
 * Illustrates how components can be loaded on demand to reduce initial bundle size.
 * @returns {JSX.Element} The LazyLoadingDemo component.
 */
const LazyLoadingDemo: React.FC = () => {
  const [showHeavy, setShowHeavy] = useState(false);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "base" });
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      title={
        <Title level={4}>
          Lazy Loading Components with React.lazy & Suspense
        </Title>
      }
    >
      <Paragraph>
        <code>React.lazy</code> and <code>Suspense</code> allow you to render a
        dynamic import as a regular component. This means you can split your
        code into smaller chunks and load components only when they are actually
        needed, improving the initial load time and performance of your
        application.
      </Paragraph>

      <div
        className="mermaid"
        style={{
          textAlign: "center",
          padding: "10px",
          border: "1px solid #f0f0f0",
          borderRadius: "4px",
          marginBottom: 16,
          backgroundColor: "#999",
        }}
      >
        {lazyLoadingDiagram}
      </div>

      <Paragraph>
        Click the button below to load and display the \"Heavy Component\".
        Notice the fallback UI (spinner) while it loads. In a real application,
        this reduces the initial JavaScript payload significantly.
      </Paragraph>

      <Space direction="vertical" style={{ width: "100%" }}>
        <Button
          type="primary"
          onClick={() => setShowHeavy(true)}
          disabled={showHeavy}
        >
          Load and Show Heavy Component
        </Button>
        {showHeavy && (
          <Button onClick={() => setShowHeavy(false)} danger>
            Hide Heavy Component (will reload next time)
          </Button>
        )}

        <Suspense
          fallback={
            <div style={{ textAlign: "center", padding: 20 }}>
              <Spin size="large" />
              <Paragraph style={{ marginTop: 8 }}>
                Loading Heavy Component...
              </Paragraph>
            </div>
          }
        >
          {showHeavy && <HeavyComponent />}
        </Suspense>
      </Space>

      <Alert
        style={{ marginTop: 20 }}
        message="Impact Metrics & What to Observe:"
        description={
          <>
            <Paragraph>
              - <strong>Initial Load:</strong> The{" "}
              <code>HeavyComponent.tsx</code> code is NOT included in the main
              JavaScript bundle initially. This makes the app load faster.
            </Paragraph>
            <Paragraph>
              - <strong>On Demand Loading:</strong> When you click the button,
              check your browser's Network tab. You'll see a new JavaScript
              chunk (e.g., <code>X.chunk.js</code>) being fetched. This is the
              code for <code>HeavyComponent</code>.
            </Paragraph>
            <Paragraph>
              - <strong>Suspense Fallback:</strong> While the chunk is loading,
              the <code>Spin</code> component (defined in <code>fallback</code>)
              is displayed.
            </Paragraph>
            <Paragraph>
              - <strong>Bundle Size:</strong> Tools like Webpack Bundle Analyzer
              would visually show <code>HeavyComponent</code> as a separate
              chunk, proving it's not bloating the main entry point.
            </Paragraph>
          </>
        }
        type="info"
        showIcon
      />
    </Card>
  );
};

export default LazyLoadingDemo;
