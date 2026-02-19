import { createLoader, parseAsString } from "nuqs/server";
// import SearchInputClient from "./search-popup";
import SearchDropdownMenu from "./search-dropdown-menu";

export const pageSearchParams = {
	query: parseAsString.withDefault("").withOptions({
		shallow: false,
	}),
};

export const loadSearchParams = createLoader(pageSearchParams);

type Props = {
	searchParams?: Promise<{ [key: string]: string | string[] }>;
};

export async function SearchInput({ searchParams }: Props) {
	return <SearchDropdownMenu />;
}
