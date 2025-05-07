import React from "react";
import { Typography, Card, List, Tag, Alert, Steps } from "antd";
import {
  CodeOutlined,
  SettingOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const codeBlockStyle: React.CSSProperties = {
  backgroundColor: "#f0f2f5",
  padding: "10px",
  borderRadius: "4px",
  overflowX: "auto",
  fontFamily: "monospace",
  fontSize: "0.9em",
  whiteSpace: "pre-wrap",
  marginBottom: "16px",
};

const ReduxConceptsSlide: React.FC = () => {
  const steps = [
    {
      title: "Define a Slice",
      icon: <SettingOutlined />,
      content: (
        <>
          <Paragraph>
            Create a slice with a name, initial state, and reducers using Redux
            Toolkit's <Tag>createSlice</Tag>.
          </Paragraph>
          <pre style={codeBlockStyle}>{`// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "themeInfo",
  initialState: { theme: "light" },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload.newTheme;
    }
  }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;`}</pre>
        </>
      ),
    },
    {
      title: "Create Store & Provider",
      icon: <ToolOutlined />,
      content: (
        <>
          <Paragraph>
            Configure the store using <Tag>configureStore</Tag> from Redux
            Toolkit, combining your reducers. Then, provide this store to your
            application using the <Tag>Provider</Tag> component from{" "}
            <Tag>react-redux</Tag>.
          </Paragraph>
          <Title level={5} style={{ marginTop: "16px" }}>
            store.js
          </Title>
          <pre
            style={codeBlockStyle}
          >{`import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    themeInfo: themeReducer,
    // other reducers can be added here
  }
});`}</pre>
          <Title level={5} style={{ marginTop: "16px" }}>
            ReduxThemeProvider.jsx (Optional)
          </Title>
          <pre
            style={codeBlockStyle}
          >{`// This component is optional if you provide the store directly
import React from 'react';
import { Provider } from "react-redux";
import { store } from './store';

export function ReduxThemeProvider({ children }) {
  return (
     <Provider store={store}>
       {children}
     </Provider>
  );
}`}</pre>
        </>
      ),
    },
    {
      title: "Use in Component",
      icon: <UserOutlined />,
      content: (
        <>
          <Paragraph>
            Access state with <Tag>useSelector</Tag> and dispatch actions with{" "}
            <Tag>useDispatch</Tag> from <Tag>react-redux</Tag> in your
            components.
          </Paragraph>
          <Title level={5} style={{ marginTop: "16px" }}>
            ThemeToggleRedux.jsx
          </Title>
          <pre style={codeBlockStyle}>{`import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "./themeSlice"; // Action creator

function ThemeToggleRedux() {
  const theme = useSelector((state) => state.themeInfo.theme);
  const dispatch = useDispatch();

  const toggleThemeHandler = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme({ newTheme }));
  };

  return (
    <div style={{ padding: '20px', /* ... other styles */ }}>
      <p>Current theme (Redux): {theme}</p>
      <button onClick={toggleThemeHandler}>Toggle Theme (Redux)</button>
    </div>
  );
}
export default ThemeToggleRedux;`}</pre>
          <Title level={5} style={{ marginTop: "16px" }}>
            App.jsx (Usage Example)
          </Title>
          <pre style={codeBlockStyle}>{`import React from "react";
import { ReduxThemeProvider } from "./ReduxThemeProvider";
import ThemeToggleRedux from "./ThemeToggleRedux";

export default function App() {
  return (
    <ReduxThemeProvider>
      <h2>Redux Toolkit Example</h2>
      <ThemeToggleRedux />
    </ReduxThemeProvider>
  );
}`}</pre>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        <CodeOutlined /> React State Management - Redux
      </Title>

      <Card style={{ marginBottom: "24px" }}>
        <Title level={4}>Core Idea</Title>
        <Paragraph>
          Redux is a robust library for managing application state with a
          centralized store and predictable updates via actions. It ensures that
          state updates predictably. The general flow is: UI Event →{" "}
          <Tag>dispatch(action)</Tag> → Store → Reducer updates state → UI
          re-renders.
        </Paragraph>
        <Alert
          message="Visual Idea: Redux Unidirectional Data Flow"
          description="Imagine a diagram showing: UI Event → dispatch(action) → Store → Reducer (returns New State) → Store updates → UI re-renders via useSelector."
          type="info"
          showIcon
          style={{ marginBottom: "16px" }}
        />
      </Card>

      <Title level={3} style={{ marginBottom: "20px" }}>
        Step-by-Step with Redux Toolkit
      </Title>
      <Steps direction="vertical" current={-1} /* No active step initially */>
        {steps.map((item) => (
          <Steps.Step
            key={item.title}
            title={item.title}
            description={item.content}
            icon={item.icon}
          />
        ))}
      </Steps>
    </div>
  );
};

export default ReduxConceptsSlide;
