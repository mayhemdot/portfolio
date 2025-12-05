"use client";
import { Package2 } from "lucide-react";
import { useTranslations } from "next-intl";
import InteractiveLink from "@/modules/common/components/InteractiveLink";
import { Text } from "@/shared/components/Text";
import { btnVariants } from "@/shared/components/ui/Button";

export default function EmptyCartMessage() {
  const t = useTranslations();
  return (
    <div className="mx-auto flex w-fit flex-col items-start justify-center px-2 py-32" data-testid="empty-cart-message">
      <div className="relative space-y-10 rounded-3xl border border-[#2A2A2A] p-16">
        <Package2 className="size-20 text-gray mx-auto text-[#5d5d5d]" />
        <Text comp={"p"} size={"xs"} variant={"secondary"} className=" max-w-lg text-center font-extralight">
          {/* You don&apos;t have anything in your cart. Let&apos;s change that, use the link below to start browsing our
          products. */}
          {t("cart.empty")}
        </Text>
        <div className="relative block">
          <InteractiveLink
            href="/products"
            className={btnVariants({
              size: "md",
              variant: "glow",
              className: "relative flex",
            })}
          >
            {t("cart.browseBtn")}
            {/* Explore products */}
          </InteractiveLink>
        </div>
      </div>
    </div>
  );
}
