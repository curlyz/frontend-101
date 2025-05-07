import React, { useReducer, type ReactNode } from "react";
import {
  createContext as createContextSelector,
  useContextSelector,
} from "use-context-selector";
import { produce } from "immer";

interface OptimizationState {
  counter1: number;
  counter2: number;
  text1: string;
  text2: string;
}

const initialState: OptimizationState = {
  counter1: 0,
  counter2: 0,
  text1: "",
  text2: "",
};

export type Action =
  | { type: "INCREMENT_COUNTER1" }
  | { type: "INCREMENT_COUNTER2" }
  | { type: "UPDATE_TEXT1"; payload: string }
  | { type: "UPDATE_TEXT2"; payload: string }
  | { type: "RESET_STATE" };

const reducer = produce((draft: OptimizationState, action: Action) => {
  switch (action.type) {
    case "INCREMENT_COUNTER1":
      draft.counter1 += 1;
      break;
    case "INCREMENT_COUNTER2":
      draft.counter2 += 1;
      break;
    case "UPDATE_TEXT1":
      draft.text1 = action.payload;
      break;
    case "UPDATE_TEXT2":
      draft.text2 = action.payload;
      break;
    case "RESET_STATE":
      return initialState;
  }
});

// Standard React Context
interface StandardContextType extends OptimizationState {
  dispatch: React.Dispatch<Action>;
}
const StandardOptimizationContext = React.createContext<
  StandardContextType | undefined
>(undefined);

// Context with use-context-selector
export interface OptimizedContextType extends OptimizationState {
  dispatch: React.Dispatch<Action>;
}
const OptimizedOptimizationContext = createContextSelector<
  OptimizedContextType | undefined
>(undefined);

/**
 * Provider component for the standard React context.
 * Manages its own state and provides it to children.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The provider component.
 */
export const StandardStateProvider = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue: StandardContextType = { ...state, dispatch };
  return (
    <StandardOptimizationContext.Provider value={contextValue}>
      {children}
    </StandardOptimizationContext.Provider>
  );
};

/**
 * Provider component for the optimized context (using use-context-selector).
 * Manages its own state and provides it to children.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The provider component.
 */
export const OptimizedStateProvider = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue: OptimizedContextType = { ...state, dispatch };
  return (
    <OptimizedOptimizationContext.Provider value={contextValue}>
      {children}
    </OptimizedOptimizationContext.Provider>
  );
};

/**
 * Custom hook to consume the standard React context for state optimization demo.
 * @returns {StandardContextType} The context value.
 * @throws {Error} If used outside of a StandardStateProvider.
 */
export const useStandardOptimizationContext = (): StandardContextType => {
  const context = React.useContext(StandardOptimizationContext);
  if (context === undefined) {
    throw new Error(
      "useStandardOptimizationContext must be used within a StandardStateProvider",
    );
  }
  return context;
};

/**
 * Custom hook to consume the optimized context (using use-context-selector).
 * This function itself is not using useContextSelector directly for a field,
 * but provides the full context value. Components consuming this hook
 * will use useContextSelector for specific field access.
 * @returns {OptimizedContextType} The context value.
 * @throws {Error} If used outside of an OptimizedStateProvider.
 */
export const useOptimizedContextSelector = (): OptimizedContextType => {
  const context = useContextSelector(OptimizedOptimizationContext, (v) => v);
  if (context === undefined) {
    throw new Error(
      "useOptimizedContextSelector must be used within an OptimizedStateProvider",
    );
  }
  return context;
};

// Export the raw contexts if direct consumption with useContextSelector is preferred in some cases,
// or for direct access to the dispatch without selecting state.
export { StandardOptimizationContext, OptimizedOptimizationContext };
