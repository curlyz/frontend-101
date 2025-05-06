import { configureStore } from "@reduxjs/toolkit";
// Import reducers from feature slices here
// Example: import counterReducer from './features/counter/counterSlice';
import counterReducer from "./features/counterSlice"; // Import the new reducer

/**
 * Configures and exports the Redux store using Redux Toolkit.
 * Includes Redux DevTools Extension support by default.
 */
export const store = configureStore({
  reducer: {
    // Add reducers here
    // counter: counterReducer, // Example
    counter: counterReducer, // Add the counter reducer
    // Remove placeholder once real reducers are added
    // placeholder: (state = {}) => state, // No-op reducer
  },
  // Middleware is automatically configured by configureStore (includes thunk)
  // devTools: process.env.NODE_ENV !== 'production', // DevTools are enabled by default in dev mode
});

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 * Type representing the entire Redux state tree.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * @typedef {typeof store.dispatch} AppDispatch
 * Type representing the store's dispatch function, including middleware types (like thunk).
 */
export type AppDispatch = typeof store.dispatch;
