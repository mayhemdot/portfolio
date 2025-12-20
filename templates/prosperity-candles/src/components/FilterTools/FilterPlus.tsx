"use client";
import { CheckIcon, type LucideProps } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type * as React from "react";
import {
	type ForwardRefExoticComponent,
	type RefAttributes,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FilterProps {
	title?: string;
	multiply?: boolean;
	urlKey: string;
	icon: React.ReactNode;
	options: {
		label: string;
		value: any;
		icon?: ForwardRefExoticComponent<
			Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
		>;
	}[];
}

export function Filter({
	icon,
	urlKey,
	multiply,
	title,
	options,
}: FilterProps) {
	// multiply
	//   const { t } = useTranslation(['home'])
	const searchParams = useSearchParams();
	const params = new URLSearchParams(Array.from(searchParams));

	const [filteredValues, setFilteredValue] = useState<string[] | undefined>(
		params.getAll(urlKey)
	);
	const router = useRouter();
	const selectedValues = useMemo(
		() => new Set(filteredValues as string[]),
		[filteredValues]
	);
	const pathname = usePathname();

	useEffect(() => {
		if (!multiply) {
			selectedValues.values().map(value => params.set(urlKey, value));
		} else {
			params.delete(urlKey);
			selectedValues.values().map(value => params.append(urlKey, value));
		}
		router.push(`${pathname}?${params.toString()}`);
	}, [selectedValues, multiply, params, router, urlKey, pathname]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className='fsSmall h-8 w-full max-w-full border-dashed bg-card'
				>
					{icon}
					{title}
					{selectedValues?.size > 0 && (
						<>
							<Separator orientation='vertical' className='mx-2 h-4' />
							<Badge
								variant='secondary'
								className='rounded-sm px-1 font-normal lg:hidden'
							>
								{selectedValues.size}
							</Badge>
							<div className='fsSmall hidden space-x-1 lg:flex'>
								{selectedValues.size > 2 ? (
									<Badge
										variant='secondary'
										className='fsSmallest text-nowrap rounded-sm px-1 font-normal'
									>
										{selectedValues.size}
										{/* {t('filters.selected')} */}
									</Badge>
								) : (
									options
										.filter(option => selectedValues.has(String(option.value)))
										.map(option => (
											<Badge
												variant='secondary'
												key={option.value}
												className='fsSmallest text-nowrap rounded-sm px-1 font-normal'
											>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[180px] bg-beige-color p-0' align='end'>
				<Command className='bg-beige-color'>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map(option => {
								const value = String(option.value);
								const isSelected = selectedValues.has(value);
								return (
									<CommandItem
										className='flex items-center justify-start'
										key={value}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(value);
											} else {
												if (!multiply && selectedValues.size !== 0) {
													selectedValues.clear();
												}
												selectedValues.add(value);
											}
											const filterValues = Array.from(selectedValues);
											setFilteredValue(
												filterValues?.length ? filterValues : undefined
											);
										}}
									>
										<div
											className={cn(
												"size-4 mr-2 flex rounded-sm border border-primary",
												isSelected
													? "bg-primary text-primary-foreground"
													: "opacity-50 [&_svg]:invisible"
											)}
										>
											<CheckIcon className={"size-4"} />
										</div>
										<span className='fsSmall'>{option.label}</span>
										{option.icon && (
											<option.icon className='size-2 ml-auto shrink-0 text-muted-foreground/70' />
										)}
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => setFilteredValue(undefined)}
										className='fsSmall justify-center text-center'
									>
										{/* {t('filters.clear')} */}
										Clear
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
