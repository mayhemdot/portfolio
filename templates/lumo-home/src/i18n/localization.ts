
export type LocaleCode = "en-US" | "ru-RU";

export type Lang = "en" | "ru";

export type CurrencyCode = "RUB" | "USD";

const localization = {
  defaultLocale: "en-US",
  fallback: true,
  defaultLocalePublishOption: "active",
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
    code: "en-US" | "ru-RU";
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
