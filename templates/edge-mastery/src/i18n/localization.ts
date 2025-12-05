const localization = {
  defaultLocale: "en-US",
  // fallback: true,
  locales: [
    {
      code: "en-US",
      // Regarding the label, we are using the syntax "{lang. in English} - ({lang. in native})".
      // The consensus is that it's a good idea to have languages ​​listed in their own languages: https://ux.stackexchange.com/q/37017/144485
      // Although others have made good points about why it is good to have them in English:
      // such as the user type, and the order of languages. See https://ux.stackexchange.com/q/3592/144485
      label: "English (English)",
      rtl: false,
    },
    {
      code: "en-GB",
      label: "English (United Kingdom)",
      rtl: false,
    },
    {
      code: "ru-RU",
      label: "Russian (Русский)",
      rtl: false,
    },
    {
      code: "es-ES",
      label: "Spanish (Español)",
      rtl: false,
    },
    {
      code: "de-DE",
      label: "German (Deutsch)",
      rtl: false,
    },
    {
      code: "fr-FR",
      label: "French (Français)",
      rtl: false,
    },
    {
      code: "it-IT",
      label: "Italian (Italiano)",
      rtl: false,
    },
    // {
    //   code: "zh-CN",
    //   label: "Chinese (简体中文)",
    //   rtl: false,
    // },
    // {
    //   code: "zh-TW",
    //   label: "Chinese (繁體中文)",
    //   rtl: false,
    // },
    // {
    //   code: "ja",
    //   label: "Japanese (日本語)",
    // },
    // {
    //   code: "ar",
    //   label: "Arabic (العربية)",
    //   rtl: true,
    // },
  ],
};

export default localization;
