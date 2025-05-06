import {
  createContext,
  useState,
  useCallback,
  type ReactNode,
  useContext,
} from "react";

/**
 * @interface User
 * Defines the shape of the user data object.
 * @property {string} id - Unique user identifier.
 * @property {string} name - User's display name.
 * @property {string} email - User's email address.
 */
interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * @interface AuthContextValue
 * Defines the shape of the value provided by AuthContext.
 * @property {boolean} isAuthenticated - Whether the user is currently authenticated.
 * @property {User | null} user - The authenticated user object, or null if not authenticated.
 * @property {(userData: User) => void} login - Function to log the user in.
 * @property {() => void} logout - Function to log the user out.
 */
interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

/**
 * @const {React.Context<AuthContextValue | undefined>} AuthContext
 * Context for managing authentication state.
 * Initialized with undefined to ensure provider usage.
 */
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

// Optional: Define a display name for easier debugging
AuthContext.displayName = "AuthContext";

// --- AuthProvider Component ---

/**
 * @interface AuthProviderProps
 * Props for the AuthProvider component.
 * @property {ReactNode} children - The child components to wrap.
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provides the authentication context to its children.
 * Manages authentication state (isAuthenticated, user) and provides login/logout functions.
 *
 * @component
 * @param {AuthProviderProps} props Component props.
 * @returns {JSX.Element} The AuthProvider component.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  /**
   * Logs the user in.
   * In a real app, this would involve API calls, validation, etc.
   * Memoized with useCallback.
   * @param {User} userData - The user data received after successful login.
   */
  const login = useCallback((userData: User) => {
    // Simulate successful login
    console.log("Logging in user:", userData);
    setUser(userData);
    setIsAuthenticated(true);
    // Persist auth state (e.g., localStorage) in a real app
  }, []);

  /**
   * Logs the user out.
   * Memoized with useCallback.
   */
  const logout = useCallback(() => {
    console.log("Logging out user");
    setUser(null);
    setIsAuthenticated(false);
    // Clear persisted auth state in a real app
  }, []);

  // The value object passed to the provider
  const value: AuthContextValue = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- Custom Hooks ---

/**
 * Custom hook to get the authentication status.
 * @returns {boolean} True if the user is authenticated, false otherwise.
 * @throws {Error} If used outside of an AuthProvider.
 */
export const useIsAuthenticated = (): boolean => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useIsAuthenticated must be used within an AuthProvider");
  }
  return context.isAuthenticated;
};

/**
 * Custom hook to get the current user object.
 * @returns {User | null} The user object if authenticated, null otherwise.
 * @throws {Error} If used outside of an AuthProvider.
 */
export const useUser = (): User | null => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context.user;
};

/**
 * Custom hook to get the login function.
 * @returns {(userData: User) => void} Function to log the user in.
 * @throws {Error} If used outside of an AuthProvider.
 */
export const useLogin = (): ((userData: User) => void) => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within an AuthProvider");
  }
  return context.login;
};

/**
 * Custom hook to get the logout function.
 * @returns {() => void} Function to log the user out.
 * @throws {Error} If used outside of an AuthProvider.
 */
export const useLogout = (): (() => void) => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useLogout must be used within an AuthProvider");
  }
  return context.logout;
};
