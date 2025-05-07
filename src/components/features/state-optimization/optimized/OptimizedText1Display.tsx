import React from "react";
import { useContextSelector } from "use-context-selector";
import { OptimizedOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";
import HighlightOnRender from "../../../common/HighlightOnRender";

/**
 * Displays text1 using the optimized context with useContextSelector.
 * Only re-renders if text1 or the dispatch function changes.
 */
const OptimizedText1DisplayInner: React.FC = () => {
  const text1 = useContextSelector(
    OptimizedOptimizationContext,
    (ctx) => ctx?.text1 ?? "",
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
      <h4>Text 1 (Optimized Context)</h4>
      <p>
        Value: {text1}
        <RenderCounter componentId="OptimizedText1" />
      </p>
      <input
        type="text"
        value={text1}
        onChange={(e) =>
          dispatch({ type: "UPDATE_TEXT1", payload: e.target.value })
        }
        placeholder="Update Text 1"
      />
    </div>
  );
};

const OptimizedText1Display = React.memo(OptimizedText1DisplayInner);

const OptimizedText1DisplayWithHighlight: React.FC = () => {
  return (
    <HighlightOnRender>
      <OptimizedText1Display />
    </HighlightOnRender>
  );
};

export default OptimizedText1DisplayWithHighlight;
