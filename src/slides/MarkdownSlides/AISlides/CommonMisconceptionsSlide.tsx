import React from "react";
import { List, Alert, Row, Col, Space } from "antd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  SecurityScanOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  RobotOutlined,
  BankOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import { Title, Text, Paragraph } from "@/components/ui/typography";

const CommonMisconceptionsSlide: React.FC = () => {
  const misconceptions = [
    {
      myth: "AI is Magic",
      reality:
        "AI is sophisticated mathematics and statistics applied to large datasets",
      icon: <RobotOutlined />,
    },
    {
      myth: "AI Will Replace All Developers",
      reality:
        "AI is a powerful assistant that enhances developer productivity",
      icon: <AlertOutlined />,
    },
    {
      myth: "AI is Always Right",
      reality:
        "AI can hallucinate, make mistakes, and present false information confidently",
      icon: <ExclamationCircleOutlined />,
    },
    {
      myth: "AI Understands Like Humans",
      reality: "AI processes patterns in data without genuine understanding",
      icon: <BankOutlined />,
    },
    {
      myth: "AI Has Consciousness",
      reality: "AI simulates conversational responses without consciousness",
      icon: <SecurityScanOutlined />,
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        <SecurityScanOutlined /> {"Common Misconceptions About AI"}
      </Title>

      <Alert
        message="Why These Misconceptions Matter"
        description="These misconceptions can lead to unrealistic expectations, poor decision-making about AI adoption, inadequate preparation for AI's real impacts, and misallocation of resources and attention."
        type="warning"
        showIcon
        style={{ marginBottom: "24px" }}
      />

      <Row gutter={[24, 24]}>
        {misconceptions.map((item, index) => (
          <Col xs={24} md={12} key={index}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "24px",
                        color: "#1890ff",
                        marginBottom: "8px",
                      }}
                    >
                      {item.icon}
                    </div>
                    <Title level={4} style={{ margin: 0 }}>
                      {"Misconception #"}
                      {index + 1}
                    </Title>
                  </div>

                  <div>
                    <Space>
                      <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                      <Text strong style={{ color: "#ff4d4f" }}>
                        {"Myth:"}
                      </Text>
                    </Space>
                    <Paragraph
                      style={{ marginTop: "8px", marginBottom: "16px" }}
                    >
                      {'"'}
                      {item.myth}
                      {'"'}
                    </Paragraph>
                  </div>

                  <div>
                    <Space>
                      <CheckCircleOutlined style={{ color: "#52c41a" }} />
                      <Text strong style={{ color: "#52c41a" }}>
                        {"Reality:"}
                      </Text>
                    </Space>
                    <Paragraph style={{ marginTop: "8px", marginBottom: 0 }}>
                      {item.reality}
                    </Paragraph>
                  </div>
                </Space>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: "24px" }}>
        <CardContent>
          <Title level={4}>{"Additional Misconceptions"}</Title>
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <List size="small">
                <List.Item>
                  <Text strong>{"Myth:"}</Text>{" "}
                  {"AI can learn and improve on its own"}
                  <br />
                  <Text>{"Most AI systems are static after training"}</Text>
                </List.Item>
                <List.Item>
                  <Text strong>{"Myth:"}</Text> {"AI is objective and unbiased"}
                  <br />
                  <Text>{"AI reflects biases present in training data"}</Text>
                </List.Item>
                <List.Item>
                  <Text strong>{"Myth:"}</Text>{" "}
                  {"AI will become superintelligent soon"}
                  <br />
                  <Text>
                    {"AGI timeline is highly uncertain (decades to centuries)"}
                  </Text>
                </List.Item>
              </List>
            </Col>
            <Col xs={24} md={12}>
              <List size="small">
                <List.Item>
                  <Text strong>{"Myth:"}</Text>{" "}
                  {"AI can do everything humans can do"}
                  <br />
                  <Text>
                    {
                      "AI excels at specific tasks but lacks general intelligence"
                    }
                  </Text>
                </List.Item>
                <List.Item>
                  <Text strong>{"Myth:"}</Text>{" "}
                  {"AI is either harmless or apocalyptic"}
                  <br />
                  <Text>
                    {
                      "AI risks are more nuanced (job displacement, privacy, bias)"
                    }
                  </Text>
                </List.Item>
              </List>
            </Col>
          </Row>
        </CardContent>
      </Card>

      <Alert
        message="Developing a Balanced Perspective"
        description="To use AI effectively: understand both capabilities and limitations, maintain healthy skepticism about AI outputs, use AI as a tool (not a replacement for human judgment), and stay informed about AI developments through reliable sources."
        type="success"
        showIcon
        style={{ marginTop: "24px" }}
      />

      <Card style={{ marginTop: "24px" }}>
        <CardContent>
          <Title level={4}>{"🎯 Evidence-Based Learning Resources"}</Title>
          <Paragraph>
            <Text strong>{"Learn from AI Researchers & Practitioners:"}</Text>
          </Paragraph>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <List size="small">
                <List.Item>
                  <Text strong>
                    {"Anthropic's Constitutional AI Research:"}
                  </Text>{" "}
                  {"-"}
                  <a
                    href="https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"Understanding AI alignment and safety"}
                  </a>
                </List.Item>
                <List.Item>
                  <Text strong>{"Stanford CS224V - Conversational AI:"}</Text>{" "}
                  {"-"}
                  <a
                    href="https://web.stanford.edu/class/cs224v/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"Learn about LLM limitations and grounding"}
                  </a>
                </List.Item>
              </List>
            </Col>
            <Col xs={24} md={12}>
              <List size="small">
                <List.Item>
                  <Text strong>{"Learn Prompting - Free Course:"}</Text> {"-"}
                  <a
                    href="https://learnprompting.org/docs/introduction"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"Comprehensive guide to AI capabilities and limitations"}
                  </a>
                </List.Item>
                <List.Item>
                  <Text strong>{"AI Ethics Course (Stanford/edX):"}</Text> {"-"}
                  <a
                    href="https://www.edx.org/learn/artificial-intelligence"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"Responsible AI development and deployment"}
                  </a>
                </List.Item>
              </List>
            </Col>
          </Row>

          <Alert
            message="📖 Essential Reading"
            description="Follow research papers from Anthropic, OpenAI, Google DeepMind, and academic institutions to stay current with AI limitations and breakthroughs."
            type="info"
            showIcon
            style={{ marginTop: "16px" }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CommonMisconceptionsSlide;
