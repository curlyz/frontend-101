# React Fundamentals - Fetching Data with React

## Prerequisites
1. You need to understand the slide content, and search for online blogs about that topic
2. Read at least 3 blogs online
3. You should be creative on how to represent your ideas
4. You should write each slides to be isolated, that is each slide page is a folder, which contain all the necessary files for that page, don't share with other slides

## Main Ideas to Convey

- Demonstrate fetching data using `useState`, `useEffect`, and the native `fetch` API.
- Highlight the manual effort involved: managing loading states, error states, pagination, etc.
- Introduce data fetching libraries (React Query, SWR) as solutions to simplify data fetching.
- Briefly explain SWR's benefits (caching, re-validation, pagination) and show a simplified SWR example.

## Visual Ideas

- **Comparison Table (Manual Fetch vs. SWR/React Query):**
    - Rows: Loading State, Error Handling, Caching, Re-validation, Code Verbosity.
    - Columns: Manual `useEffect` + `useState`, SWR/React Query.
    - Use checkmarks/crosses or short descriptions to show how libraries simplify these.
- **Simplified Flowchart (SWR):**
    1. Component requests data with `useSWR(key, fetcher)`.
    2. SWR checks cache.
    3. If cached & fresh -> return data.
    4. If not cached/stale -> call `fetcher`, update cache, return data.
    5. (Optional) Show re-validation triggers (focus, interval).

## Content

In React, we can utilize hooks like useState, useEffect and native api calling method: fetch to fetch data. Below is the sample code.

```mdx title="ManualFetchExample.jsx"
import { useState, useEffect } from 'react';

const Example = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(1); // Initial page
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false); // Reset error on new fetch
    fetch(`https://pokeapi.co/api/v2/ability/?limit=20&offset=${20 * (pagination - 1)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setPokemons(data.results); // Assuming data has a results array
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pagination]); // Re-fetch when pagination changes

  if (loading) {
    return (<div>...Loading...</div>);
  }

  if (error) {
    return (<div>Error, please try again</div>);
  }

  return (
    <div>
      {pokemons.map((pokemon) => (
        <div key={pokemon.name}>pokemon: {pokemon.name}</div>
      ))}
      <button
        onClick={() =>
          setPagination(prevPagination => Math.max(1, prevPagination - 1))}
        disabled={pagination <= 1}
      >
        Prev
      </button>
      {/* Corrected button closing tags */}
      <button
        onClick={() => setPagination(prevPagination => prevPagination + 1)}
      >
        Next
      </button>
    </div>
  );
};
export default Example;
```

However, this approach requires developer to handle various things from loading state, error state, pagination, etc. Thus, there are data fetching libraries to reduce effort of developer such as React Query and SWR. They are powerful data fetching hooks for better developing experience. In this sharing, we will emphasize on using SWR to fetch data.

SWR a lightweight ReactJs library with hooks for data fetching on the client-side with various performance improvement techniques such as data caching, re-validation, pagination, and many others. SWR will handle all the logics behind the scene, speed up development process.

```mdx title="SWRExample.jsx"
import { useState } from 'react'; // useCallback is not used in this simplified version
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

const ExampleSWR = () => {
  const [pagination, setPagination] = useState(1);
  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/ability/?limit=20&offset=${20 * (pagination - 1)}`,
    fetcher
  );

  if (isLoading) {
    return (<div>...Loading...</div>);
  }

  if (error) {
    return (<div>Error, please try again: {error.message}</div>);
  }
  
  const pokemons = data?.results || [];

  return (
    <div>
      {pokemons.map((pokemon) => (
        <div key={pokemon.name}>pokemon: {pokemon.name}</div>
      ))}
      <button
        onClick={() =>
          setPagination(prevPagination => Math.max(1, prevPagination - 1))}
        disabled={pagination <= 1}
      >
        Prev
      </button>
      <button
        onClick={() => setPagination(prevPagination => prevPagination + 1)}
      >
        Next
      </button>
    </div>
  );
};
export default ExampleSWR;
```

## Presentation Status: To Be Prepared