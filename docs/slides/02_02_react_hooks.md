# React Fundamentals - React Hooks

## Prerequisites
1. You need to understand the slide content, and search for online blogs about that topic
2. Read at least 3 blogs online
3. You should be creative on how to represent your ideas
4. You should write each slides to be isolated, that is each slide page is a folder, which contain all the necessary files for that page, don't share with other slides

## Main Ideas to Convey

- Introduce React Hooks as features for managing state and lifecycle in functional components.
- List and briefly describe common Hook types: State, Context, Ref, Effect, Performance.
- State the rules of Hooks (only in function components, at the top level, not conditional).
- Emphasize how Hooks simplify state and lifecycle management.

## Visual Ideas

- **Icons for Each Hook Type:**
    - `useState`: Icon representing data/state (e.g., a database symbol or a brain).
    - `useContext`: Icon representing sharing/connection (e.g., interconnected circles or hands shaking).
    - `useRef`: Icon representing a direct pointer or a memory chip.
    - `useEffect`: Icon representing side effects or lifecycle (e.g., a gear turning or a plant growing).
    - `useMemo`/`useCallback` (Performance): Icon representing speed or optimization (e.g., a stopwatch or a lightning bolt).
- **Do/Don't for Rules of Hooks:**
    - **DO:** Show a hook (`useState()`) at the top level of a function component.
    - **DON'T:** Show a hook inside an `if` statement or a loop.
    - Use green checkmark for DO, red X for DON'T.

## Content

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

## Presentation Status: To Be Prepared 