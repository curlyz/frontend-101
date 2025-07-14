"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  useApiV2PokemonList,
  apiV2PokemonListQueryKey,
} from "@/gen/swr/pokemonController";
import { apiV2PokemonList } from "@/gen/clients/pokemonController";
import { preload } from "swr";
import type { ApiV2PokemonList200 as PokemonListType } from "@/gen/models/pokemonController";

export interface PaginationOptions {
  limit?: number;
  initialOffset?: number;
  enablePrefetch?: boolean;
}

interface PaginationContextType {
  // Pagination state
  offset: number;
  limit: number;

  // SWR data
  data: PokemonListType | undefined;
  error: any;
  isLoading: boolean;
  isValidating: boolean;

  // Pagination actions
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (pageNumber: number) => void;
  refresh: () => void;

  // Prefetch actions
  prefetchNextPage: () => Promise<void>;
  prefetchPrevPage: () => Promise<void>;

  // Utility functions
  getCurrentPage: () => number;
  getTotalPages: () => number;
  hasNextPage: () => boolean;
  hasPrevPage: () => boolean;

  // Configuration
  setLimit: (newLimit: number) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined,
);

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};

interface PaginationProviderProps {
  children: React.ReactNode;
  options?: PaginationOptions;
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
  options = {},
}) => {
  const {
    limit: initialLimit = 10,
    initialOffset = 0,
    enablePrefetch = true,
  } = options;

  const [offset, setOffset] = useState(initialOffset);
  const [limit, setLimit] = useState(initialLimit);

  // SWR hook for fetching data
  const { data, error, isLoading, isValidating, mutate } = useApiV2PokemonList({
    limit,
    offset,
  });

  const getCurrentPage = useCallback(() => {
    return Math.floor(offset / limit) + 1;
  }, [offset, limit]);

  const getTotalPages = useCallback(() => {
    if (!data?.count) return 0;
    return Math.ceil(data.count / limit);
  }, [data?.count, limit]);

  const hasNextPage = useCallback(() => {
    if (!data) return false;
    return data.next !== null && offset + limit < (data.count || 0);
  }, [data, offset, limit]);

  const hasPrevPage = useCallback(() => {
    return offset > 0;
  }, [offset]);

  const nextPage = useCallback(() => {
    if (hasNextPage()) {
      setOffset((prev) => prev + limit);
    }
  }, [hasNextPage, limit]);

  const prevPage = useCallback(() => {
    if (hasPrevPage()) {
      setOffset((prev) => Math.max(0, prev - limit));
    }
  }, [hasPrevPage, limit]);

  const goToPage = useCallback(
    (pageNumber: number) => {
      const newOffset = (pageNumber - 1) * limit;
      const maxOffset = data?.count ? Math.max(0, data.count - limit) : 0;
      setOffset(Math.max(0, Math.min(newOffset, maxOffset)));
    },
    [limit, data?.count],
  );

  const refresh = useCallback(() => {
    mutate();
  }, [mutate]);

  const prefetchNextPage = useCallback(async () => {
    if (!enablePrefetch || !hasNextPage()) return;

    const nextPageOffset = offset + limit;
    try {
      await preload(
        apiV2PokemonListQueryKey({ limit, offset: nextPageOffset }),
        () => apiV2PokemonList({ limit, offset: nextPageOffset }),
      );
      console.log(`Prefetched next page with offset: ${nextPageOffset}`);
    } catch (err) {
      console.error("Failed to prefetch next page:", err);
    }
  }, [enablePrefetch, hasNextPage, offset, limit]);

  const prefetchPrevPage = useCallback(async () => {
    if (!enablePrefetch || !hasPrevPage()) return;

    const prevPageOffset = Math.max(0, offset - limit);
    try {
      await preload(
        apiV2PokemonListQueryKey({ limit, offset: prevPageOffset }),
        () => apiV2PokemonList({ limit, offset: prevPageOffset }),
      );
      console.log(`Prefetched previous page with offset: ${prevPageOffset}`);
    } catch (err) {
      console.error("Failed to prefetch previous page:", err);
    }
  }, [enablePrefetch, hasPrevPage, offset, limit]);

  const setLimitWrapper = useCallback((newLimit: number) => {
    // Reset to first page when limit changes to avoid confusion
    setOffset(0);
    setLimit(newLimit);
  }, []);

  const value: PaginationContextType = {
    // Pagination state
    offset,
    limit,

    // SWR data
    data,
    error,
    isLoading,
    isValidating,

    // Pagination actions
    nextPage,
    prevPage,
    goToPage,
    refresh,

    // Prefetch actions
    prefetchNextPage,
    prefetchPrevPage,

    // Utility functions
    getCurrentPage,
    getTotalPages,
    hasNextPage,
    hasPrevPage,

    // Configuration
    setLimit: setLimitWrapper,
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
