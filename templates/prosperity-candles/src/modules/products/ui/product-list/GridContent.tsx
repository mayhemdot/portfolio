import {
	parseAsArrayOf,
	parseAsFloat,
	parseAsString,
	useQueryStates,
} from "nuqs";
import { useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { Pagination } from "@/components/Pagination";
import { Text } from "@/components/Text";
import { PRODUCT_INFO } from "@/modules/products/data";
import type { StoreCategory, StoreProduct } from "@/modules/products/types";
import type { Result } from "../../../../components/CollectionArchive";

type Props = {
	docs: (StoreProduct | string | number)[];
	className?: string;
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
			price_min: parseAsFloat.withDefault(PRODUCT_INFO.MIN_PRICE),
			price_max: parseAsFloat.withDefault(PRODUCT_INFO.MAX_PRICE),
			categories: parseAsArrayOf(parseAsString).withDefault([]),
		},
		{
			history: "push",
		}
	);

	const filteredAndSortedDocs = useMemo(() => {
		if (!docs) return [];

		let filtered = docs.filter(doc => {
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

		if (pageInfo.categories?.length) {
			filtered = filtered.filter(doc => {
				if (!doc || typeof doc !== "object") return false;
				return pageInfo.categories?.some(cat =>
					doc.categories?.map(c => c.handle).includes(cat)
				);
			});
		}

		const field = pageInfo.sort_by.replace(/^[-+]/, "");
		const direction = pageInfo.sort_by.startsWith("-") ? "desc" : "asc";

		return [...filtered].sort((a, b) => smartSort(a, b, field, direction));
	}, [
		docs,
		pageInfo.categories,
		pageInfo.price_min,
		pageInfo.price_max,
		pageInfo.sort_by,
	]);

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
		<>
			{(initialData.docs?.length || 0) > 0 ? (
				<div
					className={
						"grid auto-rows-auto grid-cols-[repeat(2,minmax(0,0.9fr))] place-content-start gap-2 sm:gap-4 md:grid-cols-[repeat(auto-fit,minmax(170px,calc(33.33%-16px)))] md:gap-6 lg:grid-cols-[repeat(auto-fit,minmax(210px,calc(25%-24px)))] lg:gap-8"
					}
				>
					{initialData.docs
						.filter(doc => doc !== null && typeof doc === "object")
						.map(doc => (
							<div key={`${relationTo}-card-item-${doc.id}`}>
								<Card product={doc} relationTo={relationTo} showCategories />
							</div>
						))}
				</div>
			) : (
				<div className='bg-card mx-auto rounded-3xl p-8'>
					<Text comp='h2' variant='primary' size='lg' className='text-center'>
						Ничего не найдено
					</Text>
				</div>
			)}
			{initialData.totalPages > 1 && populateBy !== "selection" && (
				<Pagination
					onClick={data => setPage(data)}
					page={currentPage}
					totalPages={initialData.totalPages}
				/>
			)}
		</>
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

	return direction === "desc" ? -comparison : comparison;
}

function determineType(value: unknown) {
	if (typeof value === "number" && !isNaN(value)) {
		return "number";
	}

	if (value instanceof Date) {
		return "date";
	}

	if (typeof value === "string") {
		if (!isNaN(Date.parse(value))) {
			return "date";
		}
		return "string";
	}

	return "other";
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
