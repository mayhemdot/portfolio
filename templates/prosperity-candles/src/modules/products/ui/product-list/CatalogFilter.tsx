"use client";
import { X } from "lucide-react";
import {
	parseAsArrayOf,
	parseAsFloat,
	parseAsString,
	useQueryStates,
} from "nuqs";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { PRODUCT_INFO } from "@/modules/products/data";
import type { StoreCategory, StoreProduct } from "@/modules/products/types";
// import { pushUnique } from "@/utilities/common";
// import { useThrottle } from "@/utilities/useThrottle";
// import classes from "./../index.module.scss";

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
	const categoryHandles =
		categories?.filter(c => typeof c.handle === "string").map(c => c.handle) ||
		[];

	const [info, setInfo] = useQueryStates(
		{
			price_min: parseAsFloat.withDefault(priceAvailable.min),
			price_max: parseAsFloat.withDefault(priceAvailable.max),
			categories: parseAsArrayOf(parseAsString).withDefault(categoryHandles),
		},
		{
			history: "push",
		}
	);

	const hasCategories =
		categories && Array.isArray(categories) && categories.length > 0;
	return (
		<Card
			className={cn(
				"relative  h-fit max-w-[290px] shrink-0 grow-0 xl:max-w-[320px] 2xl:max-w-[400px]",
				className
			)}
		>
			<CardHeader>
				<CardTitle className='text-muted-foreground mb-2 hidden'>
					Фильтры
				</CardTitle>
				<Button
					onClick={() =>
						setInfo({
							price_min: PRODUCT_INFO.MIN_PRICE,
							price_max: PRODUCT_INFO.MAX_PRICE,
							categories: categoryHandles,
						})
					}
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
				{hasCategories ? (
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
											defaultChecked={info.categories.includes(category.handle)}
											onCheckedChange={val => {
												const out =
													info.categories?.filter(c => c !== category.handle) ||
													[];
												if (val) {
													setInfo({ categories: [...out, category.handle] });
												} else {
													setInfo({
														categories: out,
													});
												}
											}}
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
					{info ? (
						<div>
							<Slider
								defaultValue={[priceAvailable.min, priceAvailable.max]}
								max={priceAvailable.max}
								min={priceAvailable.min}
								step={10}
								onValueChange={(data: number[]) =>
									setInfo({ price_min: data[0], price_max: data[1] })
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
										value={info.price_min}
										onChange={el =>
											setInfo(p => ({
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
										value={info.price_max}
										onChange={el =>
											setInfo(p => ({
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
			</CardContent>
		</Card>
	);
}

export default CatalogFilter;
