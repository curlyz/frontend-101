import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Typography,
  Space,
  Divider,
  Alert,
  Row,
  Col,
  Button,
  List,
  Spin,
  Input,
  message,
  Flex,
} from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";
import { v4 as uuidv4, validate as uuidValidate } from "uuid"; // For generating client-side idempotency keys

const { Title, Paragraph, Text } = Typography;

const codeSnippetStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  maxHeight: "300px",
  overflow: "auto",
};

const diagramWithoutIdempotency = `
sequenceDiagram
    participant User
    participant FrontendApp as Frontend App
    participant BackendAPI as Backend API
    participant Database

    User->>FrontendApp: Clicks "Create Item"
    FrontendApp->>BackendAPI: POST /items (Request A)
    activate BackendAPI
    Note over FrontendApp, BackendAPI: Network Error / Slow Response / User clicks again
    
    User->>FrontendApp: Clicks "Create Item"
    FrontendApp->>BackendAPI: POST /items (Request B)
    
    BackendAPI->>Database: Create Item from Request A
    activate Database
    Database-->>BackendAPI: Item 1 Created
    deactivate Database
    BackendAPI-->>FrontendApp: Success (Item 1 from Request A)
    
    BackendAPI->>Database: Create Item from Request B
    activate Database
    Database-->>BackendAPI: Item 2 Created (Duplicate)
    deactivate Database
    BackendAPI-->>FrontendApp: Success (Item 2 from Request B)
    deactivate BackendAPI

    Note right of Database: Two items created in DB.
`;

const diagramWithIdempotency = `
sequenceDiagram
    participant User
    participant FrontendApp as Frontend App
    participant BackendAPI as Backend API
    participant IdempotencyStore as Backend Idempotency Store
    participant Database

    User->>FrontendApp: Clicks "Create Item"
    FrontendApp->>FrontendApp: Generates idempotencyKey = "client-req-123"
    FrontendApp->>BackendAPI: POST /items (Body + Idempotency-Key: "client-req-123") - Attempt 1
    activate BackendAPI

    BackendAPI->>IdempotencyStore: Check key "client-req-123"
    activate IdempotencyStore
    IdempotencyStore-->>BackendAPI: Key not found / No previous response
    deactivate IdempotencyStore

    BackendAPI->>Database: Create Item
    activate Database
    Database-->>BackendAPI: Item X Created
    deactivate Database
    
    BackendAPI->>IdempotencyStore: Store "client-req-123" -> Success (Item X)
    activate IdempotencyStore
    IdempotencyStore-->>BackendAPI: Stored
    deactivate IdempotencyStore
    
    BackendAPI-->>FrontendApp: Success (Item X)
    
    Note over FrontendApp, BackendAPI: Network Error / Slow Response / User clicks again or auto-retry
    
    FrontendApp->>FrontendApp: Uses same idempotencyKey = "client-req-123"
    FrontendApp->>BackendAPI: POST /items (Body + Idempotency-Key: "client-req-123") - Attempt 2
    
    BackendAPI->>IdempotencyStore: Check key "client-req-123"
    activate IdempotencyStore
    IdempotencyStore-->>BackendAPI: Key found, returns stored Success (Item X)
    deactivate IdempotencyStore
    
    BackendAPI-->>FrontendApp: Success (Item X) (from store, no new DB op)
    deactivate BackendAPI

    Note right of Database: Only one item (Item X) created in DB.
`;

// Simulated API call function
const simulateApiCall = async (
  itemName: string,
  idempotencyKey?: string,
  simulateError?: boolean,
): Promise<{ success: boolean; message: string; data?: any }> => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        if (simulateError) {
          resolve({ success: false, message: "Simulated network error!" });
          return;
        }
        // Simulate backend checking idempotency key if provided
        if (idempotencyKey) {
          // This is a very simplified mock. A real backend would have a store.
          if (localStorage.getItem(idempotencyKey)) {
            const storedResponse = JSON.parse(
              localStorage.getItem(idempotencyKey)!,
            );
            resolve({
              success: true,
              message: `Item '${storedResponse.name}' (from cache via key ${idempotencyKey.substring(0, 6)})`,
              data: storedResponse,
            });
            return;
          }
          const newItem = { id: uuidv4(), name: itemName };
          localStorage.setItem(idempotencyKey, JSON.stringify(newItem));
          resolve({
            success: true,
            message: `Item '${itemName}' created successfully (key: ${idempotencyKey.substring(0, 6)})`,
            data: newItem,
          });
        } else {
          // Non-idempotent call
          const newItem = { id: uuidv4(), name: itemName };
          resolve({
            success: true,
            message: `Item '${itemName}' created (non-idempotent)`,
            data: newItem,
          });
        }
      },
      1000 + Math.random() * 1000,
    ); // Simulate network latency
  });
};

