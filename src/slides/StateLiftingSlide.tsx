import React, { useEffect } from "react";
import { Card, Typography, Space, Divider, Row, Col } from "antd";
import TaskManager from "@/components/features/state-lifting/TaskManager"; // Use alias
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // Add SyntaxHighlighter
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Add style
import mermaid from "mermaid"; // Add mermaid

const { Title, Paragraph, Text } = Typography;

// Added Mermaid Diagram Definition
const stateLiftingDiagram = `
graph TD
    subgraph PropDrilling ["A. Prop Drilling"] 
        direction TB
        ParentA[Parent]
        ChildA1[Child 1]
        ChildA2[Child 2 (Needs State)]
        GrandChildA[Grandchild (Updates State)]
        
        ParentA -- State & Setter --> ChildA1
        ChildA1 -- State & Setter --> ChildA2
        ChildA2 -- Setter --> GrandChildA
        ChildA2 -- Uses State --> ChildA2
        
        note right of ChildA1 "Passes props even if unused"
        classDef needsState fill:#f9f,stroke:#e11,stroke-width:2px;
        class ChildA2 needsState;
    end

    subgraph StateLifting ["B. State Lifting / Context"] 
        direction TB
        ParentB["Parent (with Provider/State)"]
        ChildB1[Child 1]
        ChildB2[Child 2 (Needs State)]
        GrandChildB[Grandchild (Updates State)]
        
        ParentB --> ChildB1
        ParentB --- ChildB2
        ParentB ---- GrandChildB
        
        ChildB2 -.->|useContext / useSelector| ParentB
        GrandChildB -.->|useContext / useDispatch| ParentB
        
        note right of ChildB1 "Doesn't need props"
        classDef usesContext fill:#9cf,stroke:#11e,stroke-width:2px;
        class ChildB2, GrandChildB usesContext;
    end
`;

// Added Code Snippets
const propDrillingExample = `
// Parent passes state down
function Parent() {
  const [data, setData] = useState('initial');
  return <Child1 data={data} setData={setData} />;
}

// Child1 doesn't need props, but passes them
function Child1({ data, setData }) {
  return <Child2 data={data} setData={setData} />;
}

// Child2 needs data and setData
function Child2({ data, setData }) {
  return (
    <div>
      Data: {data}
      <Grandchild setData={setData} />
    </div>
  );
}

// Grandchild needs to update state
function Grandchild({ setData }) {
  return <button onClick={() => setData('updated')}>
           Update
         </button>;
}
`;

const stateLiftingContextExample = `
// Context Setup
const MyContext = createContext();
function MyProvider({ children }) {
  const [data, setData] = useState('initial');
  const value = { data, setData };
  return <MyContext.Provider value={value}>
           {children}
         </MyContext.Provider>;
}

// Parent wraps with Provider
function Parent() {
  return (
    <MyProvider>
      <Child1 />
    </MyProvider>
  );
}

// Child1 doesn't need context or props
function Child1() { return <Child2 />; }

// Child2 uses context
function Child2() {
  const { data } = useContext(MyContext);
  return (
    <div>
      Data: {data}
      <Grandchild />
    </div>
  );
}

// Grandchild uses context
function Grandchild() {
  const { setData } = useContext(MyContext);
  return <button onClick={() => setData('updated')}>
           Update
         </button>;
}
`;

const codeSnippetStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  maxHeight: "300px",
  overflow: "auto",
};

/**
 * Renders a slide demonstrating state lifting, comparing prop drilling with
 * using React Context.
 * Includes diagrams, code snippets, and an interactive TaskManager demo.
 *
 * @returns {JSX.Element} The StateLiftingSlide component.
 */
const StateLiftingSlide: React.FC = () => {
  // Added useEffect for Mermaid
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

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        State Lifting
      </Title>

      <Card title="The Problem: Prop Drilling">
        <Paragraph>
          When multiple components need access to the same state, passing that
          state down through many intermediate components ("prop drilling") can
          become cumbersome and make components less reusable.
        </Paragraph>
      </Card>

      <Card title="The Solution: Lifting State Up">
        <Paragraph>
          Move the shared state up to the closest common ancestor of the
          components that need it. Alternatively, use a state management
          solution like React Context (or Redux, Zustand) to provide the state
          directly to the components that need it, bypassing intermediate ones.
        </Paragraph>
        {/* Added Mermaid Diagram */}
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
          {stateLiftingDiagram}
        </div>
      </Card>

      {/* Added Code Snippets Section */}
      <Card title="Code Comparison">
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Title level={4}>A. Prop Drilling Example</Title>
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              customStyle={codeSnippetStyle}
            >
              {propDrillingExample.trim()}
            </SyntaxHighlighter>
          </Col>
          <Col xs={24} lg={12}>
            <Title level={4}>B. State Lifting (Context) Example</Title>
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              customStyle={codeSnippetStyle}
            >
              {stateLiftingContextExample.trim()}
            </SyntaxHighlighter>
          </Col>
        </Row>
      </Card>

      <Card title={<Title level={3}>Demo: Task Manager with Context</Title>}>
        <Paragraph>
          This interactive example uses React Context (
          {/* Removed Text code here as it's less readable */}
          <code>TaskContext.tsx</code>) to manage the task list state instead of
          prop drilling. The <code>TaskProvider</code> wraps the{" "}
          <code>TaskManager</code> content. Components like{" "}
          <code>AddTaskForm</code> and <code>TaskList</code> use custom hooks
          (e.g., <code>useAddTask</code>, <code>useTasks</code>) to access state
          and actions from the context.
        </Paragraph>
        <Paragraph>
          State updates still use Immer for immutability within the context
          provider. We've also replaced <code>useContextSelector</code> with
          standard <code>useContext</code>
          to resolve potential compatibility issues.
        </Paragraph>
      </Card>
      <TaskManager />
    </Space>
  );
};

export default StateLiftingSlide;
