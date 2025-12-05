"use server";

import { CATEGORIES } from "@/modules/products/constants";
import { Locale } from "next-intl";
import { getLanguageFromLocale } from "@/modules/common/lib/get-region";
// import { CATEGORIES } from "./constants";

export async function listCategories(locale: Locale, includeFixed = false) {
	const languageCode = getLanguageFromLocale(locale);
	return CATEGORIES.map(c => ({
		...c,
		name: c.name[languageCode as keyof typeof c.name] || c.name.en || "",
	}));
}
