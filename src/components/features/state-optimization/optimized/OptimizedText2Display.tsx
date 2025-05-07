import React from "react";
import { useContextSelector } from "use-context-selector";
import { OptimizedOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";
import HighlightOnRender from "../../../common/HighlightOnRender";

/**
 * Displays text2 using the optimized context with useContextSelector.
 * Only re-renders if text2 or the dispatch function changes.
 */
const OptimizedText2DisplayInner: React.FC = () => {
  const text2 = useContextSelector(
    OptimizedOptimizationContext,
    (ctx) => ctx?.text2 ?? "",
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
      <h4>Text 2 (Optimized Context)</h4>
      <p>
        Value: {text2}
        <RenderCounter componentId="OptimizedText2" />
      </p>
      <input
        type="text"
        value={text2}
        onChange={(e) =>
          dispatch({ type: "UPDATE_TEXT2", payload: e.target.value })
        }
        placeholder="Update Text 2"
      />
    </div>
  );
};

const OptimizedText2Display = React.memo(OptimizedText2DisplayInner);

const OptimizedText2DisplayWithHighlight: React.FC = () => {
  return (
    <HighlightOnRender>
      <OptimizedText2Display />
    </HighlightOnRender>
  );
};

export default OptimizedText2DisplayWithHighlight;
