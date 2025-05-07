# React Fundamentals - Component State

## Prerequisites
1. You need to understand the slide content, and search for online blogs about that topic
2. Read at least 3 blogs online
3. You should be creative on how to represent your ideas
4. You should write each slides to be isolated, that is each slide page is a folder, which contain all the necessary files for that page, don't share with other slides

## Main Ideas to Convey

- Explain that component state is managed by State Hooks (typically `useState`).
- Describe how `useState` initializes data and provides a variable and an update function.
- Reinforce that updating state via the update function triggers a re-render of the component.

## Visual Ideas

- **Diagram (`useState` Flow):**
    1. Call `useState(initialValue)` -> Returns `[currentState, setStateFunction]`.
    2. User interacts (e.g., clicks a button).
    3. Call `setStateFunction(newValue)`.
    4. React re-renders component with `currentState` now equal to `newValue`.
    - Use simple visuals for each step, highlighting the `count` variable changing.

## Content

Component state is handled by State hooks. Usually, useState hook is used to initialize data inside a hook. As mentioned earlier, when user update state via update function, component will be re-rendered and new data will be rendered to user.

```mdx title="Counter.jsx"
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // To demonstrate state update, a button is better
  // The useEffect here doesn't actively show typical state update flow
  // useEffect(() => {
  //   // Example: setCount(initialCount => initialCount + 1); // only on mount
  // }, []);

  return (
    <div>
      <p>You've clicked {count} times</p>
      <button onClick={() => setCount(currentCount => currentCount + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;
``` 