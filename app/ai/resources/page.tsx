import React from "react";
import {
  Typography,
  Card,
  List,
  Alert,
  Row,
  Col,
  Space,
  Tag,
  Divider,
} from "antd";
import {
  BookOutlined,
  StarOutlined,
  RocketOutlined,
  ExperimentOutlined,
  CodeOutlined,
  SafetyCertificateOutlined,
  GlobalOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function Page() {
  const beginner = [
    {
      title: "AI for Everyone (Coursera)",
      provider: "Andrew Ng / DeepLearning.AI",
      description: "Perfect introduction for non-technical professionals",
      url: "https://www.coursera.org/learn/ai-for-everyone",
      duration: "4 weeks",
      level: "Beginner",
    },
    {
      title: "Prompt Engineering for ChatGPT",
      provider: "Vanderbilt University / Coursera",
      description: "Learn to craft effective prompts and work with LLMs",
      url: "https://www.coursera.org/learn/prompt-engineering",
      duration: "3 weeks",
      level: "Beginner",
    },
  ];

  const intermediate = [
    {
      title: "Stanford CS224N - NLP with Deep Learning",
      provider: "Stanford University",
      description: "Comprehensive course covering latest LLM research",
      url: "https://web.stanford.edu/class/cs224n/",
      duration: "10 weeks",
      level: "Intermediate",
    },
    {
      title: "Harvard AI Professional Certificate",
      provider: "Harvard University / edX",
      description: "Comprehensive AI skills with hands-on projects",
      url: "https://www.edx.org/learn/artificial-intelligence",
      duration: "6 months",
      level: "Intermediate",
    },
  ];

  const advanced = [
    {
      title: "Stanford CS336 - Language Modeling from Scratch",
      provider: "Stanford University",
      description: "Build your own language models from the ground up",
      url: "https://stanford-cs336.github.io/spring2024/",
      duration: "12 weeks",
      level: "Advanced",
    },
    {
      title: "DeepLearning.AI + Anthropic Specialization",
      provider: "DeepLearning.AI / Anthropic",
      description: "Build rich-context AI applications with Claude",
      url: "https://learn.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic/",
      duration: "4 weeks",
      level: "Advanced",
    },
  ];

  const freeResources = [
    {
      title: "Prompt Engineering Guide",
      description: "Comprehensive free resource with latest techniques",
      url: "https://www.promptingguide.ai/",
    },
    {
      title: "Learn Prompting",
      description: "Complete guide to Generative AI and Prompt Engineering",
      url: "https://learnprompting.org/docs/introduction",
    },
    {
      title: "Anthropic AI Safety Research",
      description: "Constitutional AI and alignment principles",
      url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback",
    },
    {
      title: "OpenAI API Documentation",
      description: "Official documentation and examples",
      url: "https://platform.openai.com/docs",
    },
  ];

  const CourseCard = ({ course, index }: { course: any; index: number }) => (
    <Card style={{ marginBottom: "16px", height: "100%" }} hoverable>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <div>
          <Title level={5} style={{ margin: 0, color: "#1890ff" }}>
            {course.title}
          </Title>
          <Text type="secondary">{course.provider}</Text>
        </div>
        <Paragraph style={{ margin: "8px 0" }}>{course.description}</Paragraph>
        <Space>
          <Tag color="blue">{course.level}</Tag>
          <Tag color="green">{course.duration}</Tag>
        </Space>
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1890ff", fontWeight: "500" }}
        >
          {"View Course →"}
        </a>
      </Space>
    </Card>
  );

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        <BookOutlined /> {"AI/LLM Learning Resources & Next Steps"}
      </Title>

      <Alert
        message="🚀 Your AI Learning Journey Starts Here"
        description="These carefully curated resources will take you from AI basics to advanced LLM applications. Choose your path based on your current experience level."
        type="info"
        showIcon
        style={{ marginBottom: "32px" }}
      />

      {/* Beginner Level */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3}>
          <StarOutlined style={{ color: "#52c41a" }} /> {"Beginner Level"}
        </Title>
        <Paragraph>
          <Text strong>
            {"Start here if you"}&apos;
            {"re new to AI or want a solid foundation"}
          </Text>
        </Paragraph>
        <Row gutter={[24, 16]}>
          {beginner.map((course, index) => (
            <Col xs={24} md={12} key={index}>
              <CourseCard course={course} index={index} />
            </Col>
          ))}
        </Row>
      </Card>

      {/* Intermediate Level */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3}>
          <RocketOutlined style={{ color: "#1890ff" }} /> {"Intermediate Level"}
        </Title>
        <Paragraph>
          <Text strong>
            {"Ready for technical depth and hands-on projects"}
          </Text>
        </Paragraph>
        <Row gutter={[24, 16]}>
          {intermediate.map((course, index) => (
            <Col xs={24} md={12} key={index}>
              <CourseCard course={course} index={index} />
            </Col>
          ))}
        </Row>
      </Card>

      {/* Advanced Level */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3}>
          <ExperimentOutlined style={{ color: "#722ed1" }} /> {"Advanced Level"}
        </Title>
        <Paragraph>
          <Text strong>
            {"Build your own AI systems and cutting-edge applications"}
          </Text>
        </Paragraph>
        <Row gutter={[24, 16]}>
          {advanced.map((course, index) => (
            <Col xs={24} md={12} key={index}>
              <CourseCard course={course} index={index} />
            </Col>
          ))}
        </Row>
      </Card>

      <Divider />

      {/* Free Resources */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3}>
          <GlobalOutlined style={{ color: "#fa8c16" }} /> {"Free Resources &"}
          {"Documentation"}
        </Title>
        <Row gutter={[24, 16]}>
          {freeResources.map((resource, index) => (
            <Col xs={24} md={12} key={index}>
              <Card size="small" style={{ height: "100%" }}>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <Title level={5} style={{ margin: 0 }}>
                    {resource.title}
                  </Title>
                  <Paragraph style={{ margin: "8px 0" }}>
                    {resource.description}
                  </Paragraph>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1890ff", fontWeight: "500" }}
                  >
                    {"Access Resource →"}
                  </a>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Learning Path Recommendations */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3}>
          <TeamOutlined style={{ color: "#13c2c2" }} /> {"Recommended Learning"}
          {"Paths"}
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card
              title={
                <Space>
                  <CodeOutlined />
                  {"For Developers"}
                </Space>
              }
              size="small"
            >
              <List size="small">
                <List.Item>{"1. Prompt Engineering for ChatGPT"}</List.Item>
                <List.Item>{"2. Stanford CS224N (NLP)"}</List.Item>
                <List.Item>{"3. DeepLearning.AI + Anthropic"}</List.Item>
                <List.Item>{"4. Stanford CS336 (Language Modeling)"}</List.Item>
              </List>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              title={
                <Space>
                  <SafetyCertificateOutlined />
                  {"For AI Safety/Ethics"}
                </Space>
              }
              size="small"
            >
              <List size="small">
                <List.Item>{"1. AI for Everyone"}</List.Item>
                <List.Item>{"2. Anthropic AI Safety Research"}</List.Item>
                <List.Item>
                  {"3. Harvard AI Professional Certificate"}
                </List.Item>
                <List.Item>{"4. Stanford AI Ethics courses"}</List.Item>
              </List>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              title={
                <Space>
                  <BookOutlined />
                  {"For Business Leaders"}
                </Space>
              }
              size="small"
            >
              <List size="small">
                <List.Item>{"1. AI for Everyone"}</List.Item>
                <List.Item>{"2. Prompt Engineering basics"}</List.Item>
                <List.Item>
                  {"3. Harvard AI Professional Certificate"}
                </List.Item>
                <List.Item>{"4. Industry-specific AI applications"}</List.Item>
              </List>
            </Card>
          </Col>
        </Row>
      </Card>

      <Alert
        message="🎯 Pro Tips for AI Learning"
        description="Start with fundamentals, practice with real projects, join AI communities (Reddit r/MachineLearning, Discord servers), follow AI researchers on Twitter, and always verify AI outputs with multiple sources. The field moves fast - continuous learning is essential!"
        type="success"
        showIcon
      />
    </div>
  );
}
