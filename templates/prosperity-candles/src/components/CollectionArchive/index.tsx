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
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/modules/categories/static";
import { PRODUCTS } from "@/modules/products/queries";
import type { StoreCategory, StoreProduct } from "@/modules/products/types";
import classes from "./index.module.scss";
import { CatalogFilterMobile } from "./ui/CatalogFilterMobile";
import { GridContent } from "./ui/GridContent";
import { SliderContent } from "./ui/SliderContent";

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
export type PriceLimits = { min: number; max: number };

const PAGE_SIZE_LIST: number[] = [12, 24, 64, 128];

const SORT_OPTIONS = [
	{ value: "-updated_at", label: "По дате ↓" },
	{ value: "updated_at", label: "По дате ↑" },
	{ value: "title", label: "По названию" },
	{ value: "-price", label: "По цене ↓" },
	{ value: "price", label: "По цене ↑" },
];

export const MAX_PRICE =
	PRODUCTS.reduce((max, product) => {
		product.variants?.forEach(variant => {
			const amount = variant.calculated_price?.calculated_amount ?? 0;
			if (amount > max) {
				max = amount;
			}
		});
		return max;
	}, 0) / 100;

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
		limits: { min: 0, max: MAX_PRICE },
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
		<div className={cn(classes.collectionArchive, className)}>
			<div className={classes.scrollRef} ref={scrollRef} />
			{!slider ? (
				<div className='flex justify-between'>
					<CatalogFilterMobile categories={categories} limits={limits} />
					<div className='max-w-96 mb-4 ml-auto flex items-center gap-4'>
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
					className={"flex-auto"}
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
