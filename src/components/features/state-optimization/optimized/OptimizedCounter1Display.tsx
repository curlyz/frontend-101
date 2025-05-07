import React from "react";
import { useContextSelector } from "use-context-selector";
import { OptimizedOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";
import HighlightOnRender from "../../../common/HighlightOnRender";

/**
 * Displays counter1 using the optimized context with useContextSelector.
 * Only re-renders if counter1 or the dispatch function changes.
 */
const OptimizedCounter1DisplayInner: React.FC = () => {
  const counter1 = useContextSelector(
    OptimizedOptimizationContext,
    (ctx) => ctx?.counter1 ?? 0,
  );
  const dispatch = useContextSelector(
    OptimizedOptimizationContext,
    (ctx) => ctx?.dispatch,
  );

  if (!dispatch) {
    // Context might not be available yet or an error state
    return <div>Loading context or context error...</div>;
  }

  return (
    <div
      style={{ border: "1px solid lightgreen", padding: "10px", margin: "5px" }}
    >
      <h4>Counter 1 (Optimized Context)</h4>
      <p>
        Value: {counter1}
        <RenderCounter componentId="OptimizedCounter1" />
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT_COUNTER1" })}>
        Increment Counter 1
      </button>
    </div>
  );
};

const OptimizedCounter1Display = React.memo(OptimizedCounter1DisplayInner);

const OptimizedCounter1DisplayWithHighlight: React.FC = () => {
  return (
    <HighlightOnRender>
      <OptimizedCounter1Display />
    </HighlightOnRender>
  );
};

export default OptimizedCounter1DisplayWithHighlight;
