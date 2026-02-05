import { PRODUCTS } from "@/modules/products/model/data";
import { Product } from "@/modules/products/model/types";
import type { LocaleCode } from "@/i18n/localization";

type Props = {
  term: string;
  localeCode: LocaleCode;
};

export type PaginatedDocs<T> = { 
  docs: T[] 
  totalDocs: number,
  page: number,
  totalPages:number,
  limit: number,
}
import { getLang } from "@/i18n/localization";

export  function searchProducts({
  term,
  localeCode,
}: Props): PaginatedDocs<Product> {
  const lang = getLang(localeCode);
  return { 
    docs: PRODUCTS.filter((product) => product.title[lang]?.toLowerCase().includes(term.toLowerCase())).map((product) => new Product(product, localeCode)), 
    page: Number(1), 
    limit: 10, 
    totalDocs: PRODUCTS.length || 0, 
    totalPages: 1 
  }
}



