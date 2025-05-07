# React State Management - React Context

## Prerequisites
1. You need to understand the slide content, and search for online blogs about that topic
2. Read at least 3 blogs online
3. You should be creative on how to represent your ideas
4. You should write each slides to be isolated, that is each slide page is a folder, which contain all the necessary files for that page, don't share with other slides


## Main Ideas to Convey

- Explain that Context API provides a way to pass data through the component tree without manual prop drilling.
- Describe the process: create context, provide context value, consume context value (using `useContext` hook).
- Illustrate with a step-by-step example (ThemeContext: creating context, ThemeProvider, useTheme custom hook, and ThemeToggle component).

## Visual Ideas

- **Diagram (Context API Flow):**
    1. `createContext()`: Show a context object being created.
    2. `<MyContext.Provider value={...}>`: Show a component tree wrapped by the Provider, with the `value` highlighted.
    3. `useContext(MyContext)`: Show a descendant component accessing the `value` directly, without props passing through intermediate components.
- **Highlight Code Sections:** In the example code, visually distinguish the creation of the context, the provider component, and the consumer component (using `useTheme`).

## Content

Context provides a way to pass data through the component tree without having to pass props down manually at every level. Context creates a provider which wraps over components that share same state. All children, grandchildren, … components have access to the shared state using useContext hook.

This is step-by-step to create and use Context to manage states:

1. Create a context with a default value and a provider component that uses the `useState` hook to manage shared state across components. This setup allows both reading and updating the state. Then, define a custom hook using `useContext` to easily access the context values within any component.

   ```javascript
   // ThemeContext.js
   import React, { createContext, useState, useContext } from "react";

   const ThemeContext = createContext({
     theme: "light", // Default value
     setTheme: (theme) => {} // Placeholder for updater function
   });

   export function ThemeProvider({ children }) {
     const [theme, setTheme] = useState("light"); // Actual state management

     return (
       <ThemeContext.Provider value={{ theme, setTheme }}>
         {children}
       </ThemeContext.Provider>
     );
   }

   export function useTheme() {
     return useContext(ThemeContext);
   }
   ```

2. Wrap your components with the context provider to share the theme state. Use the custom hook to access and modify the theme from any component.

   ```mdx title="ThemeContext.js"
   import React, { createContext, useState, useContext } from "react";

   const ThemeContext = createContext({
     theme: "light", // Default value
     // It's good practice for the default context to match the shape of the provider value
     setTheme: () => console.warn("setTheme called without a ThemeProvider"),
   });

   export function ThemeProvider({ children }) {
     const [theme, setTheme] = useState("light"); // Actual state management

     return (
       <ThemeContext.Provider value={{ theme, setTheme }}>
         {children}
       </ThemeContext.Provider>
     );
   }

   export function useTheme() {
     const context = useContext(ThemeContext);
     if (context === undefined) {
       throw new Error("useTheme must be used within a ThemeProvider");
     }
     return context;
   }
   ```

   ```mdx title="App.jsx"
   // App.js / ThemeToggle.js
   import React from "react";
   import { ThemeProvider, useTheme } from "./ThemeContext"; // Assuming ThemeContext.js

   function ThemeToggle() {
     const { theme, setTheme } = useTheme();

     const toggleTheme = () => {
       setTheme(theme === "light" ? "dark" : "light");
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
         <p>Current theme: {theme}</p>
         <button onClick={toggleTheme}>Toggle Theme</button>
       </div>
     );
   }

   function App() {
     return (
       <ThemeProvider>
         <h2>React Context API Example</h2>
         <ThemeToggle />
         {/* Other components can also use useTheme() if they are descendants of ThemeProvider */}
       </ThemeProvider>
     );
   }
   export default App;
   ```

## Presentation Status: To Be Prepared 