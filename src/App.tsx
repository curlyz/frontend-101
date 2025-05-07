import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Typography } from "antd";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Typography.Title level={1}>Vite + React</Typography.Title>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Typography.Paragraph>
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography.Paragraph>
      </div>
      <Typography.Paragraph className="read-the-docs">
        Click on the Vite and React logos to learn more
      </Typography.Paragraph>
    </>
  );
}

export default App;
