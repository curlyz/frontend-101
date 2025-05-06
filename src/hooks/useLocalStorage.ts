import { useState, useEffect, useCallback } from "react";

/**
 * A custom hook to manage state in localStorage.
 * Synchronizes state between the hook and localStorage.
 *
 * @template T The type of the state value.
 * @param {string} key The key to use in localStorage.
 * @param {T} initialValue The initial value if nothing is found in localStorage.
 * @returns {[T, (value: T | ((val: T) => T)) => void]} A tuple containing the state value and a setter function.
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  // Get stored value from localStorage or use initial value
  const readValue = useCallback((): T => {
    // Prevent build errors and errors during server-side rendering
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      // Prevent build errors and errors during server-side rendering
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting localStorage key “${key}” even though environment is not a client`,
        );
      }

      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue],
  );

  // Listen for changes to the localStorage key from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.storageArea === window.localStorage) {
        try {
          setStoredValue(
            event.newValue ? JSON.parse(event.newValue) : initialValue,
          );
        } catch (error) {
          console.warn(`Error parsing stored value for key “${key}”:`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
    // Only key and initialValue needed, as setStoredValue is stable
  }, [key, initialValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
