import { defineConfig } from "@kubb/core";
// Correct plugin imports
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginSwr } from "@kubb/plugin-swr";
import { pluginZod } from "@kubb/plugin-zod";
// Import the client plugin
import { pluginClient } from "@kubb/plugin-client";

export default defineConfig({
  root: ".", // Relative to the directory where the command is run
  input: {
    // Assuming the FastAPI backend runs on port 21001
    // and serves its OpenAPI spec at /openapi.json
    path: "https://raw.githubusercontent.com/PokeAPI/pokeapi/refs/heads/master/openapi.yml",
  },
  output: {
    // Output generated files to src/lib/kubb
    path: "./src/gen",
    clean: true, // Clean the output directory before generation
  },
  hooks: {
    // Optional: Add hooks for tasks like linting after generation
    // done: 'eslint --ext .ts --fix ./src/lib/kubb',
  },
  plugins: [
    // Plugin to read the OpenAPI input
    pluginOas({
      // output: { path: undefined }, // Omit output
      validate: true, // Validate the input schema
    }),
    // Plugin to generate TypeScript types from the schema
    pluginTs({
      output: {
        path: "models", // Output types to src/gen/models
      },
      group: {
        type: "tag", // Group models by tag (controller name)
      },
      unknownType: "any",
      optionalType: "questionTokenAndUndefined",
      //   enumType: "asConst", // Add enumType back
    }),
    // Plugin to generate Zod schemas
    pluginZod({
      output: {
        path: "schemas", // Output Zod schemas to src/gen/schemas
      },
      group: {
        type: "tag",
      },
      // Optional: configure Zod options if needed
      // typed: true, // To generate Zod types along with schemas
      // dateType: "date", // Ensure consistency if dates are string-formatted from API
    }),
    // Add the client plugin configuration
    pluginClient({
      // Remove client config - let Kubb infer or use default
      // client: {
      // importPath: "./src/lib/apiClient.ts",
      // },
      // Simplify grouping if output structure is causing issues
      baseURL: "https://pokeapi.co/",
      group: {
        type: "tag",
      },
      dataReturnType: "data", // Keep this, might be valid at top level
    }),
    pluginSwr({
      output: {
        path: "swr",
      },
      group: {
        type: "tag",
      },
      parser: "zod",
      // Remove explicit client config - rely on pluginClient
      // Remove dataReturnType if it's invalid here
      // dataReturnType: 'data',
    }),
  ],
});
