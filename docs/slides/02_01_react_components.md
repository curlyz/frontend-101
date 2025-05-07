# React Fundamentals - React Components

## Prerequisites
1. You need to understand the slide content, and search for online blogs about that topic
2. Read at least 3 blogs online
3. You should be creative on how to represent your ideas
4. You should write each slides to be isolated, that is each slide page is a folder, which contain all the necessary files for that page, don't share with other slides

## Main Ideas to Convey

- Explain that React apps are built using components.
- Define a component as a reusable piece of UI with its own logic and appearance (JS function returning HTML).
- Mention that components can store state, be nested, and pass data.

## Visual Ideas

- **Diagram (Component Hierarchy):** Show a tree-like structure:
    - Root: `App` component.
    - Children: `Header`, `Sidebar`, `MainContent`, `Footer` components.
    - Grandchildren: `Button`, `Card`, `ListItem` components nested within their parents.
    - Use simple colored blocks for each component.
- **Conceptual Code Snippet (JS function returning HTML):**
    ```mdx
    function MyButton(props) {
      return <button>{props.label}</button>;
    }
    ```
- **Text Placeholder Replacement:** The text "Example of Page made out of several components" should be replaced with an actual UI mockup or diagram showing a webpage broken down into its constituent components (e.g., a blog post with header, article body, sidebar, comments section, all highlighted as components).

## Content

React apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance, serve as a Javascript function but return HTML. Each component will store its own state and render relevant UI. Components can also be nested together from simple small button to become a complex page. Components also handle its data through state, passing its data to children components, etc. We will get to know them further in next parts.

Example of Page made out of several components 

## Presentation Status: To Be Prepared 