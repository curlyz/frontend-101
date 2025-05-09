import React, { useEffect } from "react";
import {
  Typography,
  Card,
  List,
  Row,
  Col,
  Steps,
  Tag,
  Alert,
  Space,
  Image,
  Table,
} from "antd";
import {
  DesktopOutlined, // General desktop app
  CodeOutlined, // Code related
  NodeIndexOutlined, // Processes/connections
  SafetyCertificateOutlined, // Security
  RocketOutlined, // Popular apps / launching
  CheckCircleOutlined,
  AppstoreOutlined, // Generic app icon
  InteractionOutlined, // IPC
  SplitCellsOutlined, // Main/Renderer split
} from "@ant-design/icons";
import mermaid from "mermaid";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

// Consider adding an Electron logo if available and appropriate
// const electronLogoUrl = "URL_TO_ELECTRON_LOGO";

const codeBlockStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  padding: "10px",
  whiteSpace: "pre",
  overflow: "auto",
  maxHeight: "300px",
};

const smallCodeBlockStyle: React.CSSProperties = {
  ...codeBlockStyle,
  fontSize: "0.8em",
  maxHeight: "200px",
  margin: "8px 0",
};

/**
 * @function ElectronSlide
 * @description A React functional component explaining Electron for building cross-platform desktop apps
 * with web technologies. It covers core concepts, architecture, IPC, security, and examples.
 * @returns {React.ReactElement} The ElectronSlide component.
 * @example
 * <ElectronSlide />
 */
