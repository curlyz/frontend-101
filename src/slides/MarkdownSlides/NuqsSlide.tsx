import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  List,
  Row,
  Col,
  Tag,
  Alert,
  Space,
  Divider,
  Input,
  Select,
  InputNumber,
  Button,
} from "antd";
import {
  LinkOutlined, // URL, linking
  SettingOutlined, // Concepts, how it works
  CheckCircleOutlined, // Benefits
  CodeOutlined, // Code examples
  QuestionCircleOutlined, // Use cases
  ExperimentOutlined, // Advanced usage
} from "@ant-design/icons";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const codeBlockStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  padding: "10px",
  whiteSpace: "pre-wrap", // Allow wrapping for long lines in prose
  overflow: "auto",
  maxHeight: "400px",
};

const smallCodeBlockStyle: React.CSSProperties = {
  ...codeBlockStyle,
  fontSize: "0.8em",
  maxHeight: "250px",
  margin: "8px 0",
};

// Assuming we are in a Next.js environment for nuqs
// These would typically come from 'nuqs' and 'nuqs/parsers'
// For the purpose of this slide, we'll mock them if not in a Next.js context,
// or expect them to be available if this app uses nuqs itself.
// In a real app: import { useQueryState, useQueryStates } from 'nuqs'
// import { parseAsInteger, parseAsString } from 'nuqs/parsers'

// --- Mocking nuqs for slide display purposes if not in a Next.js app ---
// IMPORTANT: This is a simplified mock for slide display ONLY.
// In a real application, you would install and import directly from 'nuqs'.
const useQueryStateMock = (key: string, options?: any) => {
  let initialValueFromOptions = options?.defaultValue;
  if (typeof options?.withDefault === "function") {
    // Handle parseAsInteger.withDefault(1) structure
    initialValueFromOptions =
      options.defaultValue ??
      (typeof options === "object" &&
      options !== null &&
      "defaultValue" in options
        ? options.defaultValue
        : undefined);
    if (
      typeof options.defaultValue === "undefined" &&
      typeof options === "object" &&
      options &&
      "default" in options
    )
      initialValueFromOptions = options.default; // common pattern for parsers
  }
  if (typeof initialValueFromOptions === "function")
    initialValueFromOptions = initialValueFromOptions();

  const [value, setValue] = useState(initialValueFromOptions);

  // Simulate URL update for the mock
  useEffect(() => {
    // In a real app, nuqs handles URL updates.
    // Here, we just log it to show intent.
    // console.log(`Mock URL Update: ${key}=${value === null ? '' : value}`);
  }, [key, value]);

  const setQueryValue = (newValue: any) => {
    if (typeof newValue === "function") {
      setValue(newValue);
    } else {
      setValue(newValue);
    }
  };
  return [value, setQueryValue, { loading: false, error: null }]; // Adding mock loading/error state
};

const parseAsIntegerMock = {
  withDefault: (val: number) => ({
    defaultValue: val,
    parse: (v: string) => parseInt(v, 10),
    serialize: (v: number) => String(v),
  }),
  parse: (v: string) => parseInt(v, 10),
  serialize: (v: number) => String(v),
};
const parseAsStringMock = {
  withDefault: (val: string) => ({
    defaultValue: val,
    parse: (v: string) => v,
    serialize: (v: string) => v,
  }),
  parse: (v: string) => v,
  serialize: (v: string) => v,
};

// Use actual nuqs if available (e.g. if this project itself uses Next.js + nuqs)
// Otherwise, fall back to mocks for isolated slide display.
let useQueryStateHook = useQueryStateMock;
let parseAsIntegerParser = parseAsIntegerMock;
let parseAsStringParser = parseAsStringMock;

try {
  const nuqs = require("nuqs");
  const nuqsParsers = require("nuqs/parsers");
  if (nuqs.useQueryState) useQueryStateHook = nuqs.useQueryState;
  if (nuqsParsers.parseAsInteger)
    parseAsIntegerParser = nuqsParsers.parseAsInteger;
  if (nuqsParsers.parseAsString)
    parseAsStringParser = nuqsParsers.parseAsString;
} catch (e) {
  console.warn(
    "nuqs library not found, using mocks for NuqsSlide demo. For full interactivity, run in a Next.js app with nuqs installed.",
  );
}
// --- End Mocking nuqs ---

/**
 * @function NuqsSlide
 * @description A React functional component explaining state management using URL query parameters
 * with the `nuqs` library. Covers concepts, benefits, usage, and use cases.
 * @returns {React.ReactElement} The NuqsSlide component.
 * @example
 * <NuqsSlide />
 */
