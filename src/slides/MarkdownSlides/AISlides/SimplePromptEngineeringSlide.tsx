import React from "react";
import { Alert, Row, Col, Space, Tag, Divider } from "antd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  BulbOutlined,
  StarOutlined,
  ThunderboltOutlined,
  ExclamationCircleOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Title, Text, Paragraph } from "@/components/ui/typography";

const SimplePromptEngineeringSlide: React.FC = () => {
  const examples = [
    {
      category: "Writing Help",
      badPrompt: "Write an email",
      goodPrompt:
        "Write a professional email to my boss asking for a day off next Friday. Keep it polite and brief.",
      improvement: "Specific task, audience, tone, and length",
      icon: "✉️",
    },
    {
      category: "Learning",
      badPrompt: "Explain AI",
      goodPrompt:
        "Explain AI in simple terms like I'm 12 years old. Use everyday examples and avoid technical jargon.",
      improvement: "Target audience, complexity level, style preference",
      icon: "🎓",
    },
    {
      category: "Problem Solving",
      badPrompt: "Help me with my presentation",
      goodPrompt:
        "I'm giving a 10-minute presentation about renewable energy to my college class. Help me create an outline with 3 main points.",
      improvement: "Context, audience, specific deliverable, constraints",
      icon: "📊",
    },
    {
      category: "Creative Tasks",
      badPrompt: "Write a story",
      goodPrompt:
        "Write a short, funny story about a cat who thinks it's a dog. Make it suitable for children and about 200 words.",
      improvement: "Genre, tone, audience, length specification",
      icon: "📚",
    },
  ];

  const quickTips = [
    {
      tip: "Be Specific",
      description:
        "Instead of 'help me cook', say 'help me make spaghetti for 4 people with ingredients I have: pasta, tomatoes, garlic'",
      icon: "🎯",
    },
    {
      tip: "Set the Context",
      description:
        "Tell the AI your situation: 'I'm a college student' or 'I'm planning a birthday party for my 8-year-old'",
      icon: "📝",
    },
    {
      tip: "Ask for Format",
      description:
        "Request: 'Give me a numbered list' or 'Explain in 3 simple steps' or 'Write in bullet points'",
      icon: "📋",
    },
    {
      tip: "Give Examples",
      description:
        "Show what you want: 'Like this example...' or 'Similar to...' helps AI understand your style",
      icon: "💡",
    },
  ];

  const commonMistakes = [
    {
      mistake: "Too Vague",
      example: "❌ 'Help me with work'",
      fix: "✅ 'Help me write a reply to a customer complaint email about a delayed order'",
    },
    {
      mistake: "No Context",
      example: "❌ 'Plan my day'",
      fix: "✅ 'Plan my day: I have a 9am meeting, need to grocery shop, and want to exercise for 30 minutes'",
    },
    {
      mistake: "Expecting Mind Reading",
      example: "❌ 'What should I do about this?'",
      fix: "✅ 'My houseplant's leaves are turning yellow. What could be wrong and how do I fix it?'",
    },
  ];

  const ExampleCard = ({ example }: { example: any }) => (
    <Card style={{ marginBottom: "16px", height: "100%" }}>
      <CardContent>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "32px" }}>{example.icon}</span>
            <Title level={4} style={{ margin: "8px 0 0 0" }}>
              {example.category}
            </Title>
          </div>

          <div>
            <Space align="start">
              <CloseCircleOutlined
                style={{ color: "#ff4d4f", marginTop: "4px" }}
              />
              <div>
                <Text strong style={{ color: "#ff4d4f" }}>
                  {"Bad Prompt:"}
                </Text>
                <Paragraph style={{ margin: "4px 0", fontStyle: "italic" }}>
                  {'"'}
                  {example.badPrompt}
                  {'"'}
                </Paragraph>
              </div>
            </Space>
          </div>

          <div>
            <Space align="start">
              <CheckCircleOutlined
                style={{ color: "#52c41a", marginTop: "4px" }}
              />
              <div>
                <Text strong style={{ color: "#52c41a" }}>
                  {"Good Prompt:"}
                </Text>
                <Paragraph style={{ margin: "4px 0" }}>
                  {'"'}
                  {example.goodPrompt}
                  {'"'}
                </Paragraph>
              </div>
            </Space>
          </div>

          <div
            style={{
              padding: "8px",
              backgroundColor: "#f6ffed",
              borderRadius: "6px",
            }}
          >
            <Text strong>{"Why it's better: "}</Text>
            <Text>{example.improvement}</Text>
          </div>
        </Space>
      </CardContent>
    </Card>
  );

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        <EditOutlined /> {"Simple Prompt Engineering: Get Better AI Results"}
      </Title>

      <Alert
        message="💬 The Secret: AI is Like Talking to a Very Literal Friend"
        description="The clearer and more specific you are, the better AI can help you. Think of it as giving detailed instructions to someone who wants to help but needs all the context."
        type="info"
        showIcon
        style={{ marginBottom: "32px" }}
      />

      {/* The Golden Rule */}
      <Card
        style={{
          marginBottom: "24px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <CardContent>
          <div style={{ textAlign: "center" }}>
            <StarOutlined
              style={{ fontSize: "48px", color: "white", marginBottom: "16px" }}
            />
            <Title level={3} style={{ color: "white", margin: 0 }}>
              {"The Golden Rule of Prompting"}
            </Title>
            <Paragraph
              style={{ color: "white", fontSize: "18px", margin: "16px 0 0 0" }}
            >
              <Text strong style={{ color: "white" }}>
                {'"If a friend asked you this question, would they have enough'}
                {'information to help you?"'}
              </Text>
            </Paragraph>
          </div>
        </CardContent>
      </Card>

      {/* Before/After Examples */}
      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            <ThunderboltOutlined /> {"Before & After Examples"}
          </Title>
          <Row gutter={[16, 16]}>
            {examples.map((example, index) => (
              <Col xs={24} lg={12} key={index}>
                <ExampleCard example={example} />
              </Col>
            ))}
          </Row>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={3}>
            <BulbOutlined /> {"4 Simple Rules for Better Prompts"}
          </Title>
          <Row gutter={[24, 16]}>
            {quickTips.map((tip, index) => (
              <Col xs={24} md={12} key={index}>
                <Card size="small" style={{ height: "100%" }}>
                  <CardContent>
                    <Space>
                      <span style={{ fontSize: "24px" }}>{tip.icon}</span>
                      <div>
                        <Text strong style={{ fontSize: "16px" }}>
                          {tip.tip}
                        </Text>
                        <Paragraph
                          style={{ margin: "8px 0 0 0", fontSize: "14px" }}
                        >
                          {tip.description}
                        </Paragraph>
                      </div>
                    </Space>
                  </CardContent>
                </Card>
              </Col>
            ))}
          </Row>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={3}>
            <ExclamationCircleOutlined /> {"Common Mistakes to Avoid"}
          </Title>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {commonMistakes.map((mistake, index) => (
              <Card
                key={index}
                size="small"
                style={{ backgroundColor: "#fff2f0" }}
              >
                <CardContent>
                  <Space
                    direction="vertical"
                    size="small"
                    style={{ width: "100%" }}
                  >
                    <Text strong style={{ color: "#ff4d4f", fontSize: "16px" }}>
                      {mistake.mistake}
                    </Text>
                    <div>{mistake.example}</div>
                    <div>{mistake.fix}</div>
                  </Space>
                </CardContent>
              </Card>
            ))}
          </Space>
        </CardContent>
      </Card>

      {/* Quick Start Template */}
      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={3}>
            <RocketOutlined /> {"Easy Template to Get Started"}
          </Title>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f6ffed",
              borderRadius: "8px",
              border: "2px dashed #52c41a",
            }}
          >
            <Text strong style={{ fontSize: "16px" }}>
              {"Fill in the blanks:"}
            </Text>
            <Paragraph
              style={{ margin: "12px 0", fontSize: "16px", lineHeight: "1.8" }}
            >
              {"\"I'm a "}
              <Tag color="blue">{"[your role/situation]"}</Tag>{" "}
              {"and I need help"}
              {"with "}
              <Tag color="green">{"[specific task]"}</Tag>
              {". Please"}{" "}
              <Tag color="orange">{"[what you want AI to do]"}</Tag>
              {" and make it"} <Tag color="purple">{"[style/tone/format]"}</Tag>
              {'."'}
            </Paragraph>

            <Divider />

            <Text strong>{"Example:"}</Text>
            <Paragraph
              style={{
                margin: "8px 0",
                fontStyle: "italic",
                backgroundColor: "white",
                padding: "12px",
                borderRadius: "4px",
              }}
            >
              {"\"I'm a "}
              <Tag color="blue">{"college student"}</Tag>
              {" and I need help with"}{" "}
              <Tag color="green">{"understanding photosynthesis"}</Tag>
              {". Please"}{" "}
              <Tag color="orange">
                {"explain it in simple terms with examples"}
              </Tag>{" "}
              {"and make it "}
              <Tag color="purple">{"easy to remember for my exam"}</Tag>
              {'."'}
            </Paragraph>
          </div>
        </CardContent>
      </Card>

      {/* Practice Challenge */}
      <Alert
        message="🎯 Practice Challenge"
        description="Try this: Ask AI to help you with something you actually need today. Use the template above and see how much better the results are compared to a vague request!"
        type="success"
        showIcon
        style={{ marginBottom: "24px" }}
      />

      {/* Key Takeaways */}
      <Card>
        <CardContent>
          <Title level={4}>{"🌟 Remember These 3 Things"}</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <div style={{ textAlign: "center", padding: "16px" }}>
                <span style={{ fontSize: "32px" }}>{"🎯"}</span>
                <Paragraph style={{ margin: "8px 0 0 0", fontWeight: "bold" }}>
                  {"Be Specific"}
                </Paragraph>
                <Text type="secondary">
                  {"Details help AI understand exactly what you need"}
                </Text>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: "center", padding: "16px" }}>
                <span style={{ fontSize: "32px" }}>{"📝"}</span>
                <Paragraph style={{ margin: "8px 0 0 0", fontWeight: "bold" }}>
                  {"Give Context"}
                </Paragraph>
                <Text type="secondary">
                  {"Tell AI about your situation and constraints"}
                </Text>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: "center", padding: "16px" }}>
                <span style={{ fontSize: "32px" }}>{"🔄"}</span>
                <Paragraph style={{ margin: "8px 0 0 0", fontWeight: "bold" }}>
                  {"Iterate"}
                </Paragraph>
                <Text type="secondary">
                  {"If the first result isn't perfect, refine your prompt"}
                </Text>
              </div>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimplePromptEngineeringSlide;
