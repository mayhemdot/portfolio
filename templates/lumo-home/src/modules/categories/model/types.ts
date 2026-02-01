import { getLang, type Lang, type LocaleCode } from "@/i18n/localization";
import { routing } from "@/i18n/routing";

export type CategoryRaw = {
  id: number | string;
  slug: string;
  name: {
    en: string;
    ru: string;
  };
};

export class Category {
  private lang: Lang = getLang(routing.defaultLocale);

  constructor(
    public raw: CategoryRaw,
    public locale: LocaleCode,
  ) {
    this.lang = getLang(locale);
  }
  get id() {
    return this.raw.id;
  }
  get slug() {
    return this.raw.slug;
  }
  get name() {
    return this.raw.name[this.lang];
  }
}
