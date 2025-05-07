import React from "react";
import { useContextSelector } from "use-context-selector";
import { OptimizedOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";
import HighlightOnRender from "../../../common/HighlightOnRender";

/**
 * Displays counter2 using the optimized context with useContextSelector.
 * Only re-renders if counter2 or the dispatch function changes.
 */
const OptimizedCounter2DisplayInner: React.FC = () => {
  const counter2 = useContextSelector(
    OptimizedOptimizationContext,
    (ctx) => ctx?.counter2 ?? 0,
  );
  const dispatch = useContextSelector(
    OptimizedOptimizationContext,
    (ctx) => ctx?.dispatch,
  );

  if (!dispatch) {
    return <div>Loading context or context error...</div>;
  }

  return (
    <div
      style={{ border: "1px solid lightgreen", padding: "10px", margin: "5px" }}
    >
      <h4>Counter 2 (Optimized Context)</h4>
      <p>
        Value: {counter2}
        <RenderCounter componentId="OptimizedCounter2" />
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT_COUNTER2" })}>
        Increment Counter 2
      </button>
    </div>
  );
};

const OptimizedCounter2Display = React.memo(OptimizedCounter2DisplayInner);

const OptimizedCounter2DisplayWithHighlight: React.FC = () => {
  return (
    <HighlightOnRender>
      <OptimizedCounter2Display />
    </HighlightOnRender>
  );
};

export default OptimizedCounter2DisplayWithHighlight;
