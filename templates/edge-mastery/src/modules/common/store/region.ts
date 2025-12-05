import type { Locale } from "next-intl";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getRegion, type StoreRegion } from "../lib/get-region-action";

interface RegionState {
  region: StoreRegion | null;
  setRegion: (region: StoreRegion) => void;
}

export const useRegionStore = create<RegionState>()(
  persist(
    (set) => ({
      region: null,
      setRegion: (region) => set({ region }),
    }),
    {
      name: "region-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ region: state.region }),
      version: 1,
    },
  ),
);
