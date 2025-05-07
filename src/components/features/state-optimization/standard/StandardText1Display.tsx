import React from "react";
import { useStandardOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";
import HighlightOnRender from "../../../common/HighlightOnRender";

/**
 * Displays text1 from the standard context and allows updating it.
 * Demonstrates how standard context consumers re-render.
 */
const StandardText1DisplayInner: React.FC = () => {
  const { text1, dispatch } = useStandardOptimizationContext();

  return (
    <div
      style={{ border: "1px solid lightgray", padding: "10px", margin: "5px" }}
    >
      <h4>Text 1 (Standard Context)</h4>
      <p>
        Value: {text1}
        <RenderCounter componentId="StandardText1" />
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

const StandardText1Display = React.memo(StandardText1DisplayInner);

const StandardText1DisplayWithHighlight: React.FC = () => {
  return (
    <HighlightOnRender>
      <StandardText1Display />
    </HighlightOnRender>
  );
};

export default StandardText1DisplayWithHighlight;
