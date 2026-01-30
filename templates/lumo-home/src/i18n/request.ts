import { getRequestConfig } from "next-intl/server";
import localization from "@/i18n/localization";
import type en from "./messages/en.json";
import ru from "./messages/ru.json";
import { routing } from "./routing";

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

// export default getRequestConfig(async () => {
//   // Static for now, we'll change this later
//   const locale = 'en'

//   return {
//     locale,
//     messages: (await import(`./messages/${locale}.json`)).default,
//   }
// })

export default getRequestConfig(async ({ requestLocale }: any) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale)) {
    locale = localization.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
