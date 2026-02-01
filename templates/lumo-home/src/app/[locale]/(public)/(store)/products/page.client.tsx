"use client";

import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";
import type { LocaleCode } from "@/i18n/localization";
import { getProductsWhere } from "@/modules/products/queries/getProducts";
import { Card } from "@/shared/components/Card";
import { PageRange } from "@/shared/components/PageRange";
import { Pagination } from "@/shared/components/Pagination";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export function ProductClient() {
  const [sortBy, _s] = useQueryState("sort", parseAsString.withDefault(""));
  const [search, _q] = useQueryState("q", parseAsString.withDefault(""));
  const [page, _p] = useQueryState("page", parseAsString.withDefault("1"));

  const localeCode = useLocale() as LocaleCode;
  const t = useTranslations("Products");
  const [debouncedSearch] = useDebounce(search, 500);

  const data = useMemo(
    () => getProductsWhere({ search: debouncedSearch, sortBy, page, localeCode }),
    [sortBy, debouncedSearch, page, localeCode],
  );

  const {
    docs: products,
    totalDocs,
    page: currentPage,
    totalPages = 1,
    limit,
  } = data || {};

  return (
    <div className="mb-auto w-full md:px-4 space-y-4 md:space-y-6 xl:space-y-8">
      <SearchAndSort />
      {/* <CollectionArchive products={products.docs} /> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 fl-gap-4/20">
        {products?.map((product) => (
          <Card
            key={product.id}
            doc={product.raw}
            relationTo="products"
            locale={localeCode}
          />
        ))}
      </div>
      <div className="mt-auto flex justify-between gap-16 items-center mb-32">
        {totalPages > 1 && currentPage && (
          <Pagination page={currentPage} totalPages={totalPages} />
        )}
        <PageRange
          collection="products"
          currentPage={currentPage}
          limit={limit}
          totalDocs={totalDocs}
        />
      </div>
    </div>
  );
}

export function SearchAndSort() {
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsString.withDefault("popular"),
  );

  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault(""),
  );

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <div className="prose dark:prose-invert max-w-none mb-4">
        <h1 className="fl-text-32/64 font-semibold text-foreground">Catalog</h1>
      </div>
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search
            className={
              "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4"
            }
          />
          <Input
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ">
        <Select onValueChange={setSortBy} defaultValue={sortBy} >
          <SelectTrigger className="w-50">
            <SelectValue
              placeholder="Select a verified email to display"
              defaultValue={sortBy}
            />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value={"popular"}>По популярности</SelectItem>
            <SelectItem value={"price"}>Цена: по возрастанию</SelectItem>
            <SelectItem value={"-price"}>Цена: по убыванию</SelectItem>
            <SelectItem value={"rating"}>По рейтингу</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
