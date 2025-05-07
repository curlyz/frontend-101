import React from "react";
import { useContextSelector } from "use-context-selector"; // Or useStandardOptimizationContext
import { OptimizedOptimizationContext } from "../../../contexts/StateOptimizationContext"; // Assuming dispatch is stable

/**
 * Control panel with buttons to dispatch actions to the StateOptimizationContext.
 */
const ControlPanel: React.FC = () => {
  // Dispatch is stable, so we can get it from either context or directly from the optimized one.
  // If OptimizedOptimizationContext is undefined (e.g. provider not ready), dispatch will be undefined.
  const dispatch = useContextSelector(
    OptimizedOptimizationContext,
    (ctx) => ctx?.dispatch,
  );

  if (!dispatch) {
    return <div>Control Panel: Loading context...</div>;
  }

  const handleUpdateBothTexts = () => {
    dispatch({ type: "UPDATE_TEXT1", payload: "Hello" });
    dispatch({ type: "UPDATE_TEXT2", payload: "World" });
  };

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        marginBottom: "20px",
        borderRadius: "5px",
      }}
    >
      <h4>Global Controls</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <button onClick={() => dispatch({ type: "INCREMENT_COUNTER1" })}>
          Increment Counter 1
        </button>
        <button onClick={() => dispatch({ type: "INCREMENT_COUNTER2" })}>
          Increment Counter 2
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "UPDATE_TEXT1",
              payload: new Date().toLocaleTimeString(),
            })
          }
        >
          Update Text 1 (Time)
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "UPDATE_TEXT2",
              payload: Math.random().toString(36).substring(7),
            })
          }
        >
          Update Text 2 (Random)
        </button>
        <button onClick={handleUpdateBothTexts}>
          Update Both Texts (Hello/World)
        </button>
        <button
          onClick={() => dispatch({ type: "RESET_STATE" })}
          style={{ backgroundColor: "#ffdddd" }}
        >
          Reset All State
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
