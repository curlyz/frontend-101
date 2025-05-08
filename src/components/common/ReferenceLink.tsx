import React, { type ReactNode, type MouseEvent } from "react";
import confetti from "canvas-confetti";

interface ReferenceLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const ReferenceLink: React.FC<ReferenceLinkProps> = ({
  href,
  children,
  className,
}) => {
  const triggerConfetti = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.right) / 2 / window.innerWidth;
    const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: [
        "#f43f5e",
        "#3b82f6",
        "#22c55e",
        "#eab308",
        "#ec4899",
        "#8b5cf6",
        "#6366f1",
      ], // Tailwind-like colors
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={triggerConfetti}
      className={`text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-150 ${className || ""}`}
    >
      {children}
    </a>
  );
};

export default ReferenceLink;
