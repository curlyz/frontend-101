import React from "react";
import {
  Typography,
  Card,
  List,
  Row,
  Col,
  Steps,
  Tag,
  Alert,
  Space,
  Image,
} from "antd";
import {
  MobileOutlined,
  CodeOutlined,
  SyncOutlined,
  PlayCircleOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  AppleOutlined,
  AndroidOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const capacitorLogoUrl = "https://capacitorjs.com/assets/img/logo.png";

/**
 * @function CapacitorSlide
 * @description A React functional component explaining how to port responsive React web apps to native mobile apps
 * using Capacitor. It covers Capacitor's approach, workflow, and key commands.
 * @returns {React.ReactElement} The CapacitorSlide component.
 * @example
 * <CapacitorSlide />
 */
const CapacitorSlide: React.FC = () => {
  const mainIdeas = [
    "Capacitor: Framework for porting responsive React web apps to native mobile (iOS, Android).",
    "Approach: Cross-platform native runtime, web-focused APIs, access to native device features.",
    "Workflow: Build web code -> Sync to Capacitor project -> Test on device -> Compile native binary.",
  ];

  const capacitorWorkflowSteps = [
    {
      title: "React Web App (Code)",
      description: "Your existing responsive React application code.",
      icon: <LaptopOutlined />,
    },
    {
      title: "Build Web Assets",
      description: (
        <Text>
          Run <Text code>npm run build</Text> or <Text code>yarn build</Text>.
          Outputs to <Text code>dist</Text> folder.
        </Text>
      ),
      icon: <ToolOutlined />,
    },
    {
      title: "Sync Web Code to Native Projects",
      description: (
        <Text>
          Run <Text code>npx cap sync</Text>. Copies assets to iOS/Android
          Capacitor projects.
        </Text>
      ),
      icon: <SyncOutlined />,
    },
    {
      title: "Test on Device/Emulator",
      description: (
        <Text>
          Run <Text code>npx cap run ios/android</Text> or open in Xcode/Android
          Studio.
        </Text>
      ),
      icon: <PlayCircleOutlined />,
    },
    {
      title: "Compile Native Binary (Optional)",
      description: (
        <Text>
          Run <Text code>npx cap build android/ios</Text> for APK/AAB/IPA.
        </Text>
      ),
      icon: <MobileOutlined />,
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2}>Porting to Mobile Apps with Capacitor</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }} align="middle">
        <Col xs={24} md={6} style={{ textAlign: "center" }}>
          <Image
            src={capacitorLogoUrl}
            alt="Capacitor Logo"
            width={100}
            preview={false}
          />
        </Col>
        <Col xs={24} md={18}>
          <Card title="Main Ideas to Convey">
            <List
              dataSource={mainIdeas}
              renderItem={(item) => (
                <List.Item>
                  <CheckCircleOutlined
                    style={{ color: "green", marginRight: 8 }}
                  />{" "}
                  {item}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Capacitor Workflow" style={{ marginBottom: 20 }}>
        <Steps direction="vertical" current={-1}>
          {capacitorWorkflowSteps.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </Steps>
      </Card>

      <Card title="Content Overview" style={{ marginBottom: 20 }}>
        <Paragraph>
          For responsive React apps, porting to Mobile can be achieved through
          frameworks like <Text strong>Capacitor</Text>. Capacitor is a
          cross-platform native runtime that makes it easy to build performant
          mobile applications that run natively on
          <Tag icon={<AppleOutlined />} color="default">
            iOS
          </Tag>{" "}
          and
          <Tag icon={<AndroidOutlined />} color="success">
            Android
          </Tag>
          , using modern web tooling. It provides a consistent, web-focused set
          of APIs that enable an app to stay as close to web standards as
          possible, while accessing rich native device features.
        </Paragraph>

        <Alert
          message="Capacitor Workflow Steps Summarized"
          type="info"
          showIcon
          description={
            <List size="small">
              <List.Item>
                1. <Text strong>Build web code:</Text>{" "}
                <Text code>npm run build</Text>
              </List.Item>
              <List.Item>
                2. <Text strong>Sync web code:</Text>{" "}
                <Text code>npx cap sync</Text>
              </List.Item>
              <List.Item>
                3. <Text strong>Test on device:</Text>{" "}
                <Text code>npx cap run ios/android</Text>
              </List.Item>
              <List.Item>
                4. <Text strong>Compile native binary:</Text>{" "}
                <Text code>npx cap build android/ios</Text> (or via IDE)
              </List.Item>
            </List>
          }
          style={{ marginTop: 15 }}
        />
        <Paragraph style={{ marginTop: 15 }}>
          <Text strong>Testing:</Text> After syncing, use Capacitor CLI commands
          or open in Xcode/Android Studio for testing on devices/emulators.
        </Paragraph>
        <Paragraph>
          <Text strong>Compiling:</Text> For production builds (AAB, APK, IPA),
          use <Text code>npx cap build</Text> or the native IDEs (Xcode for iOS
          requires macOS).
        </Paragraph>
      </Card>

      <Card
        title="Visual Idea: Device Mockups"
        style={{ marginBottom: 20, textAlign: "center" }}
      >
        <Paragraph type="secondary">
          Imagine your responsive web app design seamlessly appearing on iOS and
          Android device mockups.
        </Paragraph>
        <Space size="large">
          <LaptopOutlined
            style={{ fontSize: "48px", color: "#1890ff" }}
            title="Web App"
          />
          <Text strong>→</Text>
          <MobileOutlined
            style={{ fontSize: "48px", color: "#A0A0A0" }}
            title="iOS Device"
          />
          <MobileOutlined
            style={{ fontSize: "48px", color: "#7CB342" }}
            title="Android Device"
          />
        </Space>
      </Card>

      <Paragraph style={{ marginTop: 20, textAlign: "center", color: "grey" }}>
        Presentation Status: Ready for Review
      </Paragraph>
    </div>
  );
};

export default CapacitorSlide;
