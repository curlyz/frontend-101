import React from "react";
import { List, Alert, Divider, Space, Timeline } from "antd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  RobotOutlined,
  BranchesOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined,
  AlertOutlined,
  HistoryOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { Title, Text, Paragraph } from "@/components/ui/typography";

const WhatIsAISlide: React.FC = () => {
  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        <RobotOutlined /> {"What is AI? - Demystifying Artificial Intelligence"}
      </Title>

      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={4}>
            <InfoCircleOutlined /> {"What AI Actually Is"}
          </Title>
          <Paragraph>
            {"Artificial Intelligence (AI) is"}{" "}
            <Text strong>{"not magic or consciousness"}</Text>{" "}
            {"- it's a collection of"}
            {
              "mathematical techniques that enable computers to recognize patterns,"
            }
            {
              "make predictions, and generate responses based on data they've been"
            }
            {"trained on."}
          </Paragraph>
          <Alert
            message="Key Insight"
            description="AI is sophisticated pattern-matching technology that can seem intelligent but operates very differently from human intelligence."
            type="info"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        </CardContent>
      </Card>

      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={4}>
            <HistoryOutlined /> {"AI Evolution Timeline"}
          </Title>
          <Timeline>
            <Timeline.Item color="blue">
              <Text strong>{"1970s: Rule-based Systems"}</Text>
              <br />
              <Text>
                {"Expert systems with explicit programmed rules (like early"}
                {"chatbots)"}
              </Text>
            </Timeline.Item>
            <Timeline.Item color="green">
              <Text strong>{"1990s: Machine Learning"}</Text>
              <br />
              <Text>
                {"Systems that learn patterns from data to make predictions"}
              </Text>
            </Timeline.Item>
            <Timeline.Item color="orange">
              <Text strong>{"2010s: Deep Learning"}</Text>
              <br />
              <Text>{"Neural networks that process complex patterns"}</Text>
            </Timeline.Item>
            <Timeline.Item color="red">
              <Text strong>{"2020s: Large Language Models"}</Text>
              <br />
              <Text>
                {
                  "Specialized AI for understanding and generating human language"
                }
              </Text>
            </Timeline.Item>
          </Timeline>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={4}>
            <BranchesOutlined /> {"Current Reality: Narrow AI"}
          </Title>
          <Paragraph>
            {"Today's AI systems are "}
            <Text strong>{'"narrow"'}</Text> {"- they excel at"}
            {"specific tasks but cannot transfer knowledge between domains. A"}
            {
              "chess-playing AI cannot suddenly write poetry, and a language model"
            }
            {"cannot directly control robots."}
          </Paragraph>

          <Title level={5}>{"Types of AI Systems:"}</Title>
          <List>
            <List.Item>
              <Text strong>{"Rule-based systems:"}</Text>{" "}
              {"Follow explicit programmed"}
              {"rules"}
            </List.Item>
            <List.Item>
              <Text strong>{"Machine learning:"}</Text>{" "}
              {"Learn patterns from data to"}
              {"make predictions"}
            </List.Item>
            <List.Item>
              <Text strong>{"Deep learning:"}</Text>{" "}
              {"Use neural networks to process"}
              {"complex patterns"}
            </List.Item>
            <List.Item>
              <Text strong>{"Large Language Models (LLMs):"}</Text>{" "}
              {"Specialized for"}
              {"understanding and generating human language"}
            </List.Item>
          </List>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={4}>
            <AlertOutlined /> {"What We DON'T Have Yet"}
          </Title>
          <List>
            <List.Item>
              <Text strong>{"Artificial General Intelligence (AGI):"}</Text>{" "}
              {"Human-level intelligence across all domains"}
            </List.Item>
            <List.Item>
              <Text strong>{"Consciousness or true understanding:"}</Text>{" "}
              {"AI"}
              {"processes patterns without awareness"}
            </List.Item>
            <List.Item>
              <Text strong>{"Human-like learning:"}</Text>{" "}
              {"Systems that can learn and"}
              {"adapt like humans do"}
            </List.Item>
            <List.Item>
              <Text strong>{"Reliable autonomous systems:"}</Text>{" "}
              {"AI that can work"}
              {"without human oversight"}
            </List.Item>
          </List>
        </CardContent>
      </Card>

      <Alert
        message="The Bottom Line"
        description="Current AI is incredibly powerful pattern-matching technology that can seem intelligent but operates very differently from human intelligence. Understanding this distinction is crucial for using AI effectively."
        type="success"
        showIcon
        style={{ marginTop: "24px" }}
      />

      <Card style={{ marginTop: "24px" }}>
        <CardContent>
          <Title level={4}>{"📚 Further Learning Resources"}</Title>
          <Paragraph>
            <Text strong>{"Essential Courses for Deeper Understanding:"}</Text>
          </Paragraph>
          <List size="small">
            <List.Item>
              <Text strong>{"Stanford CS224N:"}</Text>{" "}
              {"Natural Language Processing"}
              {"with Deep Learning -"}
              <a
                href="https://web.stanford.edu/class/cs224n/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {"Free lectures on YouTube covering latest LLM research"}
              </a>
            </List.Item>
            <List.Item>
              <Text strong>{"Andrew Ng's AI for Everyone (Coursera):"}</Text>{" "}
              {"-"}
              <a
                href="https://www.coursera.org/learn/ai-for-everyone"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {"Perfect introduction for non-technical professionals"}
              </a>
            </List.Item>
            <List.Item>
              <Text strong>
                {"Harvard's AI Professional Certificate (edX):"}
              </Text>{" "}
              {"-"}
              <a
                href="https://www.edx.org/learn/artificial-intelligence"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {"Comprehensive AI skills with hands-on projects"}
              </a>
            </List.Item>
            <List.Item>
              <Text strong>{"Anthropic's AI Safety Courses:"}</Text> {"-"}
              <a
                href="https://www.anthropic.com/learn"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {"Constitutional AI and alignment principles"}
              </a>
            </List.Item>
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatIsAISlide;
