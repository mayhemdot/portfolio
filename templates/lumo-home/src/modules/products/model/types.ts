import {
	type CurrencyCode,
	getCurrency,
	getLang,
	type Lang,
	type LocaleCode,
} from "@/i18n/localization";
import { routing } from "@/i18n/routing";
import type { Category, CategoryRaw } from "@/modules/categories/model/types";
import { PRODUCTS } from "@/modules/products/model/data";
import type { MediaType } from "@/shared/components/Media/types";
import { formatPrice } from "@/shared/utils/formatPrice";

export type ProductRaw = {
	id: number;
	slug: string;
	category: CategoryRaw;
	description?: {
		en: string;
		ru: string;
	};
	title: {
		en: string;
		ru: string;
	};
	price: {
		rub: number;
		usd: number;
	};
	images?: MediaType[] | null;
	updatedAt: string;
	createdAt: string;
	inStock: boolean;
	characteristics: {
		name: {
			en: string;
			ru: string;
		};
		value: {
			en: string;
			ru: string;
		};
	}[];
	variants?: ProductVariant[];
	enableVariants: boolean;
	meta?: {
		title: {
			en: string;
			ru: string;
		};
		description: {
			en: string;
			ru: string;
		};
	};
	relatedProducts: number[];
};

export class Product {
	private lang: Lang = getLang(routing.defaultLocale);
	private currency: CurrencyCode = getCurrency(routing.defaultLocale);

	constructor(public raw: ProductRaw, public locale: LocaleCode) {
		this.lang = getLang(locale);
		this.currency = getCurrency(locale);
	}

	get id() {
		return this.raw.id;
	}

	get slug() {
		return this.raw.slug;
	}

	get category() {
		return this.raw.category;
	}

	get title() {
		return this.raw.title[this.lang];
	}

	get description() {
		console.log("description", this.raw.description);
		return this.raw.description?.[this.lang];
	}

	get price() {
		return this.raw.price[
			this.currency.toLowerCase() as keyof typeof this.raw.price
		];
	}

	get images() {
		return this.raw.images;
	}

	get updatedAt() {
		return this.raw.updatedAt;
	}

	get createdAt() {
		return this.raw.createdAt;
	}

	get inStock() {
		return this.raw.inStock;
	}

	get characteristics() {
		return this.raw.characteristics.map(characteristic => ({
			name: characteristic.name[this.lang],
			value: characteristic.value[this.lang],
		}));
	}

	get variants() {
		return this.raw.variants;
	}

	get enableVariants() {
		return this.raw.enableVariants;
	}

	get meta() {
		if (this.raw.meta === undefined) return {};

		return {
			title: this.raw.meta.title[this.lang],
			description: this.raw.meta.description[this.lang],
		};
	}

	get relatedProducts() {
		return this.raw.relatedProducts;
		// return this.raw.relatedProducts.filter(id => PRODUCTS.).map(
		//   (product) => new Product(product, this.locale),
		// );
	}

	get relatedProductsRaw() {
		return this.raw.relatedProducts;
	}

	thumbnail() {
		return this.raw.images?.[0];
	}

	prettyPrice(quantity?: number) {
		const currency = this.currency.toLowerCase() as keyof typeof this.raw.price;
		const amount = this.raw.price[currency] * (quantity || 1);
		return formatPrice(amount, {
			localeCode: this.locale,
			currencyCode: this.currency,
		});
	}

	toString() {
		return JSON.stringify(this.raw);
	}
}

export type ProductVariant = {
	id: number;
};
