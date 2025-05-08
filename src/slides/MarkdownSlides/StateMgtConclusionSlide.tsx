import React, { useEffect } from "react";
import { Typography, Card, List, Row, Col, Space, Alert } from "antd";
import {
  CheckCircleOutlined,
  ProjectOutlined,
  DeploymentUnitOutlined,
  TeamOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import mermaid from "mermaid";

const { Title, Paragraph, Text } = Typography;

/**
 * @function StateMgtConclusionSlide
 * @description A React functional component that presents a conclusion on React state management.
 * It summarizes the use cases for React Context API and Redux, emphasizing that the choice
 * depends on application complexity and specific needs. It also includes visual ideas for
 * presenting this information.
 * @returns {React.ReactElement} The StateMgtConclusionSlide component.
 */
const StateMgtConclusionSlide: React.FC = () => {
  const mainIdeas = [
    "Summarize that both Context API and Redux are useful state management tools.",
    "Position Context API as ideal for simpler apps and avoiding prop drilling.",
    "Position Redux as better suited for larger, complex applications needing centralized and predictable state management.",
    "Emphasize that the choice depends on application complexity, team experience, and specific needs.",
  ];

  const visualIdeasDecisionTree = [
    'Start: "Need to share state?"',
    "If No -> Component State is fine.",
    'If Yes -> "Is prop drilling becoming an issue or is the state complex/global?"',
    "  - If No (or simple state) -> Consider React Context.",
    "  - If Yes (complex, many updates, middleware needed) -> Consider Redux.",
    'Add branches for "Team Familiarity?" or "Performance Critical?" for more nuanced decisions.',
  ];

  const visualIdeasScaleMeter = [
    'Show a spectrum from "Simple App" to "Complex Enterprise App".',
    "Place React Context logo towards the simpler end.",
    "Place Redux logo towards the complex end.",
  ];

  // Added Mermaid Diagram Definitions
  const decisionTreeDiagram = `
graph TD
    Start["Need to Share State?"] --> IsLocal{"Component State (useState/useReducer) Sufficient?"};
    IsLocal -- "Yes" --> EndLocal[Component State];
    IsLocal -- "No" --> IsPropDrilling{"Prop Drilling Becoming Complex?"};
    
    IsPropDrilling -- "No" --> ConsiderContext{"Consider React Context"};
    IsPropDrilling -- "Yes" --> IsComplexState{"Complex State / Logic / Middleware Needed?"};
    
    ConsiderContext --> AssessContextPerformance{"Performance Issues with Context?"};
    AssessContextPerformance -- "Yes" --> ContextSelector[Use Context Selector Pattern / Library];
    AssessContextPerformance -- "No" --> EndContext[React Context];

    IsComplexState -- "Yes" --> EndRedux[Consider Redux / Zustand / Jotai etc.];
    IsComplexState -- "No" --> ConsiderContext;

    classDef decision fill:#f9f,stroke:#333,stroke-width:2px;
    classDef solution fill:#9cf,stroke:#333,stroke-width:2px;
    class Start, IsLocal, IsPropDrilling, IsComplexState, AssessContextPerformance decision;
    class EndLocal, ConsiderContext, EndContext, EndRedux, ContextSelector solution;
  `;

  const complexityScaleDiagram = `
graph LR
    subgraph ComplexityScale ["Application Complexity Scale"]
        direction LR
        Low["Low<br>(Simple UI State, <br>Minimal Sharing)"] --> Medium["Medium<br>(Prop Drilling Issues, <br>Theming, Auth State)"] --> High["High<br>(Complex Interactions, <br>Middleware, Caching, <br>Large Team)"];
    end
    
    subgraph ToolSuitability ["Suitable Tools"]
        direction TB
        CompState["Component State<br>(useState, useReducer)"] --> ContextAPI["React Context API<br>(+ Selectors)"] --> GlobalLibs["Global State Libraries<br>(Redux, Zustand, Jotai, etc.)"];
    end

    Low -.-> CompState;
    Medium -.-> ContextAPI;
    High -.-> GlobalLibs;
    
    classDef scaleNode fill:#eee,stroke:#333;
    classDef toolNode fill:#D1F2EB,stroke:#1ABC9C;
    class Low,Medium,High scaleNode;
    class CompState,ContextAPI,GlobalLibs toolNode;
`;

  // Added useEffect for Mermaid Initialization
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });
    const timer = setTimeout(() => {
      try {
        mermaid.run(); // Renders all elements with class="mermaid"
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2}>React State Management - Conclusion</Title>

      <Card title="Main Ideas to Convey" style={{ marginBottom: 20 }}>
        <List
          dataSource={mainIdeas}
          renderItem={(item) => (
            <List.Item>
              <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} />{" "}
              {item}
            </List.Item>
          )}
        />
      </Card>

      <Card title="Visual Ideas" style={{ marginBottom: 20 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card type="inner" title="Decision Tree/Flowchart">
              <div
                className="mermaid"
                style={{
                  textAlign: "center",
                  background: "#fff",
                  padding: "10px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "4px",
                }}
              >
                {decisionTreeDiagram}
              </div>
              <Paragraph type="secondary" style={{ marginTop: "10px" }}>
                Simplified decision flow for choosing a state management
                approach.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card type="inner" title="Scale/Complexity Meter">
              <div
                className="mermaid"
                style={{
                  textAlign: "center",
                  background: "#fff",
                  padding: "10px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "4px",
                }}
              >
                {complexityScaleDiagram}
              </div>
              <Paragraph type="secondary" style={{ marginTop: "10px" }}>
                General suitability of tools based on application complexity.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>

      <Card title="Content Summary">
        <Paragraph>
          In conclusion, managing state effectively is crucial in React
          development. We've explored several tools:
        </Paragraph>
        <List>
          <List.Item>
            <Space>
              <DeploymentUnitOutlined />
              <Text strong>
                Component State (`useState`, `useReducer`):
              </Text>{" "}
              Ideal for local component logic.
            </Space>
          </List.Item>
          <List.Item>
            <Space>
              <ProjectOutlined />
              <Text strong>React Context API:</Text> Excellent for avoiding prop
              drilling and sharing state across a component tree in simpler to
              moderately complex scenarios. We also saw how{" "}
              <Text code>use-context-selector</Text> can optimize context
              performance by preventing unnecessary re-renders.
            </Space>
          </List.Item>
          <List.Item>
            <Space>
              <TeamOutlined />
              <Text strong>Redux (with Redux Toolkit):</Text> A powerful
              solution for larger, more complex applications demanding a
              centralized, predictable state container with robust debugging
              tools and middleware capabilities.
            </Space>
          </List.Item>
        </List>
        <Paragraph style={{ marginTop: 16 }}>
          Ultimately, the optimal state management solution hinges on several
          factors:
        </Paragraph>
        <List
          size="small"
          style={{ marginLeft: "15px", marginBottom: "16px" }}
          bordered
        >
          <List.Item>
            <Text>
              <Text strong>Application Requirements:</Text> What specific
              problems are you trying to solve with state management?
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <Text strong>Scale & Complexity:</Text> How intricate is the
              state, how frequent are updates, and how many components interact
              with it?
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <Text strong>Team Familiarity:</Text> What tools is your team
              comfortable and productive with? What is the learning curve?
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <Text strong>Performance Needs:</Text> Are there critical
              performance considerations for state updates and re-renders?
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <Text strong>Ecosystem & Tooling:</Text> Consider middleware,
              devtools, and community support if advanced features are needed.
            </Text>
          </List.Item>
        </List>
        <Paragraph>
          Understanding these tools and trade-offs empowers you to build robust,
          maintainable, and scalable React applications.
        </Paragraph>
        <Alert
          message="Next Chapter"
          description="On next chapter, we will explore about react client component and server components."
          type="info"
          showIcon
          icon={<RocketOutlined />}
          style={{ marginTop: 20 }}
        />
      </Card>
    </div>
  );
};

export default StateMgtConclusionSlide;
