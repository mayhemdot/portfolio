"use client";

// import { HttpTypes } from "@medusajs/types";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getProductPrice } from "@/modules/products/utils/get-product-price";
import { Text } from "@/shared/components/Text";
import { cn } from "@/shared/utils/cn";
import type { StoreProduct, StoreProductVariant } from "../../types";

export default function ProductPrice({
  product,
  variant,
}: {
  product: StoreProduct;
  variant?: StoreProductVariant;
  //   product: HttpTypes.StoreProduct
  //   variant?: HttpTypes.StoreProductVariant
}) {
  const { locale = routing.defaultLocale } = useParams() as { locale?: string };
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
    locale,
  });

  const selectedPrice = variant ? variantPrice : cheapestPrice;

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />;
  }

  return (
    <div className="flex flex-col">
      <Text
        comp="span"
        variant="secondary"
        size="sm"
        className={cn("fsSubtitleSmallest", {
          "text-ui-fg-interactive": selectedPrice.price_type === "sale",
        })}
      >
        {!variant && "From "}
        <span data-testid="product-price" data-value={selectedPrice.calculated_price_number}>
          {selectedPrice.calculated_price}
        </span>
      </Text>
      {selectedPrice.price_type === "sale" && (
        <>
          <p>
            <span className="text-ui-fg-subtle">Original: </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-ui-fg-interactive">-{selectedPrice.percentage_diff}%</span>
        </>
      )}
    </div>
  );
}
