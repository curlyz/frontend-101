import React, { useState, useEffect } from "react";
import { Card, Typography, Statistic } from "antd";

const { Title } = Typography;

interface WindowDimensions {
  width: number;
  height: number;
}

/**
 * Displays the current window dimensions, updating on resize.
 * Demonstrates useEffect with dependencies and cleanup.
 *
 * @returns {JSX.Element} The WindowSize component.
 */
const WindowSize: React.FC = () => {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);
    console.log("WindowSize: resize listener added.");

    // Cleanup function: remove listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("WindowSize: resize listener removed.");
    };
  }, []); // Empty dependency array: effect runs only on mount and cleanup on unmount

  return (
    <Card title={<Title level={4}>Window Size (useEffect)</Title>} size="small">
      <Statistic title="Width" value={dimensions.width} suffix="px" />
      <Statistic title="Height" value={dimensions.height} suffix="px" />
    </Card>
  );
};

export default WindowSize;
