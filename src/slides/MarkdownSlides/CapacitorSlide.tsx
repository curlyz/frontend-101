import React, { useEffect } from "react";
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
  ApiOutlined,
  CameraOutlined,
  EnvironmentOutlined,
  FolderOutlined,
  NotificationOutlined,
  WifiOutlined,
  AlertOutlined,
  NodeIndexOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import mermaid from "mermaid";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const capacitorLogoUrl = "https://capacitorjs.com/assets/img/logo.png";

const codeBlockStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  padding: "10px",
  whiteSpace: "pre",
  overflow: "auto",
  maxHeight: "300px",
};

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
    "Approach: Cross-platform native runtime, web-focused APIs, access to native device features, expandable with custom native code.",
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

  const architectureDiagram = `
graph TD
    A["React Web App Codebase<br>(HTML, CSS, JS/TS)"]

    subgraph WEB_DEPLOYMENT [Web / PWA]
        direction LR
        B[Standard Browser]
    end

    subgraph MOBILE_DEPLOYMENT [Mobile via Capacitor]
        direction TB
        C[Capacitor Core Runtime]
        CWV["WebView<br>(Renders Web App UI)"]
        C --> CWV
        
        subgraph IOS [iOS Native Platform]
            direction TB
            D[iOS Native App Shell]
            D_Plugins["Native iOS Plugins<br>(Swift/Obj-C)"]
            D_Bridge["Capacitor Bridge (JS <-> Native)"]
            D_APIs["Native iOS APIs<br>(Camera, GPS, etc.)"]
            CWV <-.->|JS Calls| D_Bridge
            D_Bridge -- Access --> D_APIs
            D_Bridge -- Extends --> D_Plugins
            D --> D_Bridge
        end
        
        subgraph ANDROID [Android Native Platform]
            direction TB
            E[Android Native App Shell]
            E_Plugins["Native Android Plugins<br>(Kotlin/Java)"]
            E_Bridge["Capacitor Bridge (JS <-> Native)"]
            E_APIs["Native Android APIs<br>(Camera, GPS, etc.)"]
            CWV <-.->|JS Calls| E_Bridge
            E_Bridge -- Access --> E_APIs
            E_Bridge -- Extends --> E_Plugins
            E --> E_Bridge
        end

        C -.-> D
        C -.-> E
    end

    A --> B
    A --> C

    classDef web fill:#D6EAF8,stroke:#2E86C1,stroke-width:2px,color:#000;
    classDef capacitor fill:#D1F2EB,stroke:#1ABC9C,stroke-width:2px,color:#000;
    classDef native_ios fill:#FCF3CF,stroke:#F1C40F,stroke-width:2px,color:#000;
    classDef native_android fill:#FDEDEC,stroke:#E74C3C,stroke-width:2px,color:#000;
    classDef bridge fill:#5D6D7E,stroke:#34495E,stroke-width:2px,color:white;

    class A web;
    class B web;
    class C capacitor;
    class CWV capacitor;
    class D native_ios;
    class D_Plugins native_ios;
    class D_APIs native_ios;
    class D_Bridge bridge;
    class E native_android;
    class E_Plugins native_android;
    class E_APIs native_android;
    class E_Bridge bridge;
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

  const nativeFeatures = [
    {
      name: "Camera",
      icon: <CameraOutlined />,
      npmPackage: "@capacitor/camera",
      description: "Capture photos/videos, access gallery.",
    },
    {
      name: "Geolocation",
      icon: <EnvironmentOutlined />,
      npmPackage: "@capacitor/geolocation",
      description: "Get device location (GPS, WiFi).",
    },
    {
      name: "Filesystem",
      icon: <FolderOutlined />,
      npmPackage: "@capacitor/filesystem",
      description: "Read/write files on device storage.",
    },
    {
      name: "Push Notifications",
      icon: <NotificationOutlined />,
      npmPackage: "@capacitor/push-notifications",
      description: "Receive and handle push messages.",
    },
    {
      name: "Local Notifications",
      icon: <NotificationOutlined />,
      npmPackage: "@capacitor/local-notifications",
      description: "Schedule notifications locally.",
    },
    {
      name: "Network",
      icon: <WifiOutlined />,
      npmPackage: "@capacitor/network",
      description: "Check network status and connectivity.",
    },
    {
      name: "Haptics",
      icon: <AlertOutlined />,
      npmPackage: "@capacitor/haptics",
      description: "Trigger vibration feedback.",
    },
    {
      name: "Device Info",
      icon: <MobileOutlined />,
      npmPackage: "@capacitor/device",
      description: "Get OS, model, battery status, etc.",
    },
    {
      name: "Motion",
      icon: <DashboardOutlined />,
      npmPackage: "@capacitor/motion",
      description: "Access device motion sensors.",
    },
    {
      name: "Bluetooth LE",
      icon: <NodeIndexOutlined />,
      npmPackage: "Community Plugin (e.g., @capawesome/...)",
      description: "Communicate with BLE devices.",
    },
  ];

  const installationAndSetupSteps = [
    {
      title: "1. Install Capacitor CLI",
      icon: <ToolOutlined />,
      description: (
        <>
          <Paragraph>
            Install Capacitor CLI globally (recommended) or use{" "}
            <Text code>npx</Text> for each command:
          </Paragraph>
          <SyntaxHighlighter
            language="bash"
            style={atomDark}
            customStyle={codeBlockStyle}
          >
            {`# Install globally
