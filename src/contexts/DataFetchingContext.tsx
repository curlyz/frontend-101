"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { apiV2PokemonList } from "@/gen/clients/pokemonController";
import type { ApiV2PokemonList200 as PokemonListType } from "@/gen/models/pokemonController";

export interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  lastFetched: Date | null;
}

export interface PokemonFetchOptions {
  limit?: number;
  offset?: number;
}

interface DataFetchingContextType {
  // Pokemon data
  pokemonList: FetchState<PokemonListType>;

  // Fetch actions
  fetchPokemonList: (options?: PokemonFetchOptions) => Promise<void>;
  refetchPokemonList: () => Promise<void>;

  // Pagination helpers
  currentOffset: number;
  currentLimit: number;
  setCurrentOffset: (offset: number) => void;
  setCurrentLimit: (limit: number) => void;

  // Utility functions
  getOffsetFromUrl: (url: string | null | undefined) => number;
  clearError: () => void;
  clearData: () => void;

  // Fetch statistics
  fetchCount: number;
  totalFetches: number;
}

const DataFetchingContext = createContext<DataFetchingContextType | undefined>(
  undefined,
);

export const useDataFetching = () => {
  const context = useContext(DataFetchingContext);
  if (context === undefined) {
    throw new Error(
      "useDataFetching must be used within a DataFetchingProvider",
    );
  }
  return context;
};

interface DataFetchingProviderProps {
  children: React.ReactNode;
  defaultLimit?: number;
  defaultOffset?: number;
  autoFetch?: boolean;
}

export const DataFetchingProvider: React.FC<DataFetchingProviderProps> = ({
  children,
  defaultLimit = 10,
  defaultOffset = 0,
  autoFetch = true,
}) => {
  // Pokemon data state
  const [pokemonList, setPokemonList] = useState<FetchState<PokemonListType>>({
    data: null,
    isLoading: false,
    error: null,
    lastFetched: null,
  });

  // Pagination state
  const [currentOffset, setCurrentOffset] = useState(defaultOffset);
  const [currentLimit, setCurrentLimit] = useState(defaultLimit);

  // Fetch statistics
  const [fetchCount, setFetchCount] = useState(0);
  const [totalFetches, setTotalFetches] = useState(0);

  const getOffsetFromUrl = useCallback(
    (url: string | null | undefined): number => {
      if (!url) return 0;
      try {
        const params = new URL(url).searchParams;
        return parseInt(params.get("offset") || "0", 10);
      } catch {
        return 0;
      }
    },
    [],
  );

  const fetchPokemonList = useCallback(
    async (options?: PokemonFetchOptions) => {
      const limit = options?.limit ?? currentLimit;
      const offset = options?.offset ?? currentOffset;

      setPokemonList((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await apiV2PokemonList({
          limit,
          offset,
        });

        setPokemonList({
          data: result,
          isLoading: false,
          error: null,
          lastFetched: new Date(),
        });

        setTotalFetches((prev) => prev + 1);

        // Update current pagination values if options were provided
        if (options?.limit !== undefined) setCurrentLimit(options.limit);
        if (options?.offset !== undefined) setCurrentOffset(options.offset);
      } catch (err) {
        const error = err as Error;
        setPokemonList((prev) => ({
          ...prev,
          isLoading: false,
          error,
        }));
        console.error("Failed to fetch Pokémon list:", error);
      }
    },
    [currentLimit, currentOffset],
  );

  const refetchPokemonList = useCallback(async () => {
    setFetchCount((prev) => prev + 1);
    const newOffset = (fetchCount * currentLimit) % 100;
    await fetchPokemonList({ offset: newOffset });
  }, [fetchPokemonList, fetchCount, currentLimit]);

  const clearError = useCallback(() => {
    setPokemonList((prev) => ({ ...prev, error: null }));
  }, []);

  const clearData = useCallback(() => {
    setPokemonList({
      data: null,
      isLoading: false,
      error: null,
      lastFetched: null,
    });
    setFetchCount(0);
    setTotalFetches(0);
  }, []);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchPokemonList();
    }
  }, [autoFetch, fetchPokemonList]);

  const value: DataFetchingContextType = {
    // Pokemon data
    pokemonList,

    // Fetch actions
    fetchPokemonList,
    refetchPokemonList,

    // Pagination helpers
    currentOffset,
    currentLimit,
    setCurrentOffset,
    setCurrentLimit,

    // Utility functions
    getOffsetFromUrl,
    clearError,
    clearData,

    // Fetch statistics
    fetchCount,
    totalFetches,
  };

  return (
    <DataFetchingContext.Provider value={value}>
      {children}
    </DataFetchingContext.Provider>
  );
};
