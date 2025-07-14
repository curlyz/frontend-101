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
  Statistic,
  Divider,
  Collapse,
} from "antd";
import {
  DollarCircleOutlined,
  CalculatorOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ApiOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const AIPricingComparisonSlide: React.FC = () => {
  const models = [
    {
      name: "ChatGPT (GPT-4o)",
      company: "OpenAI",
      inputPrice: "$2.50",
      outputPrice: "$10.00",
      inputPriceNum: 2.5,
      outputPriceNum: 10.0,
      color: "#10a37f",
      logo: "🤖",
      subscription: "$20/month",
      freeTokens: "Limited free tier",
      contextWindow: "128K tokens",
      specialFeatures: [
        "Plugin ecosystem",
        "DALL-E integration",
        "Advanced reasoning",
      ],
      bestFor: "General purpose, creative tasks",
      notes:
        "GPT-4o-mini available at $0.15 input / $0.60 output per 1M tokens",
    },
    {
      name: "Claude 3.5 Sonnet",
      company: "Anthropic",
      inputPrice: "$3.00",
      outputPrice: "$15.00",
      inputPriceNum: 3.0,
      outputPriceNum: 15.0,
      color: "#cc785c",
      logo: "🧠",
      subscription: "$20/month",
      freeTokens: "Free credits for new users",
      contextWindow: "200K tokens",
      specialFeatures: [
        "Prompt caching (90% savings)",
        "Batch API (50% discount)",
        "Code execution",
      ],
      bestFor: "Complex analysis, safety-critical work",
      notes:
        "Prompt caching and batch processing can significantly reduce costs",
    },
    {
      name: "Gemini 2.0 Flash",
      company: "Google",
      inputPrice: "$0.10",
      outputPrice: "$0.40",
      inputPriceNum: 0.1,
      outputPriceNum: 0.4,
      color: "#4285f4",
      logo: "💎",
      subscription: "$20/month (Advanced)",
      freeTokens: "Generous free tier",
      contextWindow: "1M+ tokens",
      specialFeatures: [
        "Multimodal capabilities",
        "Real-time web access",
        "Batch mode (50% discount)",
      ],
      bestFor: "Multimodal tasks, current information",
      notes: "Most cost-effective for high-volume applications",
    },
    {
      name: "DeepSeek-R1",
      company: "DeepSeek AI",
      inputPrice: "$0.14",
      outputPrice: "$2.19",
      inputPriceNum: 0.14,
      outputPriceNum: 2.19,
      color: "#1890ff",
      logo: "🔬",
      subscription: "API only",
      freeTokens: "Limited trial",
      contextWindow: "64K tokens",
      specialFeatures: [
        "Open source",
        "Off-peak pricing",
        "98% HumanEval score",
      ],
      bestFor: "Mathematical reasoning, coding",
      notes: "Open source version available for local deployment",
    },
  ];

  const usageScenarios = [
    {
      scenario: "Small Project (10K tokens/day)",
      description: "Personal projects, learning, small apps",
      monthlyTokens: "300K input + 300K output",
      calculations: models.map((m) => ({
        name: m.name,
        cost: (m.inputPriceNum * 0.3 + m.outputPriceNum * 0.3).toFixed(2),
        color: m.color,
      })),
    },
    {
      scenario: "Medium Project (100K tokens/day)",
      description: "Small business, moderate usage apps",
      monthlyTokens: "3M input + 3M output",
      calculations: models.map((m) => ({
        name: m.name,
        cost: (m.inputPriceNum * 3 + m.outputPriceNum * 3).toFixed(2),
        color: m.color,
      })),
    },
    {
      scenario: "Large Project (1M tokens/day)",
      description: "Enterprise applications, high-volume usage",
      monthlyTokens: "30M input + 30M output",
      calculations: models.map((m) => ({
        name: m.name,
        cost: (m.inputPriceNum * 30 + m.outputPriceNum * 30).toFixed(2),
        color: m.color,
      })),
    },
  ];

  const pricingData = models.map((model, index) => ({
    key: index.toString(),
    model: (
      <Space>
        <span style={{ fontSize: "20px" }}>{model.logo}</span>
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
    ),
    inputPrice: (
      <Space direction="vertical" size="small">
        <Text strong style={{ color: "#52c41a" }}>
          {model.inputPrice}
        </Text>
        <Text type="secondary" style={{ fontSize: "11px" }}>
          {"per 1M tokens"}
        </Text>
      </Space>
    ),
    outputPrice: (
      <Space direction="vertical" size="small">
        <Text strong style={{ color: "#ff7875" }}>
          {model.outputPrice}
        </Text>
        <Text type="secondary" style={{ fontSize: "11px" }}>
          {"per 1M tokens"}
        </Text>
      </Space>
    ),
    subscription: model.subscription,
    freeTokens: model.freeTokens,
    contextWindow: model.contextWindow,
  }));

  const columns = [
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      width: 180,
    },
    {
      title: "Input Tokens",
      dataIndex: "inputPrice",
      key: "inputPrice",
      align: "center" as const,
      width: 120,
    },
    {
      title: "Output Tokens",
      dataIndex: "outputPrice",
      key: "outputPrice",
      align: "center" as const,
      width: 120,
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      align: "center" as const,
      width: 120,
    },
    {
      title: "Free Tier",
      dataIndex: "freeTokens",
      key: "freeTokens",
      align: "center" as const,
      width: 140,
    },
    {
      title: "Context Window",
      dataIndex: "contextWindow",
      key: "contextWindow",
      align: "center" as const,
      width: 120,
    },
  ];

  const CostCalculatorCard = ({ scenario }: { scenario: any }) => (
    <Card
      title={
        <Space>
          <CalculatorOutlined />
          <div>
            <Text strong>{scenario.scenario}</Text>
            <br />
            <Text
              type="secondary"
              style={{ fontSize: "12px", fontWeight: "normal" }}
            >
              {scenario.description}
            </Text>
          </div>
        </Space>
      }
      size="small"
      style={{ marginBottom: "16px" }}
    >
      <Text type="secondary" style={{ marginBottom: "12px", display: "block" }}>
        {"Monthly usage: "}
        {scenario.monthlyTokens}
      </Text>
      <Row gutter={[8, 8]}>
        {scenario.calculations.map((calc: any, index: number) => (
          <Col xs={12} md={6} key={index}>
            <Statistic
              title={calc.name.split(" ")[0]}
              value={`$${calc.cost}`}
              valueStyle={{
                color: calc.color,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        <DollarCircleOutlined /> {"AI Model Pricing Comparison 2024/2025"}
      </Title>

      <Alert
        message="💰 Understanding AI Costs is Crucial for Project Planning"
        description="API pricing varies significantly between providers and models. Understanding these costs helps you choose the right model for your budget and use case."
        type="info"
        showIcon
        style={{ marginBottom: "32px" }}
      />

      {/* Main Pricing Table */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3} style={{ marginBottom: "20px" }}>
          <ApiOutlined /> {"API Pricing Overview"}
        </Title>
        <Table
          columns={columns}
          dataSource={pricingData}
          pagination={false}
          bordered
          scroll={{ x: true }}
        />
        <Alert
          message="💡 Pricing Notes"
          description="All prices are per 1 million tokens. Input tokens are typically what you send to the AI, output tokens are what the AI generates. Most applications use roughly equal amounts of input and output tokens."
          type="warning"
          showIcon
          style={{ marginTop: "16px" }}
        />
      </Card>

      {/* Cost Calculator */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3} style={{ marginBottom: "20px" }}>
          <LineChartOutlined /> {"Real-World Cost Calculator"}
        </Title>
        <Paragraph>
          <Text strong>
            {"Monthly cost estimates for different usage levels:"}
          </Text>
        </Paragraph>
        {usageScenarios.map((scenario, index) => (
          <CostCalculatorCard key={index} scenario={scenario} />
        ))}
      </Card>

      {/* Detailed Model Analysis */}
      <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
        {models.map((model, index) => (
          <Col xs={24} lg={12} key={index}>
            <Card
              title={
                <Space>
                  <span style={{ fontSize: "24px" }}>{model.logo}</span>
                  <Text strong style={{ color: model.color }}>
                    {model.name}
                  </Text>
                </Space>
              }
              style={{
                height: "100%",
                borderColor: model.color,
                borderWidth: 2,
              }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic
                      title="Input Cost"
                      value={model.inputPrice}
                      suffix="/ 1M tokens"
                      valueStyle={{ color: "#52c41a", fontSize: "16px" }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Output Cost"
                      value={model.outputPrice}
                      suffix="/ 1M tokens"
                      valueStyle={{ color: "#ff7875", fontSize: "16px" }}
                    />
                  </Col>
                </Row>

                <div>
                  <Text strong>{"Key Features:"}</Text>
                  <ul style={{ marginTop: "8px", paddingLeft: "16px" }}>
                    {model.specialFeatures.map((feature, idx) => (
                      <li key={idx} style={{ fontSize: "13px" }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Space
                    direction="vertical"
                    size="small"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <Text strong>{"Best for:"}</Text> {model.bestFor}
                    </div>
                    <div>
                      <Text strong>{"Context:"}</Text> {model.contextWindow}
                    </div>
                    <div>
                      <Text strong>{"Subscription:"}</Text> {model.subscription}
                    </div>
                  </Space>
                </div>

                {model.notes && (
                  <Alert
                    message={model.notes}
                    type="info"
                    showIcon
                    style={{ fontSize: "12px" }}
                  />
                )}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Cost Optimization Tips */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3}>
          <TrophyOutlined /> {"Cost Optimization Strategies"}
        </Title>
        <Collapse>
          <Panel header="💡 Reduce Token Usage" key="1">
            <ul>
              <li>
                <strong>{"Be concise:"}</strong>{" "}
                {"Shorter prompts = fewer input"}
                {"tokens"}
              </li>
              <li>
                <strong>{"Limit output:"}</strong> {"Set max_tokens to control"}
                {"response length"}
              </li>
              <li>
                <strong>{"Use system messages wisely:"}</strong>{" "}
                {"They count as input"}
                {"tokens"}
              </li>
              <li>
                <strong>{"Avoid repetition:"}</strong> {"Don't repeat context"}
                {"unnecessarily"}
              </li>
            </ul>
          </Panel>
          <Panel header="🎯 Choose the Right Model" key="2">
            <ul>
              <li>
                <strong>{"GPT-4o-mini:"}</strong>{" "}
                {"15x cheaper than GPT-4o for simple"}
                {"tasks"}
              </li>
              <li>
                <strong>{"Gemini Flash:"}</strong> {"Best for high-volume,"}
                {"cost-sensitive applications"}
              </li>
              <li>
                <strong>{"Claude with caching:"}</strong>{" "}
                {"90% savings for repeated"}
                {"prompts"}
              </li>
              <li>
                <strong>{"DeepSeek:"}</strong>{" "}
                {"Open source option for unlimited"}
                {"local usage"}
              </li>
            </ul>
          </Panel>
          <Panel header="⚡ Use Advanced Features" key="3">
            <ul>
              <li>
                <strong>{"Batch processing:"}</strong>{" "}
                {"50% discount on non-urgent"}
                {"requests"}
              </li>
              <li>
                <strong>{"Prompt caching:"}</strong>{" "}
                {"Huge savings for repeated"}
                {"context"}
              </li>
              <li>
                <strong>{"Off-peak pricing:"}</strong> {"Some providers offer"}
                {"time-based discounts"}
              </li>
              <li>
                <strong>{"Volume discounts:"}</strong> {"Contact providers for"}
                {"enterprise pricing"}
              </li>
            </ul>
          </Panel>
        </Collapse>
      </Card>

      {/* Budget Planning */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3}>
          <ClockCircleOutlined /> {"Budget Planning Guide"}
        </Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ textAlign: "center" }}>
              <Statistic
                title="Hobby Projects"
                value="$5-20"
                suffix="/ month"
                valueStyle={{ color: "#52c41a" }}
              />
              <Text type="secondary">{"Personal learning, small apps"}</Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ textAlign: "center" }}>
              <Statistic
                title="Small Business"
                value="$50-200"
                suffix="/ month"
                valueStyle={{ color: "#fa8c16" }}
              />
              <Text type="secondary">{"SMB applications, moderate usage"}</Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ textAlign: "center" }}>
              <Statistic
                title="Enterprise"
                value="$500+"
                suffix="/ month"
                valueStyle={{ color: "#f5222d" }}
              />
              <Text type="secondary">
                {"High-volume, mission-critical apps"}
              </Text>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Key Takeaways */}
      <Alert
        message="🎯 Key Pricing Takeaways"
        description={
          <div>
            <Paragraph style={{ marginBottom: "8px" }}>
              <Text strong>{"Most Cost-Effective:"}</Text>{" "}
              {"Google Gemini Flash at"}
              {"$0.10/$0.40 per 1M tokens"}
            </Paragraph>
            <Paragraph style={{ marginBottom: "8px" }}>
              <Text strong>{"Best Value for Reasoning:"}</Text>{" "}
              {"DeepSeek-R1 at"}
              {"$0.14/$2.19 with 98% HumanEval score"}
            </Paragraph>
            <Paragraph style={{ marginBottom: "8px" }}>
              <Text strong>{"Premium Option:"}</Text>{" "}
              {"Claude 3.5 Sonnet with caching"}
              {"can be very cost-effective"}
            </Paragraph>
            <Paragraph style={{ marginBottom: 0 }}>
              <Text strong>{"Beginner Friendly:"}</Text>{" "}
              {"Start with free tiers to"}
              {"test, then scale based on usage"}
            </Paragraph>
          </div>
        }
        type="success"
        showIcon
      />
    </div>
  );
};

export default AIPricingComparisonSlide;
