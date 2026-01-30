import { Minus, Plus } from "lucide-react";
import {
  Button,
  type btnVariants,
  type VariantProps,
} from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

type Props = {
  className?: string;
  quantity: number;
  update: (pos: number) => void;
  variant: VariantProps<typeof btnVariants>["variant"];
  size: VariantProps<typeof btnVariants>["size"];
};

export function InputQuantity({
  className,
  quantity,
  variant,
  size,
  update,
}: Props) {
  return (
    <div
      className={cn(
        "inline-flex fl-px-8/12 fl-py-8/12 rounded-full items-center gap-1 bg-background",
        className,
      )}
    >
      <Button
        className="shrink-0"
        variant={variant || "ghost"}
        size={"icon"}
        onClick={() => update(-1)} //updateQuantity(id!, Math.max(0, quantity - 1))}
      >
        <Minus className="size-3" />
      </Button>
      <span className="w-5 md:w-7 text-center fl-text-20/24 font-medium">
        {quantity}
      </span>
      <Button
        className="shrink-0"
        variant={variant || "ghost"}
        size={"icon"}
        onClick={() => update(1)} //updateQuantity(id!, quantity + 1)}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
