"use client";
import { ArrowRightIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";
import { useCartStore } from "@/modules/cart/model/store";
import type { CardProductData } from "@/shared/components/Card";
import {
  Button,
  btnVariants,
  type VariantProps,
} from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { ROUTES } from "@/shared/utils/constants";

type Props = {
  productVariant?: string;
  product: CardProductData;
  btnClassName?: string;
  rounded?: VariantProps<typeof btnVariants>["rounded"];
  size?: VariantProps<typeof btnVariants>["size"];
  variant?: VariantProps<typeof btnVariants>["variant"];
};

export function AddToCartButton(props: Props) {
  const {
    product,
    productVariant,
    size,
    variant,
    btnClassName,
    rounded = "xl",
  } = props;

  const { addItem, cartItems } = useCartStore((store) => store);

  const handleAddToCart = useDebouncedCallback(addItem, 500);

  const selectedProductId =
    product.enableVariants && productVariant
      ? productVariant
      : product.id.toString();

  const countInCart = cartItems.find(
    (item) => item.id === selectedProductId,
  )?.quantity;

  const notIcon = !size || !size?.startsWith("icon");

  const isOutOfStock = product.inStock === false;

  const t = useTranslations("AddToCartButton");

  const addToCartOrNotLabel = product.inStock
    ? t("AddToCart")
    : t("OutOfStock");

  return (
    <>
      {!countInCart ? (
        <Button
          className={btnVariants({
            variant,
            size,
            rounded,
            className: btnClassName,
          })}
          disabled={isOutOfStock}
          onClick={() =>
            handleAddToCart({
              id: selectedProductId,
              // id: uuidv4(),
              product,
              quantity: 1,
            })
          }
        >
          {notIcon && addToCartOrNotLabel}
          <ShoppingCart className={cn("size-3 2xl:size-4", {})} />
        </Button>
      ) : (
        <Link
          className={btnVariants({
            variant,
            size,
            rounded: notIcon ? "default" : "xl",
            className: cn("relative grow-0", {
              grow: notIcon,
            }),
          })}
          href={ROUTES.CHECKOUT}
        >
          {notIcon && t("GoToCart")}
          <ArrowRightIcon className={"size-3 2xl:size-4"} />
          {/* {notIcon ? (
            addToCartOrNotLabel
          ) : (
            <ArrowRightIcon className={'size-3 2xl:size-4'} />
          )} */}
        </Link>
      )}
    </>
  );
}
