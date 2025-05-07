# Introduction to SPA and React - React Virtual DOM

## Prerequisites
1. You need to understand the slide content, and search for online blogs about that topic
2. Read at least 3 blogs online
3. You should be creative on how to represent your ideas
4. You should write each slides to be isolated, that is each slide page is a folder, which contain all the necessary files for that page, don't share with other slides


## Main Ideas to Convey

- Explain what the Virtual DOM is and its purpose in React.
- Describe the step-by-step process of how the Virtual DOM works (Initial Rendering, State/Props Changes, Comparison/Diffing, Reconciliation, Update to Real DOM).
- Highlight the benefits of using Virtual DOM (declarative coding, performance, user experience).

## Visual Ideas

- **Diagram (Virtual DOM Process):** A flowchart or sequence diagram illustrating the 5 steps:
    1.  Initial Render (VDOM created)
    2.  State/Prop Change (New VDOM created)
    3.  Comparison (VDOM Diffing - highlight the changed parts)
    4.  Reconciliation (Efficient update plan)
    5.  Real DOM Update (Only changed parts updated in Real DOM visual)
    - Use icons for VDOM (light, quick) and Real DOM (heavier, slower-to-update impression).
- **Text Placeholder Replacement:** The text "React Virtual DOM" (line 19) should be replaced with an actual diagram or illustration if possible during presentation. This note is a reminder.

## Content

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

## Presentation Status: To Be Prepared 