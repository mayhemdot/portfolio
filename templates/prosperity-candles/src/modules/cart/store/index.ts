import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { StoreImage, StoreProductVariant } from "@/modules/products/types";

type RawItem = {
	id: string;
	variant: StoreProductVariant;
	images: StoreImage[] | undefined;
	isSelected?: boolean;
	name: string;
	description?: Record<string, string> | null | undefined;

	price: number;
	currency: string;
	quantity: number;
	created_at?: string;
	updated_at?: string;
};

interface CartState {
	items: RawItem[];
	addItem: (
		item: Omit<RawItem, "quantity" | "created_at" | "updated_at" | "id">
	) => void;

	setItemSelected: (id: string, isSelected: boolean) => void;
	setAllItemsSelected: (checked: boolean) => void;
	deleteSelectedItems: () => void;
	allIsSelected: () => boolean;

	cartIsNotSelected: () => boolean;
	cartIsEmpty: () => boolean;
	cartTotal: () => number;

	updateQuantity: (variant_id: string, currency: string, qty: number) => void;
	removeItem: (variant_id: string, currency: string) => void;
	clear: () => void;
	getCart: () => StoreCart;
	isProductInCart: (id: string) => boolean;
	setHasInitializedCart: (value: boolean) => void;
	hasInitializedCart: boolean;
}

export interface CartLineItem {
	id: string;
	thumbnail: string;
	images: StoreImage[];
	variant: StoreProductVariant;
	name: string;
	product_handle: string;
	quantity: number;
	title: string;
	product_type: string;
	currency_code: string;
	description?: string;
	unit_price: number;
	subtotal: number;
	total: number;
	original_total: number;
	tax_lines: {
		rate: number;
		name: string;
		code: string;
		value: number;
	}[];
	adjustments: Adjustment[]; // можно уточнить
	isSelected: boolean;
	created_at: string;
	updated_at: string;
}

export interface ShippingAddress {
	id?: string;
	first_name?: string;
	last_name?: string;
	company?: string;
	address_1?: string;
	address_2?: string;
	city?: string;
	country_code?: string; // ISO2 (например "ru", "us", "de")
	province?: string; // область/штат/регион
	postal_code?: string;
	phone?: string;
	metadata?: Record<string, any>;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string | null;
}

export interface StoreCart {
	id: string;
	email: string;
	// region_id: string;
	// region: StoreRegion;
	items: CartLineItem[];
	subtotal: number;
	discount_total: number;
	shipping_total: number;
	tax_total: number;
	total: number;
	payment_sessions: PaymentSession[];
	shipping_methods: ShippingMethod[];
	shipping_address?: ShippingAddress;
	created_at: string;
	updated_at: string;
	metadata: Record<string, any>;
	//   totals: {
	//     total?: number | null;
	//     subtotal?: number | null;
	//     tax_total?: number | null;
	//     shipping_total?: number | null;
	//     discount_total?: number | null;
	//     currency_code: string;
	// };
	shipping_subtotal?: number | null;
	gift_card_total?: number | null;
}

export interface TaxLine {
	rate: number;
	name: string;
	code: string;
	value: number;
}

export interface Adjustment {
	description?: string;
	amount?: number;
	promotion_id?: string;
	[key: string]: any;
}

export interface PaymentSession {
	id?: string;
	provider_id?: string;
	data?: Record<string, any>;
}

