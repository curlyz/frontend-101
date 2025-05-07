import React from "react";
import OptimizedCounter1DisplayWithHighlight from "./OptimizedCounter1Display";
import OptimizedCounter2DisplayWithHighlight from "./OptimizedCounter2Display";
import OptimizedText1DisplayWithHighlight from "./OptimizedText1Display";
import OptimizedText2DisplayWithHighlight from "./OptimizedText2Display";

/**
 * Container component for the Optimized React Context (use-context-selector) demonstration.
 * It groups components that use useContextSelector to subscribe to specific parts of the context,
 * demonstrating how this avoids unnecessary re-renders.
 */
const OptimizedContextDemo: React.FC = () => {
  return (
    <div
      style={{
        padding: "10px",
        border: "2px dashed green",
        borderRadius: "5px",
      }}
    >
      <h3>
        Optimized <code>use-context-selector</code> Demo
      </h3>
      <p>
        These components use <code>useContextSelector</code> from the{" "}
        <code>use-context-selector</code> library. Each component selects only
        the specific pieces of state it needs. Notice how updating one value
        (e.g., Counter 1) <em>only</em> causes the component displaying Counter
        1 to re-render. Other components remain unaffected, showcasing the
        performance benefit.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <OptimizedCounter1DisplayWithHighlight />
        <OptimizedCounter2DisplayWithHighlight />
        <OptimizedText1DisplayWithHighlight />
        <OptimizedText2DisplayWithHighlight />
      </div>
    </div>
  );
};

export default OptimizedContextDemo;
