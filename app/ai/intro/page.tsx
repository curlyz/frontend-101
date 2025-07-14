import React from "react";
import { Divider, Timeline } from "antd";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, CheckCircle } from "lucide-react";
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

import { Title, Paragraph, Text } from "@/components/ui/typography";

export default function WhatIsAIPage() {
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
            <Text strong>{"not magic or consciousness"}</Text> {"- it"}&apos;
            {"s a"}
            {"collection of mathematical techniques that enable computers to"}
            {
              "recognize patterns, make predictions, and generate responses based on"
            }
            {"data they"}&apos;{"ve been trained on."}
          </Paragraph>
          <Alert variant="default" style={{ marginBottom: "16px" }}>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Key Insight</strong>
              <br />
              AI is sophisticated pattern-matching technology that can seem
              intelligent but operates very differently from human intelligence.
            </AlertDescription>
          </Alert>
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
            {"Today"}&apos;{"s AI systems are "}
            <Text strong>{"&quot;narrow&quot;"}</Text> {"-"}
            {
              "they excel at specific tasks but cannot transfer knowledge between"
            }
            {"domains. A chess-playing AI cannot suddenly write poetry, and a"}
            {"language model cannot directly control robots."}
          </Paragraph>

          <Title level={5}>{"Types of AI Systems:"}</Title>
          <div className="space-y-4">
            <div className="py-2">
              <Text strong>{"Rule-based systems:"}</Text>{" "}
              {"Follow explicit programmed"}
              {"rules"}
            </div>
            <div className="py-2">
              <Text strong>{"Machine learning:"}</Text>{" "}
              {"Learn patterns from data to"}
              {"make predictions"}
            </div>
            <div className="py-2">
              <Text strong>{"Deep learning:"}</Text>{" "}
              {"Use neural networks to process"}
              {"complex patterns"}
            </div>
            <div className="py-2">
              <Text strong>{"Large Language Models (LLMs):"}</Text>{" "}
              {"Specialized for"}
              {"understanding and generating human language"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={4}>
            <AlertOutlined /> {"What We DON"}&apos;{"T Have Yet"}
          </Title>
          <div className="space-y-4">
            <div className="py-2">
              <Text strong>{"Artificial General Intelligence (AGI):"}</Text>{" "}
              {"Human-level intelligence across all domains"}
            </div>
            <div className="py-2">
              <Text strong>{"Consciousness or true understanding:"}</Text>{" "}
              {"AI"}
              {"processes patterns without awareness"}
            </div>
            <div className="py-2">
              <Text strong>{"Human-like learning:"}</Text>{" "}
              {"Systems that can learn and"}
              {"adapt like humans do"}
            </div>
            <div className="py-2">
              <Text strong>{"Reliable autonomous systems:"}</Text>{" "}
              {"AI that can work"}
              {"without human oversight"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert variant="default" style={{ marginTop: "24px" }}>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>The Bottom Line</strong>
          <br />
          Current AI is incredibly powerful pattern-matching technology that can
          seem intelligent but operates very differently from human
          intelligence. Understanding this distinction is crucial for using AI
          effectively.
        </AlertDescription>
      </Alert>

      <Card style={{ marginTop: "24px" }}>
        <CardContent>
          <Title level={4}>{"📚 Further Learning Resources"}</Title>
          <Paragraph>
            <Text strong>{"Essential Courses for Deeper Understanding:"}</Text>
          </Paragraph>
          <div className="space-y-3">
            <div className="py-1">
              <Text strong>{"Stanford CS224N:"}</Text>{" "}
              {"Natural Language Processing"}
              {"with Deep Learning -"}
              <a
                href="https://web.stanford.edu/class/cs224n/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {" "}
                {"Free lectures on YouTube covering latest LLM research"}
              </a>
            </div>
            <div className="py-1">
              <Text strong>
                {"Andrew Ng&apos;s AI for Everyone (Coursera):"}
              </Text>{" "}
              {"-"}
              <a
                href="https://www.coursera.org/learn/ai-for-everyone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {" "}
                {"Perfect introduction for non-technical professionals"}
              </a>
            </div>
            <div className="py-1">
              <Text strong>
                {"Harvard"}&apos;{"s AI Professional Certificate (edX):"}
              </Text>{" "}
              {"-"}
              <a
                href="https://www.edx.org/learn/artificial-intelligence"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {" "}
                {"Comprehensive AI skills with hands-on projects"}
              </a>
            </div>
            <div className="py-1">
              <Text strong>{"Anthropic&apos;s AI Safety Courses:"}</Text> {"-"}
              <a
                href="https://www.anthropic.com/learn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {" "}
                {"Constitutional AI and alignment principles"}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