export interface ShippingMethod {
	id?: string;
	provider_id?: string;
	data?: Record<string, any>;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			hasInitializedCart: false,
			allIsSelected: () => get().items.every(i => i.isSelected),
			cartIsNotSelected: () => get().items.some(i => i.isSelected),
			setItemSelected: (id: string, isSelected: boolean) => {
				set({
					items: get().items.map(i => (i.id === id ? { ...i, isSelected } : i)),
				});
			},
			setAllItemsSelected: (checked: boolean) => {
				set({
					items: get().items.map(i => ({ ...i, isSelected: checked })),
				});
			},
			deleteSelectedItems: () => {
				set({
					items: get().items.filter(i => !i.isSelected),
				});
			},
			setHasInitializedCart: value => set({ hasInitializedCart: value }),
			addItem: item => {
				if (!item.variant.id || !item.currency) {
					throw new Error(
						"[CartState:addItem]: variant.id and currency is required"
					);
				}
				const items = get().items;
				const existing = items.find(
					i => i.variant.id === item.variant.id && i.currency === item.currency
				);
				const date =
					typeof window !== "undefined" ? new Date().toISOString() : "";

				if (existing) {
					existing.quantity++;
					existing.updated_at = date;
					set({ items: [...items] });
				} else {
					set({
						items: [
							...items,
							{
								...item,
								id: `item_${
									typeof window !== "undefined"
										? crypto.randomUUID()
										: Math.random()
								}`,
								quantity: 1,
								images: item.images,
								updated_at: date,
								created_at: date,
							},
						],
					});
				}
			},
			updateQuantity: (item_id, currency, qty) => {
				if (!currency) {
					throw new Error("[CartState:updateQuantity]: currency is required");
				}
				if (!item_id) {
					throw new Error("[CartState:updateQuantity]: item_id is required");
				}
				if (qty <= 0) {
					get().removeItem(item_id, currency);
					return;
				}

				// console.log("item_id, currency, qty",);
				set({
					items: get().items.map(i =>
						i.id === item_id && i.currency === currency
							? { ...i, quantity: Math.max(1, qty) }
							: i
					),
				});
			},
			removeItem: (item_id, currency) => {
				if (!currency) {
					throw new Error("[CartState:removeItem]: currency is required");
				}
				if (!item_id) {
					throw new Error("[CartState:removeItem]: item_id is required");
				}

				const items = get().items.filter(
					i => !(i.id === item_id && i.currency === currency)
				);
				set({
					items: [...items],
				});
			},

			clear: () => set({ items: [] }),

			getCart: () => {
				let subtotal = 0;
				const tax_total = 0;

				const enrichedItems = get().items.map(item => {
					const itemSubtotal = item.price * item.quantity;
					// const tax = Math.round(itemSubtotal * region.tax_rate);

					subtotal += itemSubtotal;
					// tax_total += tax;

					return {
						id: item.id, //`item_${crypto.randomUUID()}`,
						variant: item.variant,
						name: item.name,
						images: item.images,
						thumbnail: item?.images?.[0].url, //item.variant.product?.images?.[0].url || "",
						product_handle: item.variant.product?.id,
						quantity: item.quantity,
						title: item.name,
						description: item.description,
						currency_code: item.currency,
						product_type: "candles",
						unit_price: item.price,
						subtotal: itemSubtotal,
						total: itemSubtotal, // + tax,
						isSelected: item.isSelected || false,
						original_total: itemSubtotal,
						shipping_address: {},
						tax_lines: [
							// {
							// 	rate: region.tax_rate,
							// 	name: "VAT",
							// 	code: "vat",
							// 	value: tax,
							// },
						],
						adjustments: [],
						created_at: item.created_at,
						updated_at: item.updated_at,
					} as CartLineItem;
				});

				const total = subtotal + tax_total;
				const date =
					typeof window !== "undefined" ? new Date().toISOString() : "";

				return {
					id: `cart_${
						typeof window !== "undefined" ? crypto.randomUUID() : Math.random()
					}`,
					email: "",
					items: enrichedItems,
					subtotal,
					discount_total: 0,
					shipping_total: 0,
					gift_card_total: 0,
					currency_code: "ru",
					tax_total,
					total,
					payment_sessions: [],
					shipping_methods: [],
					created_at: date,
					updated_at: date,
					metadata: {},
				} as StoreCart;
			},
			cartIsEmpty: () => get().items.length === 0,
			cartTotal: () =>
				get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

			isProductInCart: id => get().items.some(i => i.variant.id === id),
		}),
		{
			name: "cart_ProsperityCandles",
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({
				items: state.items,
			}),
			onRehydrateStorage: () => (state, error) => {
				if (!error && state) {
					state.setHasInitializedCart(true);
				}
			},
		}
	)
);
