import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Space,
  Alert,
  Input,
  Tag,
  Row,
  Col,
} from "antd";
import mermaid from "mermaid";

const { Title, Paragraph, Text } = Typography;

interface ItemType {
  id: string;
  name: string;
  // internalValue: string; // To demonstrate state issues
}

let nextId = 3;
const initialItems: ItemType[] = [
  { id: "id-1", name: "Alice" },
  { id: "id-2", name: "Bob" },
];

const listKeysDiagram = `
sequenceDiagram
    participant React as React (Diffing Algorithm)
    participant OldVTree as Old Virtual DOM Tree
    participant NewVTree as New Virtual DOM Tree
    participant DOM

    alt With Stable Unique Keys (e.g., item.id)
        React->>OldVTree: Compares children based on keys
        React->>NewVTree: Identifies moved/added/removed items
        Note over React: Item A (key='a') moved from index 0 to 1. Item B (key='b') remains.
        React->>DOM: Reorders/updates existing DOM nodes efficiently. State preserved for existing keyed items.
    end

    alt With Index as Keys
        React->>OldVTree: Compares children based on index
        React->>NewVTree: Sees list[0] (old A) became list[0] (new C)
        Note over React: If item A moved and C inserted at start, React might think A updated to C, B to A.
        React->>DOM: May unnecessarily re-render/destroy/recreate DOM nodes. State can be misapplied or lost.
    end
`;

// Component for individual list item, allowing internal state
const ListItemWithInput: React.FC<{
  item: ItemType;
  onDelete: (id: string) => void;
}> = ({ item, onDelete }) => {
  const [inputValue, setInputValue] = useState("");
  console.log(
    `ListItemWithInput Render: ${item.name} (ID: ${item.id}), Input: ${inputValue}`,
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 8,
        padding: 8,
        border: "1px solid #e8e8e8",
        borderRadius: 4,
      }}
    >
      <Text strong style={{ marginRight: 8 }}>
        {item.name} (ID: <Tag>{item.id}</Tag>)
      </Text>
      <Input
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: 200, marginRight: 8 }}
      />
      <Text style={{ marginRight: 8 }}>Current input: "{inputValue}"</Text>
      <Button onClick={() => onDelete(item.id)} danger size="small">
        Remove
      </Button>
    </div>
  );
};

/**
 * @description Demonstrates the importance of using stable and unique keys when rendering lists.
 * Shows how incorrect key usage (e.g., using array index for dynamic lists)
 * can lead to performance issues and state management bugs.
 * @returns {JSX.Element} The ListKeysDemo component.
 */
const ListKeysDemo: React.FC = () => {
  const [itemsWithIdKey, setItemsWithIdKey] = useState<ItemType[]>([
    ...initialItems,
  ]);
  const [itemsWithIndexKey, setItemsWithIndexKey] = useState<ItemType[]>([
    ...initialItems,
  ]);

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

  const addItemToStart = () => {
    const newItem: ItemType = {
      id: `id-${nextId++}`,
      name: `NewItem-${nextId - 1}`,
    };
    setItemsWithIdKey([newItem, ...itemsWithIdKey]);
    setItemsWithIndexKey([newItem, ...itemsWithIndexKey]);
  };

  const addItemToEnd = () => {
    const newItem: ItemType = {
      id: `id-${nextId++}`,
      name: `NewItem-${nextId - 1}`,
    };
    setItemsWithIdKey([...itemsWithIdKey, newItem]);
    setItemsWithIndexKey([...itemsWithIndexKey, newItem]);
  };

  const removeItem = (id: string, listType: "idKey" | "indexKey") => {
    if (listType === "idKey") {
      setItemsWithIdKey(itemsWithIdKey.filter((item) => item.id !== id));
    } else {
      setItemsWithIndexKey(itemsWithIndexKey.filter((item) => item.id !== id));
    }
  };

  const shuffleItems = () => {
    setItemsWithIdKey([...itemsWithIdKey].sort(() => Math.random() - 0.5));
    setItemsWithIndexKey(
      [...itemsWithIndexKey].sort(() => Math.random() - 0.5),
    );
  };

  return (
    <Card
      title={
        <Title level={4}>
          Importance of <code>key</code> Prop in Lists
        </Title>
      }
    >
      <Paragraph>
        The <code>key</code> prop is crucial for React to identify which items
        in a list have changed, been added, or been removed. Using stable,
        unique keys (like an item's ID) helps React efficiently update the UI
        and preserve component state.
      </Paragraph>

      {/* <div
        className="mermaid"
        style={{
          textAlign: "center",
          padding: "10px",
          border: "1px solid #f0f0f0",
          borderRadius: "4px",
          marginBottom: 16,
        }}
      >
        {listKeysDiagram}
      </div> */}

      <Paragraph>
        Interact with the lists below. Type something into the input fields of
        list items. Then, add items to the start or shuffle. Observe how the
        input field state is (mis)handled when using index as a key versus a
        stable ID.
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button onClick={addItemToStart}>Add Item to Start</Button>
        <Button onClick={addItemToEnd}>Add Item to End</Button>
        <Button onClick={shuffleItems}>Shuffle Items</Button>
      </Space>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Title level={5}>List with ID as Key (Correct)</Title>
          {itemsWithIdKey.map((item) => (
            <ListItemWithInput
              key={item.id}
              item={item}
              onDelete={(id) => removeItem(id, "idKey")}
            />
          ))}
          {itemsWithIdKey.length === 0 && (
            <Text type="secondary">List is empty.</Text>
          )}
        </Col>
        <Col xs={24} md={12}>
          <Title level={5}>List with Index as Key (Problematic)</Title>
          {itemsWithIndexKey.map((item, index) => (
            <ListItemWithInput
              key={index}
              item={item}
              onDelete={(id) => removeItem(id, "indexKey")}
            />
          ))}
          {itemsWithIndexKey.length === 0 && (
            <Text type="secondary">List is empty.</Text>
          )}
        </Col>
      </Row>

      <Alert
        style={{ marginTop: 20 }}
        message="Impact Metrics & What to Observe:"
        description={
          <>
            <Paragraph>
              - <strong>Stable Keys (ID):</strong> When items are added to the
              start or shuffled, React correctly identifies existing components
              by their stable ID key. The internal state of these components
              (e.g., what you typed in the input) is preserved. DOM updates are
              minimal.
            </Paragraph>
            <Paragraph>
              - <strong>Index Keys:</strong> When items are added to the start
              or shuffled, React reuses components based on their new index. If
              you typed into the first item's input, and then add a new item to
              the start, the new first item (at index 0) will incorrectly
              inherit the state of the old first item. This is because React
              thinks it's the same component at that position. Watch the console
              logs for render information.
            </Paragraph>
            <Paragraph>
              - <strong>DOM Inspection:</strong> Using browser dev tools, you
              can see that with stable keys, less re-rendering of unchanged
              items occurs.
            </Paragraph>
          </>
        }
        type="info"
        showIcon
      />
    </Card>
  );
};

export default ListKeysDemo;
