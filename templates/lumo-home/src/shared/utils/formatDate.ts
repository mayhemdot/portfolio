import { LocaleCode } from "@/i18n/localization";

export function formatDate(date: string, locale: LocaleCode = "ru-RU") {
	return new Date(date).toLocaleDateString(locale, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