npm install -g @capacitor/cli
# OR
yarn global add @capacitor/cli

# If not installing globally, prefix commands with npx, e.g.:
# npx @capacitor/cli ...`}
          </SyntaxHighlighter>
        </>
      ),
    },
    {
      title: "2. Initialize Capacitor in Your Web Project",
      icon: <CodeOutlined />,
      description: (
        <>
          <Paragraph>
            Navigate to your existing React project directory and run:
          </Paragraph>
          <SyntaxHighlighter
            language="bash"
            style={atomDark}
            customStyle={codeBlockStyle}
          >
            {`# Replace [appName] and [appId] accordingly
# --web-dir should point to your build output (e.g., dist, build)
npx @capacitor/cli init [appName] [appId] --web-dir=dist`}
          </SyntaxHighlighter>
          <Paragraph style={{ fontSize: "0.9em", marginTop: "8px" }}>
            Example:{" "}
            <Text code>
              npx @capacitor/cli init "My App" "com.example.myapp"
              --web-dir=dist
            </Text>
          </Paragraph>
        </>
      ),
    },
    {
      title: "3. Install Native Platforms",
      icon: (
        <Space>
          <AppleOutlined />
          <AndroidOutlined />
        </Space>
      ),
      description: (
        <>
          <Paragraph>Add the desired native platforms:</Paragraph>
          <SyntaxHighlighter
            language="bash"
            style={atomDark}
            customStyle={codeBlockStyle}
          >
            {`# For iOS (requires macOS and Xcode)
npx @capacitor/cli add ios

# For Android (requires Android Studio and SDK)
npx @capacitor/cli add android`}
          </SyntaxHighlighter>
        </>
      ),
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

      <Card
        title="Capacitor Hybrid Architecture & Deployment"
        style={{ marginBottom: 20 }}
      >
        <Paragraph>
          Capacitor enables a single web codebase to be deployed as a
          Progressive Web App (PWA) or standard website, and also packaged into
          native iOS and Android applications. Its hybrid architecture uses a
          WebView to render the web application, while a powerful bridge allows
          JavaScript to access native device features and for developers to
          extend functionality with custom native plugins.
        </Paragraph>
        <div
          className="mermaid"
          style={{
            textAlign: "center",
            padding: "10px",
            border: "1px solid #f0f0f0",
            borderRadius: "4px",
            marginTop: 16,
            background: "#fff",
          }}
        >
          {architectureDiagram}
        </div>
        <Paragraph
          style={{
            marginTop: "16px",
            fontSize: "0.9em",
            textAlign: "center",
            color: "gray",
          }}
        >
          Diagram: Single codebase deployed to Web, iOS, and Android, with
          Capacitor bridge enabling native feature access and custom plugin
          extension.
        </Paragraph>
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
        title="Example Native Features via Plugins"
        style={{ marginBottom: 20 }}
      >
        <Paragraph>
          Capacitor provides a bridge to access native device capabilities
          through a plugin system. Here are some examples of features accessible
          via official or community plugins:
        </Paragraph>
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          {nativeFeatures.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.name}>
              <Card
                size="small"
                title={
                  <Space>
                    {React.cloneElement(item.icon, {
                      style: { fontSize: "18px" },
                    })}{" "}
                    {item.name}
                  </Space>
                }
                headStyle={{ fontSize: "0.95em", backgroundColor: "#111" }}
                bodyStyle={{ fontSize: "0.9em", backgroundColor: "#000" }}
                style={{ height: "100%" }}
              >
                <Paragraph style={{ marginBottom: "8px" }}>
                  {item.description}
                </Paragraph>
                <Text code style={{ fontSize: "0.85em" }}>
                  {item.npmPackage}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
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
