import React, { useState } from "react";
import {
  usePokemonList,
  usePokemonRetrieve,
  pokemonRetrieveQueryKey,
  pokemonListQueryKey,
} from "@/gen/swr/pokemonController";
import { pokemonRetrieve, pokemonList } from "@/gen/clients/pokemonController"; // For the preload fetcher
import type { PokemonList200 } from "@/gen/models/pokemonController/PokemonList";
import type { PokemonSummary } from "@/gen/models/PokemonSummary";
import type { PokemonRetrieveQueryResponse as PokemonDetailsType } from "@/gen/models/pokemonController/PokemonRetrieve";
import {
  Alert,
  Button,
  List,
  Spin,
  Typography,
  Card,
  Space,
  Tag,
  Image,
  Descriptions,
} from "antd";
import { preload } from "swr"; // Import preload

const { Title, Text, Paragraph } = Typography;

/**
 * Demonstrates SWR for list pagination and prefetching Pokémon details on hover.
 */
const SwrPrefetchPokemon: React.FC = () => {
  const [listOffset, setListOffset] = useState(0);
  const listLimit = 5; // Shorter list per page for this demo
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(
    null,
  );
  const [isPrefetching, setIsPrefetching] = useState<string | null>(null);

  const {
    data: pokemonListData,
    error: listError,
    isLoading: listIsLoading,
    isValidating: listIsValidating,
    mutate: mutateList, // For refreshing the list
  } = usePokemonList({ limit: listLimit, offset: listOffset });

  const {
    data: pokemonDetails,
    error: detailsError,
    isLoading: detailsIsLoading,
    isValidating: detailsIsValidating,
  } = usePokemonRetrieve(selectedPokemonName!, {
    shouldFetch: !!selectedPokemonName,
  });

  const handlePrefetch = async (pokemonName: string) => {
    if (selectedPokemonName === pokemonName) return;
    setIsPrefetching(pokemonName);
    try {
      await preload(pokemonRetrieveQueryKey(pokemonName), () =>
        pokemonRetrieve(pokemonName),
      );
    } catch (err) {
      console.error(`Failed to preload ${pokemonName}:`, err);
    }
    // Not resetting isPrefetching immediately to keep the tag visible for a moment
  };

  const handleSelectPokemon = (pokemonName: string) => {
    setSelectedPokemonName(pokemonName);
  };

  const handleListNextPage = () => {
    if (
      pokemonListData &&
      pokemonListData.count &&
      listOffset + listLimit < pokemonListData.count
    ) {
      setListOffset((prev) => prev + listLimit);
      setSelectedPokemonName(null); // Clear selection when list page changes
      setIsPrefetching(null);
    } else if (!pokemonListData || !pokemonListData.count) {
      setListOffset((prev) => prev + listLimit);
      setSelectedPokemonName(null);
      setIsPrefetching(null);
    }
  };

  const handleListPrevPage = () => {
    setListOffset((prev) => Math.max(0, prev - listLimit));
    setSelectedPokemonName(null); // Clear selection
    setIsPrefetching(null);
  };

  const handlePrefetchNextListPage = async () => {
    if (
      pokemonListData &&
      pokemonListData.count &&
      listOffset + listLimit < pokemonListData.count
    ) {
      const nextListPageOffset = listOffset + listLimit;
      try {
        await preload(
          pokemonListQueryKey({ limit: listLimit, offset: nextListPageOffset }),
          () => pokemonList({ limit: listLimit, offset: nextListPageOffset }),
        );
        console.log(`Prefetched list page with offset: ${nextListPageOffset}`);
      } catch (err) {
        console.error("Failed to prefetch next list page:", err);
      }
    }
  };

  const handlePrefetchPrevListPage = async () => {
    if (listOffset > 0) {
      const prevListPageOffset = Math.max(0, listOffset - listLimit);
      try {
        await preload(
          pokemonListQueryKey({ limit: listLimit, offset: prevListPageOffset }),
          () => pokemonList({ limit: listLimit, offset: prevListPageOffset }),
        );
        console.log(`Prefetched list page with offset: ${prevListPageOffset}`);
      } catch (err) {
        console.error("Failed to prefetch previous list page:", err);
      }
    }
  };

  const currentPokemonList = pokemonListData as PokemonList200 | undefined;
  const currentPokemonDetails = pokemonDetails as
    | PokemonDetailsType
    | undefined;

  return (
    <Card
      title={
        <Title level={4}>
          SWR: List Pagination & Prefetch Details on Hover
        </Title>
      }
    >
      <Paragraph>
        This example uses SWR for paginating a Pokémon list. Hover over a name
        to prefetch its details. Clicking displays the details, which should
        load quickly from cache if preloaded.
      </Paragraph>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Space>
          <Button
            onClick={handleListPrevPage}
            onMouseEnter={handlePrefetchPrevListPage}
            disabled={listOffset === 0 || listIsLoading || listIsValidating}
          >
            Prev List Page
          </Button>
          <Button
            onClick={handleListNextPage}
            onMouseEnter={handlePrefetchNextListPage}
            disabled={
              currentPokemonList?.next === null ||
              listIsLoading ||
              listIsValidating
            }
          >
            Next List Page
          </Button>
          <Button
            onClick={() => mutateList()}
            loading={listIsValidating && !listIsLoading}
            disabled={listIsLoading || listIsValidating}
          >
            Refresh List{" "}
            <Tag
              color={listIsValidating && !listIsLoading ? "blue" : "default"}
            >
              {listIsValidating && !listIsLoading
                ? "Updating..."
                : "Up to date"}
            </Tag>
          </Button>
        </Space>

        {listIsLoading && !currentPokemonList && (
          <Spin tip="Loading Pokémon list..." />
        )}
        {listError && (
          <Alert
            message="Error loading list"
            description={listError.message}
            type="error"
            showIcon
          />
        )}

        {currentPokemonList?.results && (
          <List
            header={
              <Text strong>
                Pokémon (Page offset: {listOffset}, Hover to Prefetch, Click to
                View)
              </Text>
            }
            bordered
            dataSource={currentPokemonList.results as PokemonSummary[]}
            renderItem={(pokemon: PokemonSummary) => (
              <List.Item
                onMouseEnter={() => handlePrefetch(pokemon.name!)}
                onClick={() => handleSelectPokemon(pokemon.name!)}
                style={{ cursor: "pointer" }}
                actions={[
                  selectedPokemonName === pokemon.name && detailsIsLoading ? (
                    <Spin size="small" />
                  ) : null,
                  isPrefetching === pokemon.name &&
                  selectedPokemonName !== pokemon.name ? (
                    <Tag color="geekblue">Prefetching...</Tag>
                  ) : null,
                ]}
              >
                <Text strong={selectedPokemonName === pokemon.name}>
                  {pokemon.name}
                </Text>
              </List.Item>
            )}
            footer={
              <Text>Total Pokémon: {currentPokemonList.count ?? "N/A"}</Text>
            }
          />
        )}

        {selectedPokemonName && (
          <Card
            type="inner"
            title={`Details for: ${selectedPokemonName}`}
            extra={
              <Button
                size="small"
                onClick={() => {
                  setSelectedPokemonName(null);
                  setIsPrefetching(null);
                }}
              >
                Close
              </Button>
            }
            loading={
              detailsIsLoading ||
              (detailsIsValidating && !currentPokemonDetails)
            }
          >
            {detailsError && (
              <Alert
                message="Error loading details"
                description={detailsError.message}
                type="error"
                showIcon
              />
            )}
            {currentPokemonDetails && (
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="ID">
                  {currentPokemonDetails.id}
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  {currentPokemonDetails.name}
                </Descriptions.Item>
                <Descriptions.Item label="Base Experience">
                  {currentPokemonDetails.base_experience}
                </Descriptions.Item>
                <Descriptions.Item label="Height">
                  {currentPokemonDetails.height}
                </Descriptions.Item>
                <Descriptions.Item label="Weight">
                  {currentPokemonDetails.weight}
                </Descriptions.Item>
                {currentPokemonDetails.sprites?.front_default && (
                  <Descriptions.Item label="Sprite">
                    <Image
                      src={currentPokemonDetails.sprites.front_default}
                      alt={currentPokemonDetails.name}
                      width={96}
                    />
                  </Descriptions.Item>
                )}
              </Descriptions>
            )}
          </Card>
        )}
      </Space>
    </Card>
  );
};

export default SwrPrefetchPokemon;
