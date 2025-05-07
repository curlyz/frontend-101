import React from "react";
import { useRenderCount } from "../../hooks/useRenderCount";

interface RenderCounterProps {
  componentId: string; // To identify which component this counter is for
  displayName?: string; // Optional display name for the component being tracked
}

/**
 * A component that displays the render count of the component it's placed in,
 * or tracks a named component if a displayName is provided for logging via useRenderCount.
 * @param {RenderCounterProps} props - The component props.
 * @param {string} props.componentId - A unique identifier for this counter instance/component being tracked.
 * @param {string} [props.displayName] - Optional name passed to useRenderCount for console logging.
 * @returns {JSX.Element} A span element displaying the render count.
 */
const RenderCounter: React.FC<RenderCounterProps> = ({
  componentId,
  displayName,
}) => {
  const count = useRenderCount(displayName || componentId);

  return (
    <span style={{ fontSize: "0.8em", color: "#555", marginLeft: "8px" }}>
      (Renders: {count})
    </span>
  );
};

export default RenderCounter;
