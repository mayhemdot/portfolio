"use client";

import { Pagination as NextPagination } from "@heroui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination({
  page,
  totalPages,
  "data-testid": dataTestid,
}: {
  page: number;
  totalPages: number;
  "data-testid"?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Render the component
  return (
    <div className="flex justify-start self-end w-full h-fit pt-16" data-testid={dataTestid}>
      <NextPagination
        color={"secondary"}
        isCompact
        showControls
        total={totalPages}
        initialPage={page}
        onChange={(p) => handlePageChange(p)}
      />
    </div>
  );
}
