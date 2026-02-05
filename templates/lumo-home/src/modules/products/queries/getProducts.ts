import { getLang, type LocaleCode } from "@/i18n/localization";
import { routing } from "@/i18n/routing";
import { PRODUCTS } from "@/modules/products/model/data";
import { Product } from "@/modules/products/model/types";
import type { PaginatedDocs } from "@/modules/products/queries/searchProducts";

export const getProductsWhere = ({
	search,
	sortBy,
	page = String(1),
	localeCode = routing.defaultLocale,
}: {
	search?: string;
	sortBy?: string;
	page?: string;
	localeCode: LocaleCode;
}): PaginatedDocs<Product> => {
	let products: Product[] = PRODUCTS.map(p => new Product(p, localeCode));

	if (sortBy === "price") {
		products = [...products].sort((a, b) => a.price - b.price);
	} else if (sortBy === "-price") {
		products = [...products].sort((a, b) => b.price - a.price);
	}

	if (search) {
		products = products.filter(p =>
			p.title?.toLowerCase().startsWith(search.toLowerCase()),
		);
	}
	if (page) {
		products = products?.slice((Number(page) - 1) * 10, Number(page) * 10);
	}

	return {
		docs: products,
		page: Number(1),
		limit: 10,
		totalDocs: products.length || 0,
		totalPages: 1,
	};
};

export const getProductBySlug = async ({
	slug,
	code,
}: {
	slug: string;
	code: LocaleCode;
}) => {
	return PRODUCTS.find(product => product.slug === slug) || null;
};

// function t<T>(obj: Localized<T>, lang: string): T {
//   const key = localeMap[lang] || "en"; // fallback на английский
//   return obj[key];
// }
