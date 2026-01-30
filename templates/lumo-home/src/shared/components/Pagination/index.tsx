"use client";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import type React from "react";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { cn } from "@/shared/lib/utils";

export const Pagination: React.FC<{
  className?: string;
  page: number;
  totalPages: number;
}> = (props) => {
  const router = useRouter();
  const [currentPage, _] = useQueryState(
    "page",
    parseAsString.withDefault("1"),
  );
  // console.log('totalPages', props.totalPages)
  const { className, page, totalPages } = props;
  const hasNextPage = page < totalPages;
  // console.log('[page < totalPages]', page, props.totalPages, hasNextPage)
  const hasPrevPage = page > 1;

  const hasExtraPrevPages = page - 1 > 1;
  const hasExtraNextPages = page + 1 < totalPages;
  // console.log('page', page, 'currentPage', Number(currentPage))
  const currentPageNumber = Number(currentPage);
  return (
    <div className={cn("my-12", className)}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              isActive={hasPrevPage}
              onClick={() => {
                if (!hasPrevPage) return;
                router.push(`/products?page=${page - 1}`);
              }}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                isActive={page - 1 === currentPageNumber}
                onClick={() => {
                  router.push(`/products?page=${page - 1}`);
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive={page === currentPageNumber}
              onClick={() => {
                router.push(`/products?page=${page}`);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                isActive={page + 1 === currentPageNumber}
                onClick={() => {
                  router.push(`/products?page=${page + 1}`);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              isActive={hasNextPage}
              onClick={() => {
                if (!hasNextPage) return;

                router.push(`/products?page=${page + 1}`);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  );
};
