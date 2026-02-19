"use client";

// import { useQuery } from '@tanstack/react-query'
import { CommandLoading } from "cmdk";
import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useEffectEvent, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { LocaleCode } from "@/i18n/localization";
import type { Product } from "@/modules/products/model/types";
import {
	type PaginatedDocs,
	searchProducts,
} from "@/modules/products/queries/searchProducts";
import { Media } from "@/shared/components/Media";
import { Text } from "@/shared/components/Text";
import { Button } from "@/shared/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/shared/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { extractID } from "@/shared/utils/extractId";

export default function SearchInputClient() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const localeCode = useLocale() as LocaleCode;
	const pathname = usePathname();
	const t = useTranslations("Global.Search");

	const [term, setSearchTerm] = useQueryState(
		"query",
		parseAsString.withDefault("").withOptions({
			shallow: false,
		}),
	);

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
				docs: [],
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
			setProducts(searchProducts({ term, localeCode }));
		} catch (error: any) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, [term, localeCode]);

	useEffect(() => {
		if (!open) {
			setSearchTerm("");
		}
	}, [open, setSearchTerm]);

	const setSearchTermWithDebounce = useDebouncedCallback(
		(value: string) => setSearchTerm(value),
		300,
	);
	const groupedProducts = products?.docs?.reduce((acc, product) => {
		const categoryId = extractID(product.category);

		if (!categoryId) return acc;

		if (!acc[categoryId]) {
			acc[categoryId] = [];
		}
		acc[categoryId].push(product);
		return acc;
	}, {} as Record<string, typeof products.docs>);

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
							{open ? (
								<Search className='size-4 shrink-0' />
							) : (
								<X className='size-4 shrink-0' />
							)}
						</Button>
					</div>
				</DialogTrigger>
				<DialogContent
					className={cn(
						"bg-secondary! left-1/2 top-[15%] h-[300px] origin-top -translate-x-1/2 translate-y-0 overflow-hidden rounded-3xl p-4 transition-all duration-300 md:p-8",
						{
							"h-[80vh] xl:h-[50vh]": term !== "",
						},
					)}
				>
					<DialogTitle className='sr-only hidden'>Dialog name</DialogTitle>
					<Command className='rounded-2xl! bg-background! [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-input]]:border-0 [&_[cmdk-input]]:outline-none [&_[cmdk-input]]:ring-0 [&_[cmdk-input]]:focus:outline-none [&_[cmdk-input]]:focus:ring-0 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
						<CommandInput
							className='px-0! mx-0! fl-text-16/20 my-12 '
							placeholder={t("form.termPlaceholder")}
							onValueChange={value => setSearchTermWithDebounce(value)}
						/>
						<CommandList className='min-h-[50vh]'>
							<CommandEmpty className='fl-text-16/20 mt-4 text-center '>
								{term ? t("noProductsFound") : ""}
							</CommandEmpty>
							{isLoading ? (
								<CommandLoading />
							) : (
								Object.entries(groupedProducts || []).map(
									([category, categoryProducts]) => (
										<CommandGroup key={category} heading={category}>
											{categoryProducts.map(product => {
												const Icon = product.images;
												return (
													<CommandItem
														key={product.id}
														value={`${product.title}`}
														asChild
														onSelect={() => {
															router.push(`/products/${product.slug}`);
														}}
													>
														<div className='cursor-pointer'>
															<div className='size-16 relative aspect-square shrink-0 grow-0'>
																<Media
																	resource={product.thumbnail()}
																	fill
																	imgClassName='object-cover'
																/>
															</div>
															{/* <Icon className="mr-2 size-4" /> */}
															<div className='flex flex-col'>
																<Text comp='h5' variant={"secondary"} size='xs'>
																	{product.title}
																</Text>
																<Text comp='p' variant={"secondary"} size='xxs'>
																	{`${t("form.productPrice")}:  `}
																	{product.prettyPrice()}
																</Text>
															</div>
														</div>
													</CommandItem>
												);
											})}
										</CommandGroup>
									),
								)
							)}
						</CommandList>
					</Command>

					<DialogFooter>
						<Button
							type='submit'
							size='lg'
							// variant={""}
							className='rounded-full! border-none! mt-auto w-full'
							onClick={() => setSearchTerm("")}
						>
							{t("form.clearButton")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* <div className="text-center text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>{" "}
        to open search
      </div> */}
		</div>
	);
}
