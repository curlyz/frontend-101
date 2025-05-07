import React, { useState } from "react"; // useState for pagination control
import {
  usePokemonList,
  pokemonListQueryKey, // Import queryKey
} from "@/gen/swr/pokemonController"; // Adjust if direct import is preferred
import { pokemonList } from "@/gen/clients/pokemonController"; // Import client for preloading
import type { PokemonList200 as PokemonListType } from "@/gen/models/pokemonController/PokemonList";
import type { PokemonSummary } from "@/gen/models/PokemonSummary"; // Corrected import path
// PokemonSummary might need to be from "@/gen/models/PokemonSummary" if not re-exported with PokemonList200
// For now, assuming it's co-located or re-exported for simplicity by Kubb SWR plugin.
// If not, I'll adjust after checking the generated usePokemonList hook details.
import { preload } from "swr"; // Import preload

import { Alert, Button, List, Spin, Typography, Card, Space, Tag } from "antd";

const { Title, Text } = Typography;

/**
 * Demonstrates fetching a list of Pokémon using an SWR hook.
 * Showcases automatic caching, revalidation, and manual refresh via mutate.
 */
const SwrPokemonList: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;

  // The SWR hook for pokemonList
  // Parameters are passed as the second argument to the hook if the generated hook supports it.
  // The actual structure depends on how Kubb generated the SWR hooks.
  // Assuming it takes queryParams object similar to the client.
  const { data, error, isLoading, isValidating, mutate } = usePokemonList({
    limit,
    offset,
  });

  const handleNextPage = () => {
    // Check against data.count if available to prevent going too far
    if (data && data.count && offset + limit < data.count) {
      setOffset((prevOffset) => prevOffset + limit);
    } else if (!data || !data.count) {
      // If count is not yet available, allow one page increment
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const handlePrevPage = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - limit));
  };

  const handlePrefetchNextPage = async () => {
    if (data && data.count && offset + limit < data.count) {
      const nextPageOffset = offset + limit;
      try {
        await preload(
          pokemonListQueryKey({ limit, offset: nextPageOffset }),
          () => pokemonList({ limit, offset: nextPageOffset }),
        );
        console.log(`Prefetched page with offset: ${nextPageOffset}`);
      } catch (err) {
        console.error("Failed to prefetch next page:", err);
      }
    }
  };

  const handlePrefetchPrevPage = async () => {
    if (offset > 0) {
      const prevPageOffset = Math.max(0, offset - limit);
      try {
        await preload(
          pokemonListQueryKey({ limit, offset: prevPageOffset }),
          () => pokemonList({ limit, offset: prevPageOffset }),
        );
        console.log(`Prefetched page with offset: ${prevPageOffset}`);
      } catch (err) {
        console.error("Failed to prefetch previous page:", err);
      }
    }
  };

  const currentData = data as PokemonListType | undefined; // Type assertion for convenience

  return (
    <Card
      title={
        <Title level={4}>
          SWR Hook: Pokémon List{" "}
          <Tag color={isValidating && !isLoading ? "blue" : "default"}>
            {isValidating && !isLoading
              ? "Revalidating..."
              : isLoading
                ? "Loading..."
                : "Up to date"}
          </Tag>
        </Title>
      }
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space>
          <Button
            onClick={handlePrevPage}
            onMouseEnter={handlePrefetchPrevPage}
            disabled={offset === 0 || isLoading || isValidating}
          >
            Previous Page
          </Button>
          <Button
            onClick={handleNextPage}
            onMouseEnter={handlePrefetchNextPage}
            disabled={
              (currentData && currentData.next === null) ||
              isLoading ||
              isValidating
            }
          >
            Next Page
          </Button>
          <Button
            onClick={() => mutate()}
            loading={isValidating && !isLoading}
            disabled={isLoading || isValidating}
          >
            Refresh Current Page
          </Button>
        </Space>

        {isLoading && !currentData && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin tip="Loading Pokémon with SWR..." />
          </div>
        )}

        {error && (
          <Alert
            message="Error Fetching Pokémon with SWR"
            description={error?.message || "An unknown error occurred"}
            type="error"
            showIcon
          />
        )}

        {currentData && currentData.results && (
          <List
            header={
              <Text strong>
                Total: {currentData.count} | Showing:{" "}
                {currentData.results.length} (Offset: {offset})
              </Text>
            }
            bordered
            dataSource={currentData.results as PokemonSummary[]}
            renderItem={(pokemon) => (
              <List.Item>
                <Text>
                  {pokemon.name} (
                  <a
                    href={pokemon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    details
                  </a>
                  )
                </Text>
              </List.Item>
            )}
            footer={
              <Text>
                Current Offset: {offset}, Limit: {limit}
              </Text>
            }
          />
        )}
      </Space>
    </Card>
  );
};

export default SwrPokemonList;
