import {
  createContext,
  useState,
  useCallback,
  type ReactNode,
  useContext,
} from "react";

/**
 * @typedef {'light' | 'dark'} ThemeMode
 * The possible modes for the theme.
 */
export type ThemeMode = "light" | "dark";

/**
 * @interface ThemeContextValue
 * Defines the shape of the value provided by ThemeContext.
 * @property {ThemeMode} themeMode - The current theme mode.
 * @property {() => void} toggleTheme - Function to toggle the theme mode.
 */
interface ThemeContextValue {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

/**
 * @const {React.Context<ThemeContextValue | undefined>} ThemeContext
 * Context for managing the application theme.
 * Initialize with undefined and check in hooks.
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

// Optional: Define a display name for easier debugging in React DevTools
ThemeContext.displayName = "ThemeContext";

// --- ThemeProvider Component ---

/**
 * @interface ThemeProviderProps
 * Props for the ThemeProvider component.
 * @property {ReactNode} children - The child components to wrap.
 * @property {ThemeMode} [defaultTheme='dark'] - Optional default theme mode.
 */
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

/**
 * Provides the theme context to its children.
 * Manages the themeMode state and provides the toggleTheme function.
 *
 * @component
 * @param {ThemeProviderProps} props Component props.
 * @returns {JSX.Element} The ThemeProvider component.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "dark",
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultTheme);

  /**
   * Toggles the theme between light and dark mode.
   * Memoized with useCallback.
   */
  const toggleTheme = useCallback(() => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  // The value object passed to the provider, containing state and updater function
  const value: ThemeContextValue = {
    themeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// --- Custom Hooks ---

/**
 * Custom hook to get the current theme mode from ThemeContext.
 * Uses standard useContext.
 *
 * @returns {ThemeMode} The current theme mode ('light' or 'dark').
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useThemeMode = (): ThemeMode => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context.themeMode;
};

/**
 * Custom hook to get the toggleTheme function from ThemeContext.
 * Uses standard useContext.
 *
 * @returns {() => void} The function to toggle the theme.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useToggleTheme = (): (() => void) => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useToggleTheme must be used within a ThemeProvider");
  }
  return context.toggleTheme;
};
