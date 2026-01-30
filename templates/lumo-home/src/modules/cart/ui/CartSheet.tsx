"use client";

import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { EmptyCart } from "@/modules/cart/ui/CartIsEmpty";
import { CartItemList } from "@/modules/cart/ui/CartItemList";
import { Badge } from "@/shared/components/ui/badge";
import { Button, btnVariants } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Separator } from "@/shared/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { formatPrice } from "@/shared/utils/formatPrice";
import { useCartStore } from "../model/store";

const useTotalItems = () => {
  const { cartItems } = useCartStore();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

const useTotalPrice = () => {
  const { cartItems } = useCartStore();
  return cartItems.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0,
  );
};

export function CartSheet() {
  const locale = useLocale();
  const t = useTranslations("CartSheet");

  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, isCartEmpty } = useCartStore();

  const totalItems = useTotalItems();
  const totalPrice = useTotalPrice();
  const isEmptyCart = isCartEmpty();

  const priceSettings = {
    locale,
    currencyCode: "USD",
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={btnVariants({
            variant: "ghost",
            size: "icon",
            className: "relative",
          })}
        >
          <Badge
            variant={"default"}
            size={"iconXS"}
            className="absolute w-fit size-3 rounded-full top-0 right-0 translate-x-1/2 -translate-y-1/6"
          >
            {cartItems?.length || 0}
          </Badge>
          <ShoppingCartIcon className="size-4" />
        </button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="block mt-8 fl-text-32/48">
            {t("title")}
            <span className="ml-1 fl-text-20/32">
              {totalItems > 0 && `(${totalItems})`}
            </span>
          </SheetTitle>
          <SheetDescription>{t("manage")}</SheetDescription>
        </SheetHeader>

        {isEmptyCart && <EmptyCart />}
        {!isEmptyCart && (
          <>
            <ScrollArea className="grow min-h-0! max-h-full! px-4 pb-4">
              <CartItemList cartItems={cartItems} />
            </ScrollArea>
            <Separator />
            <div className="shrink-0 space-y-2 px-4">
              <div className="flex justify-between items-center font-semibold">
                <span className="fl-text-24/32">{t("total")}:</span>
                <span className="fl-text-24/32">
                  {formatPrice(totalPrice, priceSettings)}
                </span>
              </div>

              <SheetFooter className="flex-col gap-2 px-0">
                <Button
                  variant="secondary"
                  className="w-full! grow"
                  onClick={() => setIsOpen(false)}
                >
                  {t("backToShopping")}
                </Button>
                <Link
                  href="/checkout"
                  className={btnVariants({
                    className: "w-full!",
                  })}
                  onClick={() => setIsOpen(false)}
                >
                  {t("checkout")}
                </Link>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
