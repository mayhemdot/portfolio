import { Trash2 } from "lucide-react";
import type { LocaleCode } from "@/i18n/localization";
import { type CartItem, useCartStore } from "@/modules/cart/model/store";
import { Product } from "@/modules/products/model/types";
import { Media } from "@/shared/components/Media";
import { Button } from "@/shared/components/ui/button";
import { InputQuantity } from "@/shared/components/ui/input-quantity";

export function CartItemPreviewLink({
  cartItem,
  locale,
}: {
  cartItem: CartItem;
  locale: LocaleCode;
}) {
  const { updateQuantity, removeItem } = useCartStore();

  const product = new Product(cartItem.product as any, locale);

  return (
    <div
      key={cartItem.id}
      className="fl-px-8/16 fl-py-8/16 border rounded-xl md:rounded-2xl bg-secondary mb-2 last:mb-0"
    >
      <div className="flex gap-2 xl:gap-4 mb-2 min-w-0 w-full max-w-full">
        {product.thumbnail() && (
          <div className="relative shrink-0 size-10 md:size-12 xl:size-16 overflow-hidden rounded-md border">
            <Media
              resource={product.thumbnail()}
              fill
              imgClassName="!object-contain"
            />
          </div>
        )}
        <div className="flex-1 max-w-[110px] xs:max-w-[150px] sm:max-w-[260px] min-w-0 w-full">
          <h4 className="fl-text-16/20 font-medium whitespace-nowrap! truncate text-ellipsis w-full max-w-full">
            {product.title}
          </h4>
          <p className="fl-text-16/20 text-muted-foreground">
            {product.prettyPrice()} за шт.
          </p>
        </div>

        <div className="flex flex-col ml-auto items-end gap-2">
          <InputQuantity
            quantity={cartItem.quantity}
            update={(pos) =>
              updateQuantity(cartItem.id, Math.max(0, cartItem.quantity + pos))
            }
            variant={"default"}
            size={"sm"}
          />
        </div>
      </div>

      <div className="flex justify-between border-t pt-1 items-center">
        <span className="fl-text-20/24">Total</span>
        <div className="flex items-center gap-2">
          <p className="fl-text-20/24 font-semibold">
            {product.prettyPrice(cartItem.quantity || 1)}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 text-destructive hover:text-destructive"
            onClick={() => removeItem(String(cartItem.id))}
          >
            <Trash2 className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
