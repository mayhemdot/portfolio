"use client";

import { Divider } from "@heroui/divider";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import type React from "react";
import { routing } from "@/i18n/routing";
import { convertToLocale } from "@/modules/products/utils/money";
import { Text } from "@/shared/components/Text";

type CartTotalsProps = {
  totals: {
    total?: number | null;
    subtotal?: number | null;
    tax_total?: number | null;
    shipping_total?: number | null;
    discount_total?: number | null;
    gift_card_total?: number | null;
    currency_code: string;
    shipping_subtotal?: number | null;
  };
};

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const { currency_code, total, subtotal, tax_total, discount_total, gift_card_total, shipping_subtotal } = totals;
  const t = useTranslations();
  const { locale = routing.defaultLocale } = useParams() as { locale?: string };
  return (
    <div>
      <div className="flex flex-col gap-y-2 fsSmall">
        <div className="flex items-center justify-between">
          <span className="flex gap-x-1 items-center">
            <Text variant="secondary" size="xxs" comp="span">
              {t("cart.summary.subtotalTitle")}
            </Text>
            {/* Subtotal <span className="fsSmallest">(excl. shipping and taxes)</span> */}
          </span>
          <span data-testid="cart-subtotal" data-value={subtotal || 0}>
            {convertToLocale({ amount: subtotal ?? 0, currency_code, locale })}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <Text variant="secondary" size="xxs" comp="span">
              {t("cart.summary.discountTitle")}
            </Text>{" "}
            <span data-testid="cart-discount" data-value={discount_total || 0}>
              - {convertToLocale({ amount: discount_total ?? 0, currency_code, locale })}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <Text variant="secondary" size="xxs" comp="span">
            {t("cart.summary.shippingTitle")}
          </Text>
          <span data-testid="cart-shipping" data-value={shipping_subtotal || 0}>
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code, locale })}
          </span>
        </div>
        <div className="flex justify-between">
          <Text variant="secondary" size="xxs" comp="span">
            {t("cart.summary.taxTitle")}
          </Text>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code, locale })}
          </span>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <Text variant="secondary" size="xxs" comp="span">
              {t("cart.summary.giftCardTitle")}
            </Text>{" "}
            <span data-testid="cart-gift-card-amount" data-value={gift_card_total || 0}>
              - {convertToLocale({ amount: gift_card_total ?? 0, currency_code, locale })}
            </span>
          </div>
        )}
      </div>
      <Divider className="my-3" />

      <div className="flex items-center justify-between">
        <Text variant="secondary" size="xxs" comp="span">
          {t("cart.summary.totalTitle")}
        </Text>
        <span className="fsNormal" data-testid="cart-total" data-value={total || 0}>
          {convertToLocale({ amount: total ?? 0, currency_code, locale })}
        </span>
      </div>
      <Divider className="my-4" />
    </div>
  );
};

export default CartTotals;
