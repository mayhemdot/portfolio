import { routing } from "@/i18n/routing";

export function getCountryCodeFromLocale(locale: string) {
	if (!locale || (locale && !locale?.includes("-"))) {
		locale = routing.defaultLocale;
	}
	const splitted = locale.split("-");
	if (splitted.length > 1) {
		return splitted[1].toLowerCase();
	} else {
		return routing.defaultLocale[1].toLowerCase();
	}
}

export function getLanguageFromLocale(locale: string) {
	if (!locale || (locale && !locale?.includes("-"))) {
		locale = routing.defaultLocale;
	}
	const splitted = locale.split("-");

	if (splitted.length > 0) {
		return splitted[0].toLowerCase();
	} else {
		return routing.defaultLocale.split("-")[0].toLowerCase();
	}
}
