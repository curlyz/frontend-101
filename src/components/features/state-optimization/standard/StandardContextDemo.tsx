import React from "react";
import StandardCounter1DisplayWithHighlight from "./StandardCounter1Display";
import StandardCounter2DisplayWithHighlight from "./StandardCounter2Display";
import StandardText1DisplayWithHighlight from "./StandardText1Display";
import StandardText2DisplayWithHighlight from "./StandardText2Display";

/**
 * Container component for the Standard React Context demonstration.
 * It groups components that all consume the same standard context to show
 * how updates to any part of the context cause all consumers to re-render.
 */
const StandardContextDemo: React.FC = () => {
  return (
    <div
      style={{
        padding: "10px",
        border: "2px dashed blue",
        borderRadius: "5px",
      }}
    >
      <h3>
        Standard <code>React.useContext</code> Demo
      </h3>
      <p>
        These components all use the <em>standard</em>{" "}
        <code>React.useContext</code> hook. Notice how updating any single value
        (e.g., Counter 1) causes <em>all</em> components in this section to
        re-render (indicated by highlighting and incrementing render counts),
        even if they don't directly display that specific value.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <StandardCounter1DisplayWithHighlight />
        <StandardCounter2DisplayWithHighlight />
        <StandardText1DisplayWithHighlight />
        <StandardText2DisplayWithHighlight />
      </div>
    </div>
  );
};

export default StandardContextDemo;
