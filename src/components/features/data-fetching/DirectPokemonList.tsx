import React, { useState, useEffect, useCallback } from "react";
import { pokemonList } from "@/gen/clients/pokemonController";
import type { PokemonList200 as PokemonListType } from "@/gen/models/pokemonController/PokemonList";
import type { PokemonSummary } from "@/gen/models/PokemonSummary";
import { Alert, Button, List, Spin, Typography, Card, Space } from "antd";

const { Title, Text } = Typography;

/**
 * Demonstrates direct API client call to fetch a list of Pokémon.
 * Includes manual loading, error handling, and a reload button.
 */
const DirectPokemonList: React.FC = () => {
  const [data, setData] = useState<PokemonListType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [fetchCount, setFetchCount] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await pokemonList({
        limit: 10,
        offset: (fetchCount * 10) % 100,
      });
      setData(result);
    } catch (err) {
      setError(err as Error);
      console.error("Failed to fetch Pokémon list:", err);
    }
    setIsLoading(false);
  }, [fetchCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReload = () => {
    setFetchCount((prev) => prev + 1);
  };

  const getOffsetFromUrl = (url: string | null | undefined): number => {
    if (!url) return 0;
    try {
      const params = new URL(url).searchParams;
      return parseInt(params.get("offset") || "0", 10);
    } catch {
      return 0;
    }
  };

  return (
    <Card title={<Title level={4}>Direct API Call: Pokémon List</Title>}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button onClick={handleReload} loading={isLoading} disabled={isLoading}>
          {isLoading ? "Loading..." : "Reload Pokémon List (Next Page)"}
        </Button>

        {isLoading && !data && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin tip="Loading Pokémon..." />
          </div>
        )}

        {error && (
          <Alert
            message="Error Fetching Pokémon"
            description={error.message}
            type="error"
            showIcon
          />
        )}

        {data && data.results && (
          <List
            header={
              <Text strong>
                Total: {data.count} | Showing: {data.results.length} (Offset:{" "}
                {getOffsetFromUrl(data.previous) + (data.previous ? 10 : 0)})
              </Text>
            }
            bordered
            dataSource={data.results as PokemonSummary[]}
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
                Current Page Offset: {(fetchCount * 10) % 100}, Limit: 10
              </Text>
            }
          />
        )}
      </Space>
    </Card>
  );
};

export default DirectPokemonList;
