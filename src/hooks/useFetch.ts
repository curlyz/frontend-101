import { useState, useEffect, useCallback } from "react";

/**
 * @interface FetchState
 * Represents the state of the data fetching process.
 * @template T - The type of the data being fetched.
 * @property {T | null} data - The fetched data, or null if not yet fetched or an error occurred.
 * @property {boolean} isLoading - True if the data is currently being fetched.
 * @property {Error | null} error - An error object if the fetch failed, otherwise null.
 */
interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * @interface UseFetchOptions
 * Extends RequestInit with retry options.
 * @property {number} [retryAttempts=0] - Number of retry attempts on fetch failure.
 * @property {number} [retryDelay=1000] - Initial delay in ms before the first retry.
 * @property {number} [retryBackoff=2] - Multiplier for delay increase on subsequent retries (e.g., 2 for exponential backoff).
 */
interface UseFetchOptions extends RequestInit {
  retryAttempts?: number;
  retryDelay?: number;
  retryBackoff?: number;
}

/**
 * Custom hook for fetching data from a URL.
 * Handles loading, error, success states, fetch cancellation, retries, and dependency-based refetching.
 *
 * @template T - The expected type of the data to be fetched.
 * @param {string | null} url - The URL to fetch data from. If null, the fetch is not performed.
 * @param {UseFetchOptions} [options] - Optional fetch options including retries (attempts, delay, backoff).
 * @param {unknown[]} [dependencies=[]] - Optional dependency array to trigger refetch when values change.
 * @returns {FetchState<T> & { refetch: () => void }} An object containing the fetch state and a refetch function.
 */
function useFetch<T>(
  url: string | null,
  options?: UseFetchOptions,
  dependencies: unknown[] = [], // Add dependency array parameter
): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });
  // State to trigger refetch
  const [trigger, setTrigger] = useState<number>(0);

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!url) {
      // If no URL is provided, reset state and do nothing
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    // Destructure retry options with defaults
    const {
      retryAttempts = 0,
      retryDelay = 1000,
      retryBackoff = 2,
      ...fetchOptions
    } = options || {};

    let currentAttempt = 0;

    const performFetch = () => {
      // Set loading state only on the first attempt (or if not already loading)
      if (currentAttempt === 0) {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
          error: null,
        }));
      }
      console.log(`useFetch: Attempt ${currentAttempt + 1} for ${url}...`);

      fetch(url, { ...fetchOptions, signal })
        .then(async (response) => {
          // Make async to handle potential text() for error messages
          if (!response.ok) {
            // Try to get error message from response body
            let errorBody = "Unknown error";
            try {
              errorBody = await response.text();
            } catch {
              // Ignore error reading body
            }
            throw new Error(
              `HTTP error! status: ${response.status} - ${errorBody}`,
            );
          }
          return response.json();
        })
        .then((fetchedData: T) => {
          console.log(`useFetch: Data fetched successfully from ${url}`);
          if (!signal.aborted) {
            setState({
              data: fetchedData,
              isLoading: false,
              error: null,
            });
          }
        })
        .catch((err) => {
          if (signal.aborted || err.name === "AbortError") {
            console.log(`useFetch: Fetch aborted for ${url}`);
            // Optionally reset loading state if needed, though component might be unmounting
            // setState(prevState => ({ ...prevState, isLoading: false }));
            return; // Stop retries if aborted
          }

          currentAttempt++;
          console.error(
            `useFetch: Attempt ${currentAttempt} failed for ${url}:`,
            err,
          );

          if (currentAttempt <= retryAttempts) {
            const delay =
              retryDelay * Math.pow(retryBackoff, currentAttempt - 1);
            console.log(`useFetch: Retrying fetch for ${url} in ${delay}ms...`);
            setTimeout(() => {
              if (!signal.aborted) {
                // Check again before retrying
                performFetch();
              }
            }, delay);
          } else {
            console.error(`useFetch: Max retry attempts reached for ${url}.`);
            if (!signal.aborted) {
              setState({
                data: null,
                isLoading: false,
                error:
                  err instanceof Error
                    ? err
                    : new Error("Max retry attempts reached"),
              });
            }
          }
        });
    };

    performFetch(); // Initial fetch attempt

    // Cleanup function: Abort the fetch if the component unmounts or URL changes
    return () => {
      console.log(`useFetch: Aborting fetch for ${url}`);
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, trigger, JSON.stringify(options), ...dependencies]); // Include dependencies
  // Note: Stringifying options is a simple way to track changes, but might not be suitable for all cases (e.g., functions in options).

  return { ...state, refetch };
}

export default useFetch;
