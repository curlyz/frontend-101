# React Fundamentals - Routing with React Router

## Prerequisites
1. You need to understand the slide content, and search for online blogs about that topic
2. Read at least 3 blogs online
3. You should be creative on how to represent your ideas
4. You should write each slides to be isolated, that is each slide page is a folder, which contain all the necessary files for that page, don't share with other slides


## Main Ideas to Convey

- Explain that React Router (`react-router-dom`) handles routing in React apps.
- Mention it enables navigation without full page refreshes.
- List router types: `BrowserRouter` (common, HTML5 History API), `HashRouter`, `MemoryRouter` (non-browser).
- Highlight features: Declarative Routing (`Routes`, `Route`), Nested Routes, Route Parameters.

## Visual Ideas

- **Diagram (Router Types):**
    - `BrowserRouter`: Icon of a clean URL (e.g., `example.com/path`).
    - `HashRouter`: Icon of a URL with a hash (e.g., `example.com/#/path`).
    - `MemoryRouter`: Icon representing in-memory/no browser bar (e.g., a brain or a server icon).
- **Diagram (Nested Routes):**
    - Show a main route like `/dashboard` rendering a `DashboardLayout`.
    - Inside `DashboardLayout`, show nested routes like `/overview`, `/settings` rendering their respective components within an `<Outlet />`.

## Content

React Router (react-router-dom) is a library for handling routing and navigation in React apps without full page refresh since React doesn't support native routing method. There are 3 types of routers:

* BrowserRouter: Most common use in React apps. It uses HTML5 History API to manage routing, allows URL to be dynamically updated and browser's address bar and history bar are in sync.
* HashRouter: Using URL hash for routing rather than HTML5 History API.
* MemoryRouter: Use in non-browser environments such as React Native or testing.

Features of React Router:

* Declarative Routing: Using Routes and Route component to define routes declaratively, easy to read.
* Nested Routes: Support nested routes, allow complex and hierarchical routing structures
* Route parameters: Support dynamic routing with route parameters for multiple URL patterns.

```mdx title="AppRouter.jsx"
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Placeholder Page Components
const PlaceholderPage = ({ title }) => <h2>{title}</h2>;
const HomePage = () => <PlaceholderPage title="Home Page" />;
const AboutPage = () => <PlaceholderPage title="About Page" />;
const ContactPage = () => <PlaceholderPage title="Contact Page" />;
const NotFoundPage = () => <PlaceholderPage title="404 - Not Found" />;

// Assuming Navbar is a layout component outside Routes
const Navbar = () => (
  <nav>
    <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
  </nav>
);

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App"> {/* Or a general layout component */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route for 404 */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
``` 