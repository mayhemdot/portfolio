
export type LocaleCode = "en-US" | "ru-RU";

export type Lang = "en" | "ru";

export type CurrencyCode = "RUB" | "USD";

const localization = {
  defaultLocale: "en-US",
  fallback: true,
  defaultLocalePublishOption: "active",
  localePrefix: {
    mode: 'always' as const,
    prefixes: {
      'en-US': '/us',
      'ru-RU': '/ru',
      'de-DE': '/de',
      // 'de-AT': '/eu/at'
      // (/zh will be used as-is)
    }
  },
  locales: [
    {
      rtl: false,
      code: "en-US",
      label: "English (English)",
    },
    {
      rtl: false,
      code: "ru-RU",
      label: "Russian (Русский)",
      fallbackLocale: "en-US",
    },
  ] as {
    rtl: boolean,
    code: LocaleCode;
    label: string;
    fallbackLocale?: string;
  }[],
};

 const localeMap: Record<LocaleCode, Lang> = {
  "en-US": "en",
  "ru-RU": "ru",
  // "es-FR": "en", // если нет испанского, fallback на английский
};

const currencyMap: Record<LocaleCode, CurrencyCode> = {
  "en-US": "USD",
  "ru-RU": "RUB",
};

export function getLang(code: LocaleCode): Lang  {
  return localeMap[code] || "en";
}

export function getCurrency(code: LocaleCode): CurrencyCode {
  return currencyMap[code] || "USD";
}

export default localization;
