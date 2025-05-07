# Automating Client Code with Kubb & OpenAPI

## Prerequisites
1. You need to understand the slide content, and search for online blogs about that topic
2. Read at least 3 blogs online
3. You should be creative on how to represent your ideas
4. You should write each slides to be isolated, that is each slide page is a folder, which contain all the necessary files for that page, don't share with other slides

## Main Ideas to Convey

- Introduce Kubb as a tool for generating client-side code from OpenAPI specifications.
- Explain that Kubb uses an OpenAPI file (e.g., `openapi.yaml` or `openapi.json`) as its input.
- Highlight the key outputs: TypeScript types, HTTP client (e.g., for Axios, fetch), SWR hooks for data fetching, and Zod schemas for validation.
- Briefly show a conceptual Kubb configuration or command.
- Discuss the benefits: type safety, reduced boilerplate, consistency, faster development.

## Visual Ideas

- **Kubb Logo:** Prominently display the Kubb logo.
- **Flow Diagram (Kubb Process):**
    1.  `openapi.yaml` / `openapi.json` (Input Icon: Document)
    2.  Arrow pointing to Kubb Logo (Processing Icon: Gears/Magic Wand)
    3.  Arrows pointing from Kubb to multiple output blocks:
        *   TypeScript Types (`.ts` file icon)
        *   API Client (e.g., Axios client, network icon)
        *   SWR Hooks (`useQuery` icon, data fetching icon)
        *   Zod Schemas (Validation/Schema icon)
- **Conceptual Code Snippet (Kubb Config):**
    ```javascript
    // kubb.config.js (Conceptual)
    export default {
      input: './petstore.yaml',
      output: './src/gen',
      plugins: [
        pluginClient({
          client: './client.ts' // your axios instance
        }),
        pluginSwr(),
        pluginTypescript(),
        pluginZod(),
      ],
    };
    ```
- **Benefit Icons:**
    - Type Safety: TypeScript logo / Shield icon.
    - Reduced Boilerplate: Minus sign / recycle icon.
    - Consistency: Equals sign / pattern icon.
    - Faster Development: Rocket / lightning bolt icon.

## Content

### What is Kubb?

Kubb is a powerful, low-level TypeScript SDK and CLI tool designed to generate client-side code (like TypeScript types, API clients, and data-fetching hooks) directly from an OpenAPI specification. It helps automate the creation of code that interacts with your backend APIs, ensuring type safety and reducing manual boilerplate.

### Input: The OpenAPI Specification

Kubb takes an OpenAPI specification file (commonly `openapi.yaml` or `openapi.json`) as its input. This file describes your API's endpoints, request/response schemas, parameters, and more.

### Key Outputs You Can Generate:

Kubb is highly configurable through plugins, allowing you to generate various useful outputs:

1.  **TypeScript Types:** Generates TypeScript interfaces and types based on the schemas defined in your OpenAPI spec. This provides strong typing for your API responses and request payloads.
    
2.  **HTTP Client:** Can generate a typed API client (e.g., using Axios or the native Fetch API) with methods for each of your API operations. This client will use the generated TypeScript types.
    
3.  **SWR Hooks (or other data-fetching hooks):** For React applications, Kubb can generate custom SWR (or React Query, TanStack Query) hooks that are pre-configured for your API endpoints. This simplifies data fetching, caching, and state management related to API calls.
    ```typescript
    // Example of a generated SWR hook (conceptual)
    import useSWR from 'swr';
    import client from './client'; // Generated or custom client
    
    export function useGetUserById(id: string) {
      return useSWR<User, Error>(`/users/${id}`, () => client.get(`/users/${id}`).then(res => res.data));
    }
    ```

4.  **Zod Schemas:** Generates Zod schemas from your OpenAPI schemas. Zod is a TypeScript-first schema declaration and validation library, allowing for runtime validation of API responses or request bodies, ensuring data integrity.
    ```typescript
    // Example of a generated Zod schema (conceptual)
    import { z } from 'zod';
    
    export const UserSchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
    });
    ```

### Conceptual Configuration

Kubb is typically configured via a `kubb.config.js` (or `.ts`) file in your project root:

```javascript
// kubb.config.js (Simplified Example)
import { defineConfig } from '@kubb/core'
import createClient from '@kubb/swagger-client'
import createSWR from '@kubb/swagger-swr'
import createTS from '@kubb/swagger-ts'
import createZod from '@kubb/swagger-zod'

export default defineConfig(async () => {
  return {
    root: '.',
    input: {
      path: './path/to/your/openapi.yaml', // Or a URL
    },
    output: {
      path: './src/generated', // Output directory
      clean: true, // Clean output directory before each run
    },
    plugins: [
      createTS({}),        // TypeScript types
      createClient({       // HTTP Client (e.g., Axios)
        client: { importPath: '../utils/axiosInstance' } // Path to your custom Axios instance
      }),
      createSWR({          // SWR Hooks
        client: { importPath: '../utils/axiosInstance' },
        // Other SWR specific options
      }),
      createZod({}),       // Zod Schemas
    ],
  }
})
```

Then you would typically run Kubb via a CLI command like `npx kubb` or a script in your `package.json`.

### Benefits of Using Kubb

-   **Type Safety:** End-to-end type safety from your backend API definition to your frontend code.
-   **Reduced Boilerplate:** Automates the creation of repetitive client code, types, and hooks.
-   **Consistency:** Ensures that your frontend code stays in sync with your API definition.
-   **Faster Development:** Spend less time writing and maintaining API interaction code and more time building features.
-   **Adaptability:** Supports various plugins for different needs and client libraries. 