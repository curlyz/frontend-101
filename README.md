# Frontend 101 - React Concepts Demo

This project demonstrates various core React concepts and related libraries using Vite, TypeScript, Ant Design, and Redux Toolkit.

## Features Demonstrated

*   Vite Project Setup (React + TS)
*   Basic Component Architecture (Class & Function)
*   React Hooks (`useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, Custom Hooks)
*   State Management (Lifting State Up, Context API with `use-context-selector`, Redux Toolkit)
*   Form Handling (Controlled Components)
*   Data Fetching (`useEffect`, Custom Hook with cancellation & retries)
*   Performance Optimization (`useMemo`, `useCallback`, `React.memo`)
*   Routing (`react-router-dom`)
*   UI Library (`antd`, `@ant-design/pro-layout`)
*   Developer Tools (`code-inspector-plugin`, `react-scan` - via Vite config)
*   Linting/Formatting (ESLint, Prettier)
*   Task Management ([Task Master AI](https://github.com/your-repo/task-master-ai) - internal tool)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/frontend-101.git
    cd frontend-101
    ```
2.  **Install dependencies:**
    ```bash
    yarn install
    ```
3.  **Set up Environment Variables:**
    *   Copy the `.env.example` file to `.env.development` and `.env.production`.
        ```bash
        cp .env.example .env.development
        cp .env.example .env.production
        ```
    *   Edit `.env.development` and `.env.production` to set the required environment variables (e.g., `VITE_APP_TITLE`).
    *   **Important:** Do NOT commit `.env.*` files containing actual secrets or keys to version control. `.gitignore` should already be configured to ignore them.
4.  **Run the development server:**
    ```bash
    yarn dev
    ```
    The application will be available at `http://localhost:7000` (or the next available port).

## Available Scripts

In the project directory, you can run:

*   `yarn dev`: Runs the app in development mode with hot reloading.
*   `yarn build`: Builds the app for production to the `dist` folder.
*   `yarn start`: Serves the production build locally (useful for testing the build). Requires `yarn build` first.
*   `yarn preview`: Previews the production build locally (similar to `start`). Requires `yarn build` first.
*   `yarn lint`: Lints the code using ESLint.
*   `yarn format`: Formats the code using Prettier.

*   `yarn generate-client`: (Example script) Generates an API client using `openapi-ts`.
*   `yarn list`, `yarn generate`, `yarn parse-prd`: Scripts related to the internal Task Master AI tool for managing development tasks.

## Project Structure

```
frontend-101/
├── dist/                   # Production build output
├── public/                 # Static assets (index.html template, logos)
├── scripts/                # Build/utility scripts (Task Master)
├── src/
│   ├── assets/             # Static assets used by components
│   ├── client/             # Generated API client (example)
│   ├── components/         # React components
│   │   ├── common/         # General reusable components
│   │   └── features/       # Feature-specific components (redux, data-fetching, etc.)
│   ├── contexts/           # React Context providers and hooks
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Layout components (MainLayout)
│   ├── slides/             # Page components acting as presentation slides
│   ├── store/              # Redux store configuration and features
│   │   └── features/       # Redux feature slices
│   ├── styles/             # Global or shared styles (if needed beyond Tailwind)
│   ├── utils/              # Utility functions
│   ├── main.tsx            # Main application entry point (React Root, Router, Providers)
│   └── queryClient.ts      # React Query client configuration (if used)
├── tasks/                  # Task Master generated task files
├── .env.example            # Environment variable template
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template for Vite
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration (for Tailwind)
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration (root)
├── tsconfig.app.json       # TypeScript configuration (for src/)
├── tsconfig.node.json      # TypeScript configuration (for Vite config, etc.)
└── vite.config.ts          # Vite configuration
```

## State Management Strategy

See `src/store/README.md` for guidelines on using Redux vs. Context vs. Local State.

## Dependency Management

This project uses Yarn 4 for package management. Key points:

*   **Lockfile:** `yarn.lock` ensures reproducible installs. Always commit this file.
*   **Adding Dependencies:** `yarn add [package-name]` or `yarn add -D [package-name]` for dev dependencies.
*   **Updating Dependencies:** Regularly run `yarn upgrade-interactive --latest` to review and apply updates.
*   **Path Aliases:** The `@/*` alias is configured in `tsconfig.app.json` and `vite.config.ts` to simplify imports (e.g., `import MyComponent from '@/components/common/MyComponent';`).

## CI/CD

A basic CI/CD pipeline can be set up using the following scripts:

1.  **Install Dependencies:** `yarn install --immutable` (Ensures lockfile consistency)
2.  **Lint:** `yarn lint`
3.  **Type Check:** `yarn type-check`
4.  **Test:** `yarn test` (Currently a placeholder)
5.  **Build:** `yarn build`

These steps can be integrated into platforms like GitHub Actions, GitLab CI, etc., to automate testing and building on commits or pull requests.