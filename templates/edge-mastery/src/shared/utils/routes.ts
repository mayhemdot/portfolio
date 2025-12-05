export const ROUTES = {
  login: (countryCode?: string) => (countryCode ? `/${countryCode}/login` : "/login"),

  signup: (countryCode?: string) => (countryCode ? `/${countryCode}/signup` : "/signup"),

  forgotPassword: (countryCode?: string) => (countryCode ? `/${countryCode}/forgot-password` : "/forgot-password"),

  dashboard: (countryCode?: string) => (countryCode ? `/${countryCode}/dashboard` : "/dashboard"),

  cart: (countryCode?: string) => (countryCode ? `/${countryCode}/cart` : "/cart"),

  catalog: (countryCode?: string) => (countryCode ? `/${countryCode}/store` : "/store"),

  settings: (countryCode?: string) => (countryCode ? `/${countryCode}/settings` : "/settings"),

  wishlist: (countryCode?: string) => (countryCode ? `/${countryCode}/wishlist` : "/wishlist"),

  accountProfile: (countryCode?: string) => (countryCode ? `/${countryCode}/dashboard/profile` : "/dashboard/profile"),
  accountAddresses: (countryCode?: string) =>
    countryCode ? `/${countryCode}/dashboard/addresses` : "/dashboard/addresses",
  accountOrders: (countryCode?: string) => (countryCode ? `/${countryCode}/dashboard/orders` : "/dashboard/orders"),

  emailConfirmation: (countryCode?: string) =>
    countryCode ? `/${countryCode}/email-confirmation` : "/email-confirmation",

  verifyYourEmail: (countryCode?: string) => (countryCode ? `/${countryCode}/verify-your-email` : "/verify-your-email"),
  dashboardOrders: (countryCode?: string, id?: string) =>
    countryCode ? `/${countryCode}/dashboard/orders/${id}` : `/dashboard/orders/${id}`,

  privacyPolicy: (countryCode?: string) =>
    countryCode ? `/${countryCode}/content/privacy-policy` : "/content/privacy-policy",

  termOfUse: (countryCode?: string) => (countryCode ? `/${countryCode}/content/terms-of-use` : "/content/terms-of-use"),

  // aboutUs: (countryCode?: string) =>
  //   countryCode ? `/${countryCode}/content/about-us` : "/content/about-us",

  // contactUs: (countryCode?: string) =>
  //   countryCode ? `/${countryCode}/content/contact-us` : "/content/contact-us",
};