const NuqsSlide: React.FC = () => {
  const mainIdeas = [
    "`nuqs`: A library for Next.js (and React) to manage state in URL query parameters.",
    "Simplifies reading, writing, and parsing query string values.",
    "Provides hooks similar to `useState` for a familiar developer experience.",
    "Enables shareable, bookmarkable, and SSR-friendly state.",
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={2}>
        <LinkOutlined /> State Management with URL Query Params: `nuqs`
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }} align="middle">
        <Col xs={24}>
          <Card title="Key Ideas about `nuqs`">
            <List
              dataSource={mainIdeas}
              renderItem={(item) => (
                <List.Item>
                  <CheckCircleOutlined
                    style={{ color: "green", marginRight: 8 }}
                  />{" "}
                  {item}
                </List.Item>
              )}
            />
            <Paragraph style={{ marginTop: 10 }}>
              <Text strong>Website:</Text>{" "}
              <a
                href="https://nuqs.47ng.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                nuqs.47ng.com
              </a>
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Section 1: What is nuqs? */}
      <Card
        title={
          <Space>
            <QuestionCircleOutlined /> What is `nuqs`?
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        <Paragraph>
          <Text code>nuqs</Text> (pronounced /nooks/, stands for Next.js URL
          Query State) is a React library designed to simplify state management
          by storing state directly in the URL query parameters. While initially
          built with Next.js in mind (supporting both App and Pages routers), it
          can be used in other React applications that use a compatible router
          (like React Router v6+).
        </Paragraph>
        <Paragraph>
          It provides a set of hooks, primarily <Text code>useQueryState</Text>{" "}
          and <Text code>useQueryStates</Text>, that behave similarly to React's{" "}
          <Text code>useState</Text> hook but interact with the URL search
          parameters instead of local component state.
        </Paragraph>
        <Alert
          message="Core Goal: URL as the Single Source of Truth for Certain State"
          description="By leveraging the URL, `nuqs` makes application state easily shareable, bookmarkable, and resilient to page reloads."
          type="info"
          showIcon
          style={{ marginTop: 15 }}
        />
      </Card>

      {/* Section 2: Core Concepts */}
      <Card
        title={
          <Space>
            <SettingOutlined /> Core Concepts
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        <List itemLayout="vertical">
          <List.Item>
            <List.Item.Meta
              title={<Text strong>Hooks-based API</Text>}
              description={
                <>
                  <Paragraph>
                    The primary way to interact with `nuqs` is through its
                    hooks:
                  </Paragraph>
                  <List size="small">
                    <List.Item>
                      <Text code>useQueryState</Text>: For managing a single
                      query parameter. Returns the current value and a setter
                      function.
                    </List.Item>
                    <List.Item>
                      <Text code>useQueryStates</Text>: For managing multiple
                      query parameters with a single state object and updater.
                      Useful for batching updates.
                    </List.Item>
                  </List>
                </>
              }
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={<Text strong>Parsers</Text>}
              description={
                <>
                  <Paragraph>
                    URL query parameters are always strings. `nuqs` uses parsers
                    to convert these strings to and from other JavaScript types
                    (e.g., numbers, booleans, dates, JSON objects).
                  </Paragraph>
                  <Paragraph>
                    It comes with several built-in parsers like{" "}
                    <Text code>parseAsInteger</Text>,{" "}
                    <Text code>parseAsFloat</Text>,{" "}
                    <Text code>parseAsBoolean</Text>,{" "}
                    <Text code>parseAsIsoDateTime</Text>,{" "}
                    <Text code>parseAsJson</Text>, and more. You can also create
                    custom parsers.
                  </Paragraph>
                </>
              }
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={<Text strong>Default Values</Text>}
              description={
                <Paragraph>
                  You can specify default values for your query parameters. If
                  the parameter is not present in the URL, `nuqs` will return
                  the default value. Setting the state back to the default value
                  typically removes it from the URL.
                </Paragraph>
              }
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={
                <Text strong>Server-Side Rendering (SSR) Compatibility</Text>
              }
              description={
                <Paragraph>
                  `nuqs` is designed to work seamlessly with SSR frameworks like
                  Next.js. It can read initial values from the URL on the server
                  and hydrate correctly on the client.
                </Paragraph>
              }
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={<Text strong>History and Navigation</Text>}
              description={
                <Paragraph>
                  Updates to query parameters are managed via the router (e.g.,
                  Next.js router). You can control whether updates push a new
                  entry into the browser history or replace the current one
                  (shallow routing).
                </Paragraph>
              }
            />
          </List.Item>
        </List>
      </Card>

      {/* Section 3: Benefits */}
      <Card
        title={
          <Space>
            <CheckCircleOutlined /> Benefits of Using `nuqs`
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        <List>
          <List.Item>
            <Text strong>Shareable State:</Text> Users can copy and share URLs
            that include the application's state (e.g., filters, search queries,
            open tabs).
          </List.Item>
          <List.Item>
            <Text strong>Bookmarkable State:</Text> Users can bookmark specific
            states of the application.
          </List.Item>
          <List.Item>
            <Text strong>SSR/SSG Friendly:</Text> Works well with server-side
            rendering and static site generation as the state is available from
            the URL on initial load.
          </List.Item>
          <List.Item>
            <Text strong>Declarative API:</Text> Manages URL state in a way that
            feels similar to React's local state.
          </List.Item>
          <List.Item>
            <Text strong>Improved User Experience:</Text> Back/forward browser
            buttons work as expected, restoring previous states.
          </List.Item>
          <List.Item>
            <Text strong>Reduced Client-Side State Management:</Text> For
            certain types of state, it can simplify or replace more complex
            client-side solutions.
          </List.Item>
          <List.Item>
            <Text strong>Type Safety:</Text> Parsers allow you to work with
            typed values in your application code.
          </List.Item>
        </List>
      </Card>

      {/* Section 4: Basic Usage Examples */}
      <Card
        title={
          <Space>
            <CodeOutlined /> Basic Usage Examples
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        <Paragraph>
          Here's how you might use `nuqs` in a Next.js component (App Router
          example, Pages Router is similar but setup might vary slightly for the
          provider). First, ensure you have `nuqs` installed:
        </Paragraph>
        <SyntaxHighlighter
          language="bash"
          style={atomDark}
          customStyle={codeBlockStyle}
        >
          {`npm install nuqs
# or
yarn add nuqs`}
        </SyntaxHighlighter>
        <Paragraph>
          For Next.js App Router, query parameter updates are typically
          client-side navigations.
        </Paragraph>

        <Divider>Single Query Parameter (String)</Divider>
        <SyntaxHighlighter
          language="tsx"
          style={atomDark}
          customStyle={codeBlockStyle}
        >
          {`'use client' // Required for hooks in Next.js App Router

import { useQueryState } from 'nuqs'

export default function SearchInput() {
  const [search, setSearch] = useQueryState('q') // 'q' is the query param name

  return (
    <input
      value={search ?? ''}
      onChange={e => setSearch(e.target.value || null)} // Set to null to remove from URL
    />
  );
}`}
        </SyntaxHighlighter>

        <Divider>With a Parser and Default Value</Divider>
        <SyntaxHighlighter
          language="tsx"
          style={atomDark}
          customStyle={codeBlockStyle}
        >
          {`'use client'

import { useQueryState } from 'nuqs'
import { parseAsInteger } from 'nuqs/parsers'

export default function PageCounter() {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  )

  return (
    <div>
      <p>Current page: {page}</p>
      <button onClick={() => setPage(p => p + 1)}>Next Page</button>
      <button onClick={() => setPage(1)}>Reset to Page 1</button>
      <button onClick={() => setPage(null)}>Clear Page Param</button> 
    </div>
  );
}`}
        </SyntaxHighlighter>
        <Paragraph>
          <Text strong>Note:</Text> Setting the state to `null` typically
          removes the parameter from the URL. If a default value is specified,
          `nuqs` will return the default value when the parameter is absent.
        </Paragraph>
      </Card>

      {/* Section 5: Advanced Usage */}
      <Card
        title={
          <Space>
            <ExperimentOutlined /> Advanced Usage
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        <Divider>
          <Text code>useQueryStates</Text> for Multiple Parameters
        </Divider>
        <Paragraph>
          When dealing with multiple query parameters that might need to be
          updated together or derived from a single piece of logic,{" "}
          <Text code>useQueryStates</Text> is often more convenient and
          performant as it batches updates.
        </Paragraph>
        <SyntaxHighlighter
          language="tsx"
          style={atomDark}
          customStyle={codeBlockStyle}
        >
          {`'use client'

import { useQueryStates } from 'nuqs'
import { parseAsInteger, parseAsString } from 'nuqs/parsers'

export default function FilterControls() {
  const [filters, setFilters] = useQueryStates({
    sort: parseAsString.withDefault('name'),
    order: parseAsString.withDefault('asc'),
    itemsPerPage: parseAsInteger.withDefault(10)
  })

  const handleSortChange = (newSort: string) => {
    setFilters({ sort: newSort, order: 'asc' }) // Reset order when sort changes
  }

  return (
    <div>
      <select value={filters.sort} onChange={e => handleSortChange(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="date">Sort by Date</option>
      </select>
      <select value={filters.order} onChange={e => setFilters({ order: e.target.value })}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <input 
        type="number"
        value={filters.itemsPerPage}
        onChange={e => setFilters({ itemsPerPage: parseInt(e.target.value) || null })}
      />
      <button onClick={() => setFilters(null)}>Clear All Filters</button>
    </div>
  );
}`}
        </SyntaxHighlighter>
        <Paragraph>
          Setting <Text code>setFilters(null)</Text> would remove all keys
          defined in <Text code>useQueryStates</Text> from the URL (or set them
          to their defaults if specified and the default value means absence).
          To remove a single key, you can pass <Text code>null</Text> for its
          value, e.g., <Text code>setFilters({"{ itemsPerPage: null }"})</Text>.
        </Paragraph>

        <Divider>Custom Parsers</Divider>
        <Paragraph>
          `nuqs` allows you to define custom parsers if the built-in ones don't
          meet your needs. A parser is an object with <Text code>parse</Text>{" "}
          (string to value) and <Text code>serialize</Text> (value to string)
          functions.
        </Paragraph>
        <SyntaxHighlighter
          language="tsx"
          style={atomDark}
          customStyle={smallCodeBlockStyle}
        >
          {`// Example: A simple comma-separated string array parser
export const parseAsArray = {
  parse: (query: string) => query.split(','),
  serialize: (values: string[]) => values.join(','),
  // You can also add withDefault here
}

// Usage:
// const [tags, setTags] = useQueryState('tags', parseAsArray.withDefault([]));`}
        </SyntaxHighlighter>
        <Alert
          message="Shallow Routing and Navigation Options"
          description={
            <Paragraph>
              `nuqs` allows you to control navigation behavior (e.g., `shallow`,
              `scroll`, `replace` vs `push`) through options passed to the
              `useQueryState` or `useQueryStates` hooks. This is useful for
              preventing full page reloads or managing browser history
              effectively. Refer to `nuqs` documentation for details.
            </Paragraph>
          }
          type="info"
          showIcon
          style={{ marginTop: 15 }}
        />
      </Card>

      {/* Interactive Demo Section */}
      <NuqsInteractiveDemo />

      {/* Section 6: When to Use nuqs */}
      <Card
        title={
          <Space>
            <QuestionCircleOutlined /> When to Use `nuqs` (Use Cases)
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        <Paragraph>`nuqs` is particularly well-suited for:</Paragraph>
        <List>
          <List.Item>
            <Text strong>Filters and Sorting:</Text> For e-commerce sites,
            dashboards, or any list view that needs filtering (e.g., category,
            price range) and sorting.
          </List.Item>
          <List.Item>
            <Text strong>Search Queries:</Text> Storing user search terms
            directly in the URL.
          </List.Item>
          <List.Item>
            <Text strong>Pagination:</Text> Managing the current page number for
            paginated content.
          </List.Item>
          <List.Item>
            <Text strong>Tabs and UI State:</Text> Persisting which tab is
            active or the state of certain UI elements that you want to be
            shareable.
          </List.Item>
          <List.Item>
            <Text strong>Modal States:</Text> Sometimes, for controlling the
            visibility of a modal if its open state needs to be linkable (e.g.,
            a specific "share" modal with pre-filled content based on URL).
          </List.Item>
          <List.Item>
            <Text strong>Feature Flags (for demos/testing):</Text> Toggling
            features via URL params for easy testing or demos.
          </List.Item>
        </List>
        <Divider>Considerations</Divider>
        <List>
          <List.Item>
            <Text strong>URL Length Limits:</Text> Browsers have URL length
            limits. Avoid storing very large or complex objects directly in the
            URL. `nuqs` is best for relatively simple state.
          </List.Item>
          <List.Item>
            <Text strong>Security/Sensitivity:</Text> Do not store sensitive
            information (tokens, PII) in URL query parameters as they are easily
            visible and logged.
          </List.Item>
          <List.Item>
            <Text strong>Not a Global State Replacement:</Text> While powerful
            for URL-bound state, `nuqs` doesn't replace global state managers
            (like Zustand, Redux, Context API) for all types of application
            state, especially transient UI state or complex, non-shareable data.
          </List.Item>
        </List>
      </Card>

      <Alert
        message="Further Learning"
        description={
          <Paragraph>
            For the most up-to-date information, advanced configurations, and
            more examples, always refer to the official{" "}
            <a
              href="https://nuqs.47ng.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              `nuqs` documentation
            </a>
            .
          </Paragraph>
        }
        type="success"
        showIcon
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

const NuqsInteractiveDemo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useQueryStateHook(
    "demo_q",
    parseAsStringParser.withDefault(""),
  );
  const [count, setCount] = useQueryStateHook(
    "demo_count",
    parseAsIntegerParser.withDefault(0),
  );
  const [category, setCategory] = useQueryStateHook(
    "demo_cat",
    parseAsStringParser.withDefault("all"),
  );

  const [simulatedUrl, setSimulatedUrl] = useState("/slides/nuqs");

  useEffect(() => {
    const queryParams = new URLSearchParams();
    let actualSearchTerm = "";
    let actualCount = 0;
    let actualCategory = "all";

    // Try to get actual values from window.location.search if available, for more realism
    // This is a bit of a hack for a demo and might not always be perfectly in sync
    // if nuqs has its own debouncing/batching that isn't immediate.
    if (typeof window !== "undefined") {
      const currentParams = new URLSearchParams(window.location.search);
      actualSearchTerm = currentParams.get("demo_q") || "";
      actualCount = parseInt(currentParams.get("demo_count") || "0", 10);
      actualCategory = currentParams.get("demo_cat") || "all";
    }

    // Fallback to nuqs state if window.location.search isn't helpful or to show immediate effect
    const finalSearchTerm = searchTerm === null ? "" : searchTerm;
    const finalCount = count === null ? 0 : count;
    const finalCategory = category === null ? "all" : category;

    if (finalSearchTerm && finalSearchTerm !== "")
      queryParams.set("demo_q", finalSearchTerm);
    if (finalCount !== 0) queryParams.set("demo_count", String(finalCount));
    if (finalCategory && finalCategory !== "all")
      queryParams.set("demo_cat", finalCategory);

    const queryString = queryParams.toString();
    setSimulatedUrl(`/slides/nuqs${queryString ? `?${queryString}` : ""}`);
  }, [searchTerm, count, category]); // Re-run when nuqs states change

  const handleReset = () => {
    setSearchTerm(null); // Or default value ''
    setCount(null); // Or default value 0
    setCategory(null); // Or default value 'all'
  };

  return (
    <Card title="Live Demo: URL State Interaction" style={{ marginTop: 20 }}>
      <Paragraph>
        Interact with the controls below. Observe how the "Simulated URL Bar"
        updates. Also, check your browser's actual URL bar!
      </Paragraph>
      <Row gutter={[16, 16]} align="bottom">
        <Col xs={24} sm={8}>
          <Text>Search Term (demo_q):</Text>
          <Input
            placeholder="Type here..."
            value={searchTerm ?? ""}
            onChange={(e) => setSearchTerm(e.target.value || null)}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Text>Count (demo_count):</Text>
          <InputNumber
            style={{ width: "100%" }}
            value={count ?? 0}
            onChange={(value) =>
              setCount(value === null ? null : Number(value))
            }
          />
        </Col>
        <Col xs={24} sm={8}>
          <Text>Category (demo_cat):</Text>
          <Select
            style={{ width: "100%" }}
            value={category ?? "all"}
            onChange={(value) => setCategory(value || null)}
          >
            <Option value="all">All</Option>
            <Option value="electronics">Electronics</Option>
            <Option value="books">Books</Option>
            <Option value="clothing">Clothing</Option>
          </Select>
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <Button onClick={handleReset} type="dashed">
            Reset Demo Fields to Defaults
          </Button>
        </Col>
      </Row>
      <Divider>Simulated URL Bar</Divider>
      <div
        style={{
          padding: "10px",
          backgroundColor: "#000",
          borderRadius: "4px",
          fontFamily: "monospace",
          wordBreak: "break-all",
          border: "1px solid #ccc",
        }}
      >
        {simulatedUrl}
      </div>
      <Alert
        type="warning"
        style={{ marginTop: 15 }}
        message="Demo Limitations"
        description="This demo uses simplified mocks for `nuqs` if the library isn't available in this project context. The simulated URL reflects the state; the actual URL bar in your browser is what `nuqs` truly controls in a Next.js app."
      />
    </Card>
  );
};

export default NuqsSlide;
