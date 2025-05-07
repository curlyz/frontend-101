* **Date**:
* **Speaker**: @Nguyễn Hoàng Đức Trung, @Khang V. Quach
* **Format**: Tech Talk
* **Target Audience**: Software engineers
* **Objective**:  
  *Introduce fundamental definitions about frontend, SPA and React.*
* **Agenda**:

1. [Introduction about SPA and React](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#Introduction-to-SPA-and-React)
   
   1. [Definitions](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#Definitions)
   2. [React DOM](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#React-DOM)
2. [React Fundamentals](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#React-Fundamentals) 
   
   1. [Components](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#React-components)
   2. [Hooks](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#React-hooks)
   3. [State](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#Component-state)
   4. [Props](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#Component-props)
   5. [Fetching Data](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#Fetching-data-with-React)
   6. [React Router](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#Routing-pages-with-React-router)
3. [React State management](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#React-State-management)
   
   1. [React Context](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#React-Context)
   2. [Redux](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#Redux)
4. [React Client Components vs Server Components](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#React-Client-Components-vs-Server-Components)
   
   1. [React Client Components](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#React-Client-Components)
   2. [React Server Components](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#React-Server-Components)
5. [Package Management](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#Package-Management)
   
   1. [npm vs yarn](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#npm-vs-yarn)
6. [Deployment and Build target](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#Deployment-and-Build-target)
   
   1. [Build and deployment](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#Build-and-deployment)
   2. [Port to Mobile app](https://datumhq.atlassian.net/wiki/spaces/DATUMHQ/pages/834174977/Frontend+101#Port-to-Mobile-app)
7. Q&A

Introduction to SPA and React
-----------------------------

### Definitions

SPA (Single Page Application) is a web app that loads only 1 document (which also called root document), then updates body content of that document via Javascript API to show different content. This approach allows user to use website without loading whole new pages from server and speed up performance.

In case, React is a front-end library for building SPA by writing reusable components with high interactivity and combine them together to flexible user interfaces. React components will be mounted to root document and rendered to create different UI. On next part, we will discuss about how React manage changes and mount new UI.

### React Virtual DOM

Since React is a SPA, it natively supports virtual DOM to keep UI up-to-date. Virtual DOM is a lightweight in-memory copy of real DOM which will be used by React to manipulate changes.  
This is step-by-step process how virtual DOM works:

1. **Initial Rendering**: when the app starts, the entire UI is represented as a Virtual DOM. React elements are created and rendered into the virtual structure.
2. **State and Props Changes**: as the states and props change in the app, React re-renders the affected components in the virtual DOM. These changes do not immediately impact the real DOM.
3. **Comparison**: React then uses a **diffing algorithm** to compare the current version of the Virtual DOM with the previous version. This process identifies the differences (or \"diffs\") between the two versions.
4. **Reconciliation Process**: based on the differences identified, React determines the most efficient way to update the real DOM. Only the parts of the real DOM that need to be updated are changed, rather than re-rendering the entire UI. This selective updating is quick and performant.
5. **Update to the Real DOM**: finally, React applies the necessary changes to the real DOM. This might involve adding, removing, or updating elements based on the differences detected in step 3

React Virtual DOM

By using virtual DOM, React will handles all hard labor, let developers write code in a more declarative style. In addition, virtual DOM lower the cost of interacting with real DOM which will improve the performance and enhance user experience.   
At the end of first chapter, we've already known about SPA and React definitions, how react render and update. On next chapter, we will discuss deeper about React basis.

React Fundamentals
------------------

### React components

React apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance, serve as a Javascript function but return HTML. Each component will store its own state and render relevant UI. Components can also be nested together from simple small button to become a complex page. Components also handle its data through state, passing its data to children components, etc. We will get to know them further in next parts.

Example of Page made out of several components

### React hooks

React hooks are supported features by React to manage state and lifecycle of a component:

* State hooks: create a state variable in a component to store data from user, api. State hook provide a variable and an update function. When variable is changed via update function, the UI of component will be re-render to populate new data.
* Context hooks: let a component receive information from distant component without passing props to avoid props drilling amongst components.
* Ref hooks: create a variable to store data inside a component but not used for rendering. For example, ref hook can be used to store data from a form, which doesn't need to be re-rendered in time to optimize performance and user experience.
* Effect hooks: let component handle side effects in a lifecycle caused by rendering itself. As a result, it can be used to handle logic when component is first mounted, re-rendered, etc.
* Performance hooks: use to cache an expensive calculation/function definition, skip unnecessary works to optimize re-rendering process.

Hooks have certain rules:

* Hooks can only be called inside React function components.
* Hooks can only be called at the top level of a component.
* Hooks cannot be conditional.

By using hooks, developers can reduce effort to manage state and lifecycle of functional components.

### Component state

Component state is handled by State hooks. Usually, useState hook is used to initialize data inside a hook. As mentioned earlier, when user update state via update function, component will be re-rendered and new data will be rendered to user.

import { useState, useEffect } from 'react';
function Counter() {
const [count, setCount] = useState(0);
useEffect(() => {
setCount(count => count++);
}, []);
return (<div>You've count {count} times</div>);
}
### Component props

When a component is nested inside another, parent component can pass it's state to the children one.

import { useState, useEffect } from 'react';
function Children({ count }) {
<div>Your parent component has count {count} times</div>
}
function Parent() {
const [count, setCount] = useState(0);
useEffect(() => {
setCount(count => count++);
}, []);
return (<Children count={count}/>);
}

However, there is problem when passing data between sibling components or distant children components (props drilling). Therefore, state management hooks like useContext or Redux are used provide data among various components which will be introduced in later chapter.

### Fetching data with React

In React, we can utilize hooks like useState, useEffect and native api calling method: fetch to fetch data. Below is the sample code.

import { useState, useEffect } from 'react';
const Example = () => {
const [pokemons, setPokemons] = useState([]);
const [loading, setLoading] = useState(false);
const [pagination, setPagination] = useState(1);
const [error, setError] = useState(false);
useEffect(() => {
setLoading(true);
fetch(`https://pokeapi.co/api/v2/ability/?limit=20&offset={20 \* pagination}`)
.then((res) => {
return res.json();
})
.then((data) => {
setPokemons(data);
}).catch(() => {
setError(true);
}).finally(() => {
setLoading(false);
}};
}, []);
if (loading) {
return (<div>...Loading...</div>);
}
if (error) {
return (<div>Error, please try again</div>);
}
return (
<div>
{pokemons.map((pokemon) => (
<div>pokemon: {pokemon.name}</div>
))}
<button
onClick={() =>
setPagination(pagination => pagination > 1 ? pagination - 1 : 1}>
Prev
<button/>
<button
onClick={() => setPagination(pagination => pagination + 1)}>
Next
<button/>
</div>
);
};
export default Example;

However, this approach requires developer to handle various things from loading state, error state, pagination, etc. Thus, there are data fetching libraries to reduce effort of developer such as React Query and SWR. They are powerful data fetching hooks for better developing experience. In this sharing, we will emphasize on using SWR to fetch data.

SWR a lightweight ReactJs library with hooks for data fetching on the client-side with various performance improvement techniques such as data caching, re-validation, pagination, and many others. SWR will handle all the logics behind the scene, speed up development process.

import { useState, useCallback } from 'react';
import useSWR from "swr";
const Example = () => {
const fetcher = useCallback((...args) =>
fetch(...args).then((res) => res.json()), []);
const [pagination, setPagination] = useState(1);
const { data, error, isLoading } = useSWR(
'https://pokeapi.co/api/v2/ability/?limit=20&offset={20 \* pagination}',
fetcher
);
if (loading) {
return (<div>...Loading...</div>);
}
if (error) {
return (<div>Error, please try again</div>);
}
return (
<div>
{pokemons.map((pokemon) => (
<div>pokemon: {pokemon.name}</div>
))}
<button
onClick={() =>
setPagination(pagination => pagination > 1 ? pagination - 1 : 1}>
Prev
<button/>
<button
onClick={() => setPagination(pagination => pagination + 1)}>
Next
<button/>
</div>
);
};
export default Example;
### Routing pages with React Router

React Router (react-router-dom) is a library for handling routing and navigation in React apps without full page refresh since React doesn't support native routing method. There are 3 types of routers:

* BrowserRouter: Most common use in React apps. It uses HTML5 History API to manage routing, allows URL to be dynamically updated and browser's address bar and history bar are in sync.
* HashRouter: Using URL hash for routing rather than HTML5 History API.
* MemoryRouter: Use in non-browser environments such as React Native or testing.

Features of React Router:

* Declarative Routing: Using Routes and Route component to define routes declaratively, easy to read.
* Nested Routes: Support nested routes, allow complex and hierarchical routing structures
* Route parameters: Support dynamic routing with route parameters for multiple URL patterns.

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
function App() {
return (
<Router>
<Navbar />
<div className="App">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="\*" element={<NotFound />} /> {/* Catch-all route for 404 \*/}
</Routes>
</div>
</Router>
);
}
export default App;

React State management
----------------------

In earlier chapters, we discussed how a component can manage its own state and pass it down to child components. However, sharing state between sibling components or deeply nested children can become difficult due to prop drilling. To address this, React introduced the Context API for easier state sharing across the component tree. Additionally, third-party libraries like Redux offer more advanced and scalable solutions for managing shared state in larger applications.

### React Context

Context provides a way to pass data through the component tree without having to pass props down manually at every level. Context creates a provider which wraps over components that share same state. All children, grandchildren, … components have access to the shared state using useContext hook.

This is step-by-step to create and use Context to manage states:

1. Create a context with a default value and a provider component that uses the `useState` hook to manage shared state across components. This setup allows both reading and updating the state. Then, define a custom hook using `useContext` to easily access the context values within any component.

// ThemeContext.js
import React, { createContext, useState, useContext } from "react";
const ThemeContext = createContext({
theme: "light",
setTheme: (theme) => {}
});
export function ThemeProvider({ children }) {
const [theme, setTheme] = useState("light");
return (
<ThemeContext.Provider value={{ theme, setTheme }}>
{children}
</ThemeContext.Provider>
);
}
export function useTheme() {
return useContext(ThemeContext);
}

2. Wrap your components with the context provider to share the theme state. Use the custom hook to access and modify the theme from any component.

import React from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
function ThemeToggle() {
const { theme, setTheme } = useTheme();
const toggleTheme = () => {
setTheme(theme === "light" ? "dark" : "light");
};
return (
<div
style={{
background: theme === "light" ? "#FFFFFF" : "#000000",
color: theme === "light" ? "#000000" : "#FFFFFF",
}}>
<p>Current theme: {theme}</p>
<button onClick={toggleTheme}>Toggle Theme</button>
</div>
);
}
function App() {
return (
<ThemeProvider>
<ThemeToggle />
</ThemeProvider>
);
}
export default App;
### Redux

Redux is a robust library for managing and updating the application state using events called actions. It's a centralized store that's shared across the entire application and ensures that the state gets updated in a predictable fashion. When new state is update, an action will be dispatch to a reducer inside the store to update the global states for the app.

This is step-by-step to create and use Redux toolkit manage states:

1. Define a store with reducers and default value.

//themeSlice.js
import { createSlice } from "@reduxjs/toolkit";
// Create slice with default state and reducers
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
export default themeSlice.reducer;

2. Create store and provider

// ThemeProvider.js
import themeReducer from './themeSlice'
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
const rootReducer = combineReducers({ themeReducer });
const store = configureStore({ reducer: rootReducer });
export default ThemeProvider({ children }) {
<Provider store={store}> {children} </Provider>
);
}

3. Wrap your components with the redux provider to share the theme state. Use the useSelector and useDispatch to get the state from redux store and dispatch new action to update state

import React from "react";
import ThemeProvider from "./ThemeProvider";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "./themeSlice";
function ThemeToggle() {
const theme = useSelector((state) => state.themeInfo.theme);
const dispatch = useDispatch();
const toggleTheme = () => {
dispatch(setTheme({ newTheme: theme === "light" ? "dark" : "light" }));
};
return (
<div
style={{
background: theme === "light" ? "#FFFFFF" : "#000000",
color: theme === "light" ? "#000000" : "#FFFFFF",
}}>
<p>Current theme: {theme}</p>
<button onClick={toggleTheme}>Toggle Theme</button>
</div>
);
}
export default function App() {
return (
<ThemeProvider>
<ThemeToggle />
</ThemeProvider>
);
}

In conclusion, Context API and Redux are useful state management tools in React for different use cases. Context is ideal for simpler apps and avoiding prop drilling, while Redux is better for larger, more complex applications that require centralized and predictable state management. The right choice depends on your app's complexity, team experience, and specific needs. On next chapter, we will explore about react client component and server components.

React Client Components vs Server Components
--------------------------------------------

### React Client Components

In React, components are rendered on the client by default. When a user visits a React application, the server sends a bundle of JavaScript code to the browser. This code is then executed in the user's browser, where React takes over to mount components and render the user interface dynamically.

This approach is known as Client-Side Rendering (CSR). It means:

* The initial HTML page is mostly empty or minimal.
* The UI is built and displayed after the JavaScript loads and React initializes.
* Any dynamic interaction (like clicking buttons, fetching data, updating UI) is handled on the client.

Use Client Components when you need user interactions, dynamic states, or access to browser APIs.

  


### React Server Components

React Server Components are components that render on the server side and send the HTML result to the client. This approach can improve initial page load time, reduce JavaScript bundle size, and improve overall app performance.

This approach is known as Server-side Rendering (RSR). It means:

* They run only on the server and don't add to the client-side JavaScript bundle.
* Access to server-side resources like databases and file systems.

Use Server Components when you need to optimize for performance, reduce JavaScript, or build static-like pages.

Additionally, we can combine Client Components and Server Components to strike a balance between performance and interactivity. Modern frameworks like NextJS and ViteJs support both rendering types, enabling developers to optimize loading speed while still delivering rich, interactive user experiences.

Package Management
------------------

Package management is the process of handling dependencies—libraries, tools, and frameworks—that a project needs to run. In a React project, developers often rely on a vast ecosystem of third-party packages to enhance functionality, speed up development, or integrate tools like linters, testing libraries, or UI frameworks.

A package manager automates:

* Installing and updating packages
* Managing versioning
* Resolving dependencies
* Running scripts (e.g., build, test)

React projects typically use either npm or Yarn as the package manager.

### npm vs yarn

npm is the default package manager for NodeJs, and it's the largest software registry in the world. It allows JavaScript developers to share and reuse code through packages (also called modules) and manages project dependencies efficiently.

On the other hand, yarn is a fast, reliable, and secure alternative to npm to address some performance and consistency issues found in earlier versions of npm.

| Aspect | npm | Yarn |
| --- | --- | --- |
| Pre-installed with Node | ✅ Yes | ❌ No (install separately) |
| Speed | Slower (v6 and below) | Faster |
| Offline Install | Limited | Robust |
| Lockfile | `package-lock.json` | `yarn.lock` |

In conclusion, yarn is more recommended in managing package for faster performance and consistent dependencies over various environment

Deployment and Build target
---------------------------

After discovering through all React basis, we will end up with build and deploying react app.

### Build and deployment

….Not done yet

### Port to Mobile app

For responsive React app, it can be port to Mobile app through third party framework like Capacitor. Capacitor is a cross-platform native runtime that makes it easy to build performant mobile applications that run natively on iOS, Android, and more using modern web tooling. Capacitor provides a consistent, web-focused set of APIs that enable an app to stay as close to web standards as possible, while accessing rich native device features on platforms that support them with native functionality.

Capacitor workflow:

1. Building your web code: Once you are ready to test your web app on a mobile device, you'll need to build your web app for distribution. If you are using a tool like Create React App or Vite that command will be `npm run build`.
2. Syncing web code to your Capacitor project: Once your web code has been built for distribution, you will need to push your web code to the web native Capacitor application. To do this, you can use the capacitor to "sync" your web code and install/update the required native dependencies.
   
   To sync your project, run:
   
   npx cap sync
   
   Running `npx cap sync` will copy over your already built web bundle to both your Android and iOS projects as well as update the native dependencies that Capacitor uses.
3. Testing your Capacitor app[​](https://capacitorjs.com/docs/basics/workflow#testing-your-capacitor-app): Once you've synced over your web bundle to your native project, it is time to test your application on a mobile device. There are a few different ways to do this, but the easiest way is to use the built in Capacitor CLI commands.
   
   To run a debug build of your Capacitor app on an iOS device, you can run:
   
   npx cap run ios
   
   Similarly, to run a debug build of your Capacitor app on an Android device, you can run:
   
   npx cap run android
4. Compiling your native binary:
   
   After `sync`, you are encouraged to open your target platform's IDE: Xcode for iOS or Android Studio for Android, for compiling your native app.
   
   Alternatively, to compile your app in a terminal or in CI environments, you can use the build command to build the native project, outputting a signed AAB, APK or IPA file ready for distribution to a device or end users.
   
   npx cap build android

-resources--links🔗 Resources & Links

* Slides: [Link]
* Code Sample / Repo: [Link]
* Related Docs: [Link]

### -key-takeaways📝 Key Takeaways

* Bullet points of what the team learned or discussed.

hello world 