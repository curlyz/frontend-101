import React, { useEffect } from "react";
import {
  Card,
  Typography,
  Space,
  Divider,
  List,
  Table,
  Row,
  Col,
  Button,
  Spin,
  Alert,
} from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";
// Remove old imports if they are no longer used
// import SimpleDataFetcher from "@/components/features/data-fetching/SimpleDataFetcher";
// import DependentFetcher from "@/components/features/data-fetching/DependentFetcher";
import DirectPokemonList from "@/components/features/data-fetching/DirectPokemonList";
import SwrPokemonList from "@/components/features/data-fetching/SwrPokemonList";
import SwrPrefetchPokemon from "@/components/features/data-fetching/SwrPrefetchPokemon";

const { Title, Paragraph, Text } = Typography;

const columns = [
  {
    title: "Feature ✨",
    dataIndex: "feature",
    key: "feature",
    render: (text: string) => <Text strong>{text}</Text>, // Make feature names bold
  },
  {
    title: "Manual Fetch (useEffect) ✋",
    dataIndex: "manual",
    key: "manual",
  },
  {
    title: "Basic SWR (e.g., usePokemonList) 🎣",
    dataIndex: "basicSWR",
    key: "basicSWR",
  },
  {
    title: "Advanced SWR (e.g., SwrPrefetchPokemon) 🚀",
    dataIndex: "advancedSWR",
    key: "advancedSWR",
  },
];

const dataSource = [
  {
    key: "1",
    feature: "Boilerplate Code 📝",
    manual: "High (manual states & effects)",
    basicSWR: "Low (handles states internally)",
    advancedSWR: "Low (concise prefetch logic)",
  },
  {
    key: "2",
    feature: "Caching Strategy 🗄️",
    manual: "Manual & Complex",
    basicSWR: "Auto (stale-while-revalidate) ✅",
    advancedSWR: "Auto (SWR) + Proactive Prefetch ✅⚡️",
  },
  {
    key: "3",
    feature: "Automatic Revalidation 🔄",
    manual: "Manual (focus, interval, etc.)",
    basicSWR: "Built-in (focus, interval) 👍",
    advancedSWR: "Built-in (like Basic SWR) 👍",
  },
  {
    key: "4",
    feature: "Request Deduplication 🔗",
    manual: "Manual checks needed",
    basicSWR: "Automatic 🤓",
    advancedSWR: "Automatic 🤓",
  },
  {
    key: "5",
    feature: "Loading State Handling ⏳",
    manual: (
      <Text>
        Manual <Text code>isLoading</Text> state
      </Text>
    ),
    basicSWR: (
      <Text>
        Built-in <Text code>isLoading</Text>/<Text code>isValidating</Text>
      </Text>
    ),
    advancedSWR: (
      <Text>
        Built-in <Text code>isLoading</Text>/<Text code>isValidating</Text>
      </Text>
    ),
  },
  {
    key: "6",
    feature: "Error Handling 🚨",
    manual: (
      <Text>
        Manual <Text code>try...catch</Text> & state
      </Text>
    ),
    basicSWR: (
      <Text>
        Built-in <Text code>error</Text> object
      </Text>
    ),
    advancedSWR: (
      <Text>
        Built-in <Text code>error</Text> object
      </Text>
    ),
  },
  {
    key: "7",
    feature: "Pagination Support 🔢",
    manual: "Manual (offset, refetch)",
    basicSWR: "Easier (SWR handles refetch)",
    advancedSWR: "Easier + Hover Prefetch for pages",
  },
  {
    key: "8",
    feature: "Dependent / Serial Requests ➡️",
    manual: "Complex (nested effects)",
    basicSWR: "Simpler (conditional fetch)",
    advancedSWR: "Simpler (like Basic SWR)",
  },
  {
    key: "9",
    feature: "Optimistic UI ✨",
    manual: "Manual/Complex",
    basicSWR: "Supported (mutate locally)",
    advancedSWR: "Supported (mutate locally)",
  },
  {
    key: "10",
    feature: "Prefetching / Preloading 💨",
    manual: "Manual implementation",
    basicSWR: (
      <Text>
        Via <Text code>preload</Text> (basic use)
      </Text>
    ),
    advancedSWR: (
      <Text>
        Core! (<Text code>preload</Text> on hover) 🌟
      </Text>
    ),
  },
  {
    key: "11",
    feature: "Focus Tracking 🎯",
    manual: "Manual listeners",
    basicSWR: "Auto revalidate on focus",
    advancedSWR: "Auto revalidate on focus",
  },
  {
    key: "12",
    feature: "Polling / Real-time ⏱️",
    manual: (
      <Text>
        Manual <Text code>setInterval</Text>
      </Text>
    ),
    basicSWR: (
      <Text>
        Via <Text code>refreshInterval</Text>
      </Text>
    ),
    advancedSWR: (
      <Text>
        Via <Text code>refreshInterval</Text>
      </Text>
    ),
  },
  {
    key: "13",
    feature: "Developer Experience (DX) 😊",
    manual: "Cumbersome, error-prone",
    basicSWR: "Improved, declarative",
    advancedSWR: "Excellent, powerful & easy",
  },
  {
    key: "14",
    feature: "Bundle Size Impact 📦",
    manual: "Minimal (React only)",
    basicSWR: "Small library",
    advancedSWR: "Small library",
  },
  {
    key: "15",
    feature: "Performance (Perceived) 🏃‍♀️💨",
    manual: "Slow if unoptimized",
    basicSWR: "Good (cache, revalidate)",
    advancedSWR: "Best (cache, prefetch feels instant) 🏆",
  },
];

const directPokemonListCode = `
// DirectPokemonList.tsx (Simplified)
import React, { useState, useEffect, useCallback } from "react";
import { pokemonList } from "@/gen/clients/pokemonController";
import { Button, Spin, Alert, List } from "antd";
// ... other imports ...

const DirectPokemonList: React.FC = () => {
  const [data, setData] = useState<PokemonListType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [fetchCount, setFetchCount] = useState<number>(0); // For pagination

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await pokemonList({
        limit: 10,
        offset: (fetchCount * 10) % 100, // Example pagination
      });
      setData(result);
    } catch (err) {
      setError(err as Error);
    }
    setIsLoading(false);
  }, [fetchCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReload = () => {
    setFetchCount((prev) => prev + 1);
  };

  // ... rendering logic ...
  return (
    <Card title="Direct API Call: Pokémon List">
      <Button onClick={handleReload} loading={isLoading} disabled={isLoading}>
        {isLoading ? "Loading..." : "Reload Pokémon List (Next Page)"}
      </Button>
      {/* ... Spin, Alert, List rendering ... */}
    </Card>
  );
};
`;

const swrPokemonListCode = `
// SwrPokemonList.tsx (Simplified)
import React, { useState } from "react";
import { usePokemonList, pokemonListQueryKey } from "@/gen/swr/pokemonController";
import { pokemonList } from "@/gen/clients/pokemonController"; // For preload
import { preload } from "swr";
import { Button, Spin, Alert, List, Tag } from "antd";
// ... other imports ...

const SwrPokemonList: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const { data, error, isLoading, isValidating, mutate } = usePokemonList({
    limit,
    offset,
  });

  const handleNextPage = () => {
    if (data && data.count && offset + limit < data.count) {
      setOffset((prevOffset) => prevOffset + limit);
    } else if (!data || !data.count) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };
  const handlePrevPage = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - limit));
  };

  const handlePrefetchNextPage = async () => {
    if (data && data.count && offset + limit < data.count) {
      const nextPageOffset = offset + limit;
      try { /* ... preload logic ... */ } catch (err) { /* ... */ }
    }
  };
  const handlePrefetchPrevPage = async () => {
    if (offset > 0) {
      const prevPageOffset = Math.max(0, offset - limit);
      try { /* ... preload logic ... */ } catch (err) { /* ... */ }
    }
  };

  // ... rendering logic ...
  return (
    <Card title="SWR Hook: Pokémon List">
      <Space>
        <Button onClick={handlePrevPage} onMouseEnter={handlePrefetchPrevPage} disabled={offset === 0 || isLoading || isValidating}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage} onMouseEnter={handlePrefetchNextPage} disabled={(data && data.next === null) || isLoading || isValidating}>
          Next Page
        </Button>
        <Button onClick={() => mutate()} loading={isValidating && !isLoading} disabled={isLoading || isValidating}>
          Refresh Current Page
        </Button>
      </Space>
      {/* ... Spin, Alert, List rendering ... */}
    </Card>
  );
};
`;

const swrPrefetchPokemonCode = `
// SwrPrefetchPokemon.tsx (Simplified)
import React, { useState } from "react";
import {
  usePokemonList,
  usePokemonRetrieve,
  pokemonRetrieveQueryKey,
  pokemonListQueryKey,
} from "@/gen/swr/pokemonController";
import { pokemonRetrieve, pokemonList } from "@/gen/clients/pokemonController";
import { preload } from "swr";
import { Button, Spin, Alert, List, Card as InnerCard, Descriptions, Image, Tag } from "antd";
// ... other imports ...

const SwrPrefetchPokemon: React.FC = () => {
  const [listOffset, setListOffset] = useState(0);
  const listLimit = 5;
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(null);
  const [isPrefetchingDetail, setIsPrefetchingDetail] = useState<string | null>(null);

  const { data: pokemonListData, mutate: mutateList } = usePokemonList({
    limit: listLimit, offset: listOffset,
  });

  const { data: pokemonDetails, } = usePokemonRetrieve(
    selectedPokemonName!, { shouldFetch: !!selectedPokemonName }
  );

  const handlePrefetchDetails = async (pokemonName: string) => {
    if (selectedPokemonName === pokemonName) return;
    setIsPrefetchingDetail(pokemonName);
    try { /* ... preload(pokemonRetrieveQueryKey(pokemonName), () => pokemonRetrieve(pokemonName)) ... */ }
    catch (err) { console.error(\`Failed to preload \${pokemonName}\`, err); }
    // Not resetting isPrefetchingDetail immediately
  };
  const handleSelectPokemon = (pokemonName: string) => setSelectedPokemonName(pokemonName);

  const handleListNextPage = () => { /* ... setListOffset ... */ };
  const handleListPrevPage = () => { /* ... setListOffset ... */ };
  const handlePrefetchNextListPage = async () => { /* ... preload list ... */ };
  const handlePrefetchPrevListPage = async () => { /* ... preload list ... */ };

  // ... rendering logic ...
  return (
    <Card title="SWR: List Pagination & Prefetch Details on Hover">
      <Space direction="vertical">
        <Space> {/* Pagination Buttons for the list */}
          <Button onClick={handleListPrevPage} onMouseEnter={handlePrefetchPrevListPage} disabled={listOffset === 0 /* ... */ }>
            Prev List Page
          </Button>
          <Button onClick={handleListNextPage} onMouseEnter={handlePrefetchNextListPage} disabled={pokemonListData?.next === null /* ... */}>
            Next List Page
          </Button>
          <Button onClick={() => mutateList()} loading={/* ... */} disabled={/* ... */}>
            Refresh List
          </Button>
        </Space>

        {/* Pokémon List Rendering (dataSource={pokemonListData?.results}) */}
        {/* Each List.Item would have: */}
        {/*   onMouseEnter={() => handlePrefetchDetails(pokemon.name!)} */}
        {/*   onClick={() => handleSelectPokemon(pokemon.name!)} */}

        {selectedPokemonName && (
          <InnerCard title={\`Details for: \${selectedPokemonName}\`}>
            {/* ... Details rendering ... */}
            <Button size="small" onClick={() => { setSelectedPokemonName(null); setIsPrefetchingDetail(null); }}>
              Close
            </Button>
          </InnerCard>
        )}
      </Space>
    </Card>
  );
};
`;

// Mermaid Diagram Strings
const directFetchDiagram = `
sequenceDiagram
    participant Comp as Component Mount/Update
    participant Effect as useEffect Hook
    participant FetchFunc as fetchData (Callback)
    participant State as React State (useState)
    participant API as pokemonList API

    Comp->>Effect: Runs Effect [fetchCount]
    activate Effect
    Effect->>FetchFunc: Calls fetchData
    deactivate Effect
    activate FetchFunc

    FetchFunc->>State: setIsLoading(true)
    FetchFunc->>State: setError(null)

    FetchFunc->>API: await pokemonList({...})
    activate API
    API-->>FetchFunc: Returns Promise

    FetchFunc->>FetchFunc: Processes Response
    alt Success
        FetchFunc->>State: setData(result)
    else Error
        FetchFunc->>State: setError(err)
    end

    FetchFunc->>State: setIsLoading(false)
    deactivate FetchFunc

    State-->>Comp: Triggers Re-render
`;

const basicSWRDiagram = `
sequenceDiagram
    participant Comp as Component Render
    participant SWRHook as usePokemonList Hook
    participant SWRCache as SWR Cache
    participant API as pokemonList API

    Comp->>SWRHook: Calls usePokemonList({limit, offset})
    activate SWRHook

    alt Cache Hit (Stale/Valid)
        SWRHook->>SWRCache: Checks Cache [key]
        activate SWRCache
        SWRCache-->>SWRHook: Returns Cached Data (if any)
        deactivate SWRCache
        SWRHook-->>Comp: Returns { data (stale/valid), isLoading: false, ... }
    else Cache Miss
        SWRHook-->>Comp: Returns { data: undefined, isLoading: true, ... }
    end

    SWRHook->>API: Fetches (if needed / revalidating)
    activate API
    API-->>SWRHook: Returns Response
    deactivate API
    SWRHook->>SWRCache: Updates Cache [key]
    activate SWRCache
    deactivate SWRCache
    SWRHook-->>Comp: Returns { data (fresh), isLoading: false, ... }

    deactivate SWRHook

    Note over Comp, API: Revalidation (focus, interval, etc.) triggers SWRHook -> API flow again.
`;

const advancedSWRDiagram = `
sequenceDiagram
    participant User
    participant CompUI as Component UI (List/Buttons)
    participant Handlers as Event Handlers
    participant SWRCache as SWR Cache
    participant API as pokemon API (List/Retrieve)
    participant SWRHooks as usePokemonList / usePokemonRetrieve

    User->>CompUI: Hovers over Pokemon Name
    activate CompUI
    CompUI->>Handlers: onMouseEnter -> handlePrefetchDetails(name)
    deactivate CompUI
    activate Handlers
    Handlers->>API: preload(retrieveKey, retrieveFn)
    activate API
    Note right of Handlers: Initiates fetch in background
    API-->>SWRCache: Stores result on success
    deactivate API
    deactivate Handlers

    User->>CompUI: Clicks Pokemon Name
    activate CompUI
    CompUI->>Handlers: onClick -> handleSelectPokemon(name)
    deactivate CompUI
    activate Handlers
    Handlers->>SWRHooks: Sets selectedPokemonName state
    deactivate Handlers

    CompUI->>SWRHooks: usePokemonRetrieve(selectedPokemonName, ...)
    activate SWRHooks
    SWRHooks->>SWRCache: Checks Cache [retrieveKey]
    activate SWRCache
    alt Cache Hit (Prefetched)
        SWRCache-->>SWRHooks: Returns Cached Detail Data INSTANTLY ✨
        SWRHooks-->>CompUI: Returns { data: pokemonDetails, isLoading: false }
    else Cache Miss
        Note over SWRCache: Should be rare if prefetch worked
        SWRHooks->>API: Fetches Details
        activate API
        API-->>SWRCache: Stores result
        deactivate API
        SWRHooks-->>CompUI: Returns { data: pokemonDetails, isLoading: false }
    end
    deactivate SWRCache
    deactivate SWRHooks
`;

/**
 * Renders a slide demonstrating different data fetching techniques: direct client call, SWR, and SWR with prefetching.
 *
 * @returns {JSX.Element} The DataFetchingSlide component.
 */
const DataFetchingSlide: React.FC = () => {
  // Initialize and render Mermaid diagrams on mount
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base", // Match theme from previous slide
    });
    // Delay rendering slightly to ensure elements exist
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100); // Increased delay slightly just in case

    return () => clearTimeout(timer);
  }, []);

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", padding: "20px" }}
    >
      <Card>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Data Fetching in React: Direct Call vs. SWR vs. SWR with Prefetch
        </Title>
        <Paragraph>
          This slide demonstrates common approaches to fetching data in a React
          application: making a direct API call, using SWR for declarative data
          fetching, and enhancing SWR with prefetching capabilities.
        </Paragraph>
        <Paragraph>All examples fetch Pokémon data from the PokeAPI.</Paragraph>
      </Card>

      {/* --- Direct API Call Section --- */}
      <Card title="Flow: Direct API Call (useEffect)">
        <div
          className="mermaid"
          style={{
            textAlign: "center",
            backgroundColor: "#eee", // Slightly lighter grey than #999
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {directFetchDiagram}
        </div>
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <DirectPokemonList />
        </Col>
        <Col xs={24} md={12} style={{ height: "100%" }}>
          <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
            Code: Direct API Call
          </Title>
          <SyntaxHighlighter
            language="typescript"
            style={atomDark}
            showLineNumbers
            customStyle={{
              height: "calc(100% - 28px)",
              overflowY: "auto",
              border: "1px solid #f0f0f0",
              borderRadius: "4px",
            }}
          >
            {directPokemonListCode}
          </SyntaxHighlighter>
        </Col>
      </Row>

      <Divider />

      {/* --- Basic SWR Section --- */}
      <Card title="Flow: Basic SWR">
        <div
          className="mermaid"
          style={{
            textAlign: "center",
            backgroundColor: "#eee",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {basicSWRDiagram}
        </div>
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <SwrPokemonList />
        </Col>
        <Col xs={24} md={12} style={{ height: "100%" }}>
          <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
            Code: Basic SWR with List Prefetch
          </Title>
          <SyntaxHighlighter
            language="typescript"
            style={atomDark}
            showLineNumbers
            customStyle={{
              height: "calc(100% - 28px)",
              overflowY: "auto",
              border: "1px solid #f0f0f0",
              borderRadius: "4px",
            }}
          >
            {swrPokemonListCode}
          </SyntaxHighlighter>
        </Col>
      </Row>

      <Divider />

      {/* --- Advanced SWR Section --- */}
      <Card title="Flow: Advanced SWR (Prefetching)">
        <div
          className="mermaid"
          style={{
            textAlign: "center",
            backgroundColor: "#eee",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {advancedSWRDiagram}
        </div>
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <SwrPrefetchPokemon />
        </Col>
        <Col xs={24} md={12} style={{ height: "100%" }}>
          <Title level={5} style={{ marginTop: 0, marginBottom: "8px" }}>
            Code: Advanced SWR (List + Detail Prefetch)
          </Title>
          <SyntaxHighlighter
            language="typescript"
            style={atomDark}
            showLineNumbers
            customStyle={{
              height: "calc(100% - 28px)",
              overflowY: "auto",
              border: "1px solid #f0f0f0",
              borderRadius: "4px",
            }}
          >
            {swrPrefetchPokemonCode}
          </SyntaxHighlighter>
        </Col>
      </Row>

      <Divider />

      <Card
        title={
          <Title level={3}>
            Comparing Data Fetching Approaches with SWR ✨
          </Title>
        }
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          size="small"
          pagination={false}
          scroll={{ x: "max-content" }}
        />
        <Paragraph style={{ marginTop: "16px" }}>
          The "Advanced SWR" column showcases features like the{" "}
          <Text code>preload</Text> API used in our examples, allowing proactive
          fetching to warm up the cache. This makes subsequent data loads feel
          instantaneous.
        </Paragraph>

        <Title level={4} style={{ marginTop: "24px", marginBottom: "12px" }}>
          SWR Configuration & Fine-Tuning 🛠️
        </Title>
        <Paragraph>
          SWR provides a rich set of options to customize its behavior. Here are
          some of the defaults we've discussed and other popular configurations:
        </Paragraph>

        <Title level={5} style={{ marginTop: "16px", marginBottom: "8px" }}>
          Default Revalidation Strategies
        </Title>
        <List size="small" bordered>
          <List.Item>
            <Text strong>Stale-While-Revalidate:</Text> When you revisit a tab
            or data is requested, SWR first returns the cached (stale) data,
            then sends a fetch request to revalidate. The UI updates if data has
            changed.
          </List.Item>
          <List.Item>
            <Text>
              <Text code>revalidateOnFocus: true</Text>
            </Text>{" "}
            – SWR re-fetches data whenever the window or tab gains focus. This
            keeps your data synced as you switch between applications or tabs.
            <br />
            Benefit: Ensures data is fresh when user returns to the app.
          </List.Item>
          <List.Item>
            <Text>
              <Text code>focusThrottleInterval: 5000</Text> (ms)
            </Text>{" "}
            – To prevent excessive requests from rapid focus changes,
            revalidation is throttled. After a focus-triggered revalidation,
            further focus events within 5 seconds won't trigger new fetches.
            <br />
            Benefit: Prevents API spamming while maintaining freshness on focus.
          </List.Item>
          <List.Item>
            <Text>
              <Text code>dedupingInterval: 2000</Text> (ms)
            </Text>{" "}
            – SWR de-duplicates requests. If multiple components request the
            same data (same SWR key) within a 2-second window, only one actual
            network request is made.
            <br />
            Benefit: Reduces redundant network calls, saving bandwidth and
            resources.
          </List.Item>
        </List>
        <Paragraph style={{ marginTop: "12px" }}>
          <Text strong>In Practice (Focus Revalidation):</Text>
        </Paragraph>
        <List size="small">
          <List.Item>
            1. Switch back to tab → SWR sees data as stale → Fetches
            immediately.
          </List.Item>
          <List.Item>
            2. Within 5s of that fetch → No more focus-revalidations
            (throttled).
          </List.Item>
          <List.Item>
            3. After 5s → Next focus event will re-validate again.
          </List.Item>
        </List>

        <Title level={5} style={{ marginTop: "20px", marginBottom: "8px" }}>
          Other Popular Configurations
        </Title>
        <List size="small" bordered>
          <List.Item>
            <Text>
              <Text strong>refreshInterval:</Text> – Enables polling. SWR will
              re-fetch data at the specified interval (in ms).
            </Text>
            <br />
            Benefit: Useful for real-time or frequently updating data (e.g.,
            live scores, stock prices).
          </List.Item>
          <List.Item>
            <Text>
              <Text code>revalidateOnMount: boolean</Text>
            </Text>{" "}
            (default: <Text code>true</Text> if <Text code>fallbackData</Text>{" "}
            is not set) – If <Text code>true</Text>, SWR revalidates when a
            component mounts.
            <br />
            Benefit: Ensures fresh data on initial component load, but can be
            disabled if initial stale data is acceptable or if{" "}
            <Text code>fallbackData</Text> is used.
          </List.Item>
          <List.Item>
            <Text>
              <Text code>revalidateOnReconnect: boolean</Text>
            </Text>{" "}
            (default: <Text code>true</Text>) – SWR automatically revalidates
            when network connection is restored after being offline.
            <br />
            Benefit: Keeps data up-to-date after network interruptions without
            manual intervention.
          </List.Item>
          <List.Item>
            <Text>
              <Text code>shouldRetryOnError: boolean</Text>
            </Text>{" "}
            (default: <Text code>true</Text>) – If <Text code>true</Text>, SWR
            will retry fetching data with an exponential backoff algorithm if an
            error occurs.
            <br />
            Benefit: Handles transient network errors gracefully, improving
            resilience.
          </List.Item>
          <List.Item>
            <Text>
              <Text strong>onErrorRetry:</Text> – Provides a custom function to
              control retry behavior on error.
            </Text>
            <br />
            Benefit: Allows for sophisticated retry strategies, e.g., stop
            retrying after N attempts or for specific error codes.
          </List.Item>
          <List.Item>
            <Text>
              <Text strong>onSuccess:</Text> – Callback function executed when a
              fetch is successful.
            </Text>
            <br />
            Benefit: Useful for side effects like analytics, notifications, or
            updating other states.
          </List.Item>
          <List.Item>
            <Text>
              <Text strong>onError:</Text> – Callback function executed when a
              fetch fails.
            </Text>
            <br />
            Benefit: Centralized error handling, logging, or displaying error
            messages.
          </List.Item>
          <List.Item>
            <Text>
              <Text strong>compare:</Text> – A custom function to compare old
              and new data to determine if a re-render is needed.
            </Text>
            <br />
            Benefit: Optimizes performance by preventing unnecessary re-renders
            if the underlying data hasn't meaningfully changed.
          </List.Item>
          <List.Item>
            <Text>
              <Text code>fallbackData: Data</Text>
            </Text>{" "}
            – Initial data to be returned by the hook before any fetch occurs.
            This data is considered stale and will usually be revalidated on
            mount.
            <br />
            Benefit: Provides immediate UI content, improving perceived
            performance and preventing loading spinners for initial view.
          </List.Item>
          <List.Item>
            <Text>
              <Text code>suspense: boolean</Text>
            </Text>{" "}
            (default: <Text code>false</Text>) – Enables React Suspense mode.
            SWR will throw promises when fetching, allowing Suspense boundaries
            to handle loading states.
            <br />
            Benefit: Integrates with modern React concurrent features for more
            sophisticated loading orchestrations.
          </List.Item>
          <List.Item>
            <Text>
              <Text code>keepPreviousData: boolean</Text>
            </Text>{" "}
            (default: <Text code>false</Text>) – If <Text code>true</Text>, SWR
            will keep showing the previous page's data while new data for a
            different key (e.g., next page in pagination) is loading.
            <br />
            Benefit: Prevents UI jumps or loading spinners during pagination,
            providing a smoother user experience.
          </List.Item>
        </List>

        <Paragraph style={{ marginTop: "12px" }}>
          These options, and more, allow developers to precisely control data
          fetching, caching, and UI behavior, making SWR a versatile tool for
          various scenarios.
        </Paragraph>
      </Card>
    </Space>
  );
};

export default DataFetchingSlide;
