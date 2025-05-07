import React from "react";
import { Button, Typography, Space, Card } from "antd"; // Import antd components
// import { useContextSelector } from "use-context-selector"; // No longer used
// import { OptimizedOptimizationContext } from "../../../contexts/StateOptimizationContext"; // No longer used
import type { Action } from "../../../contexts/StateOptimizationContext"; // Import Action type

const { Title } = Typography;

/**
 * Props for the ControlPanel component.
 */
interface ControlPanelProps {
  /**
   * The dispatch function from a useReducer hook to send actions to the state.
   */
  dispatch: React.Dispatch<Action>;
}

/**
 * Inner component for ControlPanel.
 * This will be wrapped by React.memo.
 */
const ControlPanelInner: React.FC<ControlPanelProps> = ({ dispatch }) => {
  // dispatch is now a prop
  // if (!dispatch) { // This check might be removed if dispatch is guaranteed by parent
  //   return <div>Control Panel: Dispatch not provided.</div>;
  // }

  const handleUpdateBothTexts = () => {
    dispatch({ type: "UPDATE_TEXT1", payload: "Hello" });
    dispatch({ type: "UPDATE_TEXT2", payload: "World" });
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <Title level={4} style={{ marginBottom: "15px" }}>
        Controls
      </Title>
      <Space wrap size="middle">
        {" "}
        {/* `wrap` allows items to wrap to next line, `size` controls gap */}
        <Button onClick={() => dispatch({ type: "INCREMENT_COUNTER1" })}>
          Increment Counter 1
        </Button>
        <Button onClick={() => dispatch({ type: "INCREMENT_COUNTER2" })}>
          Increment Counter 2
        </Button>
        <Button
          onClick={() =>
            dispatch({
              type: "UPDATE_TEXT1",
              payload: new Date().toLocaleTimeString(),
            })
          }
        >
          Update Text 1 (Time)
        </Button>
        <Button
          onClick={() =>
            dispatch({
              type: "UPDATE_TEXT2",
              payload: Math.random().toString(36).substring(7),
            })
          }
        >
          Update Text 2 (Random)
        </Button>
        <Button onClick={handleUpdateBothTexts}>
          Update Both Texts (Hello/World)
        </Button>
        <Button
          danger // Antd prop for dangerous actions, gives red styling
          onClick={() => dispatch({ type: "RESET_STATE" })}
        >
          Reset All State
        </Button>
      </Space>
    </Card>
  );
};

/**
 * Control panel with buttons to dispatch actions.
 * Accepts a dispatch function as a prop to interact with a state managed elsewhere.
 * Uses Ant Design components for UI.
 * Memoized to prevent re-renders if props (dispatch) haven't changed.
 */
const ControlPanel = React.memo(ControlPanelInner);

export default ControlPanel;
