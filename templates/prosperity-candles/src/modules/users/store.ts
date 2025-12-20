import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { User } from "./types";

type UserState = {
	user: User | null;
	setUser: (user: User | null) => void;
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
};

export const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			user: null,
			setUser: user => set({ user }),
			isLoading: false,
			setIsLoading: isLoading => set({ isLoading }),
		}),
		{
			name: "users_ProsperityCandles",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
