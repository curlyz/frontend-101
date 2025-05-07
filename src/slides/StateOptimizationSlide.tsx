import React from "react";
import { StateOptimizationProvider } from "@/contexts/StateOptimizationContext";
import ControlPanel from "@/components/features/state-optimization/ControlPanel";
import StandardContextDemo from "@/components/features/state-optimization/standard/StandardContextDemo";
import OptimizedContextDemo from "@/components/features/state-optimization/optimized/OptimizedContextDemo";

/**
 * A presentation slide demonstrating React context performance optimization techniques.
 * It compares standard React context with the `use-context-selector` library
 * to show how selective context consumption can prevent unnecessary re-renders.
 */
const StateOptimizationSlide: React.FC = () => {
  return (
    <StateOptimizationProvider>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h2>
          React Context Performance: Standard vs.{" "}
          <code>use-context-selector</code>
        </h2>
        <p style={{ marginBottom: "20px" }}>
          This demonstration highlights the performance differences between
          using standard React context (<code>React.useContext</code>) and an
          optimized approach with the <code>use-context-selector</code> library.
          Pay attention to the component highlights and render counts when
          interacting with the controls.
        </p>

        <ControlPanel />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <StandardContextDemo />
          </div>
          <div style={{ flex: 1 }}>
            <OptimizedContextDemo />
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #eee",
          }}
        >
          <h4>Key Takeaways:</h4>
          <ul>
            <li>
              <strong>Standard Context:</strong> When any part of the context
              value changes, all components consuming that context re-render,
              regardless of whether they use the specific piece of state that
              changed. This can lead to performance issues in complex
              applications.
            </li>
            <li>
              <strong>
                <code>use-context-selector</code>:
              </strong>{" "}
              This library allows components to subscribe to only specific parts
              of the context value. Components will only re-render if the
              selected part of the state changes, significantly reducing
              unnecessary re-renders and improving performance.
            </li>
          </ul>
          <p>
            The <code>use-context-selector</code> hook is particularly
            beneficial when a context provides a large state object and
            components only care about small, independent slices of that state.
          </p>
        </div>
      </div>
    </StateOptimizationProvider>
  );
};

export default StateOptimizationSlide;
