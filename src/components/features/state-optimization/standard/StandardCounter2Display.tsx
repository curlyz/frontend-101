import React from "react";
import { useStandardOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";
import HighlightOnRender from "../../../common/HighlightOnRender";

/**
 * Displays counter2 from the standard context and allows incrementing it.
 * Demonstrates how standard context consumers re-render.
 */
const StandardCounter2DisplayInner: React.FC = () => {
  const { counter2, dispatch } = useStandardOptimizationContext();

  return (
    <div
      style={{ border: "1px solid lightgray", padding: "10px", margin: "5px" }}
    >
      <h4>Counter 2 (Standard Context)</h4>
      <p>
        Value: {counter2}
        <RenderCounter componentId="StandardCounter2" />
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT_COUNTER2" })}>
        Increment Counter 2
      </button>
    </div>
  );
};

const StandardCounter2Display = React.memo(StandardCounter2DisplayInner);

const StandardCounter2DisplayWithHighlight: React.FC = () => {
  return (
    <HighlightOnRender>
      <StandardCounter2Display />
    </HighlightOnRender>
  );
};

export default StandardCounter2DisplayWithHighlight;
