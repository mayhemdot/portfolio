import { defineRouting } from "next-intl/routing";
import localization from "./localization";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: localization.locales.map((locale) => locale.code),

  // Used when no locale matches
  defaultLocale: localization.defaultLocale,
});
