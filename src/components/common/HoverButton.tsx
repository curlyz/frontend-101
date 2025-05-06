import React, { useState } from "react";
import { Button as AntButton } from "antd";
import type { ButtonProps } from "antd";

interface HoverButtonProps extends ButtonProps {
  hoverText?: string;
}

/**
 * A wrapper around Ant Design Button that changes text on hover.
 *
 * @param {HoverButtonProps} props - Component props.
 * @returns {JSX.Element} The HoverButton component.
 */
const HoverButton: React.FC<HoverButtonProps> = ({
  children,
  hoverText,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setIsHovered(true);
    onMouseEnter?.(e); // Call original handler if provided
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e); // Call original handler if provided
  };

  return (
    <AntButton
      {...rest}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && hoverText ? hoverText : children}
    </AntButton>
  );
};

export default HoverButton;
