import { Trash2 } from "lucide-react";
import { type CartItem, useCartStore } from "@/modules/cart/model/store";
import { Media } from "@/shared/components/Media";
import { Button } from "@/shared/components/ui/button";
import { InputQuantity } from "@/shared/components/ui/input-quantity";
import { formatPrice } from "@/shared/utils/formatPrice";

export function CartItemPreviewLink({
  cartItem,
  locale,
}: {
  cartItem: CartItem;
  locale: string;
}) {
  const { updateQuantity, removeItem } = useCartStore();
  const resource = cartItem.product?.images?.[0];

  const price = cartItem.product?.price || 0;

  const priceSettings = {
    locale: locale,
    currencyCode: "USD",
  };

  return (
    <div
      key={cartItem.id}
      className="fl-px-8/16 fl-py-8/16 border rounded-xl md:rounded-2xl bg-secondary mb-2 last:mb-0"
    >
      <div className="flex gap-2 xl:gap-4 mb-2">
        {resource && (
          <div className="relative size-10 md:size-12 xl:size-16 overflow-hidden rounded-md border">
            <Media resource={resource} fill imgClassName="!object-contain" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="fl-text-16/20 font-medium truncate">
            {cartItem.product?.title}
          </h4>
          <p className="fl-text-16/20 text-muted-foreground">
            {formatPrice(price, priceSettings)} за шт.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
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
            {formatPrice(price * cartItem.quantity, priceSettings)}
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
