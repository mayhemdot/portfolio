import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { btnVariants } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/utils/constants";

// const EMPTY_IS_CART = {
//   en: {
//     title: 'Cart is empty',
//     description: 'Add items to the shopping cart to continue shopping.',
//     backToShopping: 'Back to Shopping',
//   },
//   ru: {
//     title: 'Корзина пуста',
//     description: 'Добавьте товары в корзину, чтобы продолжить покупки.',
//     backToShopping: 'Вернуться к покупкам',
//   },
// }

export function EmptyCart() {
  const t = useTranslations("cartPage.emptyCart");
  return (
    <div className="mx-4 p-4 md:p-8 border rounded-2xl bg-secondary flex flex-col items-center">
      <ShoppingCart className="size-10 text-muted-foreground mb-3" />
      <h3 className="fl-text-20/32 font-semibold mb-2">{t("title")}</h3>
      <p className="mb-4 fl-text-16/20">{t("description")}</p>
      <Link
        href={ROUTES.CATALOG}
        className={btnVariants({
          variant: "default",
          className: "grow",
        })}
      >
        {t("backToShopping")}
      </Link>
    </div>
  );
}
