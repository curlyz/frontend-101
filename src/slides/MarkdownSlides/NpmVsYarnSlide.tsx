import React from "react";
import {
  Typography,
  Card,
  List,
  Row,
  Col,
  Table,
  Tag,
  Alert,
  Space,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  RocketOutlined,
  DatabaseOutlined,
  LockOutlined,
  CodeSandboxOutlined, // Generic package icon
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

/**
 * @function NpmVsYarnSlide
 * @description A React functional component comparing npm and Yarn package managers.
 * It covers their descriptions, a comparison table of key differences, and a concluding recommendation.
 * @returns {React.ReactElement} The NpmVsYarnSlide component.
 * @example
 * <NpmVsYarnSlide />
 */
const NpmVsYarnSlide: React.FC = () => {
  const mainIdeas = [
    "Briefly describe npm (default for Node.js, largest registry).",
    "Briefly describe Yarn (alternative, focusing on speed, reliability, security).",
    "Present a comparison table highlighting key differences (Pre-installed, Speed, Offline Install, Lockfile).",
    "Conclude with the recommendation for Yarn based on performance and consistency (as per original text).",
  ];

  const comparisonColumns = [
    {
      title: "Aspect",
      dataIndex: "aspect",
      key: "aspect",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: (
        <Space>
          <CodeSandboxOutlined style={{ color: "#CB3837" }} />
          npm
        </Space>
      ),
      dataIndex: "npm",
      key: "npm",
      render: (data: { text: string; icon?: React.ReactNode }) => (
        <Space>
          {data.icon}
          {data.text}
        </Space>
      ),
    },
    {
      title: (
        <Space>
          <CodeSandboxOutlined style={{ color: "#2C8EBB" }} />
          Yarn (Classic & Berry)
        </Space>
      ),
      dataIndex: "yarn",
      key: "yarn",
      render: (data: { text: string; icon?: React.ReactNode }) => (
        <Space>
          {data.icon}
          {data.text}
        </Space>
      ),
    },
  ];

  const comparisonData = [
    {
      key: "1",
      aspect: "Pre-installed with Node",
      npm: {
        text: "Yes",
        icon: <CheckCircleOutlined style={{ color: "green" }} />,
      },
      yarn: {
        text: "No (install separately)",
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
      },
    },
    {
      key: "2",
      aspect: "Speed",
      npm: { text: "Improved significantly, often comparable" },
      yarn: {
        text: "Historically faster, focused on predictability",
        icon: <RocketOutlined style={{ color: "#2C8EBB" }} />,
      },
    },
    {
      key: "3",
      aspect: "Offline Install",
      npm: { text: "Supported with cache" },
      yarn: {
        text: "Robust (Yarn Classic), Zero-installs (Berry)",
        icon: <DatabaseOutlined style={{ color: "#2C8EBB" }} />,
      },
    },
    {
      key: "4",
      aspect: "Lockfile",
      npm: { text: "package-lock.json", icon: <LockOutlined /> },
      yarn: {
        text: "yarn.lock",
        icon: <LockOutlined style={{ color: "#2C8EBB" }} />,
      },
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2}>Package Management - npm vs Yarn</Title>

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
          <Card title="npm" style={{ height: "100%" }}>
            <Paragraph>
              <Text strong>npm</Text> is the default package manager for
              Node.js, and it's the largest software registry in the world. It
              allows JavaScript developers to share and reuse code through
              packages (also called modules) and manages project dependencies
              efficiently.
            </Paragraph>
            <div style={{ textAlign: "center" }}>
              <CodeSandboxOutlined
                style={{ fontSize: "48px", color: "#CB3837" }}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Yarn" style={{ height: "100%" }}>
            <Paragraph>
              On the other hand, <Text strong>Yarn</Text> was created as a fast,
              reliable, and secure alternative to npm, addressing some
              performance and consistency issues found in earlier versions of
              npm.
            </Paragraph>
            <div style={{ textAlign: "center" }}>
              <CodeSandboxOutlined
                style={{ fontSize: "48px", color: "#2C8EBB" }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Comparison Table" style={{ marginBottom: 20 }}>
        <Table
          columns={comparisonColumns}
          dataSource={comparisonData}
          pagination={false}
          bordered
          size="middle"
        />
      </Card>

      <Card title="Conclusion">
        <Paragraph>
          In conclusion, both npm and Yarn are powerful package managers. Yarn
          often provides faster and more consistent installs, especially with
          features like Plug'n'Play in Yarn Berry. The choice can depend on
          project needs, team familiarity, and specific workflow advantages.
        </Paragraph>
        <Alert
          message="Project Choice: Yarn"
          description="This project uses Yarn, as indicated by the yarn.lock file."
          type="info"
          showIcon
        />
      </Card>
    </div>
  );
};

export default NpmVsYarnSlide;
