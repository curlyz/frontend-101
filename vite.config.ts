import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { codeInspectorPlugin } from "code-inspector-plugin";
import reactScan from "@react-scan/vite-plugin-react-scan";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    codeInspectorPlugin({
      bundler: "vite",
    }),
    reactScan({
      // Enable reactScan only in development mode
      enable: process.env.NODE_ENV === "development",
      // Optional: Add display names automatically for better inspection
      autoDisplayNames: true,
    }),
  ],
});
