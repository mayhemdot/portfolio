"use client";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
// import { useTranslation } from "react-i18next";

export const PAGINATION_STATE_DEFAULT = {
	pageIndex: 0,
	pageSize: 4,
	pageCount: 1,
};

export type PaginationStateT = typeof PAGINATION_STATE_DEFAULT;

export function PaginationClassic({
	pageState,
}: {
	pageState: typeof PAGINATION_STATE_DEFAULT;
}) {
	// const { t } = useTranslation(['pagination'])

	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentPage =
		Number(searchParams.get("page")) || pageState.pageIndex || 0 + 1;
	const currentSize =
		Number(searchParams.get("pageSize")) || pageState.pageSize || 1;

	const createPageURL = (
		pageNumber?: number | string,
		pageSize?: number | string
	) => {
		const params = new URLSearchParams(Array.from(searchParams));

		if (pageNumber) params.set("page", pageNumber.toString());

		if (pageSize) params.set("pageSize", pageSize.toString());

		const url = `${pathname}?${params.toString()}`;

		router.push(url);
		router.refresh();
	};

	return (
		<div className='flex items-center justify-between p-2'>
			<div></div>
			<div className='flex flex-wrap items-center gap-4'>
				<div className='flex items-center space-x-2'>
					{/* <p className="text-sm font-medium">{t("pages.perPage")}</p> */}
					<Select
						value={String(currentSize)}
						onValueChange={(value: string) => {
							createPageURL(currentPage, value);
							return value;
						}}
					>
						<SelectTrigger className='h-8 w-[70px] bg-beige-color'>
							<SelectValue placeholder={pageState.pageSize} />
						</SelectTrigger>
						<SelectContent side='top'>
							{[1, 2, 4, 5, 10, 20, 30, 40, 50].map(p => (
								<SelectItem key={p} value={`${p}`}>
									{p}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex items-center space-x-2'>
					<div className='flex w-[100px] items-center justify-center text-sm font-medium'>
						{currentPage} / {pageState.pageCount}
					</div>
					<div className='flex items-center space-x-2'>
						<Button
							variant='outline'
							className='size-8 hidden p-0 lg:flex'
							onClick={() => createPageURL(1, currentSize)}
							disabled={currentPage <= 1}
						>
							<span className='sr-only'>
								{/* {t('pages.first')} */}
								First
							</span>
							<ArrowLeftIcon className='size-4' />
						</Button>
						<Button
							variant='outline'
							className='size-8 p-0'
							onClick={() => createPageURL(currentPage - 1, currentSize)}
							disabled={currentPage <= 1}
						>
							<span className='sr-only'>
								{/* {t('pages.previous')} */}
								Previous
							</span>
							<ChevronLeftIcon className='size-4' />
						</Button>
						<Button
							variant='outline'
							className='size-8 p-0'
							onClick={() => createPageURL(currentPage + 1, currentSize)}
							disabled={currentPage >= pageState.pageCount}
						>
							<span className='sr-only'>
								{/* {t('pages.next')} */}
								Next
							</span>
							<ChevronRightIcon className='size-4' />
						</Button>
						<Button
							variant='outline'
							className='size-8 hidden p-0 lg:flex'
							// onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							onClick={() => createPageURL(currentPage + 1, currentSize)}
							disabled={currentPage >= pageState.pageCount}
						>
							<span className='sr-only'>
								{/* {t('pages.last')} */}
								Last
							</span>
							<ArrowRightIcon className='size-4' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
