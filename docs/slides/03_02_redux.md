# React State Management - Redux

## Prerequisites
1. You need to understand the slide content, and search for online blogs about that topic
2. Read at least 3 blogs online
3. You should be creative on how to represent your ideas
4. You should write each slides to be isolated, that is each slide page is a folder, which contain all the necessary files for that page, don't share with other slides


## Main Ideas to Convey

- Introduce Redux as a robust library for managing application state with a centralized store and predictable updates via actions.
- Outline the Redux workflow: action dispatched -> reducer updates state in the store.
- Provide a step-by-step example using Redux Toolkit: defining a slice (`themeSlice`), creating the store with `configureStore`, providing the store, and using `useSelector` and `useDispatch` in a component.

## Visual Ideas

- **Diagram (Redux Unidirectional Data Flow):**
    1. UI Event (e.g., button click).
    2. `dispatch(action)`.
    3. Action goes to Store.
    4. Store passes Action + Current State to Reducer.
    5. Reducer returns New State.
    6. Store updates with New State.
    7. UI re-renders based on New State from Store (via `useSelector`).
    - Use clear arrows and labels for each step.
- **Code Block Highlighting:** For each step in the example (slice, store, provider, component), highlight the key Redux Toolkit functions (`createSlice`, `configureStore`, `Provider`, `useSelector`, `useDispatch`).

## Content

Redux is a robust library for managing and updating the application state using events called actions. It's a centralized store that's shared across the entire application and ensures that the state gets updated in a predictable fashion. When new state is update, an action will be dispatch to a reducer inside the store to update the global states for the app.

This is step-by-step to create and use Redux toolkit manage states:

1.  **Define a store with reducers (slice) and default value.**

    ```javascript
    // themeSlice.js
    import { createSlice } from "@reduxjs/toolkit";

    // Create slice with default state and reducers
    const themeSlice = createSlice({
      name: "themeInfo", // Changed from theme to themeInfo to match useSelector example
      initialState: { theme: "light" },
      reducers: {
        setTheme: (state, action) => {
          state.theme = action.payload.newTheme; // Ensure payload structure matches dispatch
        }
      }
    });

    export const { setTheme } = themeSlice.actions;
    export default themeSlice.reducer;
    ```

2.  **Create store and provider.**

    ```mdx title="themeSlice.js"
    import { createSlice } from "@reduxjs/toolkit";

    const themeSlice = createSlice({
      name: "themeInfo",
      initialState: { theme: "light" },
      reducers: {
        setTheme: (state, action) => {
          // Immer is used by default in createSlice, so direct mutation is okay here.
          state.theme = action.payload.newTheme;
        }
      }
    });

    export const { setTheme } = themeSlice.actions;
    export default themeSlice.reducer;
    ```

    ```mdx title="store.js"
    import { configureStore } from "@reduxjs/toolkit";
    import themeReducer from './themeSlice';

    export const store = configureStore({
      reducer: {
        themeInfo: themeReducer,
        // other reducers can be added here
      }
    });
    ```

    ```mdx title="ReduxThemeProvider.jsx" 
    // This component is optional if you provide the store directly in your app's entry point.
    import React from 'react';
    import { Provider } from "react-redux";
    import { store } from './store'; // Assuming store.js is in the same folder

    export function ReduxThemeProvider({ children }) {
      return (
         <Provider store={store}>
           {children}
         </Provider>
      );
    }
    ```

3.  **Wrap your components with the redux provider to share the theme state. Use the useSelector and useDispatch to get the state from redux store and dispatch new action to update state.**

    ```mdx title="ThemeToggleRedux.jsx"
    import React from "react";
    import { useSelector, useDispatch } from "react-redux";
    import { setTheme } from "./themeSlice"; // Action creator

    function ThemeToggleRedux() {
      const theme = useSelector((state) => state.themeInfo.theme);
      const dispatch = useDispatch();

      const toggleThemeHandler = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(setTheme({ newTheme })); // payload is { newTheme: 'dark' } or { newTheme: 'light' }
      };

      return (
        <div
          style={{
            padding: '20px',
            background: theme === "light" ? "#FFFFFF" : "#333333",
            color: theme === "light" ? "#000000" : "#FFFFFF",
            border: '1px solid #ccc',
            borderRadius: '4px',
            textAlign: 'center'
          }}
        >
          <p>Current theme (Redux): {theme}</p>
          <button onClick={toggleThemeHandler}>Toggle Theme (Redux)</button>
        </div>
      );
    }
    export default ThemeToggleRedux;
    ```

    ```mdx title="App.jsx"
    import React from "react";
    import { ReduxThemeProvider } from "./ReduxThemeProvider"; // Or Provider from react-redux and store from ./store
    import ThemeToggleRedux from "./ThemeToggleRedux";
    // If not using ReduxThemeProvider, you would do:
    // import { Provider } from 'react-redux';
    // import { store } from './store';

    export default function App() {
      return (
        // <Provider store={store}> // Alternative direct usage
        <ReduxThemeProvider>
          <h2>Redux Toolkit Example</h2>
          <ThemeToggleRedux />
        </ReduxThemeProvider>
        // </Provider>
      );
    }
    ```

## Presentation Status: To Be Prepared 