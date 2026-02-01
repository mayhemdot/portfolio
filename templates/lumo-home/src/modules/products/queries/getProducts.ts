import { getLang, type LocaleCode } from "@/i18n/localization";
import { routing } from "@/i18n/routing";
import { PRODUCTS } from "@/modules/products/model/data";
import { Product } from "@/modules/products/model/types";
import type { PaginatedDocs } from "@/modules/products/queries/search";

// function t<T>(obj: Localized<T>, lang: string): T {
//   const key = localeMap[lang] || "en"; // fallback на английский
//   return obj[key];
// }

export const getProductsWhere = ({
  search,
  sortBy,
  page,
  localeCode = routing.defaultLocale,
}: {
  search: string;
  sortBy: string;
  page: string;
  localeCode: LocaleCode;
}): PaginatedDocs<Product> => {

  let products: Product[] = [];

  const locale = getLang(localeCode);

  if (sortBy) {
    // products = PRODUCTS.toSorted((p1, p2) => p1[sortBy] - p2[sortBy])
  }

  if (search) {
    products = PRODUCTS.filter((p) =>
      p.title[locale]?.toLowerCase().includes(search.toLowerCase()),
    ).map((product) => new Product(product, localeCode));
  }
  if (page) {
    products = PRODUCTS.slice((Number(page) - 1) * 10, Number(page) * 10).map((product) => new Product(product, localeCode));
  }

  return {
    docs: products,
    page: Number(1),
    limit: 10,
    totalDocs: products.length || 0,
    totalPages: 1,
  };
};

export const getProductBySlug = async ({
  slug,
  code,
}: {
  slug: string;
  code: LocaleCode;
}) => {
  return PRODUCTS.find((product) => product.slug === slug) || null;
};
