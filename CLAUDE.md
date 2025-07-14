# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js educational project demonstrating React concepts, built with TypeScript, Ant Design, and Redux Toolkit. The project serves as a comprehensive learning resource for frontend development concepts.

## Development Commands

### Essential Commands
```bash
# Development
yarn dev                 # Start Next.js dev server on port 7000
yarn build              # Build for production (runs generate first)
yarn start              # Start production server on port 7000

# Code Quality
yarn lint               # Run ESLint
yarn format             # Format code with Prettier
yarn type-check         # Run TypeScript compiler checks

# API Generation
yarn generate           # Generate API client from OpenAPI spec using Kubb
yarn list               # List development tasks (Task Master AI)
yarn parse-prd          # Parse PRD files (Task Master AI)

# Pre-commit workflow
yarn format && yarn lint && yarn type-check
```

### Testing
- No test framework is currently configured (`yarn test` shows placeholder)
- Before adding tests, check with user about preferred framework

## Architecture Overview

### Next.js App Router Structure
- **App Router**: Uses Next.js 15 App Router with file-based routing in `app/` directory
- **TypeScript**: Strict mode enabled with path aliases (`@/*` → `src/*`)
- **Hybrid Setup**: Migrating from Vite to Next.js (some legacy Vite components remain in `src/`)

### Key Architectural Patterns

#### 1. State Management Strategy
- **Redux Toolkit**: Global state in `src/store/` with feature slices
- **React Context**: Theme and auth state using `use-context-selector` for optimization
- **Local State**: Component-specific state with `useState`/`useReducer`

#### 2. API Integration
- **Generated Client**: OpenAPI → TypeScript client via Kubb (`src/gen/`)
- **SWR**: Data fetching with caching and revalidation
- **Zod Schemas**: Runtime validation from OpenAPI spec

#### 3. UI Component Strategy
- **Ant Design**: Primary UI library with Pro Layout
- **Shadcn/UI**: Secondary component library in `src/components/ui/`
- **Tailwind CSS**: Utility-first styling

### Component Organization
```
src/components/
├── common/              # Reusable components
├── features/            # Feature-specific components
│   ├── data-fetching/   # API integration demos
│   ├── performance/     # Optimization examples
│   ├── redux/          # Redux-connected components
│   └── state-*/        # State management patterns
├── layout/             # Layout components
└── ui/                 # Shadcn/UI components
```

## State Management Guidelines

### When to Use Each Pattern
- **Redux**: Complex global state, async actions, time-travel debugging
- **Context**: Simple global state (theme, auth) with `use-context-selector`
- **Local State**: Component-specific state, form inputs, UI toggles

### Redux Toolkit Pattern
```typescript
// Feature slice structure
export const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    // Immer-powered reducers
  }
});

// Export actions and selectors
export const { action } = featureSlice.actions;
export const selectData = (state: RootState) => state.feature.data;
```

## API Development

### Kubb Configuration
- **Input**: PokeAPI OpenAPI spec (configurable in `kubb.config.ts`)
- **Output**: Generated to `src/gen/` (excluded from git)
- **Plugins**: TypeScript types, Zod schemas, SWR hooks, API client

### Generated Code Structure
```
src/gen/
├── models/             # TypeScript interfaces
├── schemas/            # Zod validation schemas
├── swr/               # SWR hooks by API tag
└── client/            # API client functions
```

### API Client Usage
```typescript
import { usePokemonList } from '@/gen/swr/pokemonController';
// SWR hooks auto-generated with proper typing
```

## Performance Optimization

### Built-in Optimizations
- **Next.js**: Automatic code splitting, image optimization
- **Package Imports**: Optimized for Ant Design, lodash
- **Context Selectors**: Prevents unnecessary re-renders
- **Lazy Loading**: React.lazy for route components

### Performance Components
- Examples in `src/components/features/performance/`
- Demonstrates `useMemo`, `useCallback`, virtualization
- List key optimization and throttling/debouncing

## Special Features

### Development Tools
- **Code Inspector**: Click-to-source integration
- **Redux DevTools**: Time-travel debugging
- **SWR DevTools**: API cache inspection

### Educational Structure
- **Slides**: Presentation components in `src/slides/`
- **Examples**: Progressive complexity in feature demos
- **Documentation**: READMEs in `src/store/` and `src/contexts/`

## Code Quality Configuration

### ESLint Rules
- Next.js core web vitals
- TypeScript strict mode disabled for learning
- Prettier integration for formatting
- Many rules disabled for educational flexibility

### TypeScript Configuration
- Strict mode: `false` (educational project)
- Path aliases: `@/*` → `src/*`
- Next.js plugin integration
- Excludes: `src/gen/` (generated code)

## Common Patterns

### Context with Selector Pattern
```typescript
const useSpecificValue = () => useContextSelector(Context, (state) => state.value);
```

### Form Handling
- React Hook Form integration
- Ant Design form components
- Multi-step form examples

### Data Fetching
- SWR for caching
- Custom hooks for API calls
- Error boundaries for graceful failures

## Important Notes

### Environment Variables
- `VITE_APP_TITLE`: App title (defaults to "Frontend 101")
- Next.js env vars accessible in `next.config.js`

### Build Process
1. `yarn generate` - Generate API client
2. `next build` - Build Next.js app
3. Output to `.next-dev` (dev) or `.next-build` (prod)

### Migration Notes
- Transitioning from Vite to Next.js App Router
- Some legacy Vite components remain in `src/`
- New pages being added to `app/` directory
- Gradual migration to Next.js patterns

## Development Workflow

1. **API Changes**: Run `yarn generate` after OpenAPI spec updates
2. **Code Quality**: Always run `yarn format && yarn lint && yarn type-check` before commits
3. **State Changes**: Follow Redux Toolkit patterns for global state
4. **New Features**: Add to appropriate `app/` route or `src/components/features/`
5. **Performance**: Reference existing performance examples for optimization patterns