// cartStore.ts

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRegionStore } from "@/modules/common/store/region";

// import { useRegionStore } from "./regionStore"; // импорт региона

type CartItem = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  images: { url: string; id: string }[];
  created_at?: string;
  updated_at?: string;
};

interface CartState {
  items: CartItem[];
  shippingCost: number;

  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, currency: string) => void;
  updateQuantity: (id: string, currency: string, quantity: number) => void;
  clearCart: () => void;

  recalcShipping: () => void;

  getItemsForCurrentRegion: () => CartItem[];
  getTotalPriceForRegion: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      shippingCost: 0,

      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id && i.currency === item.currency);
        if (existing) {
          existing.updated_at = new Date().toISOString();
          set({
            items: get().items.map((i) =>
              i.id === item.id && i.currency === item.currency ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          });
        } else {
          item.created_at = new Date().toISOString();
          item.updated_at = new Date().toISOString();
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
        get().recalcShipping();
      },

      removeItem: (id, currency) => {
        console.log("id, currency", id, currency);
        const items = get().items.filter((item) => {
          console.log(`item.id ${item.id} && id: ${id}`);
          return get().items.filter((item) => !(item.id === id && item.currency === currency));
        });

        set({
          items: [...items],
        });
        get().recalcShipping();
      },

      updateQuantity: (id, currency, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, currency);
        } else {
          set({
            items: get().items.map((i) => (i.id === id && i.currency === currency ? { ...i, quantity } : i)),
          });
        }
        get().recalcShipping();
      },

      clearCart: () => {
        set({ items: [] });
        get().recalcShipping();
      },

      recalcShipping: () => {
        const region = useRegionStore.getState().region;
        let cost = 0;
        if (!region)
          cost = 10; // дефолтная доставка
        else if (region.currency_code === "eur") cost = 5;
        else if (region.currency_code === "usd") cost = 20;
        else if (region.currency_code === "rub") cost = 15;
        else cost = 10;
        set({ shippingCost: cost });
      },

      getItemsForCurrentRegion: () => {
        const region = useRegionStore.getState().region;
        if (!region) return [];
        return get().items.filter((i) => i.currency === region.currency_code);
      },

      getTotalPriceForRegion: () => {
        const region = useRegionStore.getState().region;
        if (!region) return 0;
        return get()
          .items.filter((i) => i.currency === region.currency_code)
          .reduce((sum, i) => sum + i.price * i.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        shippingCost: state.shippingCost,
      }),
      version: 1,
    },
  ),
);

// // store.ts
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

// type CartItem = {
//   id: string;
//   name: string;
//   price: number; // цена в базовой валюте
//   quantity: number;
// };

// interface CartState {
//   cart: CartItem[];
//   country: string; // страна пользователя, например "NL", "DE", "US"
//   shippingCost: number; // стоимость доставки, вычисляемая в зависимости от страны
//   currencyRate: number; // курс валюты к базовой (если нужен)

//   setCountry: (country: string) => void;
//   recalcShipping: () => void; // пересчитывает shippingCost на основе страны
//   addToCart: (item: Omit<CartItem, "quantity">) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;

//   totalQuantity: number;
//   totalPrice: number; // цена без доставки
//   totalPriceWithShipping: number; // цена + доставка
// }

// export const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       cart: [],
//       country: "ru", // можно дефолтную страну
//       shippingCost: 0,
//       currencyRate: 1,

//       setCountry: (country) => {
//         set({ country });
//         get().recalcShipping();
//       },

//       recalcShipping: () => {
//         const country = get().country;
//         // пример простой логики: разная доставка по разным странам
//         const cost = 0;
//         // if (country === "NL") cost = 5;
//         // else if (country === "DE") cost = 8;
//         // else if (country === "US") cost = 20;
//         // else cost = 10;

//         set({ shippingCost: cost });
//       },

//       addToCart: (item) => {
//         const cart = get().cart;
//         const existing = cart.find((i) => i.id === item.id);
//         if (existing) {
//           set({
//             cart: cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
//           });
//         } else {
//           set({ cart: [...cart, { ...item, quantity: 1 }] });
//         }
//         // пересчитаем
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

//       totalQuantity: 0,
//       totalPrice: 0,
//       totalPriceWithShipping: 0,
//     }),
//     {
//       name: "cart-storage",
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         cart: state.cart,
//         country: state.country,
//         shippingCost: state.shippingCost,
//       }),
//       version: 1,
//     },
//   ),
// );
