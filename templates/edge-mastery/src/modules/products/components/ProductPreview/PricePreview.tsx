"use client";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Text } from "@/shared/components/Text";
import type { StoreProduct } from "../../types";
import { getProductPrice } from "../../utils/get-product-price";

type VariantPrice = any;

export default function PreviewPrice({ price, product }: { price?: VariantPrice; product?: StoreProduct }) {
  const { locale = routing.defaultLocale } = useParams() as { locale?: string };
  
  if (product) {
    const { cheapestPrice } = getProductPrice({
      product,
      locale,
    });
    price = cheapestPrice;
  }
  if (!price) {
    return null;
  }
  return (
    <>
      {price.price_type === "sale" && (
        <Text comp="span" variant="secondary" size="xxs">
          {price.original_price}
        </Text>
      )}
      <Text comp="span" variant="secondary" size="xs">
        {price.calculated_price}
      </Text>
    </>
  );
}
