# React Client Components

## Main Ideas to Convey

- Explain that React components are client-rendered by default.
- Describe Client-Side Rendering (CSR): server sends JS bundle, browser executes it, React mounts components and builds UI dynamically.
- Mention that initial HTML is minimal, and dynamic interactions are handled on the client.
- State when to use Client Components (user interactions, dynamic states, browser APIs).

## Visual Ideas

- **Diagram (CSR Flow):**
    1. Browser requests page.
    2. Server sends minimal HTML + JS bundle link.
    3. Browser downloads JS bundle.
    4. Browser executes JS, React initializes, renders UI.
    - Use icons for Browser, Server, JS file, rendered UI.
- **Timeline (Initial Load):** Show a timeline comparing CSR initial paint time (potentially slower as JS needs to load/execute) vs. a Server-Rendered approach (faster initial paint).
- **List of Use Cases with Icons:**
    - User Interactions: Icon of a mouse click or touch.
    - Dynamic States: Icon of changing data / refresh symbol.
    - Browser APIs: Icon of a browser window or globe (for `window`, `document`, etc.).

## Content

In React, components are rendered on the client by default. When a user visits a React application, the server sends a bundle of JavaScript code to the browser. This code is then executed in the user's browser, where React takes over to mount components and render the user interface dynamically.

This approach is known as Client-Side Rendering (CSR). It means:

* The initial HTML page is mostly empty or minimal.
* The UI is built and displayed after the JavaScript loads and React initializes.
* Any dynamic interaction (like clicking buttons, fetching data, updating UI) is handled on the client.

Use Client Components when you need user interactions, dynamic states, or access to browser APIs. 

## Presentation Status: Ready for Review 