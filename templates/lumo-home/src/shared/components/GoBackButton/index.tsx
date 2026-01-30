"use client";

import { useRouter } from "next/navigation";
import { Button, type ButtonProps } from "@/shared/components/ui/button";

export default function GoBackButton({
  title = "Go back",
  variant,
  size,
}: {
  title?: string;
} & ButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={() => router.back()}
    >
      {title}
    </Button>
  );
}
