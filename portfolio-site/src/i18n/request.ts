import { getRequestConfig } from "next-intl/server";
import localization, { type LocaleCode } from "@/i18n/localization";
import { routing } from "./routing";

// declare global {
//   // Use type safe message keys with `next-intl`
//   interface IntlMessages extends Messages {}
// }

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as LocaleCode;

  if (!locale || !routing.locales.includes(locale)) {
    locale = localization.defaultLocale as LocaleCode;
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
