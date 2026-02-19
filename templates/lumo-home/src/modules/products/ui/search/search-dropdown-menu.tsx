"use client";
import { useRef } from "react";
import { Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { Lang, LocaleCode } from "@/i18n/localization";
import { Product } from "@/modules/products/model/types";
import {
	type PaginatedDocs,
	searchProducts,
} from "@/modules/products/queries/searchProducts";
import { Text } from "@/shared/components/Text";
import { Button } from "@/shared/components/ui/button";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { InputField } from "@/shared/components/InputField";
import { SliderArchive } from "@/shared/components/SliderArchive";
import {
	type SearchHistoryItem,
	useSearchHistoryStore,
} from "@/modules/products/model/search-store";
import { PRODUCTS } from "@/modules/products/model/data";

export default function SearchDropdownMenu() {
	const [open, setOpen] = useState(false);

	const ref = useRef<HTMLInputElement | null>(null);
	const localeCode = useLocale() as LocaleCode;
	const { language } = new Intl.Locale(localeCode);

	const pathname = usePathname();

	const t = useTranslations("Global.Search");

	const [term, setSearchTerm] = useQueryState(
		"query",
		parseAsString.withDefault("").withOptions({
			shallow: true,
		}),
	);
	const { addTerm, getItems, removeTerm } = useSearchHistoryStore();

	const items = getItems(localeCode);

	const [isLoading, setIsLoading] = useState(false);

	const [products, setProducts] = useState<PaginatedDocs<Product>>({
		docs: [],
		totalDocs: 0,
		page: 0,
		totalPages: 0,
		limit: 0,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!term) {
			setProducts({
				docs: PRODUCTS.filter(item => item.id === 1 || item.id === 2).map(
					item => new Product(item, localeCode),
				),
				totalDocs: 0,
				page: 0,
				totalPages: 0,
				limit: 0,
			});
			return;
		}

		if (isLoading) return;

		setIsLoading(true);
		try {
			const searchedProduct = searchProducts({ term, localeCode });
			if (searchedProduct?.docs?.length > 0) {
				setProducts(searchedProduct);
				if (term.split(" ")?.length > 1) {
					addTerm(term, localeCode);
				}
			}
		} catch (error: unknown) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, [term, localeCode]);

	useEffect(() => {
		if (!open) setSearchTerm("");
	}, [open, setSearchTerm]);

	const setSearchTermWithDebounce = useDebouncedCallback(
		(value: string) => setSearchTerm(value),
		600,
	);

	const setSearchAndInput = (term: string) => {
		setSearchTermWithDebounce(term);
		if (ref.current) ref.current.value = term;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return (
		<div className='flex items-center'>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<div className='bg-secondary rounded-full p-2 md:p-3'>
						<Button variant='ghost' size={"icon"}>
							{!open ? (
								<Search className='size-4 shrink-0' />
							) : (
								<X className='size-4 shrink-0' />
							)}
						</Button>
					</div>
				</DialogTrigger>
				<DialogContent
					showCloseButton={false}
					showDialogOverlay={true}
					classNameDialog={"bg-transparent!"}
					className={cn(
						"bg-secondary! rounded-none! w-full! max-w-full! fl-top-16/24 left-1/2 mt-[90px] h-[calc(100vh)] origin-top -translate-x-1/2 translate-y-0 overflow-hidden p-4 transition-all duration-300 md:p-8",
					)}
				>
					<DialogTitle className='sr-only hidden'>Search menu</DialogTitle>
					<div className='container mx-auto grid grid-cols-1 content-start gap-8 xl:grid-cols-[320px_1fr] 2xl:grid-cols-[400px_1fr]'>
						<aside className='bg-background fl-px-16/24 fl-py-16/24 grid h-fit w-full shrink-0 grid-cols-2 gap-4 rounded-3xl xl:grid-cols-1'>
							{!!items.length && (
								<SearchArchive
									title={t("youSearched")}
									items={items}
									localeCode={localeCode}
									removeItem={(t, l) => removeTerm(t, l)}
									setSearchInput={t => setSearchAndInput(t)}
								/>
							)}
							<SearchArchive
								title={t("alsoSearch")}
								items={[
									{
										id: 1,
										term: PRODUCTS[0]?.title[language as Lang],
										date: Date.now().toString(),
									},
									{
										id: 2,
										term: PRODUCTS[1]?.title[language as Lang],
										date: Date.now().toString(),
									},
								]}
								localeCode={localeCode}
								setSearchInput={t => setSearchAndInput(t)}
							/>
						</aside>

						<div className='min-w-0 flex-1'>
							<div className='flex items-center gap-3'>
								<InputField
									ref={ref}
									wrapperClassName='w-full transition-all duration-300'
									className='bg-background! mx-0! fl-text-16/20! h-[48px]'
									placeholder={t("form.termPlaceholder")}
									onChange={value =>
										setSearchTermWithDebounce(value.target.value)
									}
									label={""}
									disabled={isLoading}
									name={"term"}
								/>
								<Button
									type='submit'
									size='lg'
									variant={"ghost"}
									className={cn(
										"origin-right transform rounded-full border-none transition-all duration-300",
										term
											? "pointer-events-auto w-fit scale-100 opacity-100"
											: "pointer-events-none w-0 scale-x-75 opacity-0",
									)}
									onClick={() => {
										setSearchAndInput("");
									}}
								>
									<span className={cn("opacity-100", { "opacity-0": !term })}>
										{t("form.clearButton")}
									</span>
								</Button>
							</div>

							<SliderArchive
								relationTo={"products"}
								name={"products"}
								products={products?.docs?.map(p => p.raw)}
								locale={localeCode}
								inCatalogButton={false}
								showNavigation={!!products?.docs.length}
							/>

							{/* <Button
								type='submit'
								size='lg'
								className={cn(
									"rounded-full! border-none! mt-auto hidden w-full",
									{
										flex: products?.docs.length > 0,
									},
								)}
								onClick={() => {
									setSearchAndInput("");
								}}
							>
								{t("form.clearButton")}
							</Button> */}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

function SearchArchive({
	title,
	items,
	localeCode,
	setSearchInput,
	removeItem,
}: {
	title: string;
	items: SearchHistoryItem[];
	localeCode: LocaleCode;
	removeItem?: (term: string, localeCode: LocaleCode) => void;
	setSearchInput: (term: string) => void;
}) {
	return (
		<div>
			<Text comp='h3' variant={"secondary"} className=''>
				{title}
			</Text>
			<ul className={"flex flex-col gap-1 pt-2"}>
				{items?.map(item => (
					<li
						key={item.term}
						className='flex cursor-pointer items-center gap-2 rounded-lg bg-zinc-100 px-2 py-1 hover:opacity-70'
					>
						<Search className='size-4 shrink-0' />
						<Text
							comp='p'
							size={"xxs"}
							onClick={() => setSearchInput(item.term)}
							variant={"secondary"}
							className='whitespace-nowrap! overflow-hidden! text-ellipsis! min-w-0! block! grow truncate '
						>
							{item.term}
						</Text>

						{
							<Button
								className={cn("p-1! invisible ml-auto", {
									visible: Boolean(removeItem),
								})}
								size='iconXS'
								variant={"secondary"}
								onClick={() => removeItem?.(item.term, localeCode)}
							>
								<X />
							</Button>
						}
					</li>
				))}
			</ul>
		</div>
	);
}
