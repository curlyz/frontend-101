"use client";

import React from "react";
import { List, Row, Col, Timeline, Tag } from "antd";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  InteractionOutlined,
  SyncOutlined,
  GlobalOutlined,
  CloudDownloadOutlined,
  CodeOutlined,
  DesktopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { Title, Paragraph, Text } from "@/components/ui/typography";

/**
 * @function ClientComponentsSlide
 * @description A React functional component explaining React Client Components.
 * It details Client-Side Rendering (CSR), when to use Client Components, and visual ideas for presentation.
 * @returns {React.ReactElement} The ClientComponentsSlide component.
 * @example
 * <ClientComponentsSlide />
 */
export default function Page() {
  const mainIdeas = [
    "React components are client-rendered by default.",
    "Client-Side Rendering (CSR): server sends JS bundle, browser executes it, React mounts components and builds UI dynamically.",
    "Initial HTML is minimal, and dynamic interactions are handled on the client.",
    "Use Client Components for user interactions, dynamic states, and browser APIs.",
  ];

  const csrFlowSteps = [
    {
      icon: <CloudDownloadOutlined />,
      title: "Browser requests page.",
      description: "User navigates to the URL.",
    },
    {
      icon: <CodeOutlined />,
      title: "Server sends minimal HTML + JS bundle link.",
      description:
        "A lightweight HTML shell and a link to the JavaScript application bundle are delivered.",
    },
    {
      icon: <CloudDownloadOutlined style={{ color: "#1890ff" }} />,
      title: "Browser downloads JS bundle.",
      description:
        "The browser fetches the main JavaScript file containing React and application code.",
    },
    {
      icon: <DesktopOutlined style={{ color: "#52c41a" }} />,
      title: "Browser executes JS, React initializes, renders UI.",
      description:
        "React takes over, mounts components, and dynamically builds the user interface in the browser.",
    },
  ];

  const useCases = [
    {
      icon: <InteractionOutlined />,
      title: "User Interactions",
      description:
        "Handling events like clicks, form submissions, keyboard input.",
      color: "blue",
    },
    {
      icon: <SyncOutlined />,
      title: "Dynamic States",
      description:
        "Managing component state that changes over time (e.g., `useState`, `useReducer`).",
      color: "green",
    },
    {
      icon: <GlobalOutlined />,
      title: "Browser APIs",
      description:
        "Accessing `window`, `document`, `localStorage`, `fetch`, etc.",
      color: "purple",
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2}>{"React Client Components"}</Title>

      <Card style={{ marginBottom: 20 }}>
        <CardHeader>
          <CardTitle>{"Main Ideas to Convey"}</CardTitle>
        </CardHeader>
        <CardContent>
          <List
            dataSource={mainIdeas}
            renderItem={(item) => (
              <List.Item>
                <CheckCircleOutlined
                  style={{ color: "green", marginRight: 8 }}
                />{" "}
                {item}
              </List.Item>
            )}
          />
        </CardContent>
      </Card>

      <Card style={{ marginBottom: 20 }}>
        <CardHeader>
          <CardTitle>
            {"Visual Idea: Client-Side Rendering (CSR) Flow"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Timeline mode="left">
            {csrFlowSteps.map((step, index) => (
              <Timeline.Item key={index} label={step.title} dot={step.icon}>
                <Text type="secondary">{step.description}</Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: 20 }}>
        <CardHeader>
          <CardTitle>
            {"Visual Idea: Use Cases for Client Components"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Row gutter={[16, 16]}>
            {useCases.map((useCase, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card hoverable>
                  <CardContent>
                    <Card.Meta
                      avatar={React.cloneElement(useCase.icon, {
                        style: { fontSize: "24px", color: useCase.color },
                      })}
                      title={useCase.title}
                      description={useCase.description}
                    />
                  </CardContent>
                </Card>
              </Col>
            ))}
          </Row>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: 20 }}>
        <CardHeader>
          <CardTitle>{"Content Summary"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Paragraph>
            {
              "In React, components are rendered on the client by default. When a"
            }
            {"user visits a React application, the server sends a bundle of"}
            {
              "JavaScript code to the browser. This code is then executed in the"
            }
            {"user"}&apos;
            {"s browser, where React takes over to mount components and"}
            {"render the user interface dynamically."}
          </Paragraph>
          <Paragraph>
            {"This approach is known as"}{" "}
            <Text strong>{"Client-Side Rendering (CSR)"}</Text>
            {". It means:"}
          </Paragraph>
          <List>
            <List.Item>
              {"The initial HTML page is mostly empty or minimal."}
            </List.Item>
            <List.Item>
              {
                "The UI is built and displayed after the JavaScript loads and React"
              }
              {"initializes."}
            </List.Item>
            <List.Item>
              {"Any dynamic interaction (like clicking buttons, fetching data,"}
              {"updating UI) is handled on the client."}
            </List.Item>
          </List>
          <Paragraph style={{ marginTop: 16 }}>
            {"Use Client Components when you need"}{" "}
            <Tag color="blue">{"user interactions"}</Tag>
            {","} <Tag color="green">{"dynamic states"}</Tag>
            {", or access to"} <Tag color="purple">{"browser APIs"}</Tag>
            {"."}
          </Paragraph>
        </CardContent>
      </Card>

      <Alert variant="default" style={{ marginTop: 20 }}>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>{"Further Learning:"}</strong>{" "}
          {"For more detailed information on"}
          {
            "React Client Components, especially in the context of Next.js, visit"
          }
          {"the official"}
          <a
            href="https://nextjs.org/docs/getting-started/react-essentials#client-components"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "4px" }}
          >
            {"Next.js Client Components Documentation"}
          </a>
          {"."}
        </AlertDescription>
      </Alert>
    </div>
  );
}
