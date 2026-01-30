import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Shell } from "@/shared/components/ui/shell";

export const PAGINATION_STATE_DEFAULT = {
  pageIndex: 0,
  pageSize: 4,
  pageCount: 1,
};

export type PaginationStateT = typeof PAGINATION_STATE_DEFAULT;

type PaginationProps = {
  pageState: PaginationStateT;
  setPageState: Dispatch<SetStateAction<PaginationStateT>>;
};

export function Pagination({ pageState, setPageState }: PaginationProps) {
  // const { t } = useTranslation(["pagination"]);

  return (
    <Shell className="flex items-center justify-between px-2">
      <div></div>
      <div className="flex items-center flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          {/* <p className="text-sm font-medium">{t("pages.perPage")}</p> */}
          <Select
            value={`${pageState.pageSize ?? "1"}`}
            onValueChange={(value:string) => {
              setPageState((prev) => ({ ...prev, pageSize: Number(value) }));
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder={pageState.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[1, 2, 4, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            {pageState.pageIndex + 1} / {pageState.pageCount}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size={"icon"}
              className="hidden lg:flex"
              onClick={() =>
                setPageState((prev) => ({ ...prev, pageIndex: 0 }))
              }
              disabled={pageState.pageIndex === 0}
            >
              {/* <span className="sr-only">{t("pages.first")}</span> */}
              <ArrowLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size={"icon"}
              onClick={() =>
                setPageState((prev) => ({
                  ...prev,
                  pageIndex: prev.pageIndex - 1,
                }))
              }
              disabled={pageState.pageIndex === 0}
            >
              {/* <span className="sr-only">{t("pages.previous")}</span> */}
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size={"icon"}
              onClick={() =>
                setPageState((prev) => ({
                  ...prev,
                  pageIndex: prev.pageIndex + 1,
                }))
              }
              disabled={pageState.pageIndex === pageState.pageCount - 1}
            >
              {/* <span className="sr-only">{t("pages.next")}</span> */}
              <ChevronRightIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size={"icon"}
              className="hidden lg:flex"
              // onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              onClick={() =>
                setPageState((prev) => ({
                  ...prev,
                  pageIndex: pageState.pageCount - 1,
                }))
              }
              disabled={pageState.pageIndex === pageState.pageCount - 1}
            >
              {/* <span className="sr-only">{t("pages.last")}</span> */}
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
