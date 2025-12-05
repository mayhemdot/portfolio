// import type { HttpTypes } from "@medusajs/types";
import type { StoreProduct, StoreProductVariant } from "../types";
import { getPercentageDiff } from "./get-precentage-diff";
import { convertToLocale } from "./money";

export const getPricesForVariant = (variant: StoreProductVariant, locale?: string) => {
  if (!variant?.calculated_price?.calculated_amount) {
    return null;
  }

  // Если locale не передан, определяем из currency_code (fallback)
  const defaultLocale = locale || (variant.calculated_price.currency_code === "rub" ? "ru-RU" : 
                                    variant.calculated_price.currency_code === "eur" ? "de-DE" : "en-US");

  return {
    calculated_price_number: variant.calculated_price.calculated_amount,
    calculated_price: convertToLocale({
      amount: variant.calculated_price.calculated_amount,
      currency_code: variant.calculated_price.currency_code,
      locale: defaultLocale,
    }),
    original_price_number: variant.calculated_price.original_amount,
    original_price: convertToLocale({
      amount: variant.calculated_price.original_amount,
      currency_code: variant.calculated_price.currency_code,
      locale: defaultLocale,
    }),
    currency_code: variant.calculated_price.currency_code,
    price_type: variant.calculated_price.calculated_price?.price_list_type,
    percentage_diff: getPercentageDiff(
      variant.calculated_price.original_amount,
      variant.calculated_price.calculated_amount,
    ),
  };
};

//HttpTypes.StoreProduct;
export function getProductPrice({ product, variantId, locale }: { product: StoreProduct; variantId?: string; locale?: string }) {
  if (!product || !product.id) {
    throw new Error("No product provided");
  }

  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      return null;
    }

    const cheapestVariant: StoreProductVariant = product.variants
      .filter((v: any) => !!v.calculated_price)
      .sort((a: any, b: any) => {
        return a.calculated_price.calculated_amount - b.calculated_price.calculated_amount;
      })[0];

    return getPricesForVariant(cheapestVariant, locale);
  };

  const variantPrice = () => {
    if (!product || !variantId) {
      return null;
    }

    const variant: StoreProductVariant | undefined = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId,
    );

    if (!variant) {
      return null;
    }

    return getPricesForVariant(variant, locale);
  };

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  };
}
