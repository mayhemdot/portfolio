"use client";
import { parseAsString, useQueryState } from "nuqs";

export type SortOptions = "price_asc" | "price_desc" | "created_at";

type SortProductsProps = {
	sortBy: SortOptions;
	"data-testid"?: string;
};

// const SORT_OPTIONS = [
// 	{ value: "-updatedAt", label: "По дате ↓" },
// 	{ value: "updatedAt", label: "По дате ↑" },
// 	{ value: "title", label: "По названию" },
// 	{ value: "-variations.stripePriceUnitAmount", label: "По цене ↓" },
// 	{ value: "variations.stripePriceUnitAmount", label: "По цене ↑" },
// ];
const sortOptions = [
	{
		value: "created_at",
		label: "Latest Arrivals",
	},
	{
		value: "price_asc",
		label: "Price: Low -> High",
	},
	{
		value: "price_desc",
		label: "Price: High -> Low",
	},
];

const SortProducts = ({
	"data-testid": dataTestId,
	sortBy,
}: SortProductsProps) => {
	const [sortByParam, setSortByQueryParam] = useQueryState(
		"sortBy",
		parseAsString.withDefault(sortBy)
	);

	const handleChange = (value: SortOptions) => {
		setSortByQueryParam(value, {
			shallow: false,
		});
	};

	return (
		// <FilterRadioGroup
		// 	title={t("sortProducts.sortByTitle")}
		// 	items={sortOptions}
		// 	value={sortByParam}
		// 	handleChange={handleChange}
		// 	data-testid={dataTestId}
		// />
		<div></div>
	);
};

export default SortProducts;
