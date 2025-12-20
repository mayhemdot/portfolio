"use client";
import { X } from "lucide-react";
import { parseAsFloat, parseAsString, useQueryStates } from "nuqs";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { StoreCategory, StoreProduct } from "@/modules/products/types";
import { pushUnique } from "@/utilities/common";
import { useThrottle } from "@/utilities/useThrottle";
import classes from "./../index.module.scss";

export interface CatalogProps {
	sort: string;
	limit: number;
	products: StoreProduct[];
	category: number[];
	price: { max: number; min: number };
}

type CatalogFilterProps = {
	categories: StoreCategory[];
	className?: string;
	priceAvailable: { min: number; max: number };
	position?: "sidebar" | "aside";
};

export function CatalogFilter({
	position = "aside",
	className,
	priceAvailable,
	categories,
}: CatalogFilterProps) {
	// const throttlePrice = useThrottle(price, 2000, price?.min, price?.max);

	const [price, setPrice] = useQueryStates(
		{
			price_min: parseAsFloat.withDefault(priceAvailable.min),
			price_max: parseAsFloat.withDefault(priceAvailable.max),
		},
		{
			history: "push",
		}
	);

	const handleChangeCategory = (data: any) => {
		const recvCategoryId: number = parseInt(data.target.value, 10);

		// setFilters((params: CatalogProps) => ({
		// 	...params,
		// 	category: [
		// 		...(data.target?.checked
		// 			? [...pushUnique<number>(params.category, recvCategoryId)]
		// 			: params.category.filter((cId: number) => cId !== recvCategoryId)),
		// 	],
		// }));
	};
	return (
		<Card
			className={cn(
				"relative hidden h-fit max-w-[290px] shrink-0 grow-0 lg:block xl:max-w-[320px] 2xl:max-w-[400px]",
				className
			)}
		>
			<CardHeader>
				<CardTitle className='text-muted-foreground mb-2 hidden'>
					Фильтры
				</CardTitle>
				<Button
					className={buttonVariants({
						variant: "outline",
						className: "relative grow",
						size: "lg",
					})}
				>
					<span className='fsNormal'>Очистить фильтры </span>
					<span className='bg-dark-color absolute right-2 rounded-full p-1'>
						<X className='size-4 text-beige-color' />
					</span>
				</Button>
			</CardHeader>
			<CardContent>
				<form className={"flex flex-col"} onChange={handleChangeCategory}>
					{categories && Array.isArray(categories) && categories.length > 0 ? (
						<>
							<fieldset className='flex flex-col gap-3'>
								<legend className='mb-4'>
									<CardTitle className='text-muted-foreground'>
										Категории
									</CardTitle>
								</legend>
								{categories.map(category => (
									<div key={category.id}>
										<label
											htmlFor={position + String(category.id)}
											className={
												"fsNormal flex cursor-pointer items-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											}
										>
											<Checkbox
												id={position + String(category.id)}
												name={category.name || ""}
												className={
													"size-6 border-secondary data-[state=checked]:bg-dark-color peer mr-2.5"
												}
												value={category.id}
											/>
											{category.name}
										</label>
									</div>
								))}
							</fieldset>
							<Separator className='my-4 sm:hidden lg:block' />
						</>
					) : null}
					<fieldset>
						<legend className='mb-4'>
							<h4 className='fsSmall text-zinc-400'>
								Цены <span>(руб.)</span>
							</h4>
						</legend>
						{price ? (
							<div>
								<Slider
									defaultValue={[priceAvailable.min, priceAvailable.max]}
									max={priceAvailable.max}
									min={priceAvailable.min}
									step={10}
									onValueChange={(data: number[]) =>
										setPrice({ price_min: data[0], price_max: data[1] })
									}
									className='mb-2'
								/>
								<div className={"fsSmall my-4 flex items-center gap-2"}>
									<div>
										<label htmlFor='priceMin'>От </label>
										<Input
											id='priceMin'
											name='priceMin'
											className={
												"fsNormal digits bg-beige-color h-12 rounded-2xl"
											}
											value={price.price_min}
											onChange={el =>
												setPrice(p => ({
													...p,
													price_min: parseInt(el.target.value, 10),
												}))
											}
										/>
									</div>
									<div>
										<label htmlFor='priceMax'>До </label>
										<Input
											id='priceMax'
											name='priceMax'
											className={
												"fsNormal digits bg-beige-color h-12 rounded-2xl"
											}
											value={price.price_max}
											onChange={el =>
												setPrice(p => ({
													...p,
													max: parseInt(el.target.value, 10),
												}))
											}
										/>
									</div>
								</div>
							</div>
						) : null}
						<Separator className='my-4 hidden lg:block' />
					</fieldset>
				</form>
			</CardContent>
		</Card>
	);
}

export default CatalogFilter;
