import React from "react";
import { Card as AntCard, Spin } from "antd";
import type { CardProps } from "antd";

interface CommonCardProps extends CardProps {
  isLoading?: boolean;
  errorMessage?: string;
}

/**
 * A common Card component wrapper around Ant Design Card.
 * Demonstrates conditional rendering for loading/error states.
 *
 * @param {CommonCardProps} props - Component props.
 * @returns {JSX.Element | null} The CommonCard component.
 */
const CommonCard: React.FC<CommonCardProps> = ({
  children,
  isLoading,
  errorMessage,
  ...rest
}) => {
  if (isLoading) {
    return (
      <AntCard {...rest}>
        <Spin />
      </AntCard>
    );
  }

  if (errorMessage) {
    // Potentially render an Alert or just hide the card content
    return (
      <AntCard {...rest} title={rest.title || "Error"}>
        <p style={{ color: "red" }}>{errorMessage}</p>
        {/* Optionally render children even on error? */}
        {/* {children} */}
      </AntCard>
    );
  }

  // Render normal card content
  return <AntCard {...rest}>{children}</AntCard>;
};

export default CommonCard;
