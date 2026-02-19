import type { Lang, LocaleCode } from "@/i18n/localization";
import { routing } from "@/i18n/routing";

export type CategoryRaw = {
	id: number;
	slug: string;
	thumbnail: string;
	name: {
		en: string;
		ru: string;
	};
};

export class Category {
	private lang: Lang = new Intl.Locale(routing.defaultLocale).language as Lang;

	constructor(public raw: CategoryRaw, public locale: LocaleCode) {
		this.lang = new Intl.Locale(locale)?.language as Lang;
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

	get thumbnail() {
		return this.raw.thumbnail;
	}
}
