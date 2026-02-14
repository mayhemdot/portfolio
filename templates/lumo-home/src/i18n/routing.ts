import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import localization, { type LocaleCode } from "@/i18n/localization";

export const routing = defineRouting({
  locales: localization.locales.map(
    (value) => (value as { code: LocaleCode }).code,
  ),
  localePrefix: localization.localePrefix,
  defaultLocale: localization.defaultLocale as LocaleCode,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

// export type Locale = (typeof localization.locales)[number]['code']