/**
 * @function IdempotencyDemo
 * @description Interactive demo for idempotency.
 */
const IdempotencyDemo: React.FC = () => {
  const [itemName, setItemName] = useState<string>("My New Item");
  const [nonIdempotentItems, setNonIdempotentItems] = useState<any[]>([]);
  const [idempotentItems, setIdempotentItems] = useState<any[]>([]);
  const [loadingNonIdempotent, setLoadingNonIdempotent] =
    useState<boolean>(false);
  const [loadingIdempotent, setLoadingIdempotent] = useState<boolean>(false);
  const [currentIdempotencyKey, setCurrentIdempotencyKey] = useState<
    string | null
  >(null);

  const handleCreateNonIdempotent = async () => {
    setLoadingNonIdempotent(true);
    const response = await simulateApiCall(itemName);
    if (response.success) {
      setNonIdempotentItems((prev) => [...prev, response.data]);
      message.success(response.message);
    } else {
      message.error(response.message);
    }
    setLoadingNonIdempotent(false);
  };

  const handleGenerateKey = () => {
    const newKey = uuidv4();
    setCurrentIdempotencyKey(newKey);
    message.info(`New Idempotency Key Generated: ${newKey.substring(0, 8)}...`);
  };

  const handleCreateIdempotent = async (simulateErrorFirstAttempt = false) => {
    if (!currentIdempotencyKey) {
      message.warning(
        "Please generate an idempotency key first for the idempotent call.",
      );
      return;
    }
    setLoadingIdempotent(true);

    // Simulate first attempt potentially failing
    if (simulateErrorFirstAttempt) {
      message.loading({
        content: "Attempt 1 (simulating error)...",
        key: "idem_attempt_1",
      });
      await simulateApiCall(itemName, currentIdempotencyKey, true); // Force error
      message.error({
        content: "Attempt 1 failed (simulated error)!",
        key: "idem_attempt_1",
        duration: 2,
      });
      // Wait a bit before "retrying"
      await new Promise((resolve) => setTimeout(resolve, 500));
      message.loading({
        content: "Attempt 2 (retry with same key)...",
        key: "idem_attempt_2",
      });
    } else {
      message.loading({
        content: "Processing idempotent request...",
        key: "idem_attempt_single",
      });
    }

    const response = await simulateApiCall(itemName, currentIdempotencyKey);

    if (response.success) {
      // Avoid adding duplicates to the visual list if item already exists by ID (from cached response)
      setIdempotentItems((prev) => {
        if (prev.find((item) => item.id === response.data.id)) {
          return prev;
        }
        return [...prev, response.data];
      });
      message.success({
        content: response.message,
        key: simulateErrorFirstAttempt
          ? "idem_attempt_2"
          : "idem_attempt_single",
        duration: 3,
      });
    } else {
      message.error({
        content: response.message,
        key: simulateErrorFirstAttempt
          ? "idem_attempt_2"
          : "idem_attempt_single",
        duration: 3,
      });
    }
    setLoadingIdempotent(false);
  };

  useEffect(() => {
    // Clear local storage used by mock API for idempotency on unmount
    return () => {
      Object.keys(localStorage).forEach((key) => {
        const itemValue = localStorage.getItem(key);
        if (
          itemValue &&
          itemValue.includes("name") &&
          itemValue.includes("id")
        ) {
          try {
            const parsedItem = JSON.parse(itemValue);
            if (
              uuidValidate(parsedItem.id) ||
              (typeof key === "string" && uuidValidate(key))
            ) {
              localStorage.removeItem(key);
            }
          } catch (e) {
            // Not a JSON object or other issue, probably not our key
          }
        }
      });
    };
  }, []);

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Title level={5}>Non-Idempotent Creation</Title>
        <Paragraph>
          Clicking multiple times will likely create multiple distinct items.
        </Paragraph>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
          />
          <Button
            onClick={handleCreateNonIdempotent}
            loading={loadingNonIdempotent}
            block
          >
            Create Item (Non-Idempotent)
          </Button>
          <List
            header={<div>Items Created (Non-Idempotent):</div>}
            bordered
            dataSource={nonIdempotentItems}
            renderItem={(item) => (
              <List.Item>
                {item.name} (ID: {item.id.substring(0, 8)}...)
              </List.Item>
            )}
            style={{
              minHeight: "150px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          />
        </Space>
      </Col>
      <Col span={12}>
        <Title level={5}>Idempotent Creation</Title>
        <Paragraph>
          Uses a client-generated key. Click "Generate Key" once before
          creating. Subsequent clicks with the same key (even after simulated
          errors) should result in one item.
        </Paragraph>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name (shared)"
          />
          <Button onClick={handleGenerateKey} block>
            Generate New Idempotency Key
          </Button>
          {currentIdempotencyKey && (
            <Text keyboard copyable>
              {currentIdempotencyKey}
            </Text>
          )}
          <Button
            onClick={() => handleCreateIdempotent()}
            loading={loadingIdempotent}
            block
            disabled={!currentIdempotencyKey}
          >
            Create Item (Idempotent)
          </Button>
          <Button
            onClick={() => handleCreateIdempotent(true)}
            loading={loadingIdempotent}
            block
            danger
            disabled={!currentIdempotencyKey}
          >
            Create Item (Idempotent - Simulate Error & Retry)
          </Button>
          <List
            header={<div>Items Created (Idempotent):</div>}
            bordered
            dataSource={idempotentItems}
            renderItem={(item) => (
              <List.Item>
                {item.name} (ID: {item.id.substring(0, 8)}...)
              </List.Item>
            )}
            style={{
              minHeight: "150px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          />
        </Space>
      </Col>
    </Row>
  );
};

/**
 * @function IdempotencySlide
 * @description A slide explaining idempotency in frontend development.
 * @returns {JSX.Element}
 */
const IdempotencySlide: React.FC = () => {
  const mermaidIds = {
    without: "mermaid-idempotency-without",
    with: "mermaid-idempotency-with",
  };

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "base" }); // Initialize if not already

    const renderMermaid = (id: string, diagramData: string) => {
      const element = document.getElementById(id);
      if (element && element.getAttribute("data-processed") !== "true") {
        element.innerHTML = diagramData.trim(); // Use the passed diagram data
        try {
          mermaid.run({ nodes: [element] });
          // element.setAttribute("data-processed", "true"); // Handled by mermaid.run
        } catch (e) {
          console.error("Mermaid rendering error for ID:", id, e);
          element.innerHTML = "Error rendering diagram.";
        }
      }
    };

    renderMermaid(mermaidIds.without, diagramWithoutIdempotency);
    renderMermaid(mermaidIds.with, diagramWithIdempotency);
  }, [mermaidIds.with, mermaidIds.without]); // Rerun if IDs change (though they shouldn't)

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Understanding Idempotency in Frontend Development 🛡️
        </Title>
        <Paragraph>
          Idempotency is a crucial concept, especially when dealing with API
          requests. An idempotent operation, if performed multiple times, has
          the same effect as if it were performed only once. This is vital for
          building robust and reliable applications that can gracefully handle
          network issues, retries, and accidental user multi-clicks.
        </Paragraph>
      </Card>

      <Card title="Scenario 1: Without Idempotency">
        <div
          id={mermaidIds.without}
          className="mermaid"
          style={{
            textAlign: "center",
            backgroundColor: "#f0f2f5",
            padding: "16px",
            borderRadius: "4px",
          }}
        >
          {/* Mermaid diagram will be rendered here by useEffect */}
        </div>
      </Card>

      <Card title="Scenario 2: With Idempotency (Client-Side Key)">
        <div
          id={mermaidIds.with}
          className="mermaid"
          style={{
            textAlign: "center",
            backgroundColor: "#f0f2f5",
            padding: "16px",
            borderRadius: "4px",
          }}
        >
          {/* Mermaid diagram will be rendered here by useEffect */}
        </div>
      </Card>

      <Card>
        <Row gutter={24}>
          <Divider orientation="left">Interactive Demo</Divider>
          <IdempotencyDemo />
        </Row>
        <Row gutter={24}>
          <Flex vertical>
            <Divider orientation="left">Explanation & Code</Divider>
            <Title level={4}>What is Idempotency?</Title>
            <Paragraph>
              In simple terms, an operation is idempotent if making it N times
              has the same effect as making it once. For example, setting an
              object's property to a specific value is idempotent. No matter how
              many times you set <code>obj.x = 5</code>, the end result for{" "}
              <code>obj.x</code> is that it's 5. However, incrementing a counter
              (<code>counter++</code>) is NOT idempotent if called multiple
              times.
            </Paragraph>
            <Paragraph strong>Why is it important for Frontend?</Paragraph>
            <List>
              <List.Item>
                <Text strong>Network Reliability:</Text> HTTP requests can fail.
                Users might retry, or your app might auto-retry. Without
                idempotency, retries could lead to unintended side effects
                (e.g., creating multiple orders).
              </List.Item>
              <List.Item>
                <Text strong>User Experience:</Text> Prevents frustration from
                accidental double-clicks creating duplicate data.
              </List.Item>
              <List.Item>
                <Text strong>Data Consistency:</Text> Helps maintain a
                predictable state on the backend.
              </List.Item>
            </List>

            <Title level={5}>Implementing Idempotent Requests</Title>
            <Paragraph>
              A common way to achieve idempotency for POST requests (which are
              typically not idempotent by default, unlike GET, PUT, DELETE) is
              by using an <Text strong>Idempotency Key</Text>. The client
              generates a unique key for each "logical" request. If the request
              needs to be retried, the same key is sent. The server then stores
              these keys (and their responses) for a period, ensuring that if it
              sees the same key again, it doesn't reprocess the request but
              simply returns the stored response.
            </Paragraph>

            <Paragraph strong>Example: Basic Non-Idempotent POST</Paragraph>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`async function createItem(itemName) {
  try {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: itemName }),
    });
    // ... handle response ...
  } catch (error) {
    // ... handle error ...
  }
}
// Clicking a button that calls this multiple times might create duplicates.`}
            </SyntaxHighlighter>

            <Paragraph strong>
              Example: Idempotent POST with a Client-Generated Key
            </Paragraph>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {`import { v4 as uuidv4 } from 'uuid'; // npm install uuid

async function createItemIdempotent(itemName, idempotencyKey) {
  try {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey, // Send the unique key
      },
      body: JSON.stringify({ name: itemName }),
    });
    // ... handle response ...
  } catch (error) {
    // ... handle error ...
  }
}

// --- Client-side usage ---
// const newItemName = "My Cool Product";
// const keyForThisRequest = uuidv4(); // Generate ONCE for this logical operation

// Call once:
// createItemIdempotent(newItemName, keyForThisRequest);

// If retry is needed (e.g., after network error):
// createItemIdempotent(newItemName, keyForThisRequest); // Call again with THE SAME KEY`}
            </SyntaxHighlighter>
            <Alert
              type="info"
              message="Note: The backend must be designed to handle the 'Idempotency-Key' header (or a similar mechanism) by storing request IDs and their outcomes."
              showIcon
            />
          </Flex>
        </Row>
      </Card>

      <Alert
        message="Further Learning"
        description={
          <Paragraph>
            For a general understanding of idempotence in web APIs, refer to the
            <a
              href="https://developer.mozilla.org/en-US/docs/Glossary/Idempotent"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              MDN Web Docs on Idempotence
            </a>
            . Many API providers (e.g., Stripe, PayPal) also have specific
            documentation on how they handle idempotency keys.
          </Paragraph>
        }
        type="success"
        showIcon
        style={{ marginTop: 20 }}
      />
    </Space>
  );
};

export default IdempotencySlide;
