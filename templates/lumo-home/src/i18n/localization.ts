
const localization = {
  defaultLocale: "en",
  fallback: true,
  defaultLocalePublishOption: "active",
  locales: [
    {
      rtl: false,
      code: "en",
      label: "English",
    },
    {
      rtl: false,
      code: "ru",
      label: "Русский",
      fallbackLocale: "en",
    },
  ] as {
    rtl: boolean,
    code: "en" | "ru";
    label: string;
    fallbackLocale?: string;
  }[],
};

export default localization;
