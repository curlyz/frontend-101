# React Server Components

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

React Server Components (RSCs) are a newer type of component that render on the server. Their output (which can be a special format, not just HTML) is then sent to the client. This approach can significantly improve initial page load times, reduce the amount of JavaScript sent to the browser, and enhance overall application performance.

Key characteristics of Server Components:

*   They execute on the server, meaning their code doesn't contribute to the client-side JavaScript bundle (for their own logic).
*   They can directly access server-side resources like databases, file systems, or internal APIs without needing to expose API endpoints.
*   They cannot use state (like `useState`) or lifecycle effects (`useEffect`) directly, as these are client-side concepts. They also cannot use browser-only APIs.

Use Server Components when you want to:
*   Optimize for initial page load and perceived performance.
*   Reduce the client-side JavaScript bundle size.
*   Access backend data sources directly during rendering.
*   Render parts of your UI that are not highly interactive or don't require immediate client-side JavaScript.

Modern React frameworks (like Next.js) allow you to seamlessly combine Server Components and Client Components. This hybrid approach lets you build applications that are fast to load (thanks to RSCs) while still offering rich interactivity where needed (thanks to Client Components).

## Presentation Status: Ready for Review 