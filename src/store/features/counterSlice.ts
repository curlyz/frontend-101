// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"; // Use type-only import
import type { RootState } from "../index"; // Import RootState for selector typing

/**
 * @interface CounterState
 * Defines the shape of the state for the counter feature.
 * @property {number} value - The current count.
 */
interface CounterState {
  value: number;
}

// Define the initial state using the interface
const initialState: CounterState = {
  value: 0,
};

/**
 * Creates a Redux slice for managing counter state using Redux Toolkit.
 * Includes reducers for incrementing, decrementing, and incrementing by amount.
 * Automatically generates action creators and action types.
 * Uses Immer internally for immutable state updates.
 */
export const counterSlice = createSlice({
  name: "counter", // Name used in action types
  initialState, // Initial state for the reducer
  // Reducers defined as an object map
  reducers: {
    /**
     * Reducer to increment the count by 1.
     * @param {CounterState} state - The current state.
     */
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      // It doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      state.value += 1;
    },
    /**
     * Reducer to decrement the count by 1.
     * @param {CounterState} state - The current state.
     */
    decrement: (state) => {
      state.value -= 1;
    },
    /**
     * Reducer to increment the count by a specific amount.
     * @param {CounterState} state - The current state.
     * @param {PayloadAction<number>} action - Action containing the amount to add.
     */
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Export the generated action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export a selector function for this slice's state
/**
 * Selects the counter value from the root state.
 * @param {RootState} state - The root Redux state.
 * @returns {number} The current counter value.
 */
export const selectCount = (state: RootState): number => state.counter.value;

// Export the reducer function for the store
export default counterSlice.reducer;
