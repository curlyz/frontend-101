import * as React from "react";
import { cn } from "@/lib/utils";

const typographyVariants = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  ul: "my-6 ml-6 list-disc [&>li]:mt-2",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
  lead: "text-xl text-muted-foreground",
};

// Text component for inline text styling
interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  strong?: boolean;
  type?: "secondary" | "success" | "warning" | "danger";
  italic?: boolean;
  underline?: boolean;
  delete?: boolean;
  mark?: boolean;
  code?: boolean;
  keyboard?: boolean;
  children: React.ReactNode;
}

const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      className,
      strong,
      type,
      italic,
      underline,
      delete: del,
      mark,
      code,
      keyboard,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      // Base styles
      "inline",
      // Type variants
      type === "secondary" && "text-muted-foreground",
      type === "success" && "text-green-600 dark:text-green-400",
      type === "warning" && "text-yellow-600 dark:text-yellow-400",
      type === "danger" && "text-red-600 dark:text-red-400",
      // Style modifiers
      strong && "font-semibold",
      italic && "italic",
      underline && "underline",
      del && "line-through",
      mark && "bg-yellow-200 dark:bg-yellow-800 px-1 rounded",
      code && "bg-muted px-1.5 py-0.5 rounded-md font-mono text-sm",
      keyboard &&
        "bg-muted border border-border px-1.5 py-0.5 rounded text-xs font-mono",
      className,
    );

    if (code) {
      return (
        <code className={classes} ref={ref} {...props}>
          {children}
        </code>
      );
    }

    if (keyboard) {
      return (
        <kbd className={classes} ref={ref} {...props}>
          {children}
        </kbd>
      );
    }

    return (
      <span className={classes} ref={ref} {...props}>
        {children}
      </span>
    );
  },
);

Text.displayName = "Text";

// Title component for headings
interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, level = 1, children, ...props }, ref) => {
    const variant = `h${Math.min(level, 4)}` as keyof typeof typographyVariants;
    const classes = cn(typographyVariants[variant], className);

    switch (level) {
      case 1:
        return (
          <h1 className={classes} ref={ref} {...props}>
            {children}
          </h1>
        );
      case 2:
        return (
          <h2 className={classes} ref={ref} {...props}>
            {children}
          </h2>
        );
      case 3:
        return (
          <h3 className={classes} ref={ref} {...props}>
            {children}
          </h3>
        );
      case 4:
        return (
          <h4 className={classes} ref={ref} {...props}>
            {children}
          </h4>
        );
      case 5:
        return (
          <h5 className={classes} ref={ref} {...props}>
            {children}
          </h5>
        );
      default:
        return (
          <h1 className={classes} ref={ref} {...props}>
            {children}
          </h1>
        );
    }
  },
);

Title.displayName = "Title";

// Paragraph component
interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, children, ...props }, ref) => {
    const classes = cn(typographyVariants.p, className);

    return (
      <p className={classes} ref={ref} {...props}>
        {children}
      </p>
    );
  },
);

Paragraph.displayName = "Paragraph";

export { Text, Title, Paragraph };
