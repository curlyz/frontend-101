import React from "react";
import { Typography, Card, List, Row, Col, Space, Alert } from "antd";
import {
  CheckCircleOutlined,
  ProjectOutlined,
  DeploymentUnitOutlined,
  TeamOutlined,
  RocketOutlined,
} from "@ant-design/icons";

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
              <List
                dataSource={visualIdeasDecisionTree}
                renderItem={(item) => <List.Item>{item}</List.Item>}
                size="small"
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card type="inner" title="Scale/Complexity Meter">
              <List
                dataSource={visualIdeasScaleMeter}
                renderItem={(item) => <List.Item>{item}</List.Item>}
                size="small"
              />
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
          The right choice always depends on your application's specific
          requirements, its complexity, your team's familiarity with the tools,
          and performance considerations. Understanding these options allows you
          to make informed decisions for building maintainable and scalable
          React applications.
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
      <Paragraph style={{ marginTop: 20, textAlign: "center", color: "grey" }}>
        Presentation Status: Ready for Review
      </Paragraph>
    </div>
  );
};

export default StateMgtConclusionSlide;
