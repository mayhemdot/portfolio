"use server";

import {
	getRegion,
	type StoreRegion,
} from "@/modules/common/lib/get-region-action";
import {
	getCountryCodeFromLocale,
	getLanguageFromLocale,
} from "@/modules/common/lib/get-region";
import type { SortOptions } from "@/modules/store/components/SortProducts";
import { PRODUCTS } from "../constants";
import type { StoreProduct } from "../types";
import { sortProducts } from "../utils/sort-products";
import { Locale } from "next-intl";

type QueryParams = {
	handle?: string;
	limit?: number;
	collection_id?: string;
	category_ids?: string[];
	fields?: string;
};

export const listProducts = async ({
	pageParam = 1,
	queryParams,
	locale,
	regionId,
}: {
	pageParam?: number;
	queryParams?: QueryParams;
	locale?: Locale;
	regionId?: string;
}): Promise<{
	response: { products: StoreProduct[]; count: number };
	nextPage: number | null;
	queryParams?: any; //HttpTypes.FindParams & HttpTypes.StoreProductParams;
}> => {
	if (!locale && !regionId) {
		throw new Error("Locale or region ID is required");
	}

	const limit = queryParams?.limit || 12;
	const _pageParam = Math.max(pageParam, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	// Извлекаем languageCode и countryCode из locale
	const languageCode = locale ? getLanguageFromLocale(locale) : "en";
	const countryCode = locale ? getCountryCodeFromLocale(locale) : undefined;

	let region: StoreRegion | undefined | null;

	if (countryCode) {
		region = await getRegion(countryCode);
	}
	let products = PRODUCTS;

	if (queryParams?.handle) {
		products = products.filter(
			product => product.handle === queryParams.handle
		);
	}

	if (queryParams?.category_ids) {
		products = products.filter(product =>
			product.categories?.some(
				category => queryParams?.category_ids?.includes(category.id) || false
			)
		);
	}

	// Получаем currency_code из региона (если регион доступен)
	const currencyCode = region?.currency_code?.toLowerCase() || "usd";

	// Преобразуем категории и добавляем calculated_price для соответствия типу StoreProduct
	const normalizedProducts: StoreProduct[] = products.map(product => ({
		...product,
		categories: product.categories?.map(category => ({
			id: category.id,
			name:
				typeof category.name === "string"
					? category.name
					: category.name[languageCode as keyof typeof category.name] ||
					  category.name.en ||
					  "",
			handle: category.handle,
		})),
		variants: product.variants?.map(variant => {
			// Находим цену с нужной валютой
			const priceForCurrency = variant.prices?.find(
				p => p.currency_code.toLowerCase() === currencyCode
			);

			// Если найдена цена, создаем calculated_price
			const calculatedPrice = priceForCurrency
				? {
						currency_code: currencyCode,
						original_amount: priceForCurrency.amount,
						calculated_amount: priceForCurrency.amount,
						calculated_price_type: "original" as const,
				  }
				: undefined;

			return {
				...variant,
				calculated_price: calculatedPrice,
			};
		}),
	}));

	if (regionId) {
		return {
			response: {
				products: normalizedProducts,
				count: normalizedProducts.length,
			},
			nextPage: null,
		};
	}

	if (!region) {
		return {
			response: { products: [], count: 0 },
			nextPage: null,
		};
	}

	// const headers = {
	//   ...(await getAuthHeaders()),
	// };

	// const next = {
	//   ...(await getCacheOptions("products")),
	// };

	// return sdk.client
	//   .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(`/store/products`, {
	//     method: "GET",
	//     query: {
	//       limit,
	//       offset,
	//       region_id: region?.id,
	//       fields: "*categories,*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
	//       ...queryParams,
	//     },
	//     headers,
	//     next,
	//     cache: "force-cache",
	//   })
	//   .then(({ products, count }) => {
	//     const nextPage = count > offset + limit ? pageParam + 1 : null;

	//     return {
	//       response: {
	//         products,
	//         count,
	//       },
	//       nextPage: nextPage,
	//       queryParams,
	//     };
	//   });

	return {
		response: {
			products: normalizedProducts,
			count: normalizedProducts.length,
		},
		nextPage: null,
	};
};

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
	page = 0,
	queryParams,
	sortBy = "created_at",
	locale,
}: {
	page?: number;
	queryParams?: any; // HttpTypes.FindParams & HttpTypes.StoreProductParams;
	sortBy?: SortOptions;
	locale: Locale;
}): Promise<{
	response: { products: StoreProduct[]; count: number };
	nextPage: number | null;
	queryParams?: any; //HttpTypes.FindParams & HttpTypes.StoreProductParams;
}> => {
	const limit = queryParams?.limit || 12;
	const {
		response: { products, count },
	} = await listProducts({
		pageParam: 0,
		queryParams: {
			...queryParams,
			// limit: 100,
		},
		locale,
	});
	// console.log("productsxxx", products);

	const sortedProducts = sortProducts(products, sortBy);

	const pageParam = (page - 1) * limit;

	const nextPage = count > pageParam + limit ? pageParam + limit : null;

	const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit);

	return {
		response: {
			products: paginatedProducts,
			count,
		},
		nextPage,
		queryParams,
	};
};

export async function maxProductPrice({
	locale,
	regionId,
}: {
	locale?: Locale;
	regionId?: string;
}): Promise<number> {
	// const headers = {
	//   ...(await getAuthHeaders()),
	// };

	let region: StoreRegion | undefined | null;

	if (locale) {
		const countryCode = getCountryCodeFromLocale(locale);
		region = await getRegion(countryCode);
	}

	if (!region) {
		return 0;
	}

	// const { products } = await sdk.client.fetch<{
	//   products: HttpTypes.StoreProduct[];
	//   count: number;
	// }>(`/store/products`, {
	//   method: "GET",
	//   query: {
	//     limit: 10000,
	//     offset: 0,
	//     region_id: region?.id,
	//     fields: "*variants.calculated_price",
	//   },
	//   headers,
	//   next: null,
	//   cache: "no-cache",
	// });

	// return Math.max(
	//   ...products?.flatMap((product) =>
	//     product?.variants?.map((variant) => variant?.calculated_price?.calculated_amount || 0),
	//   ),
	// );

	return Math.max(1000);
}

// export type StoreProductReturn = Omit<StoreProduct, "description"> & {
// 	description: string;
// };

// function fetchProducts(countryCode: string): StoreProduct[] {
// 	return PRODUCTS.map(p => ({
// 		...p,
// 		description: p.description[countryCode],
// 	}));
// }
