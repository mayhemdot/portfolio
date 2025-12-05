// "use client";

import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getCountryCodeFromLocale } from "@/modules/common/lib/get-region";
import { getRegion } from "@/modules/common/lib/get-region-action";
import { Text } from "@/shared/components/Text";
import { listProducts } from "../../actions/listProducts";
import type { StoreProduct } from "../../types";
import { ProductPreview } from "../ProductPreview";

type RelatedProductsProps = {
  product: StoreProduct;
  locale: string;
  isWishlisted: boolean;
};

export async function RelatedProducts({ product, locale, isWishlisted }: RelatedProductsProps) {
  const countryCode = getCountryCodeFromLocale(locale);
  const region = await getRegion(countryCode);
  const t = await getTranslations({
    locale,
  });

  if (!region) {
    return null;
  }

  // edit this function to define your related products logic
  const queryParams: any = {};
  if (region?.id) {
    queryParams.region_id = region.id;
  }

  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id];
  }

  if (product.tags) {
    queryParams.tag_id = product.tags.map((tag) => tag.id).filter(Boolean) as string[];
  }
  queryParams.is_giftcard = false;

  const products = await listProducts({
    queryParams,
    locale: locale as Locale,
  }).then(({ response }) => {
    return response.products.filter((responseProduct) => responseProduct.id !== product.id);
  });

  if (!products?.length) {
    return null;
  }

  return (
    <div className="product-page-constraint">
      <div className="space-y-3 mb-16">
        <Text comp="h2" variant="gradient" size="lg">
          {/* Related products */}
          {t("product.relatedProducts.title")}
        </Text>
        <Text comp="p" variant="secondary" size="xs" className="max-w-lg font-extralight">
          {t("product.relatedProducts.description")}
        </Text>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {products?.map((product) => (
          <li key={product.id}>
            <ProductPreview isWishlisted={isWishlisted} region={region} product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
