import { parseAsFloat, parseAsString, useQueryStates } from "nuqs";
import { useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { Pagination } from "@/components/Pagination";
import { cn } from "@/lib/utils";
import type { StoreCategory, StoreProduct } from "@/modules/products/types";
import { MAX_PRICE, type Result } from "..";
import classes from "./../index.module.scss";

// import { SkeletonCard } from "@/app/(pages)/(public)/(home)/_old/product-gallery";

type Props = {
	docs: (StoreProduct | string | number)[];

	className: string;
	relationTo: string;
	populatedDocsTotal: number;
	categories?: StoreCategory[];
	populateBy?: string;
};

export function GridContent({
	docs,
	relationTo,
	populatedDocsTotal,
	populateBy,
	className,
	...rest
}: Props) {
	const [currentPage, setPage] = useState(1);

	const [pageInfo, _setPageInfo] = useQueryStates(
		{
			sort_by: parseAsString.withDefault("-updated_at"),
			page_size: parseAsFloat.withDefault(12),
			price_min: parseAsFloat.withDefault(0.0),
			price_max: parseAsFloat.withDefault(MAX_PRICE),
		},
		{
			history: "push",
		}
	);

	const filteredAndSortedDocs = useMemo(() => {
		if (!docs) return [];

		const filtered = docs.filter(doc => {
			if (!doc || typeof doc !== "object") return false;

			let max = 0;
			let min = Infinity;

			doc.variants?.forEach(variant => {
				const amount = variant.calculated_price?.calculated_amount ?? 0;
				max = Math.max(max, amount);
				min = Math.min(min, amount);
			});

			return min >= pageInfo.price_min * 100 && max <= pageInfo.price_max * 100;
		});

		const field = pageInfo.sort_by.replace(/^[-+]/, "");
		const direction = pageInfo.sort_by.startsWith("-") ? "desc" : "asc";

		return [...filtered].sort((a, b) => smartSort(a, b, field, direction));
	}, [docs, pageInfo.price_min, pageInfo.price_max, pageInfo.sort_by]);

	const initialData: Result = {
		docs: filteredAndSortedDocs,
		hasNextPage: false,
		hasPrevPage: false,
		nextPage: 1,
		page: 1,
		prevPage: 1,
		totalDocs: typeof populatedDocsTotal === "number" ? populatedDocsTotal : 0,
		totalPages: 1,
	};

	// if (isLoading || isPending) return <SkeletonCard />;

	return (
		<div className={className}>
			<div className={cn(classes.columns)}>
				{initialData.docs?.map(doc => {
					if (doc !== null && typeof doc === "object") {
						return (
							<div
								className={classes.column}
								key={`${relationTo}-card-item-${doc.id}`}
							>
								<Card product={doc} relationTo={relationTo} showCategories />
							</div>
						);
					}
					return null;
				})}
			</div>
			{initialData.totalPages > 1 && populateBy !== "selection" && (
				<Pagination
					className={classes.pagination}
					onClick={data => setPage(data)}
					page={currentPage}
					totalPages={initialData.totalPages}
				/>
			)}
		</div>
	);
}

function smartSort(
	a: any,
	b: any,
	field: string,
	direction: "asc" | "desc" = "asc"
) {
	const valueA = field.includes("price")
		? a?.variants?.[0].calculated_price?.calculated_amount
		: a[field];
	const valueB = field.includes("price")
		? b?.variants?.[0].calculated_price?.calculated_amount
		: b[field];

	// null / undefined в конец
	if (valueA == null && valueB == null) return 0;
	if (valueA == null) return 1;
	if (valueB == null) return -1;

	const type = determineType(valueA);
	let comparison = 0;

	switch (type) {
		case "number":
			comparison = Number(valueA) - Number(valueB);
			break;

		case "date":
			comparison = new Date(valueA).getTime() - new Date(valueB).getTime();
			break;

		case "string":
			comparison = String(valueA).localeCompare(String(valueB), "ru", {
				sensitivity: "base",
				numeric: true,
			});
			break;

		default:
			comparison = String(valueA).localeCompare(String(valueB));
	}
	const def = direction === "desc" ? -comparison : comparison;
	console.log(`def, comparison [${a.id}-${b.id}]`, def);
	return direction === "desc" ? -comparison : comparison;
}

// function smartSort(a: any, b: any, field: string, direction = "asc") {
// 	// Создаем копию массива, чтобы не мутировать оригинал

// 	const valueA = a[field];
// 	const valueB = b[field];

// 	// Если значения undefined или null - помещаем в конец
// 	if (valueA == null && valueB == null) return 0;
// 	if (valueA == null) return 1;
// 	if (valueB == null) return -1;

// 	// Определяем тип данных для корректного сравнения
// 	const type = determineType(valueA);

// 	let comparison = 0;

// 	switch (type) {
// 		case "date": {
// 			// Для дат преобразуем в timestamp
// 			const dateA = new Date(valueA).getTime();
// 			const dateB = new Date(valueB).getTime();

// 			if (dateA < dateB) comparison = -1;
// 			else if (dateA > dateB) comparison = 1;
// 			else comparison = 0;

// 			break;
// 		}

// 		case "number":
// 			// Для чисел
// 			comparison = Number(valueA) - Number(valueB);
// 			break;

// 		case "string":
// 			// Для строк - учитываем локаль для правильной сортировки
// 			comparison = String(valueA).localeCompare(String(valueB), "ru", {
// 				sensitivity: "base",
// 				numeric: true,
// 			});
// 			break;

// 		default:
// 			// Для остальных типов - преобразуем в строку
// 			comparison = String(valueA).localeCompare(String(valueB));
// 	}

// 	// Применяем направление сортировки
// 	return direction === "desc" ? -1 * comparison : comparison;
// }

/**
 * Определяет тип значения для корректной сортировки
 */
// function determineType(value: string | number | Date) {
// 	if (value instanceof Date || !isNaN(new Date(value).getTime())) {
// 		return "date";
// 	}
// 	if (!isNaN(Number(value)) && value !== "" && value !== null) {
// 		return "number";
// 	}
// 	if (typeof value === "string") {
// 		return "string";
// 	}
// 	return "other";
// }
function determineType(value: unknown) {
	if (typeof value === "number" && !isNaN(value)) {
		return "number";
	}

	if (value instanceof Date) {
		return "date";
	}

	if (typeof value === "string") {
		const timestamp = Date.parse(value);
		if (!isNaN(timestamp)) {
			return "date";
		}
		return "string";
	}

	return "other";
}
