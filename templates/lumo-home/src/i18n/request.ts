import { getRequestConfig } from "next-intl/server";
import localization, { type LocaleCode } from "@/i18n/localization";
// import type en from "./messages/en-US.json";
// import type ru from "./messages/ru-RU.json";
import { routing } from "./routing";

// type Messages = typeof en | typeof ru;

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

// export default getRequestConfig(async () => {
//   // Static for now, we'll change this later
//   const locale = 'en'

//   return {
//     locale,
//     messages: (await import(`./messages/${locale}.json`)).default,
//   }
// })
