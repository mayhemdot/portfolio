import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, ProductRaw } from "@/modules/products/model/types";

// Уточнённый тип, содержащий только нужные поля продукта
type ProductInCart = Pick<
	ProductRaw,
	"id" | "title" | "price" | "images" | "slug"
>;

export interface CartItem {
	product: ProductInCart;
	quantity: number;
	id: string; // может быть ID вариации товара, если используешь вариации
}

interface CartState {
	cartItems: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearCart: () => void;
	isCartEmpty: () => boolean;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			cartItems: [],
			addItem: (newItem: CartItem) =>
				set(state => {
					if (state.cartItems.find(i => i.id === newItem.id)) {
						return {
							cartItems: state.cartItems.map(ci =>
								ci.id === newItem.id
									? { ...ci, quantity: ci.quantity + newItem.quantity }
									: ci
							),
						};
					} else {
						return { cartItems: [...state.cartItems, newItem] };
					}
				}),

			removeItem: (id: string) =>
				set(state => ({
					cartItems: state.cartItems.filter(item => item.id !== id),
				})),

			updateQuantity: (id, quantity) =>
				set(state => ({
					cartItems: state.cartItems.map(item =>
						item.id === id ? { ...item, quantity } : item
					),
				})),

			clearCart: () => set({ cartItems: [] }),
			isCartEmpty: () => get().cartItems.length === 0,
		}),
		{
			name: "cart-storage",
		}
	)
);