const ElectronSlide: React.FC = () => {
  const mainIdeas = [
    "Electron: Build cross-platform desktop apps with HTML, CSS, and JavaScript.",
    "Core Components: Chromium for UI rendering, Node.js for backend/system access.",
    "Architecture: Main process (Node.js) manages application windows (Renderer processes).",
    "Communication: Inter-Process Communication (IPC) for secure data exchange between processes.",
  ];

  // Placeholder for process architecture diagram
  const processArchitectureDiagram = `
graph TD
    A["Electron Application"] --> MP["Main Process (Node.js)<br>Manages app lifecycle, windows<br>Access to Node.js APIs & OS"]
    MP --> R1["Renderer Process 1 (Chromium)<br>BrowserWindow 1 - UI<br>Isolated, runs web page"]
    MP --> R2["Renderer Process 2 (Chromium)<br>BrowserWindow 2 - UI<br>Isolated, runs another web page"]
    R1 -.->|IPC ipcRenderer| MP
    R2 -.->|IPC ipcRenderer| MP
    MP -.->|IPC webContents.send| R1
    MP -.->|IPC webContents.send| R2

    subgraph Preload1 ["Preload Script for Renderer 1"]
      direction LR
      P1["preload1.js<br>Access to Node.js in controlled way<br>Exposes APIs via contextBridge"]
    end
    subgraph Preload2 ["Preload Script for Renderer 2"]
      direction LR
      P2["preload2.js<br>Access to Node.js in controlled way<br>Exposes APIs via contextBridge"]
    end
    R1 --> P1
    R2 --> P2
    
    classDef main fill:#D6EAF8,stroke:#2E86C1,stroke-width:2px,color:#000;
    classDef renderer fill:#D1F2EB,stroke:#1ABC9C,stroke-width:2px,color:#000;
    classDef ipc fill:#FADBD8,stroke:#E74C3C,stroke-width:1px,color:#000,stroke-dasharray: 5 5;
    classDef preload fill:#FCF3CF,stroke:#F1C40F,stroke-width:1px,color:#000;

    class MP main;
    class R1 renderer;
    class R2 renderer;
    class P1 preload;
    class P2 preload;
`;

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error in ElectronSlide:", e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const popularElectronApps = [
    { name: "Visual Studio Code", by: "Microsoft", icon: <CodeOutlined /> },
    { name: "Slack", by: "Salesforce", icon: <AppstoreOutlined /> },
    { name: "Discord", by: "Discord Inc.", icon: <AppstoreOutlined /> },
    { name: "GitHub Desktop", by: "GitHub", icon: <AppstoreOutlined /> },
    { name: "Microsoft Teams", by: "Microsoft", icon: <AppstoreOutlined /> },
    { name: "WhatsApp Desktop", by: "Meta", icon: <AppstoreOutlined /> },
    { name: "Twitch Desktop App", by: "Amazon", icon: <AppstoreOutlined /> },
    { name: "Figma (Desktop)", by: "Figma", icon: <AppstoreOutlined /> },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2}>
        <DesktopOutlined /> Building Desktop Apps with Electron
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }} align="middle">
        <Col xs={24} md={24}>
          <Card title="Key Concepts">
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
          </Card>
        </Col>
      </Row>

      {/* Section 1: What is Electron? */}
      <Card
        title={
          <Space>
            <RocketOutlined /> What is Electron?
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        <Paragraph>
          Electron is an open-source framework created and maintained by GitHub
          for building cross-platform desktop applications using web
          technologies: HTML, CSS, and JavaScript. It essentially allows you to
          take your web frontend and package it as a native desktop application
          that can run on Windows, macOS, and Linux.
        </Paragraph>
        <Paragraph>
          Under the hood, Electron combines <Text strong>Chromium</Text> (the
          open-source browser engine behind Google Chrome) for rendering the
          user interface, and <Text strong>Node.js</Text> for providing access
          to the underlying file system, operating system APIs, and a rich set
          of backend functionalities. This means you can leverage the vast
          ecosystem of npm packages both for frontend UI and backend logic
          within the same application.
        </Paragraph>
        <Alert
          message="Core Idea: Web Tech for Desktop"
          description="Leverage your existing web development skills and codebase to create powerful desktop applications."
          type="info"
          showIcon
          style={{ marginTop: 15 }}
        />
      </Card>

      {/* Section 2: Main and Renderer Processes */}
      <Card
        title={
          <Space>
            <SplitCellsOutlined /> Main and Renderer Processes
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        <Paragraph>
          Electron applications have a multi-process architecture, primarily
          consisting of one <Text strong>Main Process</Text> and one or more{" "}
          <Text strong>Renderer Processes</Text>.
        </Paragraph>

        <Title level={5} style={{ marginTop: "20px", marginBottom: "10px" }}>
          Example: Basic <Text code>main.js</Text> Structure
        </Title>
        <SyntaxHighlighter
          language="javascript"
          style={atomDark}
          customStyle={codeBlockStyle}
        >
          {`const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Use a preload script
      contextIsolation: true, // Protect against prototype pollution
      nodeIntegration: false, // Keep Node.js integration off in renderer
      // enableRemoteModule: false, // Deprecated: ensure it's off
    }
  });

  mainWindow.loadFile('index.html'); // Or load a URL: mainWindow.loadURL('http://localhost:3000');

  // mainWindow.webContents.openDevTools(); // Optional: Open DevTools
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('dialog:openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (canceled) {
      return;
    }
    return filePaths[0];
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
`}
        </SyntaxHighlighter>

        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col xs={24} md={12}>
            <Title level={4}>Main Process</Title>
            <List size="small">
              <List.Item>
                Acts as the application's entry point (e.g., your{" "}
                <Text code>main.js</Text> or <Text code>index.js</Text>).
              </List.Item>
              <List.Item>Runs a full Node.js environment.</List.Item>
              <List.Item>
                Responsible for creating and managing application windows
                (BrowserWindow instances), which host renderer processes.
                <Paragraph style={{ marginTop: "8px" }}>
                  <Text strong>Example:</Text> Creating a new window
                </Paragraph>
                <SyntaxHighlighter
                  language="javascript"
                  style={atomDark}
                  customStyle={smallCodeBlockStyle}
                >
                  {`// In Main Process (main.js)
const { BrowserWindow } = require('electron');
const path = require('path');

const newWindow = new BrowserWindow({
  width: 800, height: 600,
  webPreferences: {
    preload: path.join(__dirname, 'specific-preload.js'), 
    contextIsolation: true,
    nodeIntegration: false,
    // sandbox: true // Consider for untrusted content
  }
});
newWindow.loadFile('another-page.html');`}
                </SyntaxHighlighter>
              </List.Item>
              <List.Item>
                Controls the application lifecycle (e.g., quitting, OS
                integrations).
              </List.Item>
              <List.Item>
                Can perform privileged operations like accessing the file
                system, network, and native OS APIs directly.
              </List.Item>
              <List.Item>
                There is only <Text strong>one</Text> main process in an
                Electron app.
              </List.Item>
              <List.Item>
                Communicates with the Main process via Inter-Process
                Communication (IPC) to request privileged operations.
                <Paragraph style={{ marginTop: "8px" }}>
                  <Text strong>Example:</Text> Using exposed API from preload
                </Paragraph>
                <SyntaxHighlighter
                  language="javascript"
                  style={atomDark}
                  customStyle={smallCodeBlockStyle}
                >
                  {`// In Preload Script (preload.js) 
// (See contextBridge example in Security Table below)

// In Renderer Process (e.g., your app's frontend script.js)
async function handleOpenFileClick() {
  try {
    const filePath = await window.myCustomAPI.openDialog();
    if (filePath) {
      console.log('Selected file:', filePath);
      // Further processing with the file path
    }
  } catch (error) {
    console.error('Error opening file dialog:', error);
  }
}

// Assuming you have a button with id="open-file-btn"
document.getElementById('open-file-btn').addEventListener('click', handleOpenFileClick);`}
                </SyntaxHighlighter>
              </List.Item>
            </List>
          </Col>
          <Col xs={24} md={12}>
            <Title level={4}>Renderer Process</Title>
            <List size="small">
              <List.Item>
                Each web page (BrowserWindow instance) runs in its own renderer
                process.
              </List.Item>
              <List.Item>
                Responsible for rendering HTML, CSS, and executing JavaScript
                for the UI of a specific window.
              </List.Item>
              <List.Item>
                Runs in a Chromium environment, similar to a browser tab.
              </List.Item>
              <List.Item>
                <Text strong>Cannot</Text> directly access Node.js APIs or
                native OS features for security reasons (unless Node integration
                is explicitly, and often unsafely, enabled).
              </List.Item>
              <List.Item>
                Communicates with the Main process via Inter-Process
                Communication (IPC) to request privileged operations.
              </List.Item>
              <List.Item>
                An app can have <Text strong>multiple</Text> renderer processes.
              </List.Item>
            </List>
          </Col>
        </Row>
        <div
          className="mermaid"
          style={{
            textAlign: "center",
            padding: "10px",
            border: "1px solid #f0f0f0",
            borderRadius: "4px",
            marginTop: 16,
            background: "#fff", // Ensure background for visibility in dark mode
          }}
        >
          {processArchitectureDiagram}
        </div>
        <Paragraph
          style={{
            marginTop: "16px",
            fontSize: "0.9em",
            textAlign: "center",
            color: "gray",
          }}
        >
          Diagram: Electron's multi-process architecture with Main and Renderer
          processes interacting via IPC.
        </Paragraph>
      </Card>

      {/* Section 3: IPC and Security Features */}
      <Card
        title={
          <Space>
            <InteractionOutlined /> IPC and Security
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        <Title level={4}>Inter-Process Communication (IPC)</Title>
        <Paragraph>
          Since the Main and Renderer processes have different responsibilities
          and privileges, Electron provides Inter-Process Communication (IPC)
          mechanisms for them to communicate securely. Key methods include:
        </Paragraph>
        <Table
          dataSource={[
            {
              key: "1",
              method: <Text code>ipcMain.on(channel, listener)</Text>,
              process: "Main",
              description:
                "Listens for asynchronous messages on a channel. The listener receives an event object and arguments.",
              example:
                "// Main Process (main.js)\nipcBMain.on('asynchronous-message', (event, arg) => {\n  console.log(arg); // prints 'ping'\n  event.reply('asynchronous-reply', 'pong');\n});",
            },
            {
              key: "2",
              method: <Text code>ipcMain.handle(channel, listener)</Text>,
              process: "Main",
              description:
                "Handles an asynchronous, invoke/handle-style IPC message. The listener must return a Promise or a value.",
              example:
                "// Main Process (main.js)\nipcBMain.handle('invoke-action', async (event, arg) => {\n  const result = await someAsyncOperation(arg);\n  return result;\n});",
            },
            {
              key: "3",
              method: <Text code>ipcRenderer.send(channel, ...args)</Text>,
              process: "Renderer (Preload)",
              description:
                "Sends an asynchronous message to the main process via channel, along with arguments.",
              example:
                "// Preload Script (preload.js)\nipcbRenderer.send('asynchronous-message', 'ping');",
            },
            {
              key: "4",
              method: <Text code>ipcRenderer.invoke(channel, ...args)</Text>,
              process: "Renderer (Preload)",
              description:
                "Sends an invoke/handle-style message to the main process and returns a Promise that resolves with the response.",
              example:
                "// Preload Script (preload.js)\nasync function doAction() {\n  const result = await ipcbRenderer.invoke('invoke-action', 'data');\n  console.log(result);\n}",
            },
            {
              key: "5",
              method: <Text code>event.reply(channel, ...args)</Text>,
              process: "Main (in ipcMain.on)",
              description:
                "Sends a message back to the renderer that sent the original message in an ipcMain.on listener.",
              example:
                "// Main Process (main.js) within ipcBMain.on listener\nevent.reply('asynchronous-reply', 'pong');",
            },
            {
              key: "6",
              method: (
                <Text code>
                  BrowserWindow.webContents.send(channel, ...args)
                </Text>
              ),
              process: "Main",
              description:
                "Sends an asynchronous message to a specific renderer process (BrowserWindow).",
              example:
                "// Main Process (main.js)\nmainWindow.webContents.send('some-channel', 'hello from main');",
            },
          ]}
          columns={[
            {
              title: "Method",
              dataIndex: "method",
              key: "method",
              width: "25%",
            },
            {
              title: "Process",
              dataIndex: "process",
              key: "process",
              width: "10%",
            },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
              width: "30%",
            },
            {
              title: "Example Snippet",
              dataIndex: "example",
              key: "example",
              width: "35%",
              render: (text) => (
                <SyntaxHighlighter
                  language="javascript"
                  style={atomDark}
                  customStyle={smallCodeBlockStyle}
                  wrapLongLines={true}
                >
                  {text}
                </SyntaxHighlighter>
              ),
            },
          ]}
          pagination={false}
          size="small"
          bordered
          style={{ marginBottom: "24px" }}
        />

        <Title level={4} style={{ marginTop: "20px" }}>
          <SafetyCertificateOutlined /> Security Best Practices
        </Title>
        <Paragraph>
          Security is paramount. Electron's security model has evolved; adhere
          to these key practices:
        </Paragraph>
        <Table
          dataSource={[
            {
              key: "sec1",
              practice: "Context Isolation",
              status: <Tag color="green">Enabled by Default</Tag>,
              details:
                "Ensures preload scripts and Electron's internal logic run in a separate JS context from the renderer's web content. Prevents website from directly accessing Node.js/Electron APIs. Use `contextBridge` in preload to expose APIs.",
              code: "// preload.js\nconst { contextBridge, ipcRenderer } = require('electron');\n\ncontextBridge.exposeInMainWorld('myAPI', {\n  doSomething: () => ipcRenderer.invoke('do-something'),\n  onData: (callback) => ipcRenderer.on('data-event', (_event, value) => callback(value))\n});\n\n// renderer.js (in your web page)\nasync function fetchData() {\n  const result = await window.myAPI.doSomething();\n  console.log(result);\n}\nwindow.myAPI.onData((data) => console.log('Received data:', data));",
            },
            {
              key: "sec2",
              practice: "Disable Node.js Integration in Renderers",
              status: <Tag color="green">Default: true</Tag>,
              details:
                "Set `nodeIntegration: false` (default) in `webPreferences` for all renderers. Critical to prevent remote content/scripts from gaining Node.js access.",
              code: "// Main Process (creating a window)\nconst win = new BrowserWindow({\n  webPreferences: {\n    nodeIntegration: false, // Default and recommended\n    contextIsolation: true, // Default and recommended\n    preload: path.join(__dirname, 'preload.js')\n  }\n});",
            },
            {
              key: "sec3",
              practice: "Enable Sandbox",
              status: <Tag color="orange">Consider for Untrusted Content</Tag>,
              details:
                "Set `sandbox: true` in `webPreferences` to further restrict renderer capabilities using Chromium's OS-level sandboxing. Highly recommended if loading remote/untrusted content. Note: sandboxed preload scripts have limited Node.js access.",
              code: "// Main Process\nconst win = new BrowserWindow({\n  webPreferences: {\n    sandbox: true, // Recommended for untrusted content\n    preload: path.join(__dirname, 'preload-sandboxed.js')\n  }\n});",
            },
            {
              key: "sec4",
              practice: "Preload Scripts",
              status: <Tag color="blue">Essential</Tag>,
              details:
                "Load scripts via `webPreferences.preload`. They run before web content, have access to Node.js (if `nodeIntegration: true` or `sandbox: false`), and use `contextBridge` to securely expose functionality.",
              code: "// See contextIsolation example above for preload structure.",
            },
            {
              key: "sec5",
              practice: "Content Security Policy (CSP)",
              status: <Tag color="blue">Implement</Tag>,
              details:
                "Use `session.defaultSession.webRequest.onHeadersReceived` to set a strong CSP. Restricts resource loading (scripts, styles) to mitigate XSS.",
              code: "// Main Process\nsession.defaultSession.webRequest.onHeadersReceived((details, callback) => {\n  callback({\n    responseHeaders: {\n      ...details.responseHeaders,\n      'Content-Security-Policy': [ \"default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://api.example.com\" ]\n    }\n  });\n});",
            },
            {
              key: "sec6",
              practice: "Validate IPC Messages",
              status: <Tag color="red">Critical</Tag>,
              details:
                "Always validate and sanitize data from IPC in the main process, especially if used for file paths, shell commands, or sensitive operations.",
              code: "// Main Process (ipcMain.handle example)\nipcBMain.handle('save-file', (event, data) => {\n  if (!isValidFilePath(data.path) || !isSafeContent(data.content)) {\n    throw new Error('Invalid data received');\n  }\n  // proceed to save file\n});",
            },
            {
              key: "sec7",
              practice: "Avoid `remote` Module",
              status: <Tag color="red">Deprecated & Insecure</Tag>,
              details:
                "Do not use the `@electron/remote` module (formerly `remote`). It has significant security risks. Use IPC for all main-renderer communication.",
              code: "// DON'T DO THIS\n// const { BrowserWindow } = require('@electron/remote');",
            },
            {
              key: "sec8",
              practice: "Control `shell.openExternal`",
              status: <Tag color="orange">Review Usage</Tag>,
              details:
                "By default, any URL can be opened. Override `webContents.setWindowOpenHandler` to control what `window.open` or links with `target='_blank'` can do. For opening external links in the default browser, prefer to use IPC to ask the main process to call `shell.openExternal` after validating the URL.",
              code: "// Main Process (in setWindowOpenHandler or IPC handler)\nconst { shell } = require('electron');\nif (isValidAndSafeUrl(urlToOpen)) {\n  shell.openExternal(urlToOpen);\n} else {\n  // Deny or log\n}",
            },
          ]}
          columns={[
            {
              title: "Practice",
              dataIndex: "practice",
              key: "practice",
              width: "20%",
            },
            {
              title: "Status/Recommendation",
              dataIndex: "status",
              key: "status",
              width: "20%",
            },
            {
              title: "Details",
              dataIndex: "details",
              key: "details",
              width: "30%",
            },
            {
              title: "Code Snippet / Note",
              dataIndex: "code",
              key: "code",
              width: "30%",
              render: (text) =>
                text && text.startsWith("//") ? (
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomDark}
                    customStyle={smallCodeBlockStyle}
                    wrapLongLines={true}
                  >
                    {text}
                  </SyntaxHighlighter>
                ) : (
                  <Text>{text}</Text> // For short notes like "See contextIsolation example"
                ),
            },
          ]}
          pagination={false}
          size="small"
          bordered
          style={{ marginBottom: "16px" }}
        />
        <Alert
          message="Prioritize Security"
          description="Always follow Electron's latest security recommendations. Defaults are generally secure, but be mindful when changing webPreferences."
          type="warning"
          showIcon
          style={{ marginTop: 15 }}
        />
      </Card>

      {/* Section 4: Popular Apps Using Electron */}
      <Card
        title={
          <Space>
            <AppstoreOutlined /> Popular Apps Built with Electron
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        <Paragraph>
          Electron powers a wide range of popular desktop applications,
          demonstrating its capability and versatility:
        </Paragraph>
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          {popularElectronApps.map((app) => (
            <Col xs={24} sm={12} md={8} lg={6} key={app.name}>
              <Card
                size="small"
                title={
                  <Space>
                    {React.cloneElement(app.icon || <AppstoreOutlined />, {
                      style: { fontSize: "18px" },
                    })}{" "}
                    {app.name}
                  </Space>
                }
                headStyle={{ fontSize: "0.95em" }} // Lighter head for better contrast
                bodyStyle={{ fontSize: "0.9em" }}
                hoverable
              >
                <Text type="secondary">By: {app.by}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Alert
        message="Further Learning"
        description={
          <Paragraph>
            For more detailed information, best practices, and API references,
            visit the official
            <a
              href="https://www.electronjs.org/docs/latest"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Electron Documentation
            </a>
            .
          </Paragraph>
        }
        type="success"
        showIcon
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default ElectronSlide;
