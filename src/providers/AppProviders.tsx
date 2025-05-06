import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../contexts/AuthContext"; // Adjusted path
import { ThemeProvider } from "../contexts/ThemeContext"; // Adjusted path
import { store } from "../store"; // Adjusted path
import { queryClient } from "../queryClient"; // Adjusted path
import ErrorBoundary from "../components/common/ErrorBoundary"; // Adjusted path

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Wraps the application with essential context providers.
 *
 * @param {AppProvidersProps} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render within the providers.
 * @returns {React.ReactElement} The application wrapped with providers.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider>
              <ErrorBoundary>{children}</ErrorBoundary>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </React.StrictMode>
  );
}
