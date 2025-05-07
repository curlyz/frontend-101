import React from "react";
import { useStandardOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";
import HighlightOnRender from "../../../common/HighlightOnRender";

/**
 * Displays counter1 from the standard context and allows incrementing it.
 * Demonstrates how standard context consumers re-render.
 */
const StandardCounter1DisplayInner: React.FC = () => {
  const { counter1, dispatch } = useStandardOptimizationContext();

  return (
    <div
      style={{ border: "1px solid lightgray", padding: "10px", margin: "5px" }}
    >
      <h4>Counter 1 (Standard Context)</h4>
      <p>
        Value: {counter1}
        <RenderCounter componentId="StandardCounter1" />
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT_COUNTER1" })}>
        Increment Counter 1
      </button>
    </div>
  );
};

const StandardCounter1Display = React.memo(StandardCounter1DisplayInner);

const StandardCounter1DisplayWithHighlight: React.FC = () => {
  return (
    <HighlightOnRender>
      <StandardCounter1Display />
    </HighlightOnRender>
  );
};

export default StandardCounter1DisplayWithHighlight;
