"use client";

import React from "react";
import { List, Row, Col, Tag } from "antd";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ThunderboltOutlined,
  CodeOutlined,
  EditOutlined,
  GlobalOutlined,
  BulbOutlined,
  BookOutlined,
  UserOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

import { Title, Paragraph, Text } from "@/components/ui/typography";

export default function Page() {
  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2}>
        <ThunderboltOutlined /> {"What LLMs CAN Do"}
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <EditOutlined />
                  {"Text Generation & Writing"}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <List size="small">
                <List.Item>
                  {"Writing articles, emails, and documentation"}
                </List.Item>
                <List.Item>
                  {"Generating creative content like stories and poems"}
                </List.Item>
                <List.Item>
                  {"Creating marketing copy and product descriptions"}
                </List.Item>
                <List.Item>{"Drafting professional communications"}</List.Item>
                <List.Item>
                  {"Summarizing long documents or articles"}
                </List.Item>
              </List>
            </CardContent>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <CodeOutlined />
                  {"Code Generation & Programming"}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <List size="small">
                <List.Item>
                  {"Writing functions and classes from descriptions"}
                </List.Item>
                <List.Item>
                  {"Debugging existing code and suggesting fixes"}
                </List.Item>
                <List.Item>
                  {"Explaining complex code in plain language"}
                </List.Item>
                <List.Item>
                  {"Converting code between programming languages"}
                </List.Item>
                <List.Item>
                  {"Generating unit tests and documentation"}
                </List.Item>
                <List.Item>
                  {"Creating boilerplate code and templates"}
                </List.Item>
              </List>
            </CardContent>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <BookOutlined />
                  {"Analysis & Research"}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <List size="small">
                <List.Item>
                  {"Analyzing text for sentiment, themes, or patterns"}
                </List.Item>
                <List.Item>
                  {"Extracting key information from documents"}
                </List.Item>
                <List.Item>
                  {"Comparing different options or approaches"}
                </List.Item>
                <List.Item>
                  {"Generating research questions and hypotheses"}
                </List.Item>
                <List.Item>
                  {"Organizing and structuring information"}
                </List.Item>
              </List>
            </CardContent>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <GlobalOutlined />
                  {"Language & Communication"}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <List size="small">
                <List.Item>{"Translating between languages"}</List.Item>
                <List.Item>{"Improving grammar and style"}</List.Item>
                <List.Item>{"Adapting tone for different audiences"}</List.Item>
                <List.Item>
                  {"Explaining complex concepts in simple terms"}
                </List.Item>
                <List.Item>
                  {"Generating multiple versions of the same message"}
                </List.Item>
              </List>
            </CardContent>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <BulbOutlined />
                  {"Creative & Brainstorming"}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <List size="small">
                <List.Item>{"Brainstorming ideas and solutions"}</List.Item>
                <List.Item>{"Creating outlines and structures"}</List.Item>
                <List.Item>{"Generating examples and analogies"}</List.Item>
                <List.Item>{"Writing in different styles or voices"}</List.Item>
                <List.Item>{"Helping overcome writer&apos;s block"}</List.Item>
              </List>
            </CardContent>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <UserOutlined />
                  {"Learning & Education"}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <List size="small">
                <List.Item>{"Explaining difficult concepts"}</List.Item>
                <List.Item>
                  {"Creating practice questions and exercises"}
                </List.Item>
                <List.Item>{"Providing personalized tutoring"}</List.Item>
                <List.Item>{"Generating examples and case studies"}</List.Item>
                <List.Item>
                  {"Helping with research and fact-finding"}
                </List.Item>
              </List>
            </CardContent>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: "24px" }}>
        <CardContent>
          <Title level={4}>
            <TrophyOutlined /> {"Professional Applications"}
          </Title>
          <Paragraph>{"Real-world uses include:"}</Paragraph>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <List size="small">
                <List.Item>{"Customer service chatbots"}</List.Item>
                <List.Item>{"Content creation for marketing"}</List.Item>
                <List.Item>{"Code review and software development"}</List.Item>
                <List.Item>{"Legal document analysis"}</List.Item>
              </List>
            </Col>
            <Col xs={24} md={12}>
              <List size="small">
                <List.Item>{"Medical note-taking and analysis"}</List.Item>
                <List.Item>{"Educational content creation"}</List.Item>
                <List.Item>{"Technical documentation"}</List.Item>
                <List.Item>{"Data analysis and reporting"}</List.Item>
              </List>
            </Col>
          </Row>
        </CardContent>
      </Card>

      <Alert variant="default" style={{ marginTop: "24px" }}>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Key Success Factors</strong>
          <br />
          LLMs work best when given clear, specific instructions, provided with
          relevant context, used for tasks that benefit from pattern
          recognition, combined with human judgment, and applied to problems
          with well-defined boundaries.
        </AlertDescription>
      </Alert>

      <Card style={{ marginTop: "24px" }}>
        <CardContent>
          <Title level={4}>
            {"🚀 Master LLM Applications with These Courses"}
          </Title>
          <Paragraph>
            <Text strong>{"Recommended Learning Paths:"}</Text>
          </Paragraph>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <List size="small">
                <List.Item>
                  <Text strong>
                    {"Prompt Engineering for ChatGPT (Vanderbilt/Coursera):"}
                  </Text>{" "}
                  {"Learn to craft effective prompts -"}
                  <a
                    href="https://www.coursera.org/learn/prompt-engineering"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"Start here for practical skills"}
                  </a>
                </List.Item>
                <List.Item>
                  <Text strong>{"Stanford CS336 - Language Modeling:"}</Text>{" "}
                  {"Build"}
                  {"LLMs from scratch -"}
                  <a
                    href="https://stanford-cs336.github.io/spring2024/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"Deep technical understanding"}
                  </a>
                </List.Item>
              </List>
            </Col>
            <Col xs={24} md={12}>
              <List size="small">
                <List.Item>
                  <Text strong>{"DeepLearning.AI + Anthropic:"}</Text> {"Build"}
                  {"rich-context AI apps -"}
                  <a
                    href="https://learn.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"Latest practical applications"}
                  </a>
                </List.Item>
                <List.Item>
                  <Text strong>{"Prompt Engineering Guide:"}</Text>{" "}
                  {"Comprehensive free"}
                  {"resource -"}
                  <a
                    href="https://www.promptingguide.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"Complete reference with examples"}
                  </a>
                </List.Item>
              </List>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </div>
  );
}
