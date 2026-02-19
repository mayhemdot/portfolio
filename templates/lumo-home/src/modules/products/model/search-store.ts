import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SearchHistoryItem = {
	id?: number;
	term: string;
	date: string;
};

interface SearchHistoryState {
	historyByLocale: Record<string, SearchHistoryItem[]>;
	getItems: (locale: string) => SearchHistoryItem[];
	addTerm: (term: string, locale: string) => void;
	removeTerm: (term: string, locale: string) => void;
	clear: (locale: string) => void;
}

const MAX_ITEMS = 10;

export const useSearchHistoryStore = create<SearchHistoryState>()(
	persist(
		(set, get) => ({
			historyByLocale: {},
			getItems: (locale: string) => {
				return get().historyByLocale[locale] || [];
			},
			addTerm: (rawTerm: string, locale: string) => {
				const term = rawTerm.trim();

				if (!term || !locale) return;

				const currentItems = get().historyByLocale[locale] || [];
				const withoutCurrent = currentItems.filter(item => item.term !== term);

				const nextItems: SearchHistoryItem[] = [
					{ term, date: new Date().toISOString() },
					...withoutCurrent,
				].slice(0, MAX_ITEMS);

				set(state => ({
					historyByLocale: {
						...state.historyByLocale,
						[locale]: nextItems,
					},
				}));
			},
			removeTerm: (rawTerm: string, locale: string) => {
				const term = rawTerm.trim();

				if (!term || !locale) return;

				const currentItems = get().historyByLocale[locale] || [];

				set(state => ({
					historyByLocale: {
						...state.historyByLocale,
						[locale]: currentItems.filter(item => item.term !== term),
					},
				}));
			},
			clear: (locale: string) => {
				if (!locale) return;

				set(state => ({
					historyByLocale: {
						...state.historyByLocale,
						[locale]: [],
					},
				}));
			},
		}),
		{
			name: "search-history",
		},
	),
);
