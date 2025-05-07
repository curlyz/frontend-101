import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme as antdTheme } from "antd";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider, useThemeMode } from "../contexts/ThemeContext";
import { store } from "../store";
import { queryClient } from "../queryClient";
import ErrorBoundary from "../components/common/ErrorBoundary";

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Inner component to access ThemeContext for ConfigProvider.
 * This is necessary because AppProviders itself cannot call useThemeMode directly
 * if ThemeProvider is a child of ConfigProvider in the same component.
 */
const ConfiguredApp: React.FC<AppProvidersProps> = ({ children }) => {
  const themeMode = useThemeMode();

  const customLightTheme = {
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorBgLayout: "#f0f2f5",
      colorBgContainer: "#ffffff",
    },
  };

  const customDarkTheme = {
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorBgLayout: "#101a2a",
      colorBgContainer: "#1c283a",
    },
  };

  return (
    <ConfigProvider
      theme={themeMode === "light" ? customLightTheme : customDarkTheme}
    >
      <ErrorBoundary>{children}</ErrorBoundary>
    </ConfigProvider>
  );
};

/**
 * Wraps the application with essential context providers,
 * including Ant Design's ConfigProvider for global theme customization.
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
              <ConfiguredApp>{children}</ConfiguredApp>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </React.StrictMode>
  );
}
