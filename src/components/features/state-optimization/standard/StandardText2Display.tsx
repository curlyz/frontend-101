import React from "react";
import { useStandardOptimizationContext } from "../../../../contexts/StateOptimizationContext";
import RenderCounter from "../../../common/RenderCounter";
import HighlightOnRender from "../../../common/HighlightOnRender";

/**
 * Displays text2 from the standard context and allows updating it.
 * Demonstrates how standard context consumers re-render.
 */
const StandardText2DisplayInner: React.FC = () => {
  const { text2, dispatch } = useStandardOptimizationContext();

  return (
    <div
      style={{ border: "1px solid lightgray", padding: "10px", margin: "5px" }}
    >
      <h4>Text 2 (Standard Context)</h4>
      <p>
        Value: {text2}
        <RenderCounter componentId="StandardText2" />
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

const StandardText2Display = React.memo(StandardText2DisplayInner);

const StandardText2DisplayWithHighlight: React.FC = () => {
  return (
    <HighlightOnRender>
      <StandardText2Display />
    </HighlightOnRender>
  );
};

export default StandardText2DisplayWithHighlight;
