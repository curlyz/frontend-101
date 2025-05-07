import React from "react";
import { Typography, Table, Tag, List } from "antd";
import type { TableProps } from "antd";

const { Title, Paragraph, Text } = Typography;

interface PackageManagerInfo {
  key: string;
  name: string;
  nameOnly: string;
  keyFeatures: string[];
  idealFor: string;
  color: string;
  pros: string[];
  cons: string[];
  dependencyStorage: {
    model: string;
    visualization: string;
  };
}

const packageManagersData: Omit<PackageManagerInfo, "key" | "nameOnly">[] = [
  {
    name: "npm (Node Package Manager)",
    keyFeatures: [
      "Default for Node.js, bundled with Node.js installs.",
      "Largest package registry (npm Public Registry).",
      "Mature, widely adopted, and extensive community support.",
      "Supports `npx` for running packages without global installation.",
      "Introduced `package-lock.json` for deterministic installs.",
    ],
    idealFor:
      "General use, projects needing wide compatibility, and where familiarity is key.",
    color: "red",
    pros: [
      "Ubiquitous, vast ecosystem.",
      "Simple and familiar workflow.",
      "Good tooling support.",
    ],
    cons: [
      "Historically slower installs.",
      "Can lead to larger `node_modules` / disk usage due to some duplication.",
    ],
    dependencyStorage: {
      model: "Hoisted `node_modules`",
      visualization:
        "Tree-like `node_modules`. Shared deps at top, potential duplicates deeper. Think classic file folders.",
    },
  },
  {
    name: "Yarn (Classic & Berry)",
    keyFeatures: [
      "Developed by Facebook, focused on speed, security, and reliability.",
      "Introduced `yarn.lock` for deterministic installs, often faster than early npm.",
      "Offline mode (caching previously downloaded packages).",
      "Workspaces for monorepo management (built-in).",
      "Yarn Berry (v2+) introduced Plug'n'Play (PnP) to eliminate `node_modules` and improve performance.",
    ],
    idealFor:
      "Projects requiring strong monorepo support, deterministic installs, and improved performance over older npm versions. Yarn Berry is good for modern projects valuing innovative dependency management.",
    color: "blue",
    pros: [
      "Fast (especially Berry PnP).",
      "Strong monorepo support (Workspaces).",
      "PnP offers efficient installs and stricter dependency resolution.",
    ],
    cons: [
      "PnP can have compatibility issues with tools expecting traditional `node_modules`.",
      "Yarn Berry has a steeper learning curve than Classic.",
    ],
    dependencyStorage: {
      model: "Classic: Hoisted `node_modules`. Berry: Plug'n'Play (PnP)",
      visualization:
        "PnP: No `node_modules`! Code maps to cached zip files. Imagine a virtual lookup table, not physical folders.",
    },
  },
  {
    name: "pnpm (Performant npm)",
    keyFeatures: [
      "Focuses on speed and disk space efficiency.",
      "Uses a content-addressable store and symlinks/hardlinks to avoid duplicating packages across projects.",
      "Strict by default, preventing access to undeclared dependencies (helps avoid phantom dependencies).",
      "Excellent monorepo support.",
      "Generally faster installation times than npm and Yarn Classic.",
    ],
    idealFor:
      "Large-scale projects, monorepos, and developers prioritizing disk space efficiency and fast, strict dependency management.",
    color: "gold",
    pros: [
      "Very fast installations.",
      "Highly disk space efficient (no duplication).",
      "Strict dependency resolution helps avoid bugs.",
    ],
    cons: [
      "Non-standard `node_modules` layout (symlinks) can confuse some older tools (rarely now).",
      "Slightly different workflow to learn.",
    ],
    dependencyStorage: {
      model: "Symlinked Global Store",
      visualization:
        "`node_modules` has symlinks (shortcuts) pointing to a single global package store. No copies!",
    },
  },
  {
    name: "Bun",
    keyFeatures: [
      "An all-in-one JavaScript toolkit: runtime, bundler, test runner, and package manager.",
      "Built in Zig for extreme performance.",
      "Aims for significantly faster installation and script execution times.",
      "NPM-compatible package manager (can use `package.json` and install from npm registry).",
      "Built-in support for TypeScript and JSX.",
    ],
    idealFor:
      "Developers seeking cutting-edge performance, an integrated toolchain, and projects where speed is paramount. Still relatively new, so best for projects where stability is less critical than performance.",
    color: "green",
    pros: [
      "Extremely fast, often outperforming others.",
      "Integrated toolkit simplifies development setup.",
      "Modern, with built-in TS/JSX support.",
    ],
    cons: [
      "Relatively new, less battle-tested for large-scale production.",
      "Smaller ecosystem and community compared to npm/Yarn.",
      "Windows support was initially limited/experimental.",
    ],
    dependencyStorage: {
      model: "Optimized (likely symlinks/shared store)",
      visualization:
        "Fast and efficient, like pnpm. Aims to reduce `node_modules` overhead drastically.",
    },
  },
];

const dataSource: PackageManagerInfo[] = packageManagersData.map(
  (pm, index) => ({
    ...pm,
    key: index.toString(),
    nameOnly: pm.name.split(" ")[0],
  }),
);

const columns: TableProps<PackageManagerInfo>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <Text strong>
        <Tag color={record.color} style={{ marginRight: 8 }}>
          {record.nameOnly}
        </Tag>
        {text}
      </Text>
    ),
    fixed: "left",
    width: 250,
  },
  {
    title: "Key Features",
    dataIndex: "keyFeatures",
    key: "keyFeatures",
    render: (features: string[]) => (
      <List
        size="small"
        dataSource={features}
        renderItem={(item) => (
          <List.Item style={{ padding: "2px 0" }}>{item}</List.Item>
        )}
      />
    ),
    width: 300,
  },
  {
    title: "Dependency Model",
    dataIndex: "dependencyStorage",
    key: "dependencyStorage",
    render: (storage: PackageManagerInfo["dependencyStorage"]) => (
      <>
        <Text strong>{storage.model}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: "0.9em" }}>
          {storage.visualization}
        </Text>
      </>
    ),
    width: 250,
  },
  {
    title: "Pros",
    dataIndex: "pros",
    key: "pros",
    render: (pros: string[]) => (
      <List
        size="small"
        dataSource={pros}
        renderItem={(item) => (
          <List.Item style={{ padding: "2px 0" }}>{item}</List.Item>
        )}
      />
    ),
    width: 250,
  },
  {
    title: "Cons",
    dataIndex: "cons",
    key: "cons",
    render: (cons: string[]) => (
      <List
        size="small"
        dataSource={cons}
        renderItem={(item) => (
          <List.Item style={{ padding: "2px 0" }}>{item}</List.Item>
        )}
      />
    ),
    width: 250,
  },
  {
    title: "Ideal For",
    dataIndex: "idealFor",
    key: "idealFor",
    width: 250,
  },
];

/**
 * @function PackageManagerSlide
 * @description A slide component discussing popular JavaScript package managers in a table view.
 * @returns {JSX.Element} The PackageManagerSlide component.
 */
const PackageManagerSlide: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Popular JavaScript Package Managers Comparison
      </Title>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        scroll={{ x: 1500 }}
        size="small"
      />
      <Paragraph
        style={{
          marginTop: 30,
          textAlign: "center",
          fontSize: "0.9em",
          color: "#888",
        }}
      >
        The choice of package manager often depends on project requirements,
        team familiarity, performance needs, and specific features like monorepo
        support or disk space efficiency.
      </Paragraph>
    </div>
  );
};

export default PackageManagerSlide;
