import React from "react";
import { Button } from "antd";

interface CallbackChildProps {
  onClick: () => void; // The function prop
  label: string;
}

/**
 * A child component that receives a function prop.
 * Wrapped in React.memo to prevent re-renders if props remain the same.
 *
 * @param {CallbackChildProps} props Component props.
 * @returns {JSX.Element} The CallbackChild component.
 */
const CallbackChild: React.FC<CallbackChildProps> = React.memo(
  ({ onClick, label }) => {
    console.log(`Rendering child: ${label}`);
    return (
      <Button onClick={onClick} style={{ margin: "5px" }}>
        {label}
      </Button>
    );
  },
);

// Set display name for easier debugging in React DevTools
CallbackChild.displayName = "CallbackChild";

export default CallbackChild;
