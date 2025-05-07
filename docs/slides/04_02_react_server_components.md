# React Client Components vs Server Components - Server Components

## Prerequisites
1. You need to understand the slide content, and search for online blogs about that topic
2. Read at least 3 blogs online
3. You should be creative on how to represent your ideas
4. You should write each slides to be isolated, that is each slide page is a folder, which contain all the necessary files for that page, don't share with other slides


## Main Ideas to Convey

- Define React Server Components (RSC) as components that render on the server.
- Explain Server-Side Rendering (SSR) in the context of RSCs: server sends HTML result to the client.
- Benefits: improved initial load time, reduced JS bundle size, better performance.
- Characteristics: run only on the server, don't add to client JS bundle, can access server-side resources.
- State when to use Server Components (performance optimization, reducing JS, static-like pages).
- Mention combining Client and Server Components (e.g., in Next.js, Vite) for balanced performance and interactivity.

## Visual Ideas

- **Diagram (RSC/SSR Flow):**
    1. Browser requests page.
    2. Server executes React Server Components, generates HTML.
    3. Server sends HTML to browser (potentially streamed).
    4. Browser renders HTML quickly.
    5. (If Client Components are used for interactivity) Minimal JS loads and hydrates specific parts.
    - Contrast with CSR diagram to show HTML being sent earlier.
- **Comparison (Client vs. Server Component):**
    - Two columns.
    - Client Component: Runs in Browser, Can use State/Lifecycle/Browser APIs, Adds to JS Bundle.
    - Server Component: Runs on Server, Cannot use State/Lifecycle/Browser APIs directly (but can fetch data or pass to Client Components), Does NOT add to client JS bundle for its own logic, Can access backend resources.
- **Illustration (Hybrid Approach):** Show a page layout with some parts highlighted as "Server Component (Static Content)" and others as "Client Component (Interactive)".

## Content

React Server Components are components that render on the server side and send the HTML result to the client. This approach can improve initial page load time, reduce JavaScript bundle size, and improve overall app performance.

This approach is known as Server-side Rendering (RSR) [Note: While related, RSCs are a specific evolution beyond traditional SSR, often involving streaming and selective hydration. The original text uses RSR, so keeping it for consistency with the source]. It means:

* They run only on the server and don't add to the client-side JavaScript bundle.
* Access to server-side resources like databases and file systems.

Use Server Components when you need to optimize for performance, reduce JavaScript, or build static-like pages.

Additionally, we can combine Client Components and Server Components to strike a balance between performance and interactivity. Modern frameworks like NextJS and ViteJs support both rendering types, enabling developers to optimize loading speed while still delivering rich, interactive user experiences. 

## Presentation Status: To Be Prepared 