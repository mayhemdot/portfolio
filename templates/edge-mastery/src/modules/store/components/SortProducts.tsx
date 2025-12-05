"use client";

import { useTranslations } from "next-intl";
// import FilterRadioGroup from "@modules/common/components/filter-group"
import { parseAsString, useQueryState } from "nuqs";
import { FilterRadioGroup } from "@/modules/common/components/FilterGroup";

export type SortOptions = "price_asc" | "price_desc" | "created_at";

type SortProductsProps = {
  sortBy: SortOptions;
  "data-testid"?: string;
};

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

const SortProducts = ({ "data-testid": dataTestId, sortBy }: SortProductsProps) => {
  const [sortByParam, setSortByQueryParam] = useQueryState("sortBy", parseAsString.withDefault(sortBy));
  const t = useTranslations();

  const handleChange = (value: SortOptions) => {
    setSortByQueryParam(value, {
      shallow: false,
    });
  };

  return (
    <FilterRadioGroup
      title={t("sortProducts.sortByTitle")}
      items={sortOptions}
      value={sortByParam}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  );
};

export default SortProducts;
