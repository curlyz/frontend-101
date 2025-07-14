import * as React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      data-slot="spinner"
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

// Ant Design-compatible Spin component
interface SpinProps extends React.ComponentProps<"div"> {
  spinning?: boolean;
  size?: "small" | "default" | "large";
  tip?: string;
  children?: React.ReactNode;
}

function Spin({
  spinning = false,
  size = "default",
  tip,
  children,
  className,
  ...props
}: SpinProps) {
  const sizeMap = {
    small: "sm" as const,
    default: "md" as const,
    large: "lg" as const,
  };

  if (!spinning && children) {
    return <>{children}</>;
  }

  if (!spinning && !children) {
    return null;
  }

  const spinnerElement = (
    <div className="flex flex-col items-center justify-center gap-2">
      <Spinner size={sizeMap[size]} />
      {tip && <div className="text-sm text-muted-foreground">{tip}</div>}
    </div>
  );

  if (children) {
    return (
      <div className={cn("relative", className)} {...props}>
        {children}
        {spinning && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            {spinnerElement}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center justify-center p-4", className)}
      {...props}
    >
      {spinnerElement}
    </div>
  );
}

export { Spinner, Spin };
