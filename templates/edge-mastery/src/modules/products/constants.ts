import type { Locale } from "next-intl";

export const CATEGORIES = [
	{
		id: "cat_01H2R4C34EV9KNRD6MJ1VK3PQY",
		name: {
			ru: "Ножи",
			en: "Knives",
			de: "Messer",
			es: "Cuchillos",
			fr: "Couteaux",
			it: "Coltelli",
		} as Record<Locale, string>,
		handle: "knives",
	},
	{
		id: "cat_01H2R4C5V0B0ADXD8P5M0C9H4Q",
		name: {
			ru: "Аксессуары",
			en: "Accessories",
			de: "Zubehör",
			es: "Accesorios",
			fr: "Accessoires",
			it: "Accessori",
		} as Record<Locale, string>,
		handle: "accessories",
	},
];

export type Category = (typeof CATEGORIES)[number];

export const TAGS = [
	{ id: "ptag_01H2R4C34EV9KNRD6MJ1VK3PQY", value: "Automatic" },
	{ id: "ptag_01H2R4C5V0B0ADXD8P5M0C9H4Q", value: "Elmax" },
	{ id: "ptag_01H2R4C5V0B0ADXD8P5M0C9H4R", value: "61H" },
];

export const PRODUCTS = [
	{
		id: "prod_01J8N3K6G5X9A6Z7WT4N3M8VQB",
		title: "Kadi Knife 01",
		subtitle: "High quality knife",
		status: "published" as const,
		description: {
			ru: "Универсальный и легкий нож, подходящий для повседневных задач.",
			en: "A versatile and lightweight knife suitable for everyday tasks.",
			de: "Ein vielseitiges und leichtes Messer, geeignet für alltägliche Aufgaben.",
			es: "Un cuchillo versátil y ligero, adecuado para las tareas diarias.",
			fr: "Un couteau polyvalent et léger adapté aux tâches quotidiennes.",
			it: "Un coltello versatile e leggero adatto alle attività quotidiane.",
		} as Record<Locale, string>,
		handle: "kadi-knife-01",
		// thumbnail: "https://yourcdn.com/images/hoodie.png",
		thumbnail: "/products/knife-origin.png",
		created_at: "2024-01-10T10:12:45.000Z",
		updated_at: "2024-03-02T12:22:31.000Z",
		type: null,
		collection_id: "col_01GX3B3S8G9QW1ZHTZ0V8C1K4T",
		collection: {
			id: "col_01GX3B3S8G9QW1ZHTZ0V8C1K4T",
			title: "Knives",
		},
		tags: TAGS,
		categories: [CATEGORIES[0]],
		options: [
			{
				id: "opt_01J8N3N9G3M3FM05BZAD2RZ3XS",
				title: "Handle Color",
				values: [
					{ id: "optval_01J8N3N9RC9N6QY3MNW0Y9AX3D", value: "orange" },
					{ id: "optval_01J8N3N9RC9N6QY3MNW0Y9AX3E", value: "black" },
					{ id: "optval_01J8N3N9RC9N6QY3MNW0Y9AX3F", value: "green" },
				],
			},
		],
		variants: [
			{
				id: "variant_01J8N3Q0F8YQ0P2E5B9NKTZ2SP",
				title: "Orange handle",
				sku: "KD-01-OR",
				inventory_quantity: 24,
				allow_backorder: false,
				manage_inventory: true,
				options: [
					{
						option_id: "opt_01J8N3N9G3M3FM05BZAD2RZ3XS",
						value: "orange",
					},
				],
				prices: [
					{
						id: "money_usd_01",
						currency_code: "usd",
						amount: 690,
					},
					{
						id: "money_eur_01",
						currency_code: "eur",
						amount: 635,
					},
					{
						id: "money_rub_01",
						currency_code: "rub",
						amount: 65000,
					},
				],
			},
		],
		images: [
			{
				id: "img_01J8N44ZW0F9K0TZZWKHN7M2YH",
				url: "/products/knife-origin.png",
				// url: "https://yourcdn.com/images/hoodie-front.png",
			},
			// {
			//   id: "img_01J8N455GHQ2X2Y8V2HQN2Q8PY",
			//   url: "https://yourcdn.com/images/hoodie-back.png",
			// },
		],
	},

	//
	// --- Kadi Knife 02 ---
	//
	{
		id: "prod_01J8P9A7Z4XV8WQ1TS6N7F2KLD",
		title: "Kadi Knife 02",
		subtitle: "Premium carbon steel knife",
		status: "published" as const,
		description: {
			ru: "Универсальный и легкий нож, подходящий для повседневных задач.",
			en: "A versatile and lightweight knife suitable for everyday tasks.",
			de: "Ein vielseitiges und leichtes Messer, geeignet für alltägliche Aufgaben.",
			es: "Un cuchillo versátil y ligero, adecuado para las tareas diarias.",
			fr: "Un couteau polyvalent et léger adapté aux tâches quotidiennes.",
			it: "Un coltello versatile e leggero adatto alle attività quotidiane.",
		} as Record<Locale, string>,
		// description: "A durable premium knife made from carbon steel.",
		handle: "kadi-knife-02",
		thumbnail: "/products/knife-white.png",
		// thumbnail: "https://yourcdn.com/images/knife-02.png",
		created_at: "2024-02-14T11:24:33.000Z",
		updated_at: "2024-03-18T09:44:12.000Z",
		type: null,
		collection_id: "col_01GX3B3S8G9QW1ZHTZ0V8C1K4T",
		collection: {
			id: "col_01GX3B3S8G9QW1ZHTZ0V8C1K4T",
			title: "Knives",
		},
		categories: [CATEGORIES[0]],
		tags: TAGS,
		options: [
			{
				id: "opt_01J8P9MNB4G7XZQ0QH82F6W9DJ",
				title: "Handle Color",
				values: [
					{ id: "optval_01J8P9MNRE6KXQY8B3M8E9ZZ4B", value: "black" },
					{ id: "optval_01J8P9MNRE6KXQY8B3M8E9ZZ4C", value: "wood" },
				],
			},
		],
		variants: [
			{
				id: "variant_01J8PAMPZ67X9H2B4T5E1F9WQG",
				title: "Black handle",
				sku: "KD-02-BLK",
				inventory_quantity: 12,
				allow_backorder: false,
				manage_inventory: true,
				options: [
					{
						option_id: "opt_01J8P9MNB4G7XZQ0QH82F6W9DJ",
						value: "black",
					},
				],
				prices: [
					{
						id: "money_usd_02",
						currency_code: "usd",
						amount: 820,
					},
					{
						id: "money_eur_02",
						currency_code: "eur",
						amount: 754,
					},
					{
						id: "money_rub_02",
						currency_code: "rub",
						amount: 79000,
					},
				],
			},
		],
		images: [
			{
				id: "img_01J8PAZW6N2X5T9D2A7Q2ZC6BE",
				url: "/products/knife-white.png",
			},
		],
	},
	//
	// --- Kadi Knife 03 ---
	//
	{
		id: "prod_01J8PG7TQ2N4ZS6WBK0JXF1JMT",
		title: "Kadi Knife 03",
		subtitle: "Lightweight universal knife",
		status: "published" as const,
		description: {
			ru: "Универсальный и легкий нож, подходящий для повседневных задач.",
			en: "A versatile and lightweight knife suitable for everyday tasks.",
			de: "Ein vielseitiges und leichtes Messer, geeignet für alltägliche Aufgaben.",
			es: "Un cuchillo versátil y ligero, adecuado para las tareas diarias.",
			fr: "Un couteau polyvalent et léger adapté aux tâches quotidiennes.",
			it: "Un coltello versatile e leggero adatto alle attività quotidiane.",
		} as Record<Locale, string>,
		handle: "kadi-knife-03",
		// thumbnail: "https://yourcdn.com/images/knife-03.png",
		thumbnail: "/products/knife-blue.png",
		created_at: "2024-03-01T08:55:10.000Z",
		updated_at: "2024-03-21T10:11:44.000Z",
		type: null,
		collection_id: "col_01GX3B3S8G9QW1ZHTZ0V8C1K4T",
		collection: {
			id: "col_01GX3B3S8G9QW1ZHTZ0V8C1K4T",
			title: "Knives",
		},
		tags: TAGS,
		categories: [CATEGORIES[0]],
		options: [
			{
				id: "opt_01J8PGJH52CWXQY22M4K8DZ1TR",
				title: "Handle Color",
				values: [
					{ id: "optval_01J8PGJHSF9N3A7WB9Q0ZKQ9PP", value: "red" },
					{ id: "optval_01J8PGJHSF9N3A7WB9Q0ZKQ9PR", value: "black" },
				],
			},
		],
		variants: [
			{
				id: "variant_01J8PHK8T2C7SG6DTF9Y2P1KXJ",
				title: "Red handle",
				sku: "KD-03-RED",
				inventory_quantity: 30,
				allow_backorder: false,
				manage_inventory: true,
				options: [
					{
						option_id: "opt_01J8PGJH52CWXQY22M4K8DZ1TR",
						value: "red",
					},
				],
				prices: [
					{
						id: "money_usd_03",
						currency_code: "usd",
						amount: 760,
					},
					{
						id: "money_eur_03",
						currency_code: "eur",
						amount: 699,
					},
					{
						id: "money_rub_03",
						currency_code: "rub",
						amount: 72000,
					},
				],
			},
		],
		images: [
			{
				id: "img_01J8PHXW6F1N6KA3MQ7N8DZZRD",
				url: "/products/knife-blue.png",
			},
		],
	},

	//
	// --- Scabbard Black ---
	//
	{
		id: "prod_01J8Q2K4M7N9P3R5T8V1X4Z6B9D",
		title: "Scabbard Black",
		subtitle: "Premium black leather scabbard",
		status: "published" as const,
		description: {
			ru: "Премиальные ножны из черной кожи для безопасного хранения и переноски ножа.",
			en: "Premium black leather scabbard for safe storage and carrying of your knife.",
			de: "Premium-Neufutter aus schwarzem Leder zur sicheren Aufbewahrung und zum Tragen Ihres Messers.",
			es: "Vaina premium de cuero negro para el almacenamiento seguro y transporte de su cuchillo.",
			fr: "Fourreau premium en cuir noir pour le stockage et le transport sécurisés de votre couteau.",
			it: "Fodero premium in pelle nera per la conservazione e il trasporto sicuri del vostro coltello.",
		} as Record<Locale, string>,
		handle: "scabbard-black",
		thumbnail: "/products/black-scabbard.png",
		created_at: "2024-03-15T09:30:22.000Z",
		updated_at: "2024-03-20T14:15:33.000Z",
		type: null,
		collection_id: "col_01GX3B3S8G9QW1ZHTZ0V8C1K4T",
		collection: {
			id: "col_01GX3B3S8G9QW1ZHTZ0V8C1K4T",
			title: "Knives",
		},
		tags: TAGS,
		categories: [CATEGORIES[1]],
		options: [],
		variants: [
			{
				id: "variant_01J8Q3L5N8P0S2U4W7Y0A3C5E8G",
				title: "Black scabbard",
				sku: "SCB-BLK-01",
				inventory_quantity: 18,
				allow_backorder: false,
				manage_inventory: true,
				options: [],
				prices: [
					{
						id: "money_usd_scb_blk",
						currency_code: "usd",
						amount: 120,
					},
					{
						id: "money_eur_scb_blk",
						currency_code: "eur",
						amount: 110,
					},
					{
						id: "money_rub_scb_blk",
						currency_code: "rub",
						amount: 11000,
					},
				],
			},
		],
		images: [
			{
				id: "img_01J8Q4M6O9Q1T3V5X8Z1B4D6F9H",
				url: "/products/black-scabbard.png",
			},
		],
	},

	//
	// --- Scabbard Brown ---
	//
	{
		id: "prod_01J8Q5N7P0R2S4U6W9Y2A5C7E0G3",
		title: "Scabbard Brown",
		subtitle: "Premium brown leather scabbard",
		status: "published" as const,
		description: {
			ru: "Премиальные ножны из коричневой кожи для безопасного хранения и переноски ножа.",
			en: "Premium brown leather scabbard for safe storage and carrying of your knife.",
			de: "Premium-Neufutter aus braunem Leder zur sicheren Aufbewahrung und zum Tragen Ihres Messers.",
			es: "Vaina premium de cuero marrón para el almacenamiento seguro y transporte de su cuchillo.",
			fr: "Fourreau premium en cuir marron pour le stockage et le transport sécurisés de votre couteau.",
			it: "Fodero premium in pelle marrone per la conservazione e il trasporto sicuri del vostro coltello.",
		} as Record<Locale, string>,
		handle: "scabbard-brown",
		thumbnail: "/products/brown-scabbard.png",
		created_at: "2024-03-16T10:45:11.000Z",
		updated_at: "2024-03-21T15:20:44.000Z",
		type: null,
		collection_id: "col_01GX3B3S8G9QW1ZHTZ0V8C1K4T",
		collection: {
			id: "col_01GX3B3S8G9QW1ZHTZ0V8C1K4T",
			title: "Knives",
		},
		tags: TAGS,
		categories: [CATEGORIES[1]],
		options: [],
		variants: [
			{
				id: "variant_01J8Q6O8Q1S3T5V7X0Z3B6D8F1H4",
				title: "Brown scabbard",
				sku: "SCB-BRN-01",
				inventory_quantity: 15,
				allow_backorder: false,
				manage_inventory: true,
				options: [],
				prices: [
					{
						id: "money_usd_scb_brn",
						currency_code: "usd",
						amount: 120,
					},
					{
						id: "money_eur_scb_brn",
						currency_code: "eur",
						amount: 110,
					},
					{
						id: "money_rub_scb_brn",
						currency_code: "rub",
						amount: 11000,
					},
				],
			},
		],
		images: [
			{
				id: "img_01J8Q7P9R0T2U4W6Y9A2C5E7F0H3",
				url: "/products/brown-scabbard.png",
			},
		],
	},
];
