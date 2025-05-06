import { defineConfig } from "@kubb/core";
import createSwagger from "@kubb/swagger";
import createSwaggerTS from "@kubb/swagger-ts";
import createSwaggerTanstackQuery from "@kubb/swagger-tanstack-query";

// Try accessing default export explicitly if needed
const kubbSwagger = createSwagger.default ?? createSwagger;
const kubbSwaggerTS = createSwaggerTS.default ?? createSwaggerTS;
const kubbSwaggerTanstackQuery =
  createSwaggerTanstackQuery.default ?? createSwaggerTanstackQuery;

export default defineConfig({
  root: ".",
  input: {
    path: "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/openapi.yml",
  },
  output: {
    path: "./src/kubb-output", // Output directory for generated files
    clean: true,
  },
  hooks: {
    done: "eslint --fix ./src/kubb-output", // Optional: Run ESLint after generation
  },
  plugins: [
    kubbSwagger({
      output: false, // Don't output the raw Swagger schema
    }),
    kubbSwaggerTS({
      output: {
        path: "models", // Output models to ./src/kubb-output/models
      },
      group: { type: "tag", output: "models/{{tag}}Controller" },
      enumType: "asPascalConst",
      dateType: "date",
    }),
    kubbSwaggerTanstackQuery({
      output: {
        path: "./hooks", // Output hooks to ./src/kubb-output/hooks
      },
      group: { type: "tag", output: "./hooks/{{tag}}Hooks" },
      client: {
        importPath: "../queryClient", // Path relative to the hook file
      },
      dataReturnType: "data",
    }),
  ],
});
