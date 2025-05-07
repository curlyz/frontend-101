import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { codeInspectorPlugin } from "code-inspector-plugin";
import reactScan from "@react-scan/vite-plugin-react-scan";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    codeInspectorPlugin({
      bundler: "vite",
    }),
    reactScan({
      // Enable reactScan only in development mode
      enable: true,
      // Optional: Add display names automatically for better inspection
      autoDisplayNames: true,
    }),
  ],
  server: {
    allowedHosts: true,
  },
});
