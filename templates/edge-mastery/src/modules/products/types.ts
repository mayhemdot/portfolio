export interface StoreProduct {
	id: string;
	title: string;
	subtitle?: string | null;
	handle: string;
	description?: Record<string, string> | null;
	is_giftcard?: boolean;
	status: "draft" | "proposed" | "published" | "rejected";
	thumbnail?: string | null;
	weight?: number | null;
	length?: number | null;
	height?: number | null;
	width?: number | null;
	hs_code?: string | null;
	origin_country?: string | null;
	mid_code?: string | null;
	material?: string | null;
	created_at: string;
	updated_at: string;
	deleted_at?: string | null;
	categories?: { id: string; name: string; handle: string }[];
	// Relations
	collection?: StoreCollection | null;
	collection_id?: string | null;

	type?: StoreProductType | null;
	type_id?: string | null;

	tags?: StoreProductTag[];
	options?: StoreProductOption[];
	variants?: StoreProductVariant[];
	images?: StoreImage[];
	metadata?: Record<string, any> | null;
}

export interface StoreProductVariant {
	id: string;
	title?: string | null;
	sku?: string | null;
	barcode?: string | null;
	ean?: string | null;
	upc?: string | null;
	inventory_quantity?: number;
	allow_backorder?: boolean;
	manage_inventory?: boolean;

	options?: StoreProductOptionValue[];
	prices?: StoreMoneyAmount[];
	calculated_price?: StoreCalculatedPrice;

	created_at?: string;
	updated_at?: string;
	deleted_at?: string | null;
	product?: StoreProduct;
	// В API медузы нет поля product внутри variants → убираем
	// product?: StoreProduct;
}

export interface StoreCalculatedPrice {
	currency_code: string;
	original_amount: number;
	calculated_amount: number;
	calculated_price_type: "original" | "sale";
	calculated_price?: {
		price_list_type: string;
	};
}

export interface MinPricedProduct extends StoreProduct {
	_minPrice?: number;
}

export interface StoreProductOption {
	id: string;
	title?: string;
	values?: StoreProductOptionValue[];
}

export interface StoreProductOptionValue {
	id?: string;
	value: string;
	option_id?: string;
}

export interface StoreMoneyAmount {
	id: string;
	currency_code: string;
	amount: number;
}

export interface StoreImage {
	id: string;
	url: string;
	created_at?: string;
	updated_at?: string;
}

export interface StoreProductTag {
	id: string;
	value: string;
}

export interface StoreProductType {
	id: string;
	value: string;
}

export interface StoreCollection {
	id: string;
	title: string;
	handle?: string;
	category_id?: string;
	created_at?: string;
	updated_at?: string;
}

export interface StoreCategory {
	id: string;
	name: string;
	handle?: string;
}
// export interface StoreProductVariant {
//   id: string;
//   title?: string | null;
//   sku?: string | null;
//   barcode?: string | null;
//   ean?: string | null;
//   upc?: string | null;
//   inventory_quantity?: number;
//   allow_backorder?: boolean;
//   manage_inventory?: boolean;

//   options?: StoreProductOptionValue[];
//   prices?: StoreMoneyAmount[];
//   calculated_price?: StoreCalculatedPrice;

//   created_at: string;
//   updated_at: string;
//   deleted_at?: string | null;
//   product: StoreProduct;
// }
