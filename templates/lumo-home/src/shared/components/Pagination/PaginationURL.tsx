"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { PAGINATION_STATE_DEFAULT } from "./Pagination";

type Props = {
  pageState: typeof PAGINATION_STATE_DEFAULT;
};

export function PaginationClassic({ pageState }: Props) {
  // const { t } = useTranslation(["pagination"]);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage =
    Number(searchParams.get("page")) || pageState.pageIndex || 0 + 1;

  const currentSize =
    Number(searchParams.get("pageSize")) || pageState.pageSize || 1;

  const createPageURL = (
    pageNumber?: number | string,
    pageSize?: number | string,
  ) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber) params.set("page", pageNumber.toString());
    if (pageSize) params.set("pageSize", pageSize.toString());

    const url = `${pathname}?${params.toString()}`;

    router.push(url);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div></div>
      <div className="flex items-center flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          {/* <p className="text-sm font-medium">{t("pages.perPage")}</p> */}
          <Select
            value={String(currentSize)}
            onValueChange={(value: string) => {
              createPageURL(currentPage, value);

              return value;
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageState.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[1, 2, 4, 5, 10, 20, 30, 40, 50].map((p) => (
                <SelectItem key={p} value={`${p}`}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex w-25 items-center justify-center text-sm font-medium">
            {currentPage} / {pageState.pageCount}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => createPageURL(1, currentSize)}
              disabled={currentPage <= 1}
            >
              {/* <span className="sr-only">{t("pages.first")}</span> */}
              <ArrowLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => createPageURL(currentPage - 1, currentSize)}
              disabled={currentPage <= 1}
            >
              {/* <span className="sr-only">{t("pages.previous")}</span> */}
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => createPageURL(currentPage + 1, currentSize)}
              disabled={currentPage >= pageState.pageCount}
            >
              {/* <span className="sr-only">{t("pages.next")}</span> */}
              <ChevronRightIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              // onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              onClick={() => createPageURL(currentPage + 1, currentSize)}
              disabled={currentPage >= pageState.pageCount}
            >
              {/* <span className="sr-only">{t("pages.last")}</span> */}
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
