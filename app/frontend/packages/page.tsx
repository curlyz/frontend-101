"use client";

import React, { useEffect } from "react";
import { Tag } from "antd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CodeSandboxOutlined,
  CloudDownloadOutlined,
  SyncOutlined,
  TagOutlined,
  ApartmentOutlined,
  PlaySquareOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import mermaid from "mermaid";

import { Title, Text, Paragraph } from "@/components/ui/typography";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

/**
 * @function PkgMgtOverviewSlide
 * @description A React functional component that provides an overview of package management in software development,
 * particularly in the context of React projects. It covers the definition, importance, automated tasks, and common
 * package managers like npm and Yarn.
 * @returns {React.ReactElement} The PkgMgtOverviewSlide component.
 * @example
 * <PkgMgtOverviewSlide />
 */
export default function Page() {
  const mainIdeas = [
    "Package management handles project dependencies (libraries, tools, frameworks).",
    "It's crucial in React projects due to the ecosystem of third-party packages.",
    "Automates tasks: installing, updating, versioning, resolving dependencies, running scripts.",
    "npm and Yarn are typical package managers for React.",
  ];

  const managerTasks = [
    { icon: <CloudDownloadOutlined />, text: "Installing packages" },
    { icon: <SyncOutlined />, text: "Updating packages" },
    { icon: <TagOutlined />, text: "Managing versioning (e.g., v1.2.3)" },
    { icon: <ApartmentOutlined />, text: "Resolving dependencies" },
    { icon: <PlaySquareOutlined />, text: "Running scripts (build, test)" },
  ];

  const dependencyWebDiagram = `
graph TD
    MyProject["My Project"]
    React["React (Package)"]
    Lodash["Lodash (Package)"]
    Axios["Axios (Package)"]
    ESLint["ESLint (Dev Package)"]

    MyProject --> React
    MyProject --> Lodash
    MyProject --> Axios
    MyProject --> ESLint

    React --> PropTypes["prop-types (Sub-dependency)"]
    React --> LooseEnvify["loose-envify (Sub-dependency)"]
    Axios --> FollowRedirects["follow-redirects (Sub-dependency)"]

    classDef project fill:#D6EAF8,stroke:#2E86C1,stroke-width:2px;
    classDef package fill:#D1F2EB,stroke:#1ABC9C,stroke-width:2px;
    classDef devPackage fill:#FCF3CF,stroke:#F1C40F,stroke-width:2px;
    classDef subDependency fill:#FDEDEC,stroke:#E74C3C,stroke-width:1px,color:#333;

    class MyProject project;
    class React,Lodash,Axios package;
    class ESLint devPackage;
    class PropTypes,LooseEnvify,FollowRedirects subDependency;
  `;

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2}>{"Package Management - Overview"}</Title>

      <Card style={{ marginBottom: 20 }}>
        <CardHeader>
          <CardTitle>{"Main Ideas to Convey"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mainIdeas.map((item, index) => (
              <div key={index} className="flex items-start gap-2 py-2">
                <CheckCircleOutlined
                  style={{ color: "green", marginRight: 8 }}
                />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>{"Visual Idea: Dependency Web"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Paragraph>
                {"A package manager helps manage a project"}&apos;{"s direct"}
                {"dependencies (like React, Lodash) and also their"}
                {"sub-dependencies, forming a complex web."}
              </Paragraph>
              <div
                className="mermaid"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "4px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  background: "#fff",
                }}
              >
                {dependencyWebDiagram}
              </div>
              <Text type="secondary">
                {"This diagram illustrates how a project relies on various"}
                {"packages, which in turn may rely on other packages."}
              </Text>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <CardTitle>{"Tasks Automated by a Package Manager"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {managerTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-2 py-2">
                    {React.cloneElement(task.icon, {
                      style: { color: "#1890ff" },
                    })}
                    {task.text}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{"Content Summary"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Paragraph>
            {
              "Package management is the backbone of modern software development,"
            }
            {"handling all the "}
            <Text strong>{"dependencies"}</Text> {"a project relies"}
            {"on—external libraries, tools, and frameworks."}
          </Paragraph>
          <Paragraph>
            {"These dependencies can range from small utility functions and UI"}
            {"components to comprehensive development tools (like linters and"}
            {"bundlers) or even entire application frameworks."}
          </Paragraph>
          <Paragraph>
            {"In React projects, effective package management is especially"}
            {"crucial. Developers leverage a vast ecosystem of third-party"}
            {"packages to accelerate development, add powerful features, and"}
            {"integrate essential tools."}
          </Paragraph>
          <Paragraph>
            {
              "A package manager automates the critical tasks involved in handling"
            }
            {"these dependencies (as listed in the card above), making the"}
            {
              "development process smoother, more reliable, and reproducible across"
            }
            {"different environments."}
          </Paragraph>
          <Paragraph>
            {
              "The two most prevalent package managers in the JavaScript and React"
            }
            {"ecosystem are"}{" "}
            <Tag color="red" icon={<CodeSandboxOutlined />}>
              {"npm"}
            </Tag>{" "}
            {"(Node Package Manager), which comes bundled with Node.js, and"}{" "}
            <Tag color="geekblue" icon={<CodeSandboxOutlined />}>
              {"Yarn"}
            </Tag>
            {", developed by Facebook (now Meta)."}
          </Paragraph>
        </CardContent>
      </Card>

      <Alert variant="default" style={{ marginTop: 20 }}>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>{"Further Learning:"}</strong>{" "}
          {"For more detailed information, best"}
          {"practices, and API references, visit the official"}
          <a
            href="https://docs.npmjs.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "4px" }}
          >
            {"npm documentation"}
          </a>
          {" and the "}
          <a
            href="https://yarnpkg.com/getting-started"
            target="_blank"
            rel="noopener noreferrer"
          >
            {"Yarn documentation"}
          </a>
          {"."}
        </AlertDescription>
      </Alert>
    </div>
  );
}
