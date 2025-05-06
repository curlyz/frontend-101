# Redux Store

This directory manages the global application state using Redux Toolkit.

## Setup

-   **Store Configuration:** `src/store/index.ts` uses `configureStore` from Redux Toolkit. This automatically:
    -   Combines slice reducers.
    -   Adds necessary middleware (like `redux-thunk` for async actions).
    -   Enables the Redux DevTools Extension for debugging in development.
-   **Provider:** The application is wrapped with the `<Provider store={store}>` component from `react-redux` in `src/main.tsx`.

## Feature Slices

-   Individual features or domains of the state should have their own "slice" file within `src/store/features/` (e.g., `src/store/features/counterSlice.ts`).
-   **Creating a Slice:** Use `createSlice` from Redux Toolkit:
    -   Define an `initialState` for the slice.
    -   Provide a `name` for the slice (used in action type prefixes).
    -   Define `reducers`: functions that handle state updates. Immer is used internally, so you can write "mutating" logic safely.
    -   `createSlice` automatically generates action creators and action types.
    -   Export the generated actions and the reducer.
    -   Export selectors to read specific parts of the slice's state (e.g., `selectCount` in `counterSlice.ts`).
-   **Adding to Store:** Import the slice's reducer into `src/store/index.ts` and add it to the `reducer` object in `configureStore`.

## Connecting Components

-   **Reading State:** Use the `useSelector` hook from `react-redux` along with an exported selector function from the relevant slice.
    ```jsx
    import { useSelector } from 'react-redux';
    import { selectCount } from '@/store/features/counterSlice';

    const count = useSelector(selectCount);
    ```
-   **Dispatching Actions:** Use the `useDispatch` hook from `react-redux`. It's recommended to use the typed dispatch `AppDispatch` exported from `src/store/index.ts`.
    ```jsx
    import { useDispatch } from 'react-redux';
    import { increment } from '@/store/features/counterSlice';
    import type { AppDispatch } from '@/store';

    const dispatch = useDispatch<AppDispatch>();
    dispatch(increment());
    ```

## State Management Guidelines

-   **Redux:** Use for global state that is shared across many components or features, especially state that involves complex update logic or requires middleware (like async actions with thunk).
    -   Examples: User authentication status, fetched application-wide data, complex UI state shared between unrelated parts.
-   **React Context (`src/contexts/`)**: Use for global or semi-global state that doesn't change very frequently or has simpler update logic. Good for passing down data like themes, user preferences, or simple auth status without complex async flows managed directly by the context.
    -   Leverage `useContextSelector` for performance optimization when components only need a subset of the context value.
-   **Local Component State (`useState`, `useReducer`)**: Use for state that is only relevant to a single component or a small, closely related group of components. This is the default choice unless state needs to be shared more broadly.
    -   Examples: Form input values, UI toggles (like modal visibility), local loading/error states specific to a component's action.

## Debugging

-   Install the [Redux DevTools browser extension](https://github.com/reduxjs/redux-devtools).
-   It automatically connects to the store in development mode, allowing you to inspect state changes, time-travel debug, and dispatch actions manually. 