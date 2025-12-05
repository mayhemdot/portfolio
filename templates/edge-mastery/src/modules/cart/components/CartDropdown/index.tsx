"use client";

import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import { Tooltip } from "@heroui/tooltip";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { routing } from "@/i18n/routing";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import DeleteButton from "@/modules/products/components/DeleteButton";
import Thumbnail from "@/modules/products/components/ProductThumbnail";
import { convertToLocale } from "@/modules/products/utils/money";

import { Text } from "@/shared/components/Text";
import { ROUTES } from "@/shared/utils/routes";
import { useCartStore } from "../../store/cart";
import LineItemOptions from "../LineItemOptions";
import LineItemPrice from "../LineItemPrice";

export function CartButton() {
  const { getCartForCurrentRegion } = useCartStore();
  const cart = getCartForCurrentRegion?.();
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    setCount(cart?.items?.length || 0);
  }, [cart]);

  return (
    <Badge color="warning" variant="faded" shape="rectangle" content={count} showOutline={false}>
      <Button
        isIconOnly
        as={Link}
        href={ROUTES.cart()}
        color="default"
        variant="flat"
        endContent={<ShoppingBasket className={"size-4 lg:size-5"} />}
      />
    </Badge>
  );
}
// [TODO] add cart dropdown
export default function CartDropdown() {
  //   const totalItems =
  //     cart?.items?.reduce((acc, item) => {
  //       return acc + item.quantity;
  //     }, 0) || 0;

  //   const subtotal = cart?.subtotal ?? 0;
  const { getCartForCurrentRegion } = useCartStore();
  const cart = getCartForCurrentRegion?.();
  const { locale = routing.defaultLocale } = useParams() as { locale?: string };

  return (
    <Tooltip
      placement="bottom-end"
      classNames={{
        base: "before:bg-transparent before:backdrop-blur", // change arrow background
        content: "p-3 border-small border-divider text-white backdrop-blur-2xl bg-transparent flex-0",
      }}
      content={
        <div className="px-1">
          <div className="fsNormal mb-2 flex items-center justify-center">
            <Text comp="h3" variant="secondary" size="sm">
              Cart
            </Text>
          </div>
          {cart?.items?.length ? (
            <>
              <div className="fsSmall overflow-y-scroll max-h-[402px] px-3 grid grid-cols-1 gap-y-2 no-scrollbar">
                {cart.items
                  .sort((a, b) => {
                    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
                  })
                  .map((item) => (
                    <React.Fragment key={item.id}>
                      <Divider className="my-1" />
                      <div className="grid grid-cols-[100px_1fr] gap-x-2" key={item.id} data-testid="cart-item">
                        <LocalizedClientLink href={`/products/${item.product_handle}`} className="w-20">
                          <Thumbnail thumbnail={item.thumbnail} images={item.variant?.product?.images} size="square" />
                        </LocalizedClientLink>
                        <div className="flex flex-row relative justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap gap-2 max-w-[180px]">
                                <h3 className="overflow-hidden text-ellipsis">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.variant?.product?.title || "Link name not found"}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span data-testid="cart-item-quantity" data-value={item.quantity}>
                                  Quantity: {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-end items-start">
                                <LineItemPrice item={item} style="tight" currencyCode={cart.region.currency_code} />{" "}
                                <DeleteButton
                                  id={item.id}
                                  className="px-2"
                                  data-testid="cart-item-remove-button"
                                ></DeleteButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
              </div>
              <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                <div className="flex items-center justify-between">
                  <span className="fsSmall">
                    Subtotal <span className="font-normal">(excl. taxes)</span>
                  </span>
                  <span className="text-large-semi" data-testid="cart-subtotal" data-value={cart.subtotal || 0}>
                    {convertToLocale({
                      amount: cart.subtotal || 0,
                      currency_code: cart.region.currency_code,
                      locale,
                    })}
                  </span>
                </div>
                <LocalizedClientLink href={ROUTES.cart()} data-testid="cart-link">
                  Go to cart
                </LocalizedClientLink>
              </div>
            </>
          ) : (
            <div className="flex py-3 flex-col gap-y-4 items-center justify-center">
              <div className="bg-gray-900 text-small-regular flex items-center justify-center size-6 rounded-full text-white">
                <span>0</span>
              </div>
              <span>Your shopping bag is empty.</span>

              <LocalizedClientLink href={"/store"}>
                <span className="sr-only">Go to all products page</span>
                <Button onPress={() => close?.()}>Explore products</Button>
              </LocalizedClientLink>
            </div>
          )}
        </div>
      }
    >
      <Badge color="warning" variant="faded" shape="rectangle" content={cart?.items?.length || 0} showOutline={false}>
        <Button
          isIconOnly
          as={Link}
          href={ROUTES.cart()}
          color="default"
          variant="flat"
          endContent={<ShoppingBasket className={"size-5"} />}
        />
      </Badge>
    </Tooltip>
  );
}
