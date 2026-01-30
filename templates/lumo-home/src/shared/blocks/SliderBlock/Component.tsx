// import configPromise from "@payload-config";
import { type Locale, useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
// import { getPayload, type TypedLocale } from "payload";
import React from "react";
import { PRODUCTS } from "@/modules/products/model/data";
import type { Product } from "@/modules/products/model/types";
// import type { Product, SliderBlock as SliderBlockProps } from "@/payload-types";
import { SliderArchive } from "@/shared/components/SliderArchive";
import { Text } from "@/shared/components/Text";

type SliderBlockProps = {
  id?: string;
  introContent: string;
  limit: number;
  populateBy: "collection";
  locale: Locale;
  selectedDocs?: Product[];
};

export async function SliderBlock(props: SliderBlockProps) {
  const {
    id,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
  } = props;

  const limit = limitFromProps || 3;
  let products: Product[] = [];
  const locale = await getLocale();
  console.log("locale", locale);
  if (populateBy === "collection") {
    // const payload = await getPayload({ config: configPromise });
    // const flattenedCategories = categories?.map((category) => {
    //   if (typeof category === 'object') return category.id
    //   else return category
    // })
    // const fetchedPrograms = await payload.find({
    //   collection: "products",
    //   depth: 1,
    //   limit,
    //   locale: locale as TypedLocale,
    //   // ...(flattenedCategories && flattenedCategories.length > 0
    //   //   ? {
    //   //       where: {
    //   //         categories: {
    //   //           in: flattenedCategories,
    //   //         },
    //   //       },
    //   //     }
    //   //   : {}),
    // });
    products = PRODUCTS; //fetchedPrograms.docs;
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPrograms = selectedDocs
        ?.map((product) => (typeof product === "object" ? product : null))
        .filter(Boolean) as Product[];

      products = filteredSelectedPrograms;
    }
  }

  return (
    <div id={`slider-block-${id}`} className="padding-default">
      {introContent && (
        <div className="container mb-4 md:mb-8">
          <Text className="ml-0 max-w-3xl">{introContent}</Text>
        </div>
      )}
      <SliderArchive products={products} locale={locale} />
    </div>
  );
}
