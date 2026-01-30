// import 'dayjs/locale/ru'
// dayjs.extend(localeData)
// dayjs.locale('ru')

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

export const isObject = (input: any) => input instanceof Object
export const isArray = (input: any) => Array.isArray(input)

export const isEmpty = (input: any) => {
  return (
    input === null ||
    input === undefined ||
    (isObject(input) && Object.keys(input).length === 0) ||
    (isArray(input) && (input as any[]).length === 0) ||
    (typeof input === 'string' && input.trim().length === 0)
  )
}

export type ConvertToLocaleParams = {
  currencyCode: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const formatPrice = (
  amount: number | string,
  options?: ConvertToLocaleParams,
) => {
  const {
    currencyCode = 'en',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    locale = 'en-US',
  } = options || {}  

  const numericPrice = typeof amount === 'string' ? parseFloat(amount) : amount

  return currencyCode && !isEmpty(currencyCode)
    ? new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: minimumFractionDigits || 0,
        maximumFractionDigits: maximumFractionDigits || 0,
      }).format(numericPrice)
    : amount.toString()
}
