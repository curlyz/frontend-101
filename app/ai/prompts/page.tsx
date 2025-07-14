import React from "react";
import { Row, Col, Divider } from "antd";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export default function Page() {
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
        "Explain AI in simple terms like I&apos;m 12 years old. Use everyday examples and avoid technical jargon.",
      improvement: "Target audience, complexity level, style preference",
      icon: "🎓",
    },
    {
      category: "Problem Solving",
      badPrompt: "Help me with my presentation",
      goodPrompt:
        "I&apos;m giving a 10-minute presentation about renewable energy to my college class. Help me create an outline with 3 main points.",
      improvement: "Context, audience, specific deliverable, constraints",
      icon: "📊",
    },
    {
      category: "Creative Tasks",
      badPrompt: "Write a story",
      goodPrompt:
        "Write a short, funny story about a cat who thinks it&apos;s a dog. Make it suitable for children and about 200 words.",
      improvement: "Genre, tone, audience, length specification",
      icon: "📚",
    },
  ];

  const quickTips = [
    {
      tip: "Be Specific",
      description:
        "Instead of &apos;help me cook&apos;, say &apos;help me make spaghetti for 4 people with ingredients I have: pasta, tomatoes, garlic&apos;",
      icon: "🎯",
    },
    {
      tip: "Set the Context",
      description:
        "Tell the AI your situation: &apos;I&apos;m a college student&apos; or &apos;I&apos;m planning a birthday party for my 8-year-old&apos;",
      icon: "📝",
    },
    {
      tip: "Ask for Format",
      description:
        "Request: &apos;Give me a numbered list&apos; or &apos;Explain in 3 simple steps&apos; or &apos;Write in bullet points&apos;",
      icon: "📋",
    },
    {
      tip: "Give Examples",
      description:
        "Show what you want: &apos;Like this example...&apos; or &apos;Similar to...&apos; helps AI understand your style",
      icon: "💡",
    },
  ];

  const commonMistakes = [
    {
      mistake: "Too Vague",
      example: "❌ &apos;Help me with work&apos;",
      fix: "✅ &apos;Help me write a reply to a customer complaint email about a delayed order&apos;",
    },
    {
      mistake: "No Context",
      example: "❌ &apos;Plan my day&apos;",
      fix: "✅ &apos;Plan my day: I have a 9am meeting, need to grocery shop, and want to exercise for 30 minutes&apos;",
    },
    {
      mistake: "Expecting Mind Reading",
      example: "❌ &apos;What should I do about this?&apos;",
      fix: "✅ &apos;My houseplant&apos;s leaves are turning yellow. What could be wrong and how do I fix it?&apos;",
    },
  ];

  const ExampleCard = ({ example }: { example: any }) => (
    <Card style={{ marginBottom: "16px", height: "100%" }}>
      <CardContent>
        <div className="flex flex-col gap-4 w-full">
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "32px" }}>{example.icon}</span>
            <Title level={4} style={{ margin: "8px 0 0 0" }}>
              {example.category}
            </Title>
          </div>

          <div>
            <div className="flex items-start gap-2">
              <CloseCircleOutlined
                style={{ color: "#ff4d4f", marginTop: "4px" }}
              />
              <div>
                <Text strong style={{ color: "#ff4d4f" }}>
                  {"Bad Prompt:"}
                </Text>
                <Paragraph style={{ margin: "4px 0", fontStyle: "italic" }}>
                  &quot;{example.badPrompt}&quot;
                </Paragraph>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start gap-2">
              <CheckCircleOutlined
                style={{ color: "#52c41a", marginTop: "4px" }}
              />
              <div>
                <Text strong style={{ color: "#52c41a" }}>
                  {"Good Prompt:"}
                </Text>
                <Paragraph style={{ margin: "4px 0" }}>
                  &quot;{example.goodPrompt}&quot;
                </Paragraph>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "8px",
              backgroundColor: "#f6ffed",
              borderRadius: "6px",
            }}
          >
            <Text strong>{"Why it&apos;s better: "}</Text>
            <Text>{example.improvement}</Text>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        <EditOutlined /> {"Simple Prompt Engineering: Get Better AI Results"}
      </Title>

      <Alert variant="default" style={{ marginBottom: "32px" }}>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>
            {"💬 The Secret: AI is Like Talking to a Very Literal Friend"}
          </strong>
          <br />
          {"The clearer and more specific you are, the better AI can help you."}
          {
            "Think of it as giving detailed instructions to someone who wants to"
          }
          {"help but needs all the context."}
        </AlertDescription>
      </Alert>

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
                &quot;
                {"If a friend asked you this question, would they have enough"}
                {"information to help you?"}&quot;
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
                    <div className="flex items-center gap-2">
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
                    </div>
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
          <div className="flex flex-col gap-4 w-full">
            {commonMistakes.map((mistake, index) => (
              <Card
                key={index}
                size="small"
                style={{ backgroundColor: "#fff2f0" }}
              >
                <CardContent>
                  <div className="flex flex-col gap-2 w-full">
                    <Text strong style={{ color: "#ff4d4f", fontSize: "16px" }}>
                      {mistake.mistake}
                    </Text>
                    <div>{mistake.example}</div>
                    <div>{mistake.fix}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
              &quot;{"I"}&apos;{"m a "}
              <Badge variant="default">{"[your role/situation]"}</Badge>{" "}
              {"and I"}
              {"need help with "}
              <Badge variant="secondary">{"[specific task]"}</Badge>
              {". Please"}{" "}
              <Badge variant="outline">{"[what you want AI to do]"}</Badge>
              {" and make it"}{" "}
              <Badge variant="destructive">{"[style/tone/format]"}</Badge>
              {"."}&quot;
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
              &quot;{"I"}&apos;{"m a "}
              <Badge variant="default">{"college student"}</Badge>{" "}
              {"and I need"}
              {"help with "}
              <Badge variant="secondary">
                {"understanding photosynthesis"}
              </Badge>
              {"."}
              {"Please"}{" "}
              <Badge variant="outline">
                {"explain it in simple terms with examples"}
              </Badge>{" "}
              {"and make it "}
              <Badge variant="destructive">
                {"easy to remember for my exam"}
              </Badge>
              {"."}&quot;
            </Paragraph>
          </div>
        </CardContent>
      </Card>

      {/* Practice Challenge */}
      <Alert variant="default" style={{ marginBottom: "24px" }}>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>{"🎯 Practice Challenge"}</strong>
          <br />
          {
            "Try this: Ask AI to help you with something you actually need today."
          }
          {"Use the template above and see how much better the results are"}
          {"compared to a vague request!"}
        </AlertDescription>
      </Alert>

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
                  {"If the first result isn"}&apos;
                  {"t perfect, refine your prompt"}
                </Text>
              </div>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </div>
  );
}
