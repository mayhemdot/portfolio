// import dayjs from 'dayjs'

export const SITE_LOCALE = 'ru'

export const SITE_NAME = 'LUMO HOME'

export const SITE_TITLE = {
  "ru": 'интернет магазин современной мебели и освещения',
  "en": 'online store of modern furniture and lighting',
}

//'What we do?'
export const SITE_DESCRIPTION = {
  "ru": "" ,
  "en": ""
}

export const SITE_PHONE = '+7(499)-343-77-71'

export const SITE_EMAIL = 'info@site.com'

export const COMPANY_ADDRESS = 'City, Street, д.4а, стр'

export const SITE_AUTHORS = ['Goryunov Evgenii']

// class ServiceLinks {
//   private root = ''

//   HOME = `${this.root}/`
//   DELIVERY = `${this.root}/delivery`
//   CONTACTS = `${this.root}/contacts`
//   POLITIC = `${this.root}/politic`
//   YANDEX =
//     'https://yandex.ru/maps/2/moscow/?ll=30.234088%2C60.036911&mode=routes&rtext=~60.036800%2C30.234300&rtt=auto&ruri=~&z=16'
//   VK = `#`
//   TG = `#`
// }

// class AccountLinks {
//   private root = ''
//   REGISTER = `${this.root}/create-account`
//   LOGIN = `${this.root}/login`
//   RESET = `${this.root}/reset`
//   PROFILE = `${this.root}/account`
// }

class Routes {
  private root = ''
  HOME = `${this.root}`
  LOGIN = `${this.root}/login`
  SIGN_UP = `${this.root}/register`
  FORGOT_PASSWORD = `${this.root}/forgot-password`
  RESTORE_PASSWORD = `${this.root}/restore-password`
  ///
  VK = `#`
  TG = `#`
  CONTACTS = `${this.root}/contacts`
  POLITIC = `${this.root}/politic`
  //
  CATALOG = `${this.root}/products`
  ///
  PROFILE = `${this.root}/account`

  ORDERS = `${this.root}/account/orders`
  PROFILE_EDIT = `${this.root}/account/profile-edit`
  CART = `${this.root}/cart`
  CHECKOUT = `${this.root}/checkout`
}

export const ROUTES = new Routes()

// export const BASE_LINKS = new BaseLinks()

export const NAV_LIST = [
  { label: 'Локация', link: '#' },
  { label: 'О нас', link: '#' },
  { label: 'Программы', link: '#' },
  { label: 'Залы', link: '#' },
  { label: 'Тренеры', link: '#' },
]

export const TIME_ZONES = {
  ru: [
    { id: 0, name: 'Калининград +2.00', slug: 'Europe/Kaliningrad' },
    { id: 1, name: 'Москва +3.00', slug: 'Europe/Moscow' },
    { id: 2, name: 'Самара +5.00', slug: 'Europe/Samara' },
    { id: 3, name: 'Екатеринбург +5.00', slug: 'Asia/Yekaterinburg' },
    { id: 4, name: 'Омск +6.00', slug: 'Asia/Omsk' },
    { id: 5, name: 'Новосибирск +6.00', slug: 'Asia/Novosibirsk' },
    { id: 6, name: 'Иркутск +8.00', slug: 'Asia/Irkutsk' },
    { id: 7, name: 'Якутск +9.00', slug: 'Asia/Yakutsk' },
    { id: 8, name: 'Владивосток +10.00', slug: 'Asia/Vladivostok' },
    { id: 9, name: 'Сахалин +11.00', slug: 'Asia/Sakhalin' },
    { id: 10, name: 'Камчатка +12.00', slug: 'Asia/Kamchatka' },
  ],
}

export const DAYS_OF_WEEK = {
  ru: [
    { name: 'Пн', key: 'Mn', mask: 32 },
    { name: 'Вт', key: 'Tu', mask: 16 },
    { name: 'Ср', key: 'We', mask: 8 },
    { name: 'Чт', key: 'Th', mask: 4 },
    { name: 'Пт', key: 'Fr', mask: 2 },
    { name: 'Сб', key: 'Sa', mask: 1 },
    { name: 'Вс', key: 'Su', mask: 0 },
  ],
  en: [
    { name: 'Mn', key: 'Mn', mask: 32 },
    { name: 'Tu', key: 'Tu', mask: 16 },
    { name: 'We', key: 'We', mask: 8 },
    { name: 'Th', key: 'Th', mask: 4 },
    { name: 'Fr', key: 'Fr', mask: 2 },
    { name: 'Sa', key: 'Sa', mask: 1 },
    { name: 'Su', key: 'Su', mask: 0 },
  ],
}

const WEEK_NAMES = {
  ru: [
    'первая',
    'вторая',
    'третья',
    'четвертая',
    'пятая',
    'шестая',
    'седьмая',
    'восьмая',
    'девятая',
    'десятая',
  ],
  en: [
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'tenth',
  ],
}

export function selectWeekName(wIndex: number, lang: 'ru' | 'en' = 'ru') {
  return wIndex < WEEK_NAMES[lang].length
    ? WEEK_NAMES[lang][wIndex] + ' неделя'
    : `${wIndex + 1}-aя неделя`
}

export const HOURS = [
  {
    name: '8:00',
    time: 8,
  },
  {
    name: '9:00',
    time: 9,
  },
  {
    name: '10:00',
    time: 10,
  },
  {
    name: '11:00',
    time: 11,
  },
  {
    name: '12:00',
    time: 12,
  },
  {
    name: '13:00',
    time: 13,
  },
  {
    name: '14:00',
    time: 14,
  },
  {
    name: '15:00',
    time: 15,
  },
  {
    name: '16:00',
    time: 16,
  },
  {
    name: '17:00',
    time: 17,
  },
  {
    name: '18:00',
    time: 18,
  },
  {
    name: '19:00',
    time: 19,
  },
  {
    name: '20:00',
    time: 20,
  },
  {
    name: '21:00',
    time: 21,
  },
  {
    name: '22:00',
    time: 22,
  },
]

// const FILTERS_BY_DAYS: Record<string, Dayjs> = {
//   today: dayjs().startOf('day'),
//   tomorrow: dayjs().add(1, 'day').startOf('day'),
//   'on-this-week': dayjs().endOf('isoWeek'),
//   'on-next-week': dayjs().add(1, 'week').startOf('day'),
//   later: dayjs().add(2, 'week').startOf('day')
// }
// class BaseLinks {
//   private root = ''
//   PRODUCT = `${this.root}`
//   THANKS_ORDER = `${this.root}/orders/confirmation`
//   THANKS_RESET_PASSWORD = `${this.root}/thanks/reset`
//   COURSES = `${this.root}/active-subscriptions`
//   MY_SCHEDULE = `${this.root}/my-schedule`
//   SCHEDULE = `${this.root}/schedule`
// }
