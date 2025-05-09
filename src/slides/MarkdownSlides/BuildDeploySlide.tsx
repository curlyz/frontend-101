import React, { useEffect } from "react";
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
  Descriptions,
  Table,
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
  SecurityScanOutlined,
  RetweetOutlined,
  UploadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import mermaid from "mermaid";
import type { TableProps } from "antd";

const { Title, Paragraph, Text, Link } = Typography;
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
      title: "Cloud Storage + CDN (e.g., AWS S3 + CloudFront)",
      content: (
        <>
          <Paragraph>
            Host static files (dist folder) in a cloud storage bucket (like AWS
            S3). Use a Content Delivery Network (CDN) like AWS CloudFront for
            global distribution, caching, and HTTPS.
          </Paragraph>

          <Title level={5} style={{ marginTop: "16px" }}>
            <SecurityScanOutlined /> Origin Access Control (OAC/OAI)
          </Title>
          <Paragraph>
            Secure your S3 bucket by allowing access only from CloudFront using
            OAC (newer) or OAI (older). This prevents direct public access to
            the bucket.
          </Paragraph>

          <Title level={5} style={{ marginTop: "16px" }}>
            <RetweetOutlined /> SPA Rewrite Rules (for Client-Side Routing)
          </Title>
          <Paragraph>
            Configure CloudFront Custom Error Responses. When S3 returns a 403
            (Forbidden, due to OAC) or 404 (Not Found) for a route like
            "/about", CloudFront intercepts it and serves "/index.html" with a
            200 OK status instead. This allows React Router to handle the
            routing client-side.
          </Paragraph>

          <Title level={5} style={{ marginTop: "16px" }}>
            Advantages:
          </Title>
          <List size="small" style={{ marginLeft: "15px" }}>
            <List.Item>Highly scalable and reliable.</List.Item>
            <List.Item>Cost-effective (pay-as-you-go).</List.Item>
            <List.Item>
              Fine-grained control over caching, security, etc.
            </List.Item>
            <List.Item>
              Leverages robust global cloud infrastructure (CDN).
            </List.Item>
          </List>

          <Title level={5} style={{ marginTop: "16px" }}>
            Considerations:
          </Title>
          <List size="small" style={{ marginLeft: "15px" }}>
            <List.Item>
              More configuration steps involved compared to dedicated PaaS
              platforms.
            </List.Item>
            <List.Item>
              Requires understanding of S3, CloudFront, and potentially IAM
              permissions.
            </List.Item>
          </List>
        </>
      ),
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

  const deploymentWorkflowDiagram = `
graph LR
  A[1. React Code] --> B(2. npm run build);
  B --> C{3. dist/ Folder};
  C --> D[4. Upload to S3 Bucket];
  D -- Origin --> E[5. CloudFront Distribution];
  E -- OAC/OAI & Rewrites --> F[6. Deployed SPA];
  F --> G(7. User Access via CF URL);
  classDef step fill:#f9f,stroke:#333,stroke-width:2px;
  class A,B,C,D,E,F,G step;
`;

  const deploymentSteps = [
    {
      title: "Build Your Application",
      icon: <CodeOutlined />,
      description: (
        <>
          <Paragraph>
            Run <Text code>npm run build</Text> (or <Text code>yarn build</Text>
            ) to generate the optimized static assets in the{" "}
            <Text code>dist</Text> folder.
          </Paragraph>
        </>
      ),
    },
    {
      title: "Configure S3 Bucket",
      icon: <SettingOutlined />,
      description: (
        <>
          <Paragraph>Create an S3 bucket for your static assets.</Paragraph>
          <Alert
            message="Important: Bucket Privacy & OAC/OAI"
            description="Keep the S3 bucket private. Do NOT enable 'Static website hosting' on the S3 bucket itself if you plan to use CloudFront with Origin Access Control (OAC) or Origin Access Identity (OAI). Access will be granted to CloudFront only."
            type="warning"
            showIcon
            style={{ margin: "8px 0" }}
          />
          <Paragraph>
            Bucket permissions (e.g., a Bucket Policy) will be configured later,
            often automatically by CloudFront when setting up OAC, to allow
            CloudFront to read objects.
          </Paragraph>
        </>
      ),
    },
    {
      title: "Upload Assets to S3",
      icon: <UploadOutlined />,
      description: (
        <>
          <Paragraph>
            Upload the <strong>contents</strong> of your local{" "}
            <Text code>dist</Text> folder (not the folder itself) to the root of
            your S3 bucket.
          </Paragraph>
          <Paragraph>
            Tools: AWS CLI (
            <Text code>aws s3 sync ./dist s3://your-bucket-name --delete</Text>
            ), AWS Management Console, or CI/CD scripts.
          </Paragraph>
        </>
      ),
    },
    {
      title: "Create CloudFront Distribution",
      icon: <GlobalOutlined />,
      description: (
        <>
          <Paragraph>
            In AWS Management Console, create a new CloudFront distribution.
          </Paragraph>
          <List size="small" style={{ marginLeft: "15px" }}>
            <List.Item>
              <Text strong>Origin Domain:</Text> Select your S3 bucket.
              CloudFront might auto-fill the bucket website endpoint; ensure it
              is the REST API endpoint (e.g.,{" "}
              <Text code>your-bucket-name.s3.your-region.amazonaws.com</Text>).
            </List.Item>
            <List.Item>
              <Text strong>Origin Access:</Text> Choose "Origin access control
              settings (recommended)". Create a new OAC or select an existing
              one. CloudFront will provide a statement to add to your S3 bucket
              policy – copy it.
            </List.Item>
          </List>
          <Alert
            message="S3 Bucket Policy Update"
            description="After creating the OAC, CloudFront will show a policy statement. You MUST add this to your S3 bucket's permissions (under Bucket Policy) to grant CloudFront access."
            type="info"
            showIcon
            style={{ margin: "8px 0" }}
          />
        </>
      ),
    },
    {
      title: "Configure CloudFront Settings",
      icon: <SettingOutlined />,
      description: (
        <>
          <Paragraph>
            <Text strong>Default Root Object:</Text> Set to{" "}
            <Text code>index.html</Text>.
          </Paragraph>
          <Paragraph>
            <Text strong>Viewer Protocol Policy:</Text> Recommended: "Redirect
            HTTP to HTTPS".
          </Paragraph>
          <Paragraph>
            <Text strong>Caching:</Text> Configure cache policies (e.g., use
            "CachingOptimized" for most static assets, or create custom
            policies). Consider cache invalidation strategies upon new
            deployments.
          </Paragraph>
          <Paragraph>
            <Text strong>TLS Certificate:</Text> Use AWS Certificate Manager
            (ACM) for a free SSL/TLS certificate if using a custom domain.
          </Paragraph>
          <Paragraph>
            <Text strong>Custom Domain (Optional):</Text> Add Alternate Domain
            Names (CNAMEs) and point your domain (e.g., via Route 53) to the
            CloudFront distribution domain name.
          </Paragraph>
        </>
      ),
    },
    {
      title: "Set Up SPA Rewrite Rule",
      icon: <RetweetOutlined />,
      description: (
        <Text>
          Go to the "Error pages" tab in your CloudFront distribution. Create
          custom error responses for HTTP error codes{" "}
          <Text strong>403: Forbidden</Text> and{" "}
          <Text strong>404: Not Found</Text>. Set the Response page path to{" "}
          <Text code>/index.html</Text> and the HTTP Response code to{" "}
          <Text strong>200: OK</Text>.
        </Text>
      ),
    },
    {
      title: "Deploy & Test (and Invalidate)",
      icon: <PlayCircleOutlined />,
      description: (
        <Text>
          Wait for the CloudFront distribution to deploy. Test accessing your
          site via the CloudFront domain name. When you update your S3 files
          later, create a CloudFront Invalidation (path: <Text code>/*</Text>)
          to clear the cache.
        </Text>
      ),
    },
  ];

  const comparisonColumns: TableProps<any>["columns"] = [
    {
      title: "Aspect",
      dataIndex: "aspect",
      key: "aspect",
      width: 150,
      fixed: "left",
      render: (text) => <Text strong>{text}</Text>,
    },
    { title: "SPA (CSR)", dataIndex: "csr", key: "csr" },
    { title: "SSG", dataIndex: "ssg", key: "ssg" },
    { title: "SSR", dataIndex: "ssr", key: "ssr" },
  ];

  const comparisonData = [
    {
      key: "1",
      aspect: "How it works",
      csr: "JS fetches data & renders in browser.",
      ssg: "Pre-rendered HTML at build time. JS hydrates later.",
      ssr: "HTML generated on server per request. JS hydrates later.",
    },
    {
      key: "2",
      aspect: "Initial Load",
      csr: "Slower (needs JS)",
      ssg: "Very Fast",
      ssr: "Fast",
    },
    {
      key: "3",
      aspect: "Subsequent Nav",
      csr: "Very Fast",
      ssg: "Instant / Fast",
      ssr: "Fast / Server Req.",
    },
    {
      key: "4",
      aspect: "SEO",
      csr: "Okay/Good",
      ssg: "Excellent",
      ssr: "Excellent",
    },
    {
      key: "5",
      aspect: "Server Cost",
      csr: "Low (Static + API)",
      ssg: "Very Low (Static)",
      ssr: "Higher (Compute)",
    },
    {
      key: "6",
      aspect: "Complexity",
      csr: "Moderate",
      ssg: "Low-Moderate",
      ssr: "Higher",
    },
    {
      key: "7",
      aspect: "Typical Use",
      csr: "Dashboards, complex apps",
      ssg: "Blogs, docs, marketing",
      ssr: "Dynamic content, e-com",
    },
  ];

  const deploymentDiagram = `
graph TD
    subgraph UserRequest["User Request Flow"]
        U[User Requests /some/path]
        Browser[Browser]
        DNS[DNS Resolution]
        CDN["CDN e.g. Cloudflare, Netlify Edge"]
        Origin["Origin Server e.g. Vercel, Netlify, Custom Server"]
        BuildAssetsNode["Build Assets Static HTML, CSS, JS"]
        CDN_Err["Custom Error Response 403/404"]
    end

    subgraph BuildProcess["Build & Deploy Process"]
        Dev[Developer]
        BuildSystem["Build System (Vite, Webpack)"]
        Deploy[Deployment]
        Deploy --> CDN
        Deploy --> Origin
        Deploy --> BuildSystem
        BuildSystem --> CDN
        BuildSystem --> Origin
        BuildSystem --> Dev
    end

    subgraph CDNProcessing["CDN Processing"]
        CDN --> Browser
        CDN --> CDN_Err
    end

    classDef highlight fill:#f9f,stroke:#333,stroke-width:2px;
    class ERR highlight;
`;

  const ciCdPipelineDiagram = `
graph TD
    A[Developer Commits Code] --> B{Version Control};
    B -- Push/Merge Trigger --> C["CI Server (GitHub Actions, Jenkins)"];
    subgraph CICDProcess["CI/CD Pipeline Stages"]
        direction LR
        C --> D[Run Automated Tests];
        D -- Tests Pass --> E[Build Application];
        E --> F["Build Artifacts (Static Files, Docker Image)"];
        F --> G[Deploy to Staging];
        G --> H["Staging Environment (Test/QA)"];
        H -- Manual/Automated Approval --> I[Deploy to Production];
        I --> J["Production Environment (Live Users)"];
    end
    J --> K[Monitor & Log];
    A -.->|Feedback Loop| K;

    classDef trigger fill:#ece,stroke:#333,stroke-width:1px;
    class B,C trigger;
    classDef env fill:#e6ffed,stroke:#333,stroke-width:1px;
    class H,J env
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
        <Divider>Common Deployment Approaches</Divider>
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2 }}
          dataSource={[
            {
              title: "Static Hosting Platforms",
              content: (
                <>
                  <Paragraph>
                    Services like Vercel, Netlify, GitHub Pages. Easy Git
                    integration, CI/CD, custom domains, often handle SPA
                    rewrites automatically.
                  </Paragraph>
                  <Paragraph>
                    <strong>Pros:</strong> Simple setup, fast deploys, generous
                    free tiers.
                  </Paragraph>
                  <Paragraph>
                    <strong>Cons:</strong> Less control over infrastructure
                    compared to cloud providers.
                  </Paragraph>
                </>
              ),
              icon: <RocketOutlined />,
            },
            {
              title: "Cloud Storage + CDN (e.g., AWS S3 + CloudFront)",
              content: (
                <>
                  <Paragraph>
                    Host static files (dist folder) in a cloud storage bucket
                    (like AWS S3). Use a Content Delivery Network (CDN) like AWS
                    CloudFront for global distribution, caching, and HTTPS.
                  </Paragraph>
                  <Paragraph>
                    <SecurityScanOutlined />{" "}
                    <strong>Origin Access Control (OAC):</strong> Secure your S3
                    bucket by allowing access only from CloudFront using OAC
                    (newer) or OAI (older). This prevents direct public access
                    to the bucket.
                  </Paragraph>
                  <Paragraph>
                    <RetweetOutlined /> <strong>SPA Rewrite Rules:</strong>{" "}
                    Configure CloudFront Custom Error Responses. When S3 returns
                    a 403 (Forbidden, due to OAC) or 404 (Not Found) for a route
                    like "/about", CloudFront intercepts it and serves
                    "/index.html" with a 200 OK status instead. This allows
                    React Router to handle the routing client-side.
                  </Paragraph>
                  <Paragraph>
                    <strong>Pros:</strong> Highly scalable, cost-effective,
                    fine-grained control, leverages robust cloud infrastructure.
                  </Paragraph>
                  <Paragraph>
                    <strong>Cons:</strong> More configuration steps involved
                    compared to dedicated platforms.
                  </Paragraph>
                </>
              ),
              icon: <CloudUploadOutlined />,
            },
            {
              title: "Containerization (Docker)",
              content: (
                <>
                  <Paragraph>
                    Package your built SPA files with a simple web server (like
                    Nginx) inside a Docker container. Deploy the container to
                    services like AWS ECS, Google Cloud Run, Kubernetes, or even
                    a simple VPS.
                  </Paragraph>
                  <Paragraph>
                    <strong>Pros:</strong> Consistent environment, portability,
                    integrates well with backend services.
                  </Paragraph>
                  <Paragraph>
                    <strong>Cons:</strong> Requires Docker knowledge, more
                    infrastructure management.
                  </Paragraph>
                </>
              ),
              icon: <CodeOutlined />,
            },
          ]}
          renderItem={(item) => (
            <List.Item style={{ height: "100%" }}>
              <Card
                title={
                  <Space>
                    {item.icon}
                    {item.title}
                  </Space>
                }
                hoverable
                style={{ height: "100%" }}
              >
                {item.content}
              </Card>
            </List.Item>
          )}
        />
      </Card>

      <Card
        title="AWS S3 + CloudFront Deployment Workflow"
        style={{ marginBottom: 20 }}
      >
        <Paragraph>
          Deploying a Single Page Application (SPA) to AWS S3 and CloudFront
          involves hosting static files privately in S3 and using CloudFront as
          a secure, fast CDN layer that also handles routing.
        </Paragraph>
        <Divider>Step-by-Step Deployment Actions</Divider>
        <Steps direction="vertical" current={-1} size="small">
          {deploymentSteps.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </Steps>
        <Alert
          type="info"
          style={{ marginTop: 16 }}
          message={
            <>
              Note: This is a simplified guide. Refer to official{" "}
              <Link
                href="https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/"
                target="_blank"
              >
                AWS Documentation
              </Link>{" "}
              for detailed configurations, security best practices, and cost
              considerations.
            </>
          }
        />
      </Card>

      <Card title="Rendering Strategy Comparison" style={{ marginBottom: 20 }}>
        <Paragraph>
          The way your application is rendered significantly impacts
          performance, SEO, cost, and complexity. Here's a comparison of common
          strategies used with frameworks like React:
        </Paragraph>
        <Table
          columns={comparisonColumns}
          dataSource={comparisonData}
          bordered
          size="small"
          pagination={false}
          scroll={{ x: 600 }}
          style={{ marginTop: "16px" }}
        />
      </Card>

      <Card
        title="SPA Rewrite Rule Explanation (S3 + CloudFront Example)"
        style={{ marginBottom: 20 }}
      >
        <Paragraph>
          When a user directly accesses or refreshes a page like{" "}
          <Text code>/about</Text> in an SPA hosted on S3/CloudFront, the
          browser requests that specific path from CloudFront. Since there's no
          actual <Text code>/about.html</Text> file in the S3 bucket, S3 would
          normally return a 404 (Not Found) or 403 (Forbidden if using OAC)
          error. The rewrite rule (via CloudFront Custom Error Responses)
          intercepts this error and serves the root{" "}
          <Text code>/index.html</Text> file instead, allowing the React Router
          JavaScript loaded from <Text code>index.html</Text> to correctly
          display the <Text code>/about</Text> page content.
        </Paragraph>
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

      {/* Further Learning Section */}
      <Alert
        message="Further Learning"
        description={
          <Paragraph>
            For more detailed information on build tools and deployment
            platforms, visit the official documentation for
            <a
              href="https://vitejs.dev/guide/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Vite
            </a>
            ,
            <a
              href="https://vercel.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Vercel
            </a>
            , and
            <a
              href="https://docs.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Netlify
            </a>
            .
          </Paragraph>
        }
        type="success"
        showIcon
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default BuildDeploySlide;
