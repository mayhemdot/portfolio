"use client";

import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import type { LocaleCode } from "@/i18n/localization";
import type { CategoryRaw } from "@/modules/categories/model/types";
import { getProductsWhere } from "@/modules/products/queries/getProducts";
import { Card } from "@/shared/components/Card";
import { PageRange } from "@/shared/components/PageRange";
import { Pagination } from "@/shared/components/Pagination";
import { Text } from "@/shared/components/Text";

export function CategoryClient({
  categoryRaw,
  locale,
}: {
  categoryRaw: CategoryRaw;
  locale: LocaleCode;
}) {
  const [page, _p] = useQueryState("page", parseAsString.withDefault("1"));

  const t = useTranslations("CatalogPage");

  const data = useMemo(
    () =>
      getProductsWhere({
        categorySlug: categoryRaw.slug,
        search: "",
        sortBy: "price",
        page,
        localeCode: locale,
      }),
    [categoryRaw.slug, page, locale],
  );

  const {
    docs: products,
    totalDocs,
    page: currentPage,
    totalPages = 1,
    limit,
  } = data || {};

  return (
    <div className="mb-auto w-full space-y-4 xl:space-y-8">
      <div className="flex w-full items-center justify-between gap-4">
          <Text
            comp="h1"
            size="md"
            variant="secondary"
            className="font-semibold"
          >
            {t("title")}
            {/* Catalog */}
          </Text>
        {/* <SearchAndSort /> */}
      </div>
      {/* <CollectionArchive products={products.docs} /> */}
      <div className="fl-gap-4/20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <Card
            key={product.id}
            doc={product.raw}
            relationTo="products"
            locale={locale}
          />
        ))}
      </div>
      <div className="mb-32 mt-auto flex items-center justify-between gap-16">
        {totalPages > 1 && currentPage && (
          <Pagination page={currentPage} totalPages={totalPages} />
        )}
        <PageRange
          collection="products"
          currentPage={currentPage}
          limit={limit}
          totalDocs={totalDocs}
        />
      </div>
    </div>
  );
}
