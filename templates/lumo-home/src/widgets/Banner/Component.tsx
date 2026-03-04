import type React from "react";
import {Text} from "@/shared/components/Text";
import { cn } from "@/shared/lib/utils";

type Props = {
  className?: string; 
  content: string
  variant: "info" |  "error" | "success" | "warning"
}

export const BannerBlock: React.FC<Props> = ({ className, content, variant }) => {
  return (
    <div className={cn("mx-auto my-8 w-full", className)}>
      <div
        className={cn("border py-3 px-6 flex items-center rounded", {
          "border-border bg-card": variant === "info",
          "border-error bg-error/30": variant === "error",
          "border-success bg-success/30": variant === "success",
          "border-warning bg-warning/30": variant === "warning",
        })}
      >
        <Text comp="p" size={"lg"}>
          {content}
        </Text>
      </div>
    </div>
  );
};
