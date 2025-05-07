import React, { useState, useEffect, type ReactNode } from "react";

interface HighlightOnRenderProps {
  children: ReactNode;
  highlightColor?: string;
  duration?: number;
}

/**
 * A component that wraps its children and applies a temporary visual highlight
 * each time it re-renders. Useful for visually debugging component updates.
 * @param {HighlightOnRenderProps} props - The component props.
 * @param {ReactNode} props.children - The content to be wrapped and highlighted on render.
 * @param {string} [props.highlightColor='rgba(255, 255, 0, 0.3)'] - The background color for highlighting.
 * @param {number} [props.duration=500] - The duration in milliseconds for the highlight to remain visible.
 * @returns {JSX.Element} A div element that highlights on re-render.
 */
const HighlightOnRender: React.FC<HighlightOnRenderProps> = ({
  children,
  highlightColor = "rgba(255, 255, 0, 0.3)", // Yellowish, semi-transparent
  duration = 500,
}) => {
  const [isHighlighting, setIsHighlighting] = useState(false);
  const firstRenderRef = React.useRef(true);

  useEffect(() => {
    // Don't highlight on the very first mount/render
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    setIsHighlighting(true);
    const timer = setTimeout(() => {
      setIsHighlighting(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]); // Effect runs on every render because there are no other dependencies
  // but we only set highlighting if it's not the first render.

  return (
    <div
      style={{
        transition: `backgroundColor ${duration / 2}ms ease-out`,
        backgroundColor: isHighlighting ? highlightColor : "transparent",
        padding: "2px",
        borderRadius: "4px",
      }}
    >
      {children}
    </div>
  );
};

export default HighlightOnRender;
