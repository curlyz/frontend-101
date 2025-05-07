import { useRef } from "react";

/**
 * Custom hook to track the number of times a component has rendered.
 * Logs the render count to the console if a component name is provided.
 * @param {string} [componentName] - Optional name of the component for logging purposes.
 * @returns {number} The current render count for the component instance, starting from 1 for the initial render.
 */
export const useRenderCount = (componentName?: string): number => {
  const renderCountRef = useRef(0);

  // Increment happens each time the hook is called (i.e., on each render of the consuming component)
  renderCountRef.current += 1;

  if (componentName) {
    console.log(`Render: ${componentName} - Count: ${renderCountRef.current}`);
  }

  return renderCountRef.current;
};
