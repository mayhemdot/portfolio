import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { StoreRegion } from "@/modules/common/lib/get-region-action";
import { useRegionStore } from "@/modules/common/store/region";
import { type StoreImage, StoreProduct, type StoreProductVariant } from "@/modules/products/types";

type RawItem = {
  id: string;
  variant: StoreProductVariant;
  images: StoreImage[] | undefined;
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
  addItem: (item: Omit<RawItem, "quantity" | "created_at" | "updated_at" | "id">) => void;
  updateQuantity: (variant_id: string, currency: string, qty: number) => void;
  removeItem: (variant_id: string, currency: string) => void;
  clear: () => void;
  getCartForCurrentRegion: () => StoreCart | null;
}

export interface CartLineItem {
  id: string;
  thumbnail: string;
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
  //   region_id: string;
  region: StoreRegion;
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

      addItem: (item) => {

         if(!item.variant.id || !item.currency) {
          throw new Error("[CartState:addItem]: variant.id and currency is required");
        }
        const items = get().items;
        const existing = items.find((i) => i.variant.id === item.variant.id && i.currency === item.currency);
        const date = new Date().toISOString();

        if (existing) {
          existing.quantity++;
          existing.updated_at = date;
          set({ items: [...items] });
        } else {
          set({
            items: [
              ...items,
              { ...item, id: `item_${crypto.randomUUID()}`, quantity: 1, updated_at: date, created_at: date },
            ],
          });
        }
      },
      updateQuantity: (item_id, currency, qty) => {
        if(!currency) {
          throw new Error("[CartState:updateQuantity]: currency is required");
        }
        if(!item_id) {
          throw new Error("[CartState:updateQuantity]: item_id is required");
        }
        if (qty <= 0) {
          get().removeItem(item_id, currency);
          return;
        }
       
        // console.log("item_id, currency, qty",);
        set({
          items: get().items.map((i) => (i.id === item_id && i.currency === currency ? { ...i, quantity:  Math.max(1, qty) } : i)),
        });
      },

      removeItem: (item_id, currency) => {
        if(!currency) {
          throw new Error("[CartState:removeItem]: currency is required");
        }
        if(!item_id) {
          throw new Error("[CartState:removeItem]: item_id is required");
        }

        const items = get().items.filter((i) => !(i.id === item_id && i.currency === currency));
        set({
          items: [...items],
        });
      },

      // updateQuantity: (variant_id, currency, qty) => {
      //   if (qty <= 0) {
      //     get().removeItem(variant_id, currency);
      //     return;
      //   }
      //   set({
      //     items: get().items.map((i) =>
      //       i.variant.id === variant_id && i.currency === currency ? { ...i, quantity: qty } : i,
      //     ),
      //   });
      // },

      // removeItem: (variant_id, currency) => {
      //   set({
      //     items: get().items.filter((i) => !(i.variant.id === variant_id && i.currency === currency)),
      //   });
      // },

      clear: () => set({ items: [] }),

      getCartForCurrentRegion: () => {
        const region = useRegionStore.getState().region;
        if (!region) return null;
       
        const regionItems = get().items.filter((i) => i.currency === region.currency_code);

        let subtotal = 0;
        let tax_total = 0;

        const enrichedItems = regionItems.map((item) => {
          const itemSubtotal = item.price * item.quantity;
          const tax = Math.round(itemSubtotal * region.tax_rate);

          subtotal += itemSubtotal;
          tax_total += tax;

          return {
            id: item.id, //`item_${crypto.randomUUID()}`,
            variant: item.variant,
            name: item.name,
            thumbnail: item?.images?.[0].url, //item.variant.product?.images?.[0].url || "",
            product_handle: item.variant.product?.handle,
            quantity: item.quantity,
            title: item.name,
            description: item.description,
            currency_code: item.currency,
            product_type: "knife", //item.product_type,
            unit_price: item.price,
            subtotal: itemSubtotal,
            total: itemSubtotal + tax,

            original_total: itemSubtotal,
            shipping_address: {},
            tax_lines: [
              {
                rate: region.tax_rate,
                name: "VAT",
                code: "vat",
                value: tax,
              },
            ],
            adjustments: [],
            created_at: item.created_at,
            updated_at: item.updated_at,
          } as CartLineItem;
        });

        const total = subtotal + tax_total;
        const date = new Date().toISOString();
        return {
          id: `cart_${crypto.randomUUID()}`,
          email: "",
          region: region,
          items: enrichedItems,
          subtotal,
          discount_total: 0,
          shipping_total: 0,
          gift_card_total: 0,
          //   currency_code: region.currency_code,
          tax_total,
          total,
          payment_sessions: [],
          shipping_methods: [],
          created_at: date,
          updated_at: date,
          metadata: {},
        } as StoreCart;
      },
    }),
    {
      name: "cart_v2",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);

// export const StoreCart = CartLineItem;
// // store.ts — zustand-store для корзины
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

// type CartItem = {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

// interface CartState {
//   cart: CartItem[];
//   totalQuantity: number;
//   totalPrice: number;
//   addToCart: (item: Omit<CartItem, "quantity">) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
// }

// export const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       cart: [],
//       totalQuantity: 0,
//       totalPrice: 0,
//       addToCart: (item) => {
//         const cart = get().cart;
//         const existing = cart.find((i) => i.id === item.id);

//         if (existing) {
//           set({
//             cart: cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
//           });
//         } else {
//           set({
//             cart: [...cart, { ...item, quantity: 1 }],
//           });
//         }

//         // После любого изменения — пересчитаем
//         const newCart = get().cart;
//         const totalQ = newCart.reduce((sum, i) => sum + i.quantity, 0);
//         const totalP = newCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
//         set({ totalQuantity: totalQ, totalPrice: totalP });
//       },
//       removeFromCart: (id) => {
//         const newCart = get().cart.filter((i) => i.id !== id);
//         set({ cart: newCart });

//         const totalQ = newCart.reduce((sum, i) => sum + i.quantity, 0);
//         const totalP = newCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
//         set({ totalQuantity: totalQ, totalPrice: totalP });
//       },
//       updateQuantity: (id, quantity) => {
//         const newCart = get().cart.map((i) => (i.id === id ? { ...i, quantity } : i));
//         set({ cart: newCart });

//         const totalQ = newCart.reduce((sum, i) => sum + i.quantity, 0);
//         const totalP = newCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
//         set({ totalQuantity: totalQ, totalPrice: totalP });
//       },
//       clearCart: () => {
//         set({ cart: [], totalQuantity: 0, totalPrice: 0 });
//       },
//     }),
//     {
//       name: "cart-storage", // имя в localStorage
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         cart: state.cart,
//       }), // не сохраняем методы
//     },
//   ),
// );

// export type StoreCart = CartState;
