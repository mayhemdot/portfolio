import { CATEGORIES } from "../../categories/static";
import type { StoreProduct } from "../types";

const DESCRIPTION_EFFECT = `Аромат раскрывается в процессе горения свечи в течение 15 минут. 
Полностью аромат раскрывается через 30-40 минут работы свечи. 
Свечу можно использовать в спальной комнате, зале или ванной комнате. 
Площадь аромата составляет 15-18 кв метров.`;

export const PRODUCTS: StoreProduct[] = [
	{
		id: "prod_1",
		title: 'Свеча "Орхидея и Ваниль"',
		subtitle: "Ароматическая свеча с орхидеей и ванилью",
		slug: "orhidea-vanilla-candle",
		description: {
			effect: DESCRIPTION_EFFECT,
			notes: "Орхидея, ваниль, белый мускус",
			features: "Деревянный фитиль, Кокосовый воск",
		},
		is_giftcard: false,
		status: "published",
		thumbnail: "/images/products/orhidea-vanilla_90.webp",
		weight: 200,
		length: 8,
		height: 10,
		width: 8,
		created_at: new Date("2023-01-01T12:00:00.000Z").toISOString(),
		updated_at: new Date("2023-01-05T12:00:00.000Z").toISOString(),
		categories: [CATEGORIES[0]],
		variants: [
			{
				id: "variant_1s",
				title: "150ml",
				description: "Время горения 25–35 часов",
				inventory_quantity: 100,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					// id: "price_1s",
					currency_code: "rub",
					calculated_amount: 150000,
					original_amount: 150000,
					calculated_price_type: "original",
				},
				// prices: [
				// 	{
				// 		id: "price_1s",
				// 		currency_code: "rub",
				// 		amount: 150000,
				// 	},
				// ],
			},
			{
				id: "variant_1m",
				title: "250ml",
				inventory_quantity: 100,
				description: "Время горения 45–60 часов",
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 200000,
					original_amount: 200000,
					calculated_price_type: "original",
				},
			},
			{
				id: "variant_1l",
				title: "380ml",
				description: "Время горения 75–90 часов",
				inventory_quantity: 100,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 250000,
					original_amount: 250000,
					calculated_price_type: "original",
				},
			},
		],
		images: [
			{
				id: "image_1",
				url: "/images/products/orhidea-vanilla_90.webp",
			},
		],
	},
	{
		id: "prod_2",
		title: 'Свеча "Домашнее печенье"',
		subtitle: "Ароматическая свеча с запахом свежего печенья",
		slug: "cookies-candle",
		description: {
			effect: DESCRIPTION_EFFECT,
			notes: "Свежее печенье, ваниль, корица",
			features: "Деревянный фитиль, Кокосовый воск",
		},
		is_giftcard: false,
		status: "published",
		thumbnail: "/images/products/cookies_90.webp",
		weight: 200,
		length: 8,
		height: 10,
		width: 8,
		created_at: new Date("2023-01-02T12:00:00.000Z").toISOString(),
		updated_at: new Date("2023-01-06T12:00:00.000Z").toISOString(),
		categories: [CATEGORIES[0]],
		variants: [
			{
				id: "variant_2s",
				title: "150ml",
				description: "Время горения 25–35 часов",
				inventory_quantity: 80,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 160000,
					original_amount: 160000,
					calculated_price_type: "original",
				},
			},
			{
				id: "variant_2m",
				title: "250ml",
				description: "Время горения 45–60 часов",
				inventory_quantity: 80,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 210000,
					original_amount: 210000,
					calculated_price_type: "original",
				},
			},
			{
				id: "variant_2l",
				title: "380ml",
				description: "Время горения 75–90 часов",
				inventory_quantity: 80,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 260000,
					original_amount: 260000,
					calculated_price_type: "original",
				},
			},
		],
		images: [
			{
				id: "image_2",
				url: "/images/products/cookies_90.webp",
			},
		],
	},
	{
		id: "prod_3",
		title: 'Свеча "Карамельное мороженое"',
		subtitle: "Сладкий аромат карамельного мороженого",
		slug: "ice-cream-caramel-candle",
		description: {
			effect: DESCRIPTION_EFFECT,
			features: "Деревянный фитиль, Кокосовый воск",
			notes: "Карамель, ванильное мороженое, молоко",
		},
		is_giftcard: false,
		status: "published",
		thumbnail: "/images/products/ice-cream-caramel_90.webp",
		weight: 200,
		length: 8,
		height: 10,
		width: 8,
		created_at: new Date("2023-01-03T12:00:00.000Z").toISOString(),
		updated_at: new Date("2023-01-07T12:00:00.000Z").toISOString(),
		categories: [CATEGORIES[0]],
		variants: [
			{
				id: "variant_3s",
				title: "150ml",
				description: "Время горения 25–35 часов",
				inventory_quantity: 120,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 170000,
					original_amount: 170000,
					calculated_price_type: "original",
				},
			},
			{
				id: "variant_3m",
				title: "250ml",
				description: "Время горения 45–60 часов",
				inventory_quantity: 120,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 220000,
					original_amount: 220000,
					calculated_price_type: "original",
				},
			},
			{
				id: "variant_3l",
				title: "380ml",
				description: "Время горения 75–90 часов",
				inventory_quantity: 120,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 270000,
					original_amount: 270000,
					calculated_price_type: "original",
				},
			},
		],
		images: [
			{
				id: "image_3",
				url: "/images/products/ice-cream-caramel_90.webp",
			},
		],
	},
	{
		id: "prod_4",
		title: 'Свеча "Апельсин и Корица"',
		subtitle: "Пряный аромат апельсина и корицы",
		slug: "orange-cinnamon-candle",
		description: {
			effect: DESCRIPTION_EFFECT,
			features: "Деревянный фитиль, Кокосовый воск",
			notes: "Апельсин, корица, гвоздика",
		},
		is_giftcard: false,
		status: "published",
		thumbnail: "/images/products/orange-cinnamon_90.webp",
		weight: 200,
		length: 8,
		height: 10,
		width: 8,
		created_at: new Date("2023-01-04T12:00:00.000Z").toISOString(),
		updated_at: new Date("2023-01-08T12:00:00.000Z").toISOString(),
		categories: [CATEGORIES[0]],
		variants: [
			{
				id: "variant_4s",
				title: "150ml",
				description: "Время горения 25–35 часов",
				inventory_quantity: 90,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 155000,
					original_amount: 155000,
					calculated_price_type: "original",
				},
			},
			{
				id: "variant_4m",
				title: "250ml",
				description: "Время горения 45–60 часов",
				inventory_quantity: 90,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 205000,
					original_amount: 205000,
					calculated_price_type: "original",
				},
			},
			{
				id: "variant_4l",
				title: "380ml",
				description: "Время горения 75–90 часов",
				inventory_quantity: 90,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 255000,
					original_amount: 255000,
					calculated_price_type: "original",
				},
			},
		],
		images: [
			{
				id: "image_4",
				url: "/images/products/orange-cinnamon_90.webp",
			},
		],
	},
	{
		id: "prod_5",
		title: 'Свеча "Ваниль и Карамель"',
		subtitle: "Сладкий и нежный аромат ванили и карамели",
		slug: "vanilla-caramel-candle",
		description: {
			effect: DESCRIPTION_EFFECT,
			notes: "Ваниль, карамель, сливки",
			features: "Деревянный фитиль, Кокосовый воск",
		},
		is_giftcard: false,
		status: "published",
		thumbnail: "/images/products/vanilla-caramel_90.webp",
		weight: 200,
		length: 8,
		height: 10,
		width: 8,
		created_at: new Date("2023-01-05T12:00:00.000Z").toISOString(),
		updated_at: new Date("2023-01-09T12:00:00.000Z").toISOString(),
		categories: [CATEGORIES[0]],
		variants: [
			{
				id: "variant_5s",
				title: "150ml",
				description: "Время горения 25–35 часов",
				inventory_quantity: 110,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 165000,
					original_amount: 165000,
					calculated_price_type: "original",
				},
			},
			{
				id: "variant_5m",
				title: "250ml",
				description: "Время горения 45–60 часов",
				inventory_quantity: 110,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 215000,
					original_amount: 215000,
					calculated_price_type: "original",
				},
			},
			{
				id: "variant_5l",
				title: "380ml",
				description: "Время горения 75–90 часов",
				inventory_quantity: 110,
				allow_backorder: false,
				manage_inventory: true,
				calculated_price: {
					currency_code: "rub",
					calculated_amount: 265000,
					original_amount: 265000,
					calculated_price_type: "original",
				},
			},
		],
		images: [
			{
				id: "image_5",
				url: "/images/products/vanilla-caramel_90.webp",
			},
		],
	},
];

const MAX_PRICE =
	PRODUCTS.reduce((max, product) => {
		product.variants?.forEach(variant => {
			const amount = variant.calculated_price?.calculated_amount ?? 0;
			if (amount > max) {
				max = amount;
			}
		});
		return max;
	}, 0) / 100;

const MIN_PRICE =
	PRODUCTS.reduce((min, product) => {
		product.variants?.forEach(variant => {
			const amount = variant.calculated_price?.calculated_amount ?? 0;
			if (amount < min) {
				min = amount;
			}
		});
		return min;
	}, MAX_PRICE * 100) / 100;

export const PRODUCT_INFO = {
	MAX_PRICE,
	MIN_PRICE,
};

export const getProducts = async (): Promise<StoreProduct[]> => {
	return Promise.resolve(PRODUCTS);
};
