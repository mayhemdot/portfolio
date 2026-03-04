"use client";

import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";
import type { LocaleCode } from "@/i18n/localization";
import { getProductsWhere } from "@/modules/products/queries/getProducts";
import { Card } from "@/shared/components/Card";
import { PageRange } from "@/shared/components/PageRange";
import { Pagination } from "@/shared/components/Pagination";
import { Text } from "@/shared/components/Text";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";

export function ProductClient({ locale }: { locale: LocaleCode }) {
	const [sortBy, _s] = useQueryState("sort", parseAsString.withDefault(""));
	const [search, _q] = useQueryState("q", parseAsString.withDefault(""));
	const [page, _p] = useQueryState("page", parseAsString.withDefault("1"));

	const [debouncedSearch] = useDebounce(search, 500);

	const {
		docs: products,
		totalDocs,
		page: currentPage,
		totalPages = 1,
		limit,
	} = useMemo(
		() =>
			getProductsWhere({
				search: debouncedSearch,
				sortBy,
				page,
				localeCode: locale,
			}) || {},
		[sortBy, debouncedSearch, page, locale],
	);

	return (
		<>
			<div className='fl-gap-4/20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{products?.map(product => (
					<Card
						key={product.id}
						doc={product.raw}
						relationTo='products'
						locale={locale}
					/>
				))}
			</div>
			<div className='mb-32 mt-auto flex items-center justify-between gap-16'>
				{totalPages > 1 && currentPage && (
					<Pagination page={currentPage} totalPages={totalPages} />
				)}
				<PageRange
					collection='products'
					currentPage={currentPage}
					limit={limit}
					totalDocs={totalDocs}
				/>
			</div>
		</>
	);
}

export function SearchAndSort() {
	const tGlob = useTranslations("Global");

	const [sortBy, setSortBy] = useQueryState(
		"sort",
		parseAsString.withDefault("popular"),
	);

	return (
		<section className='bg-secondary fl-px-12/24 fl-py-8/16 flex  w-fit items-center justify-between rounded-full'>
			<div className='flex items-center gap-2 '>
				<Select onValueChange={setSortBy} defaultValue={sortBy}>
					<SelectTrigger className='md:w-50 bg-background! w-36'>
						<SelectValue
							placeholder='Select a verified email to display'
							defaultValue={sortBy}
						/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={"popular"}>
							<Text comp='span' variant={"secondary"}>
								{tGlob("Sort.byPopularity")}
							</Text>
						</SelectItem>
						<SelectItem value={"price"}>
							<Text comp='span' variant={"secondary"}>
								{tGlob("Sort.lowToHigh")}
							</Text>
						</SelectItem>
						<SelectItem value={"-price"}>
							<Text comp='span' variant={"secondary"}>
								{tGlob("Sort.highToLow")}
							</Text>
						</SelectItem>
						{/* <SelectItem value={"rating"}>{tGlob("Sort.byRating")}</SelectItem> */}
					</SelectContent>
				</Select>
			</div>
		</section>
	);
}
