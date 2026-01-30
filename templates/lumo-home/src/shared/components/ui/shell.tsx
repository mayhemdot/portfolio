import { cva } from "class-variance-authority";
import type { PropsWithChildren } from "react";

const shellVariants = cva(
  "fl-px-16/32 fl-py-16/32 rounded-2xl md:rounded-3xl xl:rounded-4xl space-y-3",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        primary: "bg-primary text-primary-foreground",
        ghost: "bg-background text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Shell({
  variant,
  className,
  children,
}: PropsWithChildren<{
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}>) {
  return (
    <div className={shellVariants({ variant, className })}>{children}</div>
  );
}
