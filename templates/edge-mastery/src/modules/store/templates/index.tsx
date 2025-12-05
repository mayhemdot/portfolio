import { Suspense } from "react";
import type { Locale } from "next-intl";
import { listCategories } from "@/modules/categories/actions";
import { getCountryCodeFromLocale } from "@/modules/common/lib/get-region";
import { getRegion } from "@/modules/common/lib/get-region-action";
import SkeletonProductGrid from "@/modules/products/skeletons/SkeletonProductGrid";
import { FilterProducts } from "../components/FilterProducts";
import {
	FilterProductCardWrapper,
	FilterProductsDrawerWrapper,
} from "../components/FilterProductsWrapper";
import RefinementList from "../components/RefinementList";
import type { SortOptions } from "../components/SortProducts";
import PaginatedProducts from "./paginated-products";

const StoreTemplate = async ({
	sortBy,
	page,
	locale,
	selectedCategories,
	priceBoundaries,
	maxPriceLimit,
	isWishlisted,
}: {
	locale: Locale;
	selectedCategories: string[];
	sortBy?: SortOptions;
	page?: string;
	maxPriceLimit?: string;
	priceBoundaries?: { min?: string; max?: string };
	isWishlisted: boolean;
}) => {
	const pageNumber = page ? parseInt(page, 10) : 1;
	const sort = sortBy || "created_at";

	const categoryList = await listCategories(locale, true);

	const selectedCategoryList = selectedCategories
		?.map(handle => categoryList.find(c => c.handle === handle)?.id)
		.filter(Boolean) as string[];

	const countryCode = getCountryCodeFromLocale(locale);
	const region = await getRegion(countryCode);
	const currency = region?.currency_code || "USD";
	// console.log("maxPriceLimit", currency);

	return (
		<div className='mx-auto flex h-full w-full flex-col gap-6 py-4 xl:flex-row xl:gap-8'>
			<div className='hidden h-fit w-fit grow-0 rounded-xl md:max-w-xs xl:flex xl:basis-1/4 2xl:max-w-md'>
				<FilterProductCardWrapper>
					<FilterProducts
						currency={currency}
						categories={categoryList}
						maxPriceLimit={maxPriceLimit}
					/>
				</FilterProductCardWrapper>
			</div>

			<div className='flex h-full shrink-0 flex-col justify-between xl:flex-1 xl:basis-3/4'>
				<div className='mb-4 flex items-center justify-between gap-2 xl:mb-6 xl:gap-4'>
					<FilterProductsDrawerWrapper>
						<FilterProducts
							currency={currency}
							categories={categoryList}
							maxPriceLimit={maxPriceLimit}
						/>
					</FilterProductsDrawerWrapper>

					<RefinementList sortBy={sort} />
				</div>
				<Suspense fallback={<SkeletonProductGrid />}>
					<PaginatedProducts
						isWishlisted={isWishlisted}
						selectedCategories={selectedCategoryList}
						sortBy={sort}
						page={pageNumber}
						locale={locale as Locale}
						priceBoundaries={priceBoundaries}
					/>
				</Suspense>
			</div>
		</div>
	);
};

export default StoreTemplate;
