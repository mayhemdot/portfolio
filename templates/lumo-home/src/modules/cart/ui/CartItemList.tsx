import { useLocale } from "next-intl";
import type { CartItem } from "@/modules/cart/model/store";
import { CartItemPreviewLink } from "@/modules/cart/ui/CartItemPreviewLink";

export function CartItemList({ cartItems }: { cartItems: CartItem[] }) {
  const locale = useLocale();
  return (
    <>
      {cartItems?.map((item) => (
        <CartItemPreviewLink key={item.id} cartItem={item} locale={locale} />
      ))}
    </>
  );
}
