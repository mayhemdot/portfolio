"use client";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { buttonVariants } from "@/shared/components/ui/button";
import { useCartItems } from "../model/helpers";

export function CartButton() {
  const cartItems = useCartItems();

  return (
    <button
      type="button"
      className={buttonVariants({
        variant: "outline",
        size: "icon",
        className: "cursor-pointer relative flex items-center justify-center",
      })}
    >
      <Badge className="absolute w-fit size-4 rounded-full top-0 right-0 translate-x-1/2 -translate-y-1/6">
        {cartItems?.length || 0}
      </Badge>
      <ShoppingCartIcon />
    </button>
  );
}
