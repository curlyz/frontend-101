import React from "react";
import {
  Typography,
  Card,
  Table,
  Alert,
  Row,
  Col,
  Space,
  Tag,
  Progress,
  Divider,
} from "antd";
import {
  ThunderboltOutlined,
  GlobalOutlined,
  DollarOutlined,
  SafetyCertificateOutlined,
  CodeOutlined,
  RocketOutlined,
  StarOutlined,
  CrownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function Page() {
  const models = [
    {
      name: "ChatGPT (GPT-4)",
      company: "OpenAI",
      strengths: [
        "Most popular & widely adopted",
        "Excellent general conversation",
        "Strong plugin ecosystem",
        "Good code generation",
      ],
      weaknesses: [
        "Knowledge cutoff limitations",
        "Can be verbose",
        "Subscription cost for best model",
      ],
      pricing: "Free tier (GPT-3.5) + $20/month (GPT-4)",
      specialties: [
        "General purpose",
        "Creative writing",
        "Coding assistance",
        "Conversational AI",
      ],
      contextWindow: "128K tokens",
      multimodal: true,
      codeGeneration: 85,
      reasoning: 80,
      safety: 75,
      cost: 60,
      color: "#10a37f",
      logo: "🤖",
    },
    {
      name: "Claude (3.5 Sonnet)",
      company: "Anthropic",
      strengths: [
        "Excellent reasoning & analysis",
        "Strong safety focus",
        "Large context window",
        "Great for complex tasks",
      ],
      weaknesses: [
        "Newer, smaller ecosystem",
        "More conservative responses",
        "Limited real-time data",
      ],
      pricing: "Free tier + $20/month (Pro)",
      specialties: [
        "Analysis & reasoning",
        "Long document processing",
        "Safety-critical applications",
        "Research assistance",
      ],
      contextWindow: "200K tokens",
      multimodal: true,
      codeGeneration: 88,
      reasoning: 92,
      safety: 95,
      cost: 65,
      color: "#cc785c",
      logo: "🧠",
    },
    {
      name: "Gemini",
      company: "Google",
      strengths: [
        "Native multimodal capabilities",
        "Integration with Google services",
        "Real-time web access",
        "Strong at factual queries",
      ],
      weaknesses: [
        "Inconsistent performance",
        "Less creative than competitors",
        "Privacy concerns",
      ],
      pricing: "Free tier + $20/month (Advanced)",
      specialties: [
        "Multimodal AI",
        "Google integration",
        "Real-time information",
        "Factual queries",
      ],
      contextWindow: "1M+ tokens",
      multimodal: true,
      codeGeneration: 75,
      reasoning: 78,
      safety: 80,
      cost: 70,
      color: "#4285f4",
      logo: "💎",
    },
    {
      name: "DeepSeek",
      company: "DeepSeek AI",
      strengths: [
        "Excellent at mathematics",
        "Strong reasoning capabilities",
        "Cost-effective",
        "Open-source options",
      ],
      weaknesses: [
        "Less known brand",
        "Smaller ecosystem",
        "Limited multimodal features",
      ],
      pricing: "Very cost-effective API pricing",
      specialties: [
        "Mathematical reasoning",
        "Scientific computing",
        "Cost-sensitive applications",
        "Research",
      ],
      contextWindow: "64K tokens",
      multimodal: false,
      codeGeneration: 90,
      reasoning: 88,
      safety: 70,
      cost: 90,
      color: "#1890ff",
      logo: "🔬",
    },
  ];

  const comparisonData = [
    {
      key: "1",
      feature: "Best for Beginners",
      chatgpt: "✅ Most user-friendly",
      claude: "⚠️ Steep learning curve",
      gemini: "✅ Google integration helps",
      deepseek: "❌ Technical focus",
    },
    {
      key: "2",
      feature: "Code Generation",
      chatgpt: "✅ Very good",
      claude: "✅ Excellent",
      gemini: "⚠️ Good",
      deepseek: "✅ Outstanding",
    },
    {
      key: "3",
      feature: "Mathematical Reasoning",
      chatgpt: "⚠️ Decent",
      claude: "✅ Very good",
      gemini: "⚠️ Inconsistent",
      deepseek: "✅ Exceptional",
    },
    {
      key: "4",
      feature: "Creative Writing",
      chatgpt: "✅ Excellent",
      claude: "✅ Very good",
      gemini: "⚠️ Limited",
      deepseek: "⚠️ Basic",
    },
    {
      key: "5",
      feature: "Safety & Reliability",
      chatgpt: "✅ Good",
      claude: "✅ Exceptional",
      gemini: "✅ Good",
      deepseek: "⚠️ Moderate",
    },
    {
      key: "6",
      feature: "Cost Effectiveness",
      chatgpt: "⚠️ Moderate",
      claude: "⚠️ Moderate",
      gemini: "✅ Good",
      deepseek: "✅ Excellent",
    },
    {
      key: "7",
      feature: "Real-time Data",
      chatgpt: "❌ Limited",
      claude: "❌ No",
      gemini: "✅ Yes",
      deepseek: "❌ No",
    },
  ];

  const columns = [
    {
      title: "Feature",
      dataIndex: "feature",
      key: "feature",
      width: 200,
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "ChatGPT",
      dataIndex: "chatgpt",
      key: "chatgpt",
      align: "center" as const,
    },
    {
      title: "Claude",
      dataIndex: "claude",
      key: "claude",
      align: "center" as const,
    },
    {
      title: "Gemini",
      dataIndex: "gemini",
      key: "gemini",
      align: "center" as const,
    },
    {
      title: "DeepSeek",
      dataIndex: "deepseek",
      key: "deepseek",
      align: "center" as const,
    },
  ];

  const PerformanceCard = ({ model }: { model: any }) => (
    <Card
      style={{
        height: "100%",
        borderColor: model.color,
        borderWidth: 2,
      }}
      title={
        <Space>
          <span style={{ fontSize: "24px" }}>{model.logo}</span>
          <div>
            <Text strong style={{ color: model.color }}>
              {model.name}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {model.company}
            </Text>
          </div>
        </Space>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div>
          <Text strong>{"Key Metrics:"}</Text>
          <div style={{ marginTop: "8px" }}>
            <Text>{"Code Generation: "}</Text>
            <Progress
              percent={model.codeGeneration}
              size="small"
              strokeColor={model.color}
              format={() => `${model.codeGeneration}%`}
            />
          </div>
          <div style={{ marginTop: "4px" }}>
            <Text>{"Reasoning: "}</Text>
            <Progress
              percent={model.reasoning}
              size="small"
              strokeColor={model.color}
              format={() => `${model.reasoning}%`}
            />
          </div>
          <div style={{ marginTop: "4px" }}>
            <Text>{"Safety: "}</Text>
            <Progress
              percent={model.safety}
              size="small"
              strokeColor={model.color}
              format={() => `${model.safety}%`}
            />
          </div>
          <div style={{ marginTop: "4px" }}>
            <Text>{"Cost Efficiency: "}</Text>
            <Progress
              percent={model.cost}
              size="small"
              strokeColor={model.color}
              format={() => `${model.cost}%`}
            />
          </div>
        </div>

        <div>
          <Text strong style={{ color: "#52c41a" }}>
            {"Strengths:"}
          </Text>
          <ul style={{ marginTop: "4px", paddingLeft: "16px" }}>
            {model.strengths.map((strength: string, index: number) => (
              <li key={index} style={{ fontSize: "12px" }}>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Text strong style={{ color: "#ff4d4f" }}>
            {"Weaknesses:"}
          </Text>
          <ul style={{ marginTop: "4px", paddingLeft: "16px" }}>
            {model.weaknesses.map((weakness: string, index: number) => (
              <li key={index} style={{ fontSize: "12px" }}>
                {weakness}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div>
              <Text strong>{"Context:"}</Text> {model.contextWindow}
            </div>
            <div>
              <Text strong>{"Multimodal:"}</Text>{" "}
              {model.multimodal ? "✅ Yes" : "❌ No"}
            </div>
            <div>
              <Text strong>{"Pricing:"}</Text> {model.pricing}
            </div>
          </Space>
        </div>

        <div>
          <Text strong>{"Best for:"}</Text>
          <div style={{ marginTop: "4px" }}>
            {model.specialties.map((specialty: string, index: number) => (
              <Tag
                key={index}
                color={model.color}
                style={{ margin: "2px", fontSize: "10px" }}
              >
                {specialty}
              </Tag>
            ))}
          </div>
        </div>
      </Space>
    </Card>
  );

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        <ThunderboltOutlined />{" "}
        {"AI Model Comparison: ChatGPT vs Claude vs Gemini"}
        {"vs DeepSeek"}
      </Title>

      <Alert
        message="🎯 Choose the Right AI Model for Your Needs"
        description="Each AI model has unique strengths and is optimized for different use cases. Understanding these differences will help you select the best tool for your specific requirements."
        type="info"
        showIcon
        style={{ marginBottom: "32px" }}
      />

      {/* Performance Overview Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "32px" }}>
        {models.map((model, index) => (
          <Col xs={24} lg={12} xl={6} key={index}>
            <PerformanceCard model={model} />
          </Col>
        ))}
      </Row>

      <Divider />

      {/* Feature Comparison Table */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          <StarOutlined /> {"Feature-by-Feature Comparison"}
        </Title>
        <Table
          columns={columns}
          dataSource={comparisonData}
          pagination={false}
          bordered
          size="middle"
        />
      </Card>

      {/* Use Case Recommendations */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3}>
          <RocketOutlined /> {"When to Use Each Model"}
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card
              title={
                <Space>
                  <span style={{ fontSize: "20px" }}>{"🤖"}</span>
                  <Text strong style={{ color: "#10a37f" }}>
                    {"Choose ChatGPT When:"}
                  </Text>
                </Space>
              }
              size="small"
            >
              <ul>
                <li>
                  {"You"}&apos;{"re new to AI and want the most user-friendly"}
                  {"experience"}
                </li>
                <li>{"You need general-purpose conversational AI"}</li>
                <li>{"You want access to a large plugin ecosystem"}</li>
                <li>{"You&apos;re doing creative writing or brainstorming"}</li>
                <li>{"You need reliable, well-documented performance"}</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              title={
                <Space>
                  <span style={{ fontSize: "20px" }}>{"🧠"}</span>
                  <Text strong style={{ color: "#cc785c" }}>
                    {"Choose Claude When:"}
                  </Text>
                </Space>
              }
              size="small"
            >
              <ul>
                <li>{"You need advanced reasoning and analysis"}</li>
                <li>
                  {"You"}&apos;
                  {"re working with long documents (large context window)"}
                </li>
                <li>{"Safety and reliability are top priorities"}</li>
                <li>{"You&apos;re doing complex research or academic work"}</li>
                <li>{"You need nuanced, thoughtful responses"}</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              title={
                <Space>
                  <span style={{ fontSize: "20px" }}>{"💎"}</span>
                  <Text strong style={{ color: "#4285f4" }}>
                    {"Choose Gemini When:"}
                  </Text>
                </Space>
              }
              size="small"
            >
              <ul>
                <li>
                  {"You need real-time web access and current information"}
                </li>
                <li>
                  {"You"}&apos;
                  {"re working with multiple types of media (text,"}
                  {"images, video)"}
                </li>
                <li>{"You want integration with Google services"}</li>
                <li>{"You need factual, up-to-date information"}</li>
                <li>
                  {"You have very large context requirements (1M+ tokens)"}
                </li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              title={
                <Space>
                  <span style={{ fontSize: "20px" }}>{"🔬"}</span>
                  <Text strong style={{ color: "#1890ff" }}>
                    {"Choose DeepSeek When:"}
                  </Text>
                </Space>
              }
              size="small"
            >
              <ul>
                <li>
                  {"You need exceptional mathematical and scientific reasoning"}
                </li>
                <li>{"Cost efficiency is a primary concern"}</li>
                <li>{"You&apos;re doing technical or research-heavy work"}</li>
                <li>{"You want strong code generation capabilities"}</li>
                <li>{"You prefer open-source or transparent AI models"}</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Key Takeaways */}
      <Alert
        message="🎯 Key Takeaways for Developers"
        description={
          <div>
            <Paragraph style={{ marginBottom: "8px" }}>
              <Text strong>{"For Beginners:"}</Text>{" "}
              {"Start with ChatGPT for its ease"}
              {"of use and extensive documentation."}
            </Paragraph>
            <Paragraph style={{ marginBottom: "8px" }}>
              <Text strong>{"For Complex Analysis:"}</Text>{" "}
              {"Use Claude for nuanced"}
              {"reasoning and safety-critical applications."}
            </Paragraph>
            <Paragraph style={{ marginBottom: "8px" }}>
              <Text strong>{"For Current Information:"}</Text>{" "}
              {"Choose Gemini when"}
              {"you need real-time data and multimodal capabilities."}
            </Paragraph>
            <Paragraph style={{ marginBottom: 0 }}>
              <Text strong>{"For Technical Work:"}</Text> {"DeepSeek excels at"}
              {"mathematics, coding, and cost-effective solutions."}
            </Paragraph>
          </div>
        }
        type="success"
        showIcon
        style={{ marginBottom: "24px" }}
      />

      <Card>
        <Title level={4}>{"🔗 Try These Models Yourself"}</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Card size="small">
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Text strong>{"ChatGPT"}</Text>
                <a
                  href="https://chat.openai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"chat.openai.com →"}
                </a>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card size="small">
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Text strong>{"Claude"}</Text>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"claude.ai →"}
                </a>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card size="small">
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Text strong>{"Gemini"}</Text>
                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"gemini.google.com →"}
                </a>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card size="small">
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Text strong>{"DeepSeek"}</Text>
                <a
                  href="https://www.deepseek.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"deepseek.com →"}
                </a>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
