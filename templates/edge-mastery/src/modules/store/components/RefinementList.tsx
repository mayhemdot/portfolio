"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import SortProducts, { type SortOptions } from "./SortProducts";

type RefinementListProps = {
  sortBy: SortOptions;
  search?: boolean;
  "data-testid"?: string;
};

const RefinementList = ({ sortBy, "data-testid": dataTestId }: RefinementListProps) => {
  return <SortProducts sortBy={sortBy} data-testid={dataTestId} />;
};

export default RefinementList;
