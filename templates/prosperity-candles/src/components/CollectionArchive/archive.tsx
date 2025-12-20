"use client";

import qs from "qs";
import type React from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { StoreProduct } from "@/modules/products/types";
import { Card } from "../Card";
import { Gutter } from "../Gutter";
import { PageRange } from "../PageRange";
import { Pagination } from "../Pagination";
import SwiperSlider from "../SwiperSlider";
import classes from "./index.module.scss";

type Result = {
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
	categories?: { id: string; name: string; slug: string }[];
	className?: string;
	limit?: number;
	onResultChange?: (result: Result) => void; // eslint-disable-line no-unused-vars
	slider: boolean;
	docs: (StoreProduct | string | number)[];
	// custom property
	// populateBy?: "collection" | "selection";
	// populatedDocs?: ArchiveBlockProps["populatedDocs"];
	// populatedDocsTotal?: ArchiveBlockProps["populatedDocsTotal"];
	relationTo?: "products";
	// selectedDocs?: ArchiveBlockProps["selectedDocs"];
	showPageRange?: boolean;
	sort?: string;
};

export const CollectionArchive: React.FC<Props> = props => {
	const {
		categories: catsFromProps,
		className,
		limit = 10,
		slider = false,
		onResultChange,
		docs,
		showPageRange,
		relationTo = "products",
		sort = "-createdAt",
	} = props;

	const [results, setResults] = useState<Result>({
		docs: docs as StoreProduct[],
		hasNextPage: false,
		hasPrevPage: false,
		nextPage: 1,
		page: 1,
		prevPage: 1,
		totalDocs: docs.length || 0,
		totalPages: 1,
	});

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | undefined>(undefined);
	const scrollRef = useRef<HTMLDivElement>(null);
	const hasHydrated = useRef(false);
	const isRequesting = useRef(false);
	const [page, setPage] = useState(1);

	const categories = (catsFromProps || [])
		.map(cat => (typeof cat === "object" ? cat?.id : cat))
		.join(",");

	// const scrollToRef = useCallback(() => {
	// 	const { current } = scrollRef;
	// 	if (current) {
	// 		// current.scrollIntoView({
	// 		//   behavior: 'smooth',
	// 		// })
	// 	}
	// }, []);

	// useEffect(() => {
	// 	if (!isLoading && typeof results.page !== "undefined") {
	// 		// scrollToRef()
	// 	}
	// }, [isLoading, scrollToRef, results]);

	// useEffect(() => {
	// 	let timer: NodeJS.Timeout | null = null;

	// 	if (populateBy === "collection" && !isRequesting.current) {
	// 		isRequesting.current = true;

	// 		// hydrate the block with fresh content after first render
	// 		// don't show loader unless the request takes longer than x ms
	// 		// and don't show it during initial hydration
	// 		timer = setTimeout(() => {
	// 			if (hasHydrated.current) {
	// 				setIsLoading(true);
	// 			}
	// 		}, 500);

	// 		const searchQuery = qs.stringify(
	// 			{
	// 				depth: 1,
	// 				limit,
	// 				page,
	// 				sort,
	// 				where: {
	// 					"variations.stock": {
	// 						greater_than: 0,
	// 					},
	// 					...(categories
	// 						? {
	// 								categories: {
	// 									in: categories,
	// 								},
	// 						  }
	// 						: {}),
	// 				},
	// 			},
	// 			{ encode: false }
	// 		);

	// 		// const makeRequest = async () => {
	// 		// 	try {
	// 		// 		const req = await fetch(
	// 		// 			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/${relationTo}?${searchQuery}`
	// 		// 		);

	// 		// 		const json = await req.json();
	// 		// 		timer && clearTimeout(timer);

	// 		// 		const { docs } = json as { docs: Product[] };

	// 		// 		if (docs && Array.isArray(docs)) {
	// 		// 			setResults(json);
	// 		// 			setIsLoading(false);
	// 		// 			if (typeof onResultChange === "function") {
	// 		// 				onResultChange(json);
	// 		// 			}
	// 		// 		}
	// 		// 	} catch (err) {
	// 		// 		console.warn(err); // eslint-disable-line no-console
	// 		// 		setIsLoading(false);
	// 		// 		setError(`Unable to load "${relationTo} archive" data at this time.`);
	// 		// 	}

	// 		// 	isRequesting.current = false;
	// 		// 	hasHydrated.current = true;
	// 		// };

	// 		// void makeRequest();
	// 	}

	// 	return () => {
	// 		if (timer) clearTimeout(timer);
	// 	};
	// }, [page, categories, sort, limit, populateBy]);

	return (
		<div className={cn(classes.collectionArchive, className)}>
			<div className={classes.scrollRef} ref={scrollRef} />
			{!isLoading && error && <Gutter>{error}</Gutter>}

			{/* "Показать нумерацию" */}
			{showPageRange !== false && (
				<div
					className={cn(classes.pageRange, "flex w-full justify-end text-xs")}
				>
					<PageRange
						collection={relationTo}
						currentPage={results.page}
						limit={limit}
						totalDocs={results.totalDocs}
					/>
				</div>
			)}
			{isLoading ? (
				<SkeletonCard />
			) : (
				<>
					{/* Показать сетку или слайдер */}
					{!slider ? (
						<div className={"grid-cols-fluid grid gap-4"}>
							{results.docs?.map((result, index) => {
								if (typeof result === "object" && result !== null) {
									return (
										<div className={classes.column} key={index.toString()}>
											<Card
												product={result}
												relationTo={relationTo}
												showCategories
											/>
										</div>
									);
								}
								return null;
							})}
						</div>
					) : (
						<SwiperSlider relationTo={"products"} docs={results.docs} />
					)}
					{/* && populateBy !== "selection" */}
					{results.totalPages > 1 && (
						<Pagination
							className={classes.pagination}
							onClick={setPage}
							page={results.page}
							totalPages={results.totalPages}
						/>
					)}
				</>
			)}
		</div>
	);
};
function SkeletonCard() {
	return (
		<div className={"grid-cols-fluid grid gap-4"}>
			<div>1</div>
			<div>2</div>
			<div>3</div>
			{/* <SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard /> */}
		</div>
	);
}
