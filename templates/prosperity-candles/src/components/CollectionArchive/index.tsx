"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import type React from "react";
import { useRef } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { CATEGORIES } from "@/modules/categories/static";
import { SORT_OPTIONS } from "@/modules/orders/constants";
import { PRODUCT_INFO, PRODUCTS } from "@/modules/products/data";
import type { StoreCategory, StoreProduct } from "@/modules/products/types";
import { CatalogFilterMobile } from "../../modules/products/ui/product-list/CatalogFilterMobile";
import { GridContent } from "../../modules/products/ui/product-list/GridContent";
import { SliderContent } from "../../modules/products/ui/product-list/SliderContent";

export type Result = {
	docs: (StoreProduct | string | number)[];
	hasNextPage: boolean;
	hasPrevPage: boolean;
	nextPage: number;
	page: number;
	prevPage: number;
	totalDocs: number;
	totalPages: number;
};

export type Props = {
	className?: string;
	limit?: number;
	docs?: StoreProduct[];
	// eslint-disable-line no-unused-vars
	onResultChange?: (result: Result) => void;
	slider?: boolean;
	relationTo: "products" | "categories";
	showPageRange?: boolean;
	sort?: string;
};

const PAGE_SIZE_LIST: number[] = [12, 24, 64, 128];

export const CollectionArchive: React.FC<Props> = props => {
	const {
		className,
		slider = false,
		relationTo,
		sort = "-updated_at",
		docs,
	} = props;

	const scrollRef = useRef<HTMLDivElement>(null);
	const currentDocs: (StoreProduct | string | number)[] = docs || [];

	const { limits, isLoading, isSuccess } = {
		limits: { min: PRODUCT_INFO.MIN_PRICE, max: PRODUCT_INFO.MAX_PRICE },
		isLoading: false,
		isSuccess: true,
	};

	const categories: StoreCategory[] = CATEGORIES;
	const [sortBy, setSortBy] = useQueryStates(
		{
			sort_by: parseAsString.withDefault(sort),
			page_size: parseAsInteger.withDefault(PAGE_SIZE_LIST[0]),
		},
		{
			history: "push",
		}
	);

	// if (isLoadingPrice) return <SkeletonCard className={''} />

	return (
		<div className={className}>
			<div ref={scrollRef} />
			{!slider ? (
				<div className='mb-4 flex justify-between'>
					<CatalogFilterMobile categories={categories} limits={limits} />
					<div className='max-w-96 ml-auto flex items-center gap-4'>
						<Select
							name='pageSize'
							defaultValue={String(PAGE_SIZE_LIST[0])}
							onValueChange={(value: string) => {
								setSortBy({ page_size: parseInt(value, 10) });
							}}
						>
							<SelectTrigger
								className={"fsSmall bg-beige-color h-12 rounded-2xl"}
							>
								<SelectValue placeholder='Выберите размер страницы' />
							</SelectTrigger>
							<SelectContent className={"bg-beige-color"}>
								{PAGE_SIZE_LIST?.map(sm => (
									<SelectItem key={sm} value={String(sm)} className='fsSmall'>
										Показывать: {sm}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select
							name='sort'
							defaultValue={sortBy.sort_by}
							onValueChange={(value: string) => setSortBy({ sort_by: value })}
						>
							<SelectTrigger
								className={"fsSmall bg-beige-color h-12 rounded-2xl"}
							>
								<SelectValue placeholder='Выберите сортировку' />
							</SelectTrigger>
							<SelectContent className={"bg-beige-color"}>
								{SORT_OPTIONS?.map(sm => (
									<SelectItem
										key={sm.label}
										value={sm.value}
										className='fsSmall'
									>
										{sm.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			) : null}

			{/* "Показать нумерацию" */}
			{!slider ? (
				<GridContent
					docs={currentDocs}
					relationTo={relationTo}
					categories={categories}
					populatedDocsTotal={currentDocs.length || 0}
				/>
			) : (
				<SliderContent
					docs={currentDocs}
					relationTo={relationTo}
					sort={sort}
					categories={categories}
				/>
			)}
		</div>
	);
};
