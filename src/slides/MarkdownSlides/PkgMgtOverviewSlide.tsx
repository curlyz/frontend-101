import React, { useEffect } from "react";
import { Typography, Card, List, Row, Col, Tag, Space } from "antd";
import {
  CodeSandboxOutlined,
  CloudDownloadOutlined,
  SyncOutlined,
  TagOutlined,
  ApartmentOutlined,
  PlaySquareOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import mermaid from "mermaid";

const { Title, Paragraph, Text } = Typography;

/**
 * @function PkgMgtOverviewSlide
 * @description A React functional component that provides an overview of package management in software development,
 * particularly in the context of React projects. It covers the definition, importance, automated tasks, and common
 * package managers like npm and Yarn.
 * @returns {React.ReactElement} The PkgMgtOverviewSlide component.
 * @example
 * <PkgMgtOverviewSlide />
 */
const PkgMgtOverviewSlide: React.FC = () => {
  const mainIdeas = [
    "Package management handles project dependencies (libraries, tools, frameworks).",
    "It's crucial in React projects due to the ecosystem of third-party packages.",
    "Automates tasks: installing, updating, versioning, resolving dependencies, running scripts.",
    "npm and Yarn are typical package managers for React.",
  ];

  const managerTasks = [
    { icon: <CloudDownloadOutlined />, text: "Installing packages" },
    { icon: <SyncOutlined />, text: "Updating packages" },
    { icon: <TagOutlined />, text: "Managing versioning (e.g., v1.2.3)" },
    { icon: <ApartmentOutlined />, text: "Resolving dependencies" },
    { icon: <PlaySquareOutlined />, text: "Running scripts (build, test)" },
  ];

  const dependencyWebDiagram = `
graph TD
    MyProject["My Project"]
    React["React (Package)"]
    Lodash["Lodash (Package)"]
    Axios["Axios (Package)"]
    ESLint["ESLint (Dev Package)"]

    MyProject --> React
    MyProject --> Lodash
    MyProject --> Axios
    MyProject --> ESLint

    React --> PropTypes["prop-types (Sub-dependency)"]
    React --> LooseEnvify["loose-envify (Sub-dependency)"]
    Axios --> FollowRedirects["follow-redirects (Sub-dependency)"]

    classDef project fill:#D6EAF8,stroke:#2E86C1,stroke-width:2px;
    classDef package fill:#D1F2EB,stroke:#1ABC9C,stroke-width:2px;
    classDef devPackage fill:#FCF3CF,stroke:#F1C40F,stroke-width:2px;
    classDef subDependency fill:#FDEDEC,stroke:#E74C3C,stroke-width:1px,color:#333;

    class MyProject project;
    class React,Lodash,Axios package;
    class ESLint devPackage;
    class PropTypes,LooseEnvify,FollowRedirects subDependency;
  `;

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
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2}>Package Management - Overview</Title>

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

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} md={12}>
          <Card title="Visual Idea: Dependency Web" style={{ height: "100%" }}>
            <Paragraph>
              A package manager helps manage a project's direct dependencies
              (like React, Lodash) and also their sub-dependencies, forming a
              complex web.
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
              {dependencyWebDiagram}
            </div>
            <Paragraph type="secondary">
              This diagram illustrates how a project relies on various packages,
              which in turn may rely on other packages.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Tasks Automated by a Package Manager"
            style={{ height: "100%" }}
          >
            <List
              dataSource={managerTasks}
              renderItem={(task) => (
                <List.Item>
                  <Space>
                    {React.cloneElement(task.icon, {
                      style: { color: "#1890ff" },
                    })}
                    {task.text}
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Content Summary">
        <Paragraph>
          Package management is the process of handling{" "}
          <Text strong>dependencies</Text>—libraries, tools, and frameworks—that
          a project needs to run. In a React project, developers often rely on a
          vast ecosystem of third-party packages to enhance functionality, speed
          up development, or integrate tools like linters, testing libraries, or
          UI frameworks.
        </Paragraph>
        <Paragraph>
          A package manager automates the tasks listed above, making development
          smoother and more reliable.
        </Paragraph>
        <Paragraph>
          React projects typically use either <Text strong>npm</Text> or{" "}
          <Text strong>Yarn</Text> as the package manager. (Logos would be
          displayed here in a real presentation).
        </Paragraph>
      </Card>
      <Paragraph style={{ marginTop: 20, textAlign: "center", color: "grey" }}>
        Presentation Status: Ready for Review
      </Paragraph>
    </div>
  );
};

export default PkgMgtOverviewSlide;
