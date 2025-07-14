import React from "react";
import { List, Alert, Divider, Space, Tag } from "antd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ReadOutlined,
  ThunderboltOutlined,
  RobotOutlined,
  GlobalOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { Title, Text, Paragraph } from "@/components/ui/typography";

const WhatAreLLMsSlide: React.FC = () => {
  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        <ReadOutlined /> {"What are Large Language Models (LLMs)?"}
      </Title>

      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={4}>{"What is an LLM?"}</Title>
          <Paragraph>
            {
              "A Large Language Model (LLM) is a type of artificial intelligence"
            }
            {"system that has been trained on massive amounts of text data to"}
            {"understand and generate human-like text. Think of it as a very"}
            {"sophisticated "}
            <Text strong>{"autocomplete system"}</Text> {"that can predict"}
            {"what words should come next in any given context."}
          </Paragraph>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={4}>
            <GlobalOutlined /> {"Popular LLMs You May Know"}
          </Title>
          <List>
            <List.Item>
              <Text strong>{"GPT-4 (OpenAI):"}</Text>{" "}
              {"Powers ChatGPT and many"}
              {"applications"}
            </List.Item>
            <List.Item>
              <Text strong>{"Claude (Anthropic):"}</Text>{" "}
              {"Focused on helpful,"}
              {"harmless, and honest AI"}
            </List.Item>
            <List.Item>
              <Text strong>{"Gemini (Google):"}</Text>{" "}
              {"Multimodal AI that can handle"}
              {"text, images, and code"}
            </List.Item>
            <List.Item>
              <Text strong>{"Llama (Meta):"}</Text>{" "}
              {"Open-source models available for"}
              {"research and development"}
            </List.Item>
          </List>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={4}>
            <ThunderboltOutlined /> {"The Core Function: Token Prediction"}
          </Title>
          <Paragraph>
            {"LLMs don't actually "}
            <Text strong>{'"understand"'}</Text> {"language in the"}
            {"way humans do. Instead, they:"}
          </Paragraph>
          <List>
            <List.Item>
              <Text strong>{"1. Break text into tokens:"}</Text>{" "}
              {"Small pieces like"}
              {"words or word parts"}
            </List.Item>
            <List.Item>
              <Text strong>{"2. Use statistical patterns:"}</Text>{" "}
              {"Learned from"}
              {"training data to predict next tokens"}
            </List.Item>
            <List.Item>
              <Text strong>{"3. Generate responses:"}</Text>{" "}
              {"By repeatedly predicting"}
              {"the next most likely token"}
            </List.Item>
          </List>

          <Alert
            message="Example"
            description="For 'The cat sat on the ___', an LLM generates probability distributions for possible next words: 'mat' (40%), 'chair' (25%), 'floor' (20%), etc."
            type="info"
            showIcon
            style={{ marginTop: "16px" }}
          />
        </CardContent>
      </Card>

      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={4}>
            <RobotOutlined /> {'Why They Seem "Intelligent"'}
          </Title>
          <Paragraph>{"LLMs appear intelligent because they:"}</Paragraph>
          <List>
            <List.Item>
              {"Have been trained on an enormous variety of human-written text"}
            </List.Item>
            <List.Item>
              {"Can recognize and reproduce complex patterns in language"}
            </List.Item>
            <List.Item>
              {"Can maintain context across long conversations"}
            </List.Item>
            <List.Item>
              {
                "Can generate coherent, relevant responses on virtually any topic"
              }
            </List.Item>
          </List>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Title level={4}>
            <BranchesOutlined /> {"What They Actually Are"}
          </Title>
          <List>
            <List.Item>
              <Text strong>{"Statistical models"}</Text>{" "}
              {"that find patterns in text"}
              {"data"}
            </List.Item>
            <List.Item>
              <Text strong>{"Prediction engines"}</Text>{" "}
              {"that are very sophisticated"}
            </List.Item>
            <List.Item>
              <Text strong>{"Text generators"}</Text>{" "}
              {"that can produce human-like"}
              {"content without true understanding"}
            </List.Item>
            <List.Item>
              <Text strong>{"Tools"}</Text>{" "}
              {"that excel at language tasks but lack"}
              {"genuine comprehension"}
            </List.Item>
          </List>
        </CardContent>
      </Card>

      <Alert
        message="The Key Insight"
        description="LLMs are incredibly powerful pattern-matching systems that can generate remarkably human-like text, but they operate through statistical prediction rather than genuine understanding."
        type="success"
        showIcon
        style={{ marginTop: "24px" }}
      />
    </div>
  );
};

export default WhatAreLLMsSlide;
