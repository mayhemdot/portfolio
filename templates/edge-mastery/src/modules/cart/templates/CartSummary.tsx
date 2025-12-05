"use client";
import { Divider } from "@heroui/divider";
import { addToast, toast } from "@heroui/react";
import { useTranslations } from "next-intl";
import DiscountCode from "@/modules/checkout/components/DiscountCode";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import { Text } from "@/shared/components/Text";
import { btnVariants } from "@/shared/components/ui/Button";
// import { LocalizedClient } from "@/modules/common/components/LocalizedClientLink";
import CartTotals from "../components/CartTotals";
import type { StoreCart } from "../store/cart";

type SummaryProps = {
  cart: StoreCart & {
    promotions: any[]; //HttpTypes.StorePromotion
  };
};

function getCheckoutStep(cart: StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address";
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery";
  } else {
    return "payment";
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart);
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-y-2">
      <Text comp="h2" variant="gradient" size="md">
        {t("cart.summary.title")}
      </Text>
      {/* <h2 className="fsSubtitle leading-[2.75rem]">Summary</h2> */}
      <DiscountCode cart={cart} />
      <Divider className="mb-2" />
      <CartTotals
        totals={{
          currency_code: cart.region.currency_code,
          total: cart.total,
          subtotal: cart.subtotal,
          tax_total: cart.tax_total,
          discount_total: cart.discount_total,
          gift_card_total: cart.gift_card_total,
          shipping_subtotal: cart.shipping_subtotal,
        }}
      />
      <button
        // href={`/checkout`} // ?step=${step}
        type="button"
        data-testid="checkout-button"
        // color="secondary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToast({
            title: t("messages.demo.checkout"),
            color: "warning",
            variant: "bordered",
          });
        }}
        className={btnVariants({ size: "md", variant: "glow" })}
      >
        {/* Go to checkout */}
        {t("cart.summary.checkoutBtn")}
      </button>
    </div>
  );
};

export default Summary;
