// wishlistStore.ts — zustand-store для wishlist (список желаний)

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { StoreProductVariant } from "@/modules/products/types";

type WishlistItem = {
  id: string;
  product_variant: StoreProductVariant;

  name: string;
  price: number;
};

interface WishlistState {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (item) => {
        const list = get().wishlist;
        const exists = list.find((i) => i.id === item.id);
        if (!exists) {
          set({ wishlist: [...list, item] });
        }
      },
      removeFromWishlist: (id) => {
        set({
          wishlist: get().wishlist.filter((i) => i.id !== id),
        });
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ wishlist: state.wishlist }),
      version: 1,
    },
  ),
);
