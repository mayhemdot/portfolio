// import 'dayjs/locale/ru'
// dayjs.extend(localeData)
// dayjs.locale('ru')

import {
  type CurrencyCode,
  getCurrency,
  type LocaleCode,
} from "@/i18n/localization";

// export function onlyNumber(str: string): number {
//   return Number(str.match(/\d+/g)?.join(''))
// }

// export function toCapitalize(str: string): string {
//   return str.charAt(0).toUpperCase() + str.slice(1)
// }

// const langToLocale = {
//   en: 'en-US',
//   ru: 'ru-RU',
//   es: 'es-ES',
//   'en-US': 'en-US',
//   'ru-RU': 'ru-RU',
//   'es-ES': 'es-ES',
// }

// const localeToCurrency = {
//   en: 'USD',
//   ru: 'RUB',
//   es: 'EUR',
// }

// export function formatPrice(
//   price: number | string,
//   options: {
//     currency?: 'USD' | 'EUR' | 'GBP' | 'BDT' | 'RUB'
//     notation?: Intl.NumberFormatOptions['notation'],
//     locale?: 'en' | 'ru'
//   } = {},
// ) {
//   const { currency = 'RUB', notation = 'standard' } = options

//   const numericPrice = typeof price === 'string' ? parseFloat(price) : price
//   const lang = options?.locale
//     ? langToLocale[options?.locale as keyof typeof langToLocale]
//     : 'ru-RU'

//   // const currencyT = options?.locale
//   //   ? localeToCurrency[options?.locale as keyof typeof localeToCurrency]
//   //   : 'RUB'

//   return new Intl.NumberFormat(lang, {
//     style: 'currency',
//     currency: currencyT,
//     notation,
//     maximumFractionDigits: 0,
//   }).format(numericPrice)
// }

export const isObject = (input: any) => input instanceof Object;
export const isArray = (input: any) => Array.isArray(input);

export const isEmpty = (input: any) => {
  return (
    input === null ||
    input === undefined ||
    (isObject(input) && Object.keys(input).length === 0) ||
    (isArray(input) && (input as any[]).length === 0) ||
    (typeof input === "string" && input.trim().length === 0)
  );
};

export type ConvertToLocaleParams = {
  localeCode?: LocaleCode;
  currencyCode?: CurrencyCode;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  quantity?: number;
};

export const formatPrice = (amount: number, options: ConvertToLocaleParams) => {
  const numericPrice = typeof amount === "string" ? parseFloat(amount) : amount;
  const { localeCode, currencyCode, minimumFractionDigits = 0, maximumFractionDigits = 0 } = options;

  return localeCode && !isEmpty(localeCode)
    ? new Intl.NumberFormat(localeCode, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(numericPrice)
    : numericPrice.toString();
};

export const formatPriceRaw = (
  amount?: {
    usd: number;
    rub: number;
  },
  options?: ConvertToLocaleParams,
) => {
  if (isEmpty(amount)) return "-";

  let {
    currencyCode,
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    quantity = 1,
    localeCode = "en-US",
  } = options || {};

  if (!currencyCode) {
    currencyCode = getCurrency(localeCode);
  }

  const currentAmount =
    amount?.[currencyCode.toLowerCase() as keyof typeof amount];

  let numericPrice =
    typeof currentAmount === "string"
      ? parseFloat(currentAmount)
      : currentAmount;

  if (!numericPrice) return "-";

  numericPrice = numericPrice * quantity;

  return currencyCode && !isEmpty(currencyCode)
    ? new Intl.NumberFormat(localeCode, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: minimumFractionDigits || 0,
        maximumFractionDigits: maximumFractionDigits || 0,
      }).format(numericPrice)
    : numericPrice.toString();
};
