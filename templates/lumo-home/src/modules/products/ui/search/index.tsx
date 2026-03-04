import { createLoader, parseAsString } from "nuqs/server";
import SearchDropdownMenu from "./search-dropdown-menu";

export const pageSearchParams = {
	query: parseAsString.withDefault("").withOptions({
		shallow: false,
	}),
};

export const loadSearchParams = createLoader(pageSearchParams);

export async function SearchInput() {
	return <SearchDropdownMenu />;
}
