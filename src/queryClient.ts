import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Example: Keep data fresh longer
      refetchOnWindowFocus: false, // Example: Don't refetch on window focus
    },
  },
});
