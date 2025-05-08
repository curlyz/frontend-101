import React from "react";
import {
  Typography,
  Card,
  List,
  Tag,
  Alert,
  Steps,
  Divider,
  Row,
  Col,
  Space,
  Collapse,
} from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  CodeOutlined,
  SettingOutlined,
  ToolOutlined,
  UserOutlined,
  SyncOutlined,
  BugOutlined,
  PaperClipOutlined,
  SafetyOutlined,
  DatabaseOutlined,
  QuestionCircleOutlined,
  BranchesOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;
const { Panel } = Collapse;

const codeStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  maxHeight: "400px",
  overflow: "auto",
};

/**
 * @function ReduxConceptsSlide
 * @description A React functional component that renders a slide explaining core concepts of Redux and Redux Toolkit.
 * It covers the main ideas, step-by-step setup with RTK, key extensions like middleware and async actions,
 * and additional considerations such as when to use Redux and state structuring.
 * @returns {JSX.Element} The rendered slide component.
 */
const ReduxConceptsSlide: React.FC = () => {
  const steps = [
    {
      title: "1. Define a Slice",
      icon: <SettingOutlined />,
      content: (
        <>
          <Paragraph>
            A "slice" is a collection of Redux reducer logic and actions for a
            single feature in your app, typically defined together in one file.
            RTK\'s <Tag>createSlice</Tag> utility simplifies this process
            significantly.
          </Paragraph>
          <Paragraph>
            It requires a <Tag>name</Tag> (used to prefix generated action
            types, e.g., <Text code>'theme/setTheme'</Text>), an{" "}
            <Tag>initialState</Tag> value for the slice, and a{" "}
            <Tag>reducers</Tag> object where keys are action names and values
            are reducer functions.
          </Paragraph>
          <Paragraph>
            <Text strong>Key Benefits of `createSlice`:</Text>
            <List size="small">
              <List.Item>
                Automatically generates action creators and action type strings.
              </List.Item>
              <List.Item>
                Uses <Tag>Immer</Tag> internally, allowing you to write
                "mutative" reducer logic that is safely converted to immutable
                updates. This drastically reduces boilerplate for immutable
                operations.
              </List.Item>
              <List.Item>Makes it easy to organize state by feature.</List.Item>
            </List>
          </Paragraph>

          <Divider dashed style={{ margin: "16px 0" }} />

          <Title level={5} style={{ marginBottom: "8px" }}>
            <SafetyOutlined style={{ marginRight: "8px" }} />
            Reducer Purity Principles
          </Title>
          <Paragraph>
            Reducers <Text strong>must</Text> be{" "}
            <Text strong>pure functions</Text>. This is a fundamental concept in
            Redux, ensuring predictable state updates. Pure functions have two
            main characteristics:
          </Paragraph>
          <List size="small" style={{ marginLeft: "15px" }}>
            <List.Item>
              <Text strong>Deterministic:</Text> Given the same{" "}
              <Text code>state</Text> and <Text code>action</Text> arguments,
              they must always calculate and return the exact same new{" "}
              <Text code>state</Text> value.
            </List.Item>
            <List.Item>
              <Text strong>No Side Effects:</Text> They must not cause any side
              effects (e.g., no API calls, no mutating variables outside their
              own scope, no <Text code>Math.random()</Text>, no{" "}
              <Text code>Date.now()</Text>).
            </List.Item>
            <List.Item>
              They should <Text strong>only</Text> depend on their{" "}
              <Text code>state</Text> and <Text code>action</Text> arguments.
            </List.Item>
          </List>
          <Paragraph style={{ marginTop: "8px" }}>
            Immer helps maintain purity by allowing you to write simpler
            "mutation" code inside the reducer; it takes care of producing the
            immutable result. You are "mutating" a draft state provided by
            Immer, not the actual state.
          </Paragraph>
          <SyntaxHighlighter
            language="javascript"
            style={atomDark}
            customStyle={codeStyle}
            showLineNumbers
          >
            {`// features/theme/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";
// For more complex selectors, especially those deriving data or needing memoization:
// import { createSelector } from "@reduxjs/toolkit"; // or from 'reselect'

const initialState = { 
  value: "light", // Use descriptive state fields: 'light' | 'dark' | 'system'
  // otherThemeSettings: {}
};

const themeSlice = createSlice({
  name: "theme", // Feature name, used in action type strings (e.g., 'theme/setTheme')
  initialState,
  // Reducers define how the state can be updated.
  // The key is the action name, the value is the reducer function.
  reducers: {
    // Action: 'theme/setTheme' will be generated
    setTheme: (state, action) => {
      // Immer allows direct "mutation" of the draft state here.
      // Behind the scenes, Immer produces an immutable update.
      state.value = action.payload; 
    },
    toggleTheme: (state) => {
      state.value = state.value === 'light' ? 'dark' : 'light';
    },
    // Example: resetToDefault: (state) => {
    //   Object.assign(state, initialState); // Or return initialState directly
    // }
  },
});

// Action creators are generated automatically by createSlice
// for each case reducer function.
export const { setTheme, toggleTheme } = themeSlice.actions;

// Selector functions: Encapsulate the logic for reading parts of the state.
// Basic selector:
export const selectCurrentTheme = (state) => state.theme.value; 

// Example of a memoized selector using reselect (or RTK's createSelector)
// for more complex scenarios or derived data:
// export const selectThemePreferences = createSelector(
//   [selectCurrentTheme, (state) => state.theme.otherThemeSettings],
//   (currentTheme, otherSettings) => {
//     return { mainTheme: currentTheme, ...otherSettings, computedInfo: \`Theme is \${currentTheme}\` };
//   }
// );

// The reducer function for the slice, to be added to the store.
export default themeSlice.reducer;`}
          </SyntaxHighlighter>
        </>
      ),
    },
    {
      title: "2. Configure Store",
      icon: <ToolOutlined />,
      content: (
        <>
          <Paragraph>
            The Redux store brings together your state, reducers, and
            middleware. RTK\'s <Tag>configureStore</Tag> function simplifies
            store setup.
          </Paragraph>
          <Paragraph>
            <Text strong>Key Features of `configureStore`:</Text>
            <List size="small">
              <List.Item>
                Automatically combines your slice reducers using{" "}
                <Text code>combineReducers</Text>.
              </List.Item>
              <List.Item>
                Adds default middleware by calling{" "}
                <Tag>getDefaultMiddleware</Tag>. This includes{" "}
                <Tag>redux-thunk</Tag> for basic async logic, and development
                checks like immutability and serializability checks to catch
                common errors.
              </List.Item>
              <List.Item>
                Automatically enables Redux DevTools Extension integration (can
                be configured via the <Text code>devTools</Text> option, e.g.,{" "}
                <Text code>
                  devTools: process.env.NODE_ENV !== 'production'
                </Text>
                ).
              </List.Item>
              <List.Item>
                Allows for easy customization of middleware and enhancers.
              </List.Item>
            </List>
          </Paragraph>
          <SyntaxHighlighter
            language="javascript"
            style={atomDark}
            customStyle={codeStyle}
            showLineNumbers
          >
            {`// app/store.js
import { configureStore } from "@reduxjs/toolkit";
// For adding custom middleware like redux-logger:
// import logger from 'redux-logger'; 

// Import slice reducers
import themeReducer from '../features/theme/themeSlice';
// import counterReducer from '../features/counter/counterSlice';
// import postsReducer from '../features/posts/postsSlice';

export const store = configureStore({
  // The 'reducer' field is an object where keys are slice names
  // and values are their respective reducer functions.
  // This structure defines the shape of your root state object.
  reducer: {
    theme: themeReducer, 
    // counter: counterReducer,
    // posts: postsReducer,
    // Add other features here...
  },
  // middleware is automatically configured with defaults from getDefaultMiddleware().
  // To add custom middleware:
  // middleware: (getDefaultMiddleware) => 
  //   getDefaultMiddleware().concat(logger), // Example: adding redux-logger
  
  // devTools: process.env.NODE_ENV !== 'production', // Default behavior
});

// Optional: Infer the \`RootState\` and \`AppDispatch\` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
`}
          </SyntaxHighlighter>
          <Alert
            type="info"
            message="Type Safety"
            description="For TypeScript projects, it's highly recommended to infer RootState and AppDispatch types from the store to ensure type safety throughout your application when using useSelector and useDispatch."
            showIcon
            style={{ marginTop: "16px" }}
          />
        </>
      ),
    },
    {
      title: "3. Provide Store to React",
      icon: <UserOutlined />,
      content: (
        <>
          <Paragraph>
            Once the store is created, you need to make it available to your
            React component tree. This is done using the{" "}
            <Tag>{"<Provider>"}</Tag> component from the <Tag>react-redux</Tag>{" "}
            library.
          </Paragraph>
          <Paragraph>
            Wrap your root application component (usually <Text code>App</Text>)
            with <Tag>{"<Provider>"}</Tag> and pass the created{" "}
            <Text code>store</Text> instance as a prop. Any nested component can
            then access the Redux store.
          </Paragraph>
          <SyntaxHighlighter
            language="jsx"
            style={atomDark}
            customStyle={codeStyle}
            showLineNumbers
          >
            {`// main.jsx (or index.js, App.js depending on setup)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store'; // Your configured store
import App from './App'; // Your root application component
import './index.css'; // Or your global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provider makes the Redux store available to any nested components
        that need to access the Redux store. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);`}
          </SyntaxHighlighter>
        </>
      ),
    },
    {
      title: "4. Use State & Actions in Components",
      icon: <CodeOutlined />,
      content: (
        <>
          <Paragraph>
            To interact with the Redux store from your React components:
            <List size="small">
              <List.Item>
                <Tag>useSelector</Tag>: A hook from <Tag>react-redux</Tag> to
                extract data from the Redux store state. It takes a selector
                function as an argument, which receives the entire store state
                and returns the specific piece of data your component needs. The
                component will re-render if the selected data changes.
                <Text strong>
                  {" "}
                  Performance Tip: Select only the minimal data required by the
                  component to avoid unnecessary re-renders.
                </Text>
              </List.Item>
              <List.Item>
                <Tag>useDispatch</Tag>: A hook from <Tag>react-redux</Tag> that
                returns a reference to the store\'s <Text code>dispatch</Text>{" "}
                function. You use this to dispatch actions (plain action objects
                or thunks) to trigger state changes. The{" "}
                <Text code>dispatch</Text> function reference is stable and
                generally doesn\'t need to be included in dependency arrays of{" "}
                <Text code>useEffect</Text> or <Text code>useCallback</Text>.
              </List.Item>
            </List>
          </Paragraph>
          <SyntaxHighlighter
            language="jsx"
            style={atomDark}
            customStyle={codeStyle}
            showLineNumbers
          >
            {`// features/theme/ThemeToggler.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import action creators and selector functions from your slice
import { toggleTheme, selectCurrentTheme } from './themeSlice'; 
// For TypeScript, you might use typed hooks:
// import { useAppSelector, useAppDispatch } from '../../app/hooks';

export function ThemeToggler() {
  // Use useSelector to get the current theme from the store state.
  // The component will re-render if 'currentTheme' changes.
  const currentTheme = useSelector(selectCurrentTheme); 
  // const currentTheme = useAppSelector(selectCurrentTheme); // TS version

  const dispatch = useDispatch();
  // const dispatch = useAppDispatch(); // TS version

  const handleToggle = () => {
    // Dispatch the 'toggleTheme' action.
    // The themeSlice reducer will handle this action to update the state.
    dispatch(toggleTheme());
  };

  return (
    <div>
      <Typography.Paragraph>Current theme: {currentTheme}</Typography.Paragraph>
      <button onClick={handleToggle}>
        Toggle Theme
      </button>
    </div>
  );
}`}
          </SyntaxHighlighter>
        </>
      ),
    },
  ];

  const middlewareThunkCode = `// features/posts/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client'; // Example API client

// 1. Define the async thunk action creator
// createAsyncThunk accepts an action type string prefix and a "payload creator" callback.
// The payload creator should be an async function that returns a Promise.
// It will automatically dispatch lifecycle actions based on the Promise:
// - posts/fetchPosts/pending
// - posts/fetchPosts/fulfilled (if Promise resolves, payload is the resolved value)
// - posts/fetchPosts/rejected (if Promise rejects, error is the rejected value)
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', // Action type prefix
  async (userId, thunkAPI) => { // userId is an example argument passed when dispatching
    // thunkAPI object contains { dispatch, getState, extra, requestId, signal, rejectWithValue }
    try {
      const response = await client.get('/fakeApi/users/' + userId + '/posts');
      return response.data; // This becomes the 'fulfilled' action's payload
    } catch (error) {
      // To pass a custom error payload for the rejected action:
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: { 
    entities: [], // consider normalizing data: { ids: [], entities: {} }
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null 
  },
  reducers: {
    // ... other standard synchronous reducers ...
    // e.g., addPost, removePost
  },
  // 2. Handle actions defined by createAsyncThunk (or other external actions)
  // The 'builder' callback notation is recommended for type safety.
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null; // Clear previous errors
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array (or update normalized state)
        // This example assumes action.payload is an array of posts
        state.entities = state.entities.concat(action.payload); 
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message; // action.payload from rejectWithValue
      });
  }
});

export default postsSlice.reducer;

// In a component:
// import { useDispatch } from 'react-redux';
// import { fetchPosts } from './postsSlice';
//
// const dispatch = useDispatch();
// useEffect(() => {
//   dispatch(fetchPosts(currentUserId)); // Dispatch the thunk with an argument
// }, [dispatch, currentUserId]);
//
// UI can then react to 'status' ('loading', 'succeeded', 'failed') and 'error'.
`;

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        <CodeOutlined /> React State Management: Deep Dive into Redux & Redux
        Toolkit (RTK)
      </Title>

      <Card style={{ marginBottom: "24px" }}>
        <Title level={4}>Core Idea & Principles of Redux</Title>
        <Paragraph>
          Redux provides a <Text strong>predictable state container</Text> for
          JavaScript applications. It centralizes your application\'s state,
          making it easier to manage, debug, and reason about, especially in
          larger applications. It enforces a{" "}
          <Text strong>unidirectional data flow</Text>.
        </Paragraph>
        <Paragraph strong>The Three Principles of Redux:</Paragraph>
        <List size="small">
          <List.Item>
            <Text strong>Single source of truth:</Text> The state of your entire
            application is stored in an object tree within a single store. This
            makes it easier to debug and inspect your app, and also enables
            features like state persistence and server-side rendering.
          </List.Item>
          <List.Item>
            <Text strong>State is read-only:</Text> The only way to change the
            state is to dispatch an <Text strong>action</Text>—an object
            describing <Text italic>what happened</Text>. This ensures that
            neither views nor network callbacks ever write directly to the
            state. Instead, they express an intent to mutate the state.
          </List.Item>
          <List.Item>
            <Text strong>Changes are made with pure functions:</Text> To specify
            how the state tree is transformed by actions, you write pure{" "}
            <Text strong>reducers</Text>. Reducers are functions that take the
            previous state and an action, and return the next state. They must
            be pure (no side effects).
          </List.Item>
        </List>
        <Paragraph style={{ marginTop: "10px" }}>
          <Text strong>Typical Unidirectional Data Flow:</Text>
          <br />
          <Tag color="blue">UI Event</Tag> (e.g., button click) →{" "}
          <Tag color="purple">dispatch(action)</Tag> (e.g.,{" "}
          <Text code>
            dispatch({"{"}
            type: 'INCREMENT' {"}"})
          </Text>
          ) → <Tag color="green">Reducer</Tag> (pure function:{" "}
          <Text code>{`(state, action) => newState</Text>) →{" "}`}</Text>
          <Tag color="orange">Store</Tag> (holds new state) →{" "}
          <Tag color="cyan">UI Re-renders</Tag> (components subscribed via{" "}
          <Text code>useSelector</Text> get the new state).
        </Paragraph>
        <Alert
          message="Redux Toolkit (RTK) is the Official, Opinionated Way to Use Redux"
          description="RTK simplifies common Redux tasks: store setup, slice creation (reducers + actions), immutable updates (via Immer), and includes essential tools like Redux Thunk for async logic and Redux DevTools integration by default. It significantly reduces boilerplate and enforces best practices."
          type="success"
          showIcon
          style={{ marginBottom: "16px" }}
        />
      </Card>

      <Title level={3} style={{ marginBottom: "20px" }}>
        Step-by-Step Implementation with Redux Toolkit
      </Title>
      <Steps direction="vertical" current={-1} size="small">
        {steps.map((item) => (
          <Step
            key={item.title}
            title={<Text strong>{item.title}</Text>}
            description={item.content}
            icon={item.icon}
          />
        ))}
      </Steps>

      <Divider style={{ margin: "30px 0" }} />

      <Title level={3} style={{ marginBottom: "20px" }}>
        Key Concepts & Advanced Topics
      </Title>

      <Row gutter={[20, 20]}>
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <PaperClipOutlined />
                Middleware
              </Space>
            }
            size="small"
            style={{ height: "100%" }}
          >
            <Paragraph>
              Middleware provides a third-party extension point between
              dispatching an action and the moment it reaches the reducer. It\'s
              used for side effects like logging, crash reporting, talking to
              asynchronous APIs, routing, and more.
            </Paragraph>
            <Paragraph>
              Signature:{" "}
              <Text code>
                {`const myMiddleware = storeAPI => next => action => NextState`}
              </Text>
              .
            </Paragraph>
            <Paragraph>
              <Tag>Redux Thunk</Tag> (for basic async side effects like simple
              API calls) is included by default in RTK\'s{" "}
              <Tag>configureStore</Tag>. For more complex async scenarios, you
              might consider <Tag>Redux Saga</Tag> (uses ES6 Generators) or{" "}
              <Tag>Redux Observable</Tag> (uses RxJS). Custom middleware can
              also be added.
            </Paragraph>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={{
                ...codeStyle,
                fontSize: "0.8em",
                marginTop: "10px",
              }}
            >
              {`// Example: Adding redux-logger middleware
// store.js
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // npm install redux-logger
import rootReducer from './rootReducer'; // Assuming you have a combined root reducer

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(logger), // Adds logger after default middleware
});`}
            </SyntaxHighlighter>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <SafetyOutlined />
                Immutability
              </Space>
            }
            size="small"
            style={{ height: "100%" }}
          >
            <Paragraph>
              Redux relies heavily on immutability. Reducers must{" "}
              <Text strong>never</Text> modify the existing state directly.
              Instead, they must create a <Text strong>new</Text> state object
              (or array) with the necessary changes.
            </Paragraph>
            <Paragraph strong>Why is immutability crucial?</Paragraph>
            <List size="small">
              <List.Item>
                <Text strong>Performance:</Text> Allows for cheap reference
                comparisons to detect changes (e.g., in <Tag>useSelector</Tag>,{" "}
                <Tag>React.memo</Tag>). If references are the same, no
                re-render/re-calculation is needed.
              </List.Item>
              <List.Item>
                <Text strong>Change Tracking:</Text> Makes it easy to track
                changes over time, which is essential for debugging tools like
                Redux DevTools (time travel, action diffs).
              </List.Item>
              <List.Item>
                <Text strong>Predictability:</Text> Ensures state changes are
                explicit and easier to reason about.
              </List.Item>
            </List>
            <Paragraph>
              RTK\'s <Tag>createSlice</Tag> and <Tag>createReducer</Tag> use{" "}
              <Tag>Immer</Tag> internally. Immer lets you write "mutating" code
              (e.g., <Text code>state.value = action.payload</Text>) within your
              reducers. Immer detects these "draft state" mutations and produces
              a correctly immutable new state behind the scenes.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <SyncOutlined />
                Async Actions & Data Fetching (Thunks)
              </Space>
            }
            size="small"
            style={{ height: "100%" }}
          >
            <Paragraph>
              For asynchronous operations like API calls, RTK provides the{" "}
              <Tag>createAsyncThunk</Tag> utility. It simplifies handling the
              typical pending/fulfilled/rejected states of a promise-based async
              request.
            </Paragraph>
            <Paragraph>
              <Tag>createAsyncThunk</Tag> generates three action types (e.g.,
              \'posts/fetchPosts/pending\', \'posts/fetchPosts/fulfilled\',
              \'posts/fetchPosts/rejected\') and dispatches them automatically.
              You handle these actions in your slice\'s <Tag>extraReducers</Tag>{" "}
              section to update the state accordingly (e.g., set loading status,
              store fetched data, or save error messages).
            </Paragraph>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={codeStyle}
              showLineNumbers
            >
              {middlewareThunkCode.trim()}
            </SyntaxHighlighter>
            <Paragraph>
              The UI can then subscribe to the status (<Text code>loading</Text>
              , <Text code>succeeded</Text>, <Text code>failed</Text>) and error
              fields in the state to display appropriate feedback.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <BugOutlined />
                Redux DevTools
              </Space>
            }
            size="small"
            style={{ height: "100%" }}
          >
            <Paragraph>
              The Redux DevTools browser extension is an indispensable tool for
              Redux development. It allows you to:
              <List size="small">
                <List.Item>Inspect the current state tree.</List.Item>
                <List.Item>
                  View a history of dispatched actions and their payloads.
                </List.Item>
                <List.Item>
                  See the state diff before and after each action.
                </List.Item>
                <List.Item>
                  "Time-travel" debug by reverting or replaying actions.
                </List.Item>
                <List.Item>Dispatch actions manually for testing.</List.Item>
                <List.Item>
                  Monitor performance with chart and diff views.
                </List.Item>
              </List>
            </Paragraph>
            <Paragraph>
              RTK\'s <Tag>configureStore</Tag> automatically enables DevTools
              integration in development environments.
            </Paragraph>
            <Alert
              message="Essential: Install the Redux DevTools extension for your browser!"
              type="success"
              showIcon
            />
          </Card>
        </Col>
      </Row>

      <Divider style={{ margin: "30px 0" }} />

      <Title level={3} style={{ marginBottom: "20px" }}>
        Additional Considerations
      </Title>
      <Collapse accordion>
        <Panel
          header={
            <Text strong>
              <QuestionCircleOutlined style={{ marginRight: 8 }} />
              When to Use Redux (Pros & Cons)?
            </Text>
          }
          key="1"
        >
          <Paragraph strong>Pros:</Paragraph>
          <List size="small">
            <List.Item>
              <Text strong>Centralized State:</Text> Predictable and easier to
              debug, especially in large apps.
            </List.Item>
            <List.Item>
              <Text strong>Powerful DevTools:</Text> Time travel, action
              logging, state inspection.
            </List.Item>
            <List.Item>
              <Text strong>Middleware Ecosystem:</Text> Robust support for side
              effects, async logic, logging, etc.
            </List.Item>
            <List.Item>
              <Text strong>Scalability:</Text> Handles complex state
              interactions well as applications grow.
            </List.Item>
            <List.Item>
              <Text strong>Decoupling:</Text> Separates state management logic
              from UI components.
            </List.Item>
          </List>
          <Paragraph strong style={{ marginTop: 10 }}>
            Cons:
          </Paragraph>
          <List size="small">
            <List.Item>
              <Text strong>Boilerplate (Historically):</Text> Though RTK has
              massively reduced this, it can still feel like more setup than
              simpler solutions for small apps.
            </List.Item>
            <List.Item>
              <Text strong>Learning Curve:</Text> Concepts like reducers,
              actions, middleware, and immutability take time to grasp.
            </List.Item>
            <List.Item>
              <Text strong>Indirectness:</Text> State changes are not direct,
              which can feel verbose for simple updates.
            </List.Item>
          </List>
          <Paragraph strong style={{ marginTop: 10 }}>
            Consider Redux When:
          </Paragraph>
          <List size="small">
            <List.Item>
              Application state is complex and shared across many components.
            </List.Item>
            <List.Item>
              Multiple components, potentially distant in the component tree,
              need to access or modify the same state.
            </List.Item>
            <List.Item>
              You need robust debugging tools and a clear history of state
              changes.
            </List.Item>
            <List.Item>
              Long-term maintainability and scalability are key concerns for a
              large application.
            </List.Item>
            <List.Item>
              You have complex asynchronous logic interacting with the state.
            </List.Item>
          </List>
          <Alert
            type="warning"
            message="Don't use Redux just because it's popular!"
            description="For simpler applications, React's built-in Context API (with useReducer) or lighter-weight state management libraries (Zustand, Jotai) might be more appropriate and involve less setup."
            showIcon
            style={{ marginTop: "16px" }}
          />
        </Panel>
        <Panel
          header={
            <Text strong>
              <BranchesOutlined style={{ marginRight: 8 }} />
              Structuring Redux State & Code (Best Practices)
            </Text>
          }
          key="2"
        >
          <Paragraph>
            <Text strong>Feature Folders (Recommended by RTK):</Text> Organize
            your code by feature rather than by type. For example, a
            `features/user` folder might contain `userSlice.js`,
            `UserLogin.jsx`, `userAPI.js`, and `userSelectors.js`. This improves
            modularity and makes it easier to find related code.
          </Paragraph>
          <Paragraph>
            <Text strong>Normalizing State:</Text> For collections of data
            (e.g., a list of posts, users), consider storing them in a
            "normalized" shape, similar to database tables. This involves:
            <List size="small">
              <List.Item>
                An <Tag>entities</Tag> object mapping item IDs to the items
                themselves.
              </List.Item>
              <List.Item>
                An <Tag>ids</Tag> array storing the order of item IDs.
              </List.Item>
            </List>
            Example:{" "}
            <Text code>
              {"{"} posts: {"{"}
              ids: ['id1', 'id2'], entities: {"{"}
              'id1': {"{"}
              ...{"}"}, 'id2': {"{"}
              ...{"}"}
              {"}"}
              {"}"}
              {"}"}
            </Text>
            .
            <br />
            <Text strong>Benefits:</Text> Easy item lookup by ID, efficient
            updates (only change the specific item), avoids data duplication.
            RTK offers a <Tag>createEntityAdapter</Tag> utility to simplify
            managing normalized state within your slices.
          </Paragraph>
          <SyntaxHighlighter
            language="javascript"
            style={atomDark}
            customStyle={{ ...codeStyle, fontSize: "0.8em" }}
          >
            {`// Example using createEntityAdapter
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

const postsAdapter = createEntityAdapter({
  // Assume posts have an 'id' field
  selectId: (post) => post.id,
  // Keep the "all IDs" array sorted based on post date
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// initialState will now include { ids: [], entities: {} }
const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk(/* ... as before ... */);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: postsAdapter.addOne, // or addMany, setOne, setAll, etc.
    removePost: postsAdapter.removeOne,
    updatePost: postsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        postsAdapter.setAll(state, action.payload); // Replaces all existing posts
        state.status = 'succeeded';
      })
      // ... other cases
  },
});

// Export the adapter's selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;`}
          </SyntaxHighlighter>
          <Paragraph>
            <Text strong>Selectors:</Text> Encapsulate the logic for deriving
            data from your state. Use <Tag>reselect</Tag> (or RTK\'s{" "}
            <Tag>createSelector</Tag>) to create memoized selectors for
            performance, especially for computed data or when components
            subscribe to parts of the state that change frequently.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <Text strong>
              <ExperimentOutlined style={{ marginRight: 8 }} />
              Performance Optimization Tips
            </Text>
          }
          key="3"
        >
          <List size="small">
            <List.Item>
              <Text strong>Memoized Selectors:</Text> Use `createSelector` from
              `reselect` (or RTK) to prevent re-computation of derived data if
              input selectors haven't changed. This is crucial when
              `useSelector` returns new object/array references.
            </List.Item>
            <List.Item>
              <Text strong>Granular `useSelector` subscriptions:</Text>{" "}
              Components should select only the specific pieces of state they
              need. The more granular the selection, the less likely the
              component will re-render unnecessarily.
            </List.Item>
            <List.Item>
              <Text strong>Normalize State:</Text> Especially for collections,
              normalized state (using `createEntityAdapter`) makes updates more
              efficient and lookups faster.
            </List.Item>
            <List.Item>
              <Text strong>Immutable Updates:</Text> (Handled by Immer in RTK)
              Ensure reducers are pure and perform immutable updates. This
              allows React and Redux to use cheap reference equality checks.
            </List.Item>
            <List.Item>
              <Text strong>Avoid Large, Frequent State Updates:</Text> If
              possible, batch updates or design state changes to be minimal.
            </List.Item>
            <List.Item>
              <Text strong>Use Redux DevTools for Profiling:</Text> Identify
              which actions cause large state changes or frequent re-renders.
            </List.Item>
            <List.Item>
              <Text strong>Code Splitting Reducers:</Text> For very large
              applications, you can dynamically add reducers to the store as
              features are loaded.
            </List.Item>
            <List.Item>
              <Text strong>Throttle or Debounce Dispatches:</Text> For actions
              triggered by frequent events (e.g., window resize, typing),
              consider throttling or debouncing the dispatch calls.
            </List.Item>
          </List>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ReduxConceptsSlide;
