import React, {
  useState,
  useCallback,
  type ReactNode,
  createContext,
  useContext,
} from "react";
import { produce } from "immer";

// 1. Define State Shape
interface OptimizationState {
  count1: number;
  count2: number;
  unrelated: string;
}

// 2. Define Context Value Shape
interface OptimizationContextValue {
  state: OptimizationState;
  increment1: () => void;
  increment2: () => void;
  setUnrelated: (value: string) => void; // Example of unrelated update
}

// 3. Create Context (initialized as undefined for safety check)
const OptimizationContext = createContext<OptimizationContextValue | undefined>(
  undefined,
);
OptimizationContext.displayName = "OptimizationContext";

// 4. Initial State
const initialState: OptimizationState = {
  count1: 0,
  count2: 0,
  unrelated: "initial data",
};

// 5. Provider Component
interface OptimizationProviderProps {
  children: ReactNode;
}

export const OptimizationProvider: React.FC<OptimizationProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<OptimizationState>(initialState);

  const increment1 = useCallback(() => {
    setState(
      produce((draft) => {
        draft.count1 += 1;
      }),
    );
  }, []);

  const increment2 = useCallback(() => {
    setState(
      produce((draft) => {
        draft.count2 += 1;
      }),
    );
  }, []);

  const setUnrelated = useCallback((value: string) => {
    setState(
      produce((draft) => {
        draft.unrelated = value;
      }),
    );
  }, []);

  const value: OptimizationContextValue = {
    state,
    increment1,
    increment2,
    setUnrelated,
  };

  return (
    <OptimizationContext.Provider value={value}>
      {children}
    </OptimizationContext.Provider>
  );
};

// 6. Hooks for consumption (using standard useContext ONLY)
export const useOptimizationContext_Standard = (): OptimizationContextValue => {
  const context = useContext(OptimizationContext);
  if (!context) {
    throw new Error(
      "useOptimizationContext_Standard must be used within an OptimizationProvider",
    );
  }
  return context;
};
