"use client";
import { Button } from "@heroui/button";
import type React from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  variant = "flat",
  color = "default",
  size = "lg",
  className,
  isLoading = false,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "flat" | "bordered" | "faded" | "solid" | "light" | "shadow" | "ghost";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
  isLoading?: boolean;
  "data-testid"?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      // size="large"
      size={size}
      className={className}
      type="submit"
      isLoading={pending}
      variant={variant}
      color={color}
      // variant={variant || "primary"}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  );
}
