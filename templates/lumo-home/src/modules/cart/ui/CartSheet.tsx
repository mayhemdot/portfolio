"use client";

import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import { useState } from "react";
import { getCurrency, type LocaleCode } from "@/i18n/localization";
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

const useTotalPrice = (code: LocaleCode) => {
  const currency = getCurrency(code).toLowerCase() as keyof typeof getCurrency;
  const { cartItems } = useCartStore();
  const amount = cartItems.reduce(
      (total, item) =>
        total + (item.product?.price?.[currency] || 0) * item.quantity,
      0,
    );
  return { 
    amount: amount,
    total: formatPrice(amount,{  localeCode: code,  currencyCode: getCurrency(code)})
  };
};

export function CartSheet() {
  const locale = useLocale() as LocaleCode;
  const t = useTranslations("CartSheet");

  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, isCartEmpty } = useCartStore();

  const totalItems = useTotalItems();
  const { total } = useTotalPrice(locale);
  const isEmptyCart = isCartEmpty();

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
            <ScrollArea className="grow min-h-0! max-h-full! px-4 pb-4 ">
              {/* [&_[data-radix-scroll-area-viewport]>div]:min-w-0 [&_[data-radix-scroll-area-viewport]>div]:block */}
              {/* <div className="min-w-0 relative max-w-full w-full"> */}
                <CartItemList cartItems={cartItems} />
              {/* </div> */}
            </ScrollArea>
            <Separator />
            <div className="shrink-0 space-y-2 px-4">
              <div className="flex justify-between items-center font-semibold">
                <span className="fl-text-24/32">{t("total")}:</span>
                <span className="fl-text-24/32">
                  {total}
                </span>
              </div>

              <SheetFooter className="flex-col gap-2 px-0">
                <Button
                  variant="secondary"
                  className="w-full! grow"
                  size={"lg"}
                  onClick={() => setIsOpen(false)}
                >
                  {t("backToShopping")}
                </Button>
                <Link
                  href="/checkout"
                  className={btnVariants({
                    className: "w-full!",
                    size: "lg",
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
