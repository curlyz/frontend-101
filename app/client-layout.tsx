"use client";

import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import { store } from "@/store";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useThemeMode } from "@/contexts/ThemeContext";
import { ShadcnMainLayout } from "@/components/layout/ShadcnMainLayout";

const { defaultAlgorithm, darkAlgorithm } = theme;

// SWR Configuration
const swrConfig = {
  fetcher: (url: string) => fetch(url).then((res) => res.json()),
  errorRetryCount: 3,
  errorRetryInterval: 1000,
  shouldRetryOnError: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};

function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useThemeMode();

  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === "dark" ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#1890ff",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AntdThemeProvider>
          <AuthProvider>
            <SWRConfig value={swrConfig}>
              <ShadcnMainLayout>{children}</ShadcnMainLayout>
            </SWRConfig>
          </AuthProvider>
        </AntdThemeProvider>
      </ThemeProvider>
    </Provider>
  );
}
