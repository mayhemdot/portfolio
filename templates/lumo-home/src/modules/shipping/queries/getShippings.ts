
import {  LocaleCode } from "@/i18n/localization";
import { routing } from "@/i18n/routing";
import { PaginatedDocs } from "@/modules/products/queries/searchProducts";
import { SHIPPINGS } from "@/modules/shipping/model/data";
import { Shipping } from "@/modules/shipping/model/types";


export const getShippings = ({
  localeCode = routing.defaultLocale,
}: {
  localeCode: LocaleCode;
}): PaginatedDocs<Shipping> => {

  return {
    docs: SHIPPINGS.map((ship) => new Shipping(ship, localeCode)),
    page: Number(1),
    limit: 10,
    totalDocs: SHIPPINGS.length || 0,
    totalPages: 1,
  };
};
