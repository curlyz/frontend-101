import React from "react";
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
              Imagine a central <Tag color="blue">My Project</Tag> node
              connected to various package nodes like
              <Tag>React</Tag>, <Tag>Lodash</Tag>, <Tag>Axios</Tag>,{" "}
              <Tag>ESLint</Tag>. These packages themselves might have
              sub-dependencies, illustrating the complex web managed by package
              managers.
            </Paragraph>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <CodeSandboxOutlined
                style={{ fontSize: "48px", color: "#1890ff" }}
              />
              <Paragraph type="secondary">
                Illustrative Icon for Dependency Web
              </Paragraph>
            </div>
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
