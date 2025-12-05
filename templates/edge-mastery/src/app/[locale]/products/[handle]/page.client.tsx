import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { getLanguageFromLocale } from "@/modules/common/lib/get-region";
import type { StoreRegion } from "@/modules/common/lib/get-region-action";
import { ImageGallerySlider } from "@/modules/products/components/ImageGallerySlider";
import ProductActions from "@/modules/products/components/ProductActions";
import ProductInfoTop from "@/modules/products/components/ProductInfoTop";
import ProductTabs from "@/modules/products/components/ProductTabs";
import { RelatedProducts } from "@/modules/products/components/RelatedProducts";
import SkeletonRelatedProducts from "@/modules/products/skeletons/SkeletonRelatedProducts";
import type { StoreProduct } from "@/modules/products/types";
import { Text } from "@/shared/components/Text";

type ProductTemplateProps = {
  isWishlisted: boolean;
  product: StoreProduct;
  region: StoreRegion;
  locale: string;
};

export default async function ProductClient({ isWishlisted, product, region, locale }: ProductTemplateProps) {
  const t = await getTranslations({
    locale: locale as Locale,
  });
  const lang = getLanguageFromLocale(locale);
  // console.log("[[product]]", product.description, lang);

  return (
    <>
      <Text comp="h1" variant="gradient" size="lg" className="text-center py-8 mx-auto w-full!">
        {product.title}
      </Text>
      <div className="flex mx-auto flex-col mb-8 lg:flex-row gap-8 size-full relative">
        <div className="flex flex-col flex-1 gap-8 w-full relative">
          <div className="slide w-full">{product?.images && <ImageGallerySlider images={product?.images} />}</div>
        </div>

        <div className="block sm:min-h-[360px] lg:w-[30%] size-full">
          <div className="w-full h-fit sticky top-0">
            <ProductInfoTop product={product} />
            <div className="w-full my-8">
              <ProductActions isWishlisted={isWishlisted} product={product} region={region} />
            </div>
            <div className="space-y-2 py-4">
              <div className="w-full space-y-1">
                <Text comp="h4" variant={"secondary"} size={"sm"} className="font-extralight">
                  {t("product.description")}
                </Text>
                <Text comp="p" variant={"gray"} size={"xxs"} className="font-extralight">
                  {product.description?.[lang]}
                </Text>
              </div>

              <div className="w-full space-y-1">
                <ProductTabs product={product} lang={lang} />{" "}
              </div>

              <div className="w-full space-y-1">
                {/* <h4 className="text-gray-color fsNormal font-semibold"></h4> */}
                <Text comp="p" size={"sm"} variant="secondary" className=" font-extralight text-gray-color!">
                  {t("product.reviews")} [0]
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<SkeletonRelatedProducts />}>
        <RelatedProducts isWishlisted={isWishlisted} product={product} locale={locale} />
      </Suspense>
    </>
  );
}
