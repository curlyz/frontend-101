import React from "react";
import {
  Typography,
  Card,
  List,
  Row,
  Col,
  Tag,
  Steps,
  Alert,
  Divider,
  Space,
} from "antd";
import {
  ToolOutlined,
  CloudUploadOutlined,
  CodeOutlined,
  PlayCircleOutlined,
  RocketOutlined,
  BranchesOutlined,
  CheckCircleOutlined,
  HourglassOutlined,
  SettingOutlined,
  BugOutlined,
  RollbackOutlined,
  MonitorOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

/**
 * @function BuildDeploySlide
 * @description A React functional component explaining the build and deployment processes in software development,
 * particularly for React applications. It covers build tools, deployment strategies, CI/CD, and environment configurations.
 * @returns {React.ReactElement} The BuildDeploySlide component.
 * @example
 * <BuildDeploySlide />
 */
const BuildDeploySlide: React.FC = () => {
  const mainIdeas = [
    "Build process: transforms source code (React, JSX, TS) into static assets (HTML, CSS, JS).",
    "Common build tools for React: Vite, Create React App/Webpack.",
    "Deployment: makes the built application accessible to users on a server.",
    "CI/CD (Continuous Integration/Continuous Deployment) concepts automate the pipeline.",
    "Common deployment platforms/strategies: Netlify, Vercel, static hosting, Docker.",
  ];

  const buildTasks = [
    {
      title: "Transpilation",
      description: "JSX/TS/modern JS to browser-compatible JS (Babel/SWC).",
    },
    {
      title: "Bundling",
      description: "Combining JS modules (Rollup/Webpack).",
    },
    {
      title: "Minification",
      description: "Removing unnecessary characters to reduce file size.",
    },
    {
      title: "Optimization",
      description: "Code splitting, tree shaking, image optimization.",
    },
  ];

  const deploymentApproaches = [
    {
      title: "Static Hosting Platforms",
      content:
        "Services like Vercel, Netlify, GitHub Pages. Easy Git integration, CI/CD, custom domains.",
      icon: <RocketOutlined />,
    },
    {
      title: "Cloud Storage with CDN",
      content:
        "AWS S3, Google Cloud Storage, Azure Blob Storage. Paired with CDN (CloudFront, Cloudflare) for speed.",
      icon: <CloudUploadOutlined />,
    },
    {
      title: "Containerization (Docker)",
      content:
        "Packaging app with a server (Nginx) into Docker. Deployed to cloud k8s or on-prem.",
      icon: <CodeOutlined />,
    },
  ];

  const environments = [
    {
      title: "Development",
      description: "Local machine, fast feedback (Vite dev server).",
      icon: <ToolOutlined />,
    },
    {
      title: "Staging/Testing",
      description: "Production-like environment for testing.",
      icon: <HourglassOutlined />,
    },
    {
      title: "Production",
      description: "Live environment for end-users.",
      icon: <RocketOutlined style={{ color: "#52c41a" }} />,
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2}>Build and Deployment</Title>

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

      <Paragraph style={{ marginBottom: 20 }}>
        After developing your React application, the final steps are to build it
        for production and deploy it so users can access it.
      </Paragraph>

      <Card
        title="The Build Process"
        style={{ marginBottom: 20 }}
        extra={<ToolOutlined />}
      >
        <Paragraph>
          The build process transforms your development code (React components,
          JSX, TypeScript, modern JavaScript, CSS preprocessors, etc.) into
          optimized static assets (HTML, CSS, and JavaScript bundles) that web
          browsers can understand and render efficiently.
        </Paragraph>
        <Divider>Key Tasks During a Build</Divider>
        <Steps direction="vertical" current={-1} size="small">
          {buildTasks.map((task, index) => (
            <Step
              key={index}
              title={task.title}
              description={task.description}
            />
          ))}
        </Steps>
        <Alert
          message="Project Setup: Vite"
          description="In this project, we use Vite. Running npm run build (or yarn build) executes Vite's build process, typically outputting the static files to a dist directory."
          type="info"
          showIcon
          style={{ marginTop: 15 }}
        />
      </Card>

      <Card
        title="Deployment"
        style={{ marginBottom: 20 }}
        extra={<CloudUploadOutlined />}
      >
        <Paragraph>
          Deployment is the process of taking these built static assets and
          making them available on a web server so users can access your
          application via a URL.
        </Paragraph>
        <Divider>Common Deployment Approaches for React Apps</Divider>
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3 }}
          dataSource={deploymentApproaches}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <Space>
                    {item.icon}
                    {item.title}
                  </Space>
                }
                hoverable
              >
                {item.content}
              </Card>
            </List.Item>
          )}
        />
      </Card>

      <Card
        title="Continuous Integration/Continuous Deployment (CI/CD)"
        style={{ marginBottom: 20 }}
        extra={<BranchesOutlined />}
      >
        <Paragraph>
          CI/CD is a set of practices that automates the build, test, and
          deployment pipeline.
        </Paragraph>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Text strong>Continuous Integration (CI):</Text> Developers
            regularly merge code changes into a central repository, after which
            automated builds and tests are run.
          </Col>
          <Col xs={24} md={12}>
            <Text strong>Continuous Deployment (CD):</Text> If CI passes, the
            application is automatically deployed to staging or production.
          </Col>
        </Row>
        <Paragraph style={{ marginTop: 10 }}>
          Tools like GitHub Actions, GitLab CI/CD, Jenkins, CircleCI facilitate
          CI/CD pipelines. For example, a GitHub Action could be configured to
          run <Text code>yarn build</Text> and then deploy the{" "}
          <Text code>dist</Text> folder to Netlify on every push to the{" "}
          <Text code>main</Text> branch.
        </Paragraph>
      </Card>

      <Card
        title="Environment Configurations"
        style={{ marginBottom: 20 }}
        extra={<SettingOutlined />}
      >
        <Paragraph>
          It's common to have different environments for an application.
          Environment variables (e.g., API endpoints, feature flags) are often
          used to configure the application differently for each environment.
          Vite supports this through <Text code>.env</Text> files.
        </Paragraph>
        <List
          grid={{ gutter: 16, column: 3, xs: 1, sm: 1, md: 3 }}
          dataSource={environments}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <Space>
                    {item.icon}
                    {item.title}
                  </Space>
                }
                size="small"
              >
                {item.description}
              </Card>
            </List.Item>
          )}
        />
      </Card>

      <Card
        title="Monitoring and Rollback"
        style={{ marginBottom: 20 }}
        extra={<MonitorOutlined />}
      >
        <Paragraph>
          Once deployed, it's important to monitor your application for errors
          and performance issues using tools like Sentry, New Relic, or Datadog.
          If a deployment introduces critical issues, you should have a rollback
          strategy to quickly revert to a previous stable version. Many
          deployment platforms and CI/CD tools offer mechanisms for this.
        </Paragraph>
        <Space style={{ marginTop: 10 }}>
          <BugOutlined style={{ color: "red" }} /> <Text>Error Monitoring</Text>
          <RollbackOutlined style={{ color: "orange" }} />{" "}
          <Text>Rollback Strategy</Text>
        </Space>
      </Card>

      <Paragraph style={{ marginTop: 20, textAlign: "center", color: "grey" }}>
        Presentation Status: Ready for Review
      </Paragraph>
    </div>
  );
};

export default BuildDeploySlide;
