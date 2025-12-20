// // Сделай мне каноничную страницу каталога из имеющихся о моем проекте данных. С  гридом из карточек и срава будет возможность

// import { Suspense } from "react";
// import {
// 	FilterProductCardWrapper,
// 	FilterProductsDrawerWrapper,
// } from "@/app/(pages)/(public)/products/FilterProductsWrapper";
// import RefinementList from "@/app/(pages)/(public)/products/RefinementList";
// import type { SortOptions } from "@/app/(pages)/(public)/products/SortProducts";
// // import type { SortOptions } from "../components/SortProducts";
// import { Pagination } from "@/components/ui/pagination";
// // import PaginationBlock from "@/components/elements/pagination-block/PaginationBlock";
// import { CATEGORIES } from "@/modules/categories/static";
// import SkeletonProductGrid from "@/modules/products/skeletons/SkeletonProductGrid";
// import { FilterProducts } from "./FilterProducts";

// // import { FilterProducts } from "../components/FilterProducts";
// // import {
// // 	FilterProductCardWrapper,
// // 	FilterProductsDrawerWrapper,
// // } from "../components/FilterProductsWrapper";

// // import {SortOptions}
// // import PaginatedProducts from "./paginated-products";

// const StoreTemplate = async ({
// 	sortBy,
// 	page,
// 	selectedCategories,
// 	priceBoundaries,
// 	maxPriceLimit,
// }: {
// 	selectedCategories: string[];
// 	sortBy?: SortOptions;
// 	page?: string;
// 	maxPriceLimit?: string;
// 	priceBoundaries?: { min?: string; max?: string };
// }) => {
// 	const pageNumber = page ? parseInt(page, 10) : 1;
// 	const sort = sortBy || "created_at";

// 	const categoryList = CATEGORIES?.map(category => ({
// 		id: category.id,
// 		key: category.id.toString(),
// 		label: category.name,
// 		handle: category.handle,
// 	}));

// 	const selectedCategoryList = selectedCategories
// 		?.map(handle => categoryList.find(c => c.handle === handle)?.id)
// 		.filter(Boolean) as string[];

// 	// const currency = region?.currency_code || "USD";
// 	// console.log("maxPriceLimit", currency);

// 	return (
// 		<div className='mx-auto flex h-full w-full flex-col gap-6 py-4 xl:flex-row xl:gap-8'>
// 			<div className='hidden h-fit w-fit grow-0 rounded-xl md:max-w-xs xl:flex xl:basis-1/4 2xl:max-w-md'>
// 				<FilterProductCardWrapper>
// 					<FilterProducts
// 						currency={"ru"}
// 						categories={categoryList}
// 						maxPriceLimit={maxPriceLimit}
// 					/>
// 				</FilterProductCardWrapper>
// 			</div>

// 			<div className='flex h-full shrink-0 flex-col justify-between xl:flex-1 xl:basis-3/4'>
// 				<div className='mb-4 flex items-center justify-between gap-2 xl:mb-6 xl:gap-4'>
// 					<FilterProductsDrawerWrapper>
// 						<FilterProducts
// 							currency={"ru"}
// 							categories={categoryList}
// 							maxPriceLimit={maxPriceLimit}
// 						/>
// 					</FilterProductsDrawerWrapper>

// 					<RefinementList sortBy={sort} />
// 				</div>
// 				<Suspense fallback={<SkeletonProductGrid />}>
// 					{/* <PaginatedProducts
// 						isWishlisted={isWishlisted}
// 						selectedCategories={selectedCategoryList}
// 						sortBy={sort}
// 						page={pageNumber}
// 						locale={locale as Locale}
// 						priceBoundaries={priceBoundaries}
// 					/> */}
// 					<Pagination
// 						// selectedCategories={selectedCategoryList}
// 						sortBy={sort}
// 						page={pageNumber}
// 						priceBoundaries={priceBoundaries}
// 					/>
// 				</Suspense>
// 			</div>
// 		</div>
// 	);
// };

// export default StoreTemplate;
