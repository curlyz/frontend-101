# React Fundamentals - Component Props

## Prerequisites
1. You need to understand the slide content, and search for online blogs about that topic
2. Read at least 3 blogs online
3. You should be creative on how to represent your ideas
4. You should write each slides to be isolated, that is each slide page is a folder, which contain all the necessary files for that page, don't share with other slides

## Main Ideas to Convey

- Explain how parent components pass state (data) to child components via props.
- Show an example of a parent component passing a `count` prop to a child component.
- Introduce the problem of prop drilling for deeply nested or sibling components and hint at solutions (Context API, Redux).

## Visual Ideas

- **Diagram (Props Flow):**
    - Show `ParentComponent` with a state variable `data`.
    - Arrow from `ParentComponent` passing `data` as a prop to `ChildComponent`.
    - `ChildComponent` displaying the received prop.
- **Diagram (Prop Drilling Problem):**
    - Show `Grandparent` passing prop to `Parent`, then `Parent` passing to `Child`, then `Child` passing to `Grandchild`.
    - Highlight the intermediate components that just pass the prop along without using it.
    - Use a "long and winding road" visual metaphor.

## Content

When a component is nested inside another, parent component can pass it's state to the children one.

```mdx title="ParentChild.jsx"
import { useState, useEffect } from 'react';

function Child({ message }) { // Renamed prop for clarity
  return <div>Message from parent: {message}</div>;
}

function Parent() {
  const [parentMessage, setParentMessage] = useState("Hello from Parent!");

  // useEffect here is not essential for demonstrating props
  // but could be used to simulate a change in parentMessage
  // useEffect(() => {
  //   setTimeout(() => setParentMessage("Parent message updated!"), 2000);
  // }, []);

  return (
    <div>
      <Child message={parentMessage} />
      <button onClick={() => setParentMessage("New message: " + Date.now())}>
        Update Message
      </button>
    </div>
  );
}

export default Parent;
```

However, there is problem when passing data between sibling components or distant children components (props drilling). Therefore, state management hooks like useContext or Redux are used provide data among various components which will be introduced in later chapter.

## Presentation Status: To Be Prepared
