"use client";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
	useQueryState,
} from "nuqs";
import React, { use, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/shared/components/ui/Input";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { type Category } from "@/modules/products/constants";

type SelectItemT = { key: string; label: string };

type Props = {
	categories: Array<Omit<Category, "name"> & { name: string }> | undefined;
	maxPriceLimit?: string;
	currency: string; //"USD" | "EUR" | "RUB";
};

export function FilterProducts({
	categories,
	currency,
	maxPriceLimit = "10000",
}: Props) {
	const t = useTranslations();
	const searchParams = useSearchParams();

	const categoryList = categories?.map(category => ({
		key: category.handle,
		label: category.name,
	})) as SelectItemT[];

	const [minPrice, setMinPrice] = useQueryState(
		"price_min",
		parseAsInteger.withDefault(0)
	);
	const [maxPrice, setMaxPrice] = useQueryState(
		"price_max",
		parseAsInteger.withDefault(0)
	);

	const defaultMaxPrice = parseInt(
		searchParams?.get("price_max") || maxPriceLimit,
		10
	);
	const defaultMinPrice = parseInt(searchParams?.get("price_min") || "0", 10);

	const [bound, setBound] = React.useState([defaultMinPrice, defaultMaxPrice]);

	const [defaultCategories, setCategory] = useQueryState(
		"categories",
		parseAsArrayOf(parseAsString).withDefault(
			searchParams?.getAll("categories")
		)
	);

	const setDebouncedMinPrice = useDebouncedCallback(setMinPrice, 1000);
	const setDebouncedMaxPrice = useDebouncedCallback(setMaxPrice, 1000);

	useEffect(() => {
		if (bound?.[0]) {
			setDebouncedMinPrice(bound[0], {
				shallow: false,
			});
		}
		if (bound?.[1]) {
			setDebouncedMaxPrice(bound[1], {
				shallow: false,
			});
		}
	}, [bound, setDebouncedMaxPrice, setDebouncedMinPrice]);
	// min-w-60 max-w-[270px]
	return (
		<div className='fsNormal w-full space-y-8'>
			<Select
				size='md'
				label={t("filterProductComponent.categoryLabel")}
				selectionMode='multiple'
				placeholder={t("filterProductComponent.categoryPlaceholder")}
				defaultSelectedKeys={defaultCategories}
				onSelectionChange={e =>
					setCategory(Array.from(e) as string[], {
						shallow: false,
					})
				}
			>
				{categoryList?.map(category => (
					<SelectItem key={category.key}>{category.label}</SelectItem>
				))}
			</Select>
			<CheckboxGroup
				color='default'
				size='md'
				label='Выберите сталь'
				defaultValue={["M390", "Elmax"]}
			>
				<Checkbox value='M390'>M390</Checkbox>
				<Checkbox value='Elmax'>Elmax</Checkbox>
			</CheckboxGroup>
			<div className='space-y-4'>
				<Slider
					color='foreground'
					label={t("filterProductComponent.priceLabel")}
					step={currency === "RUB" ? 100 : 1}
					minValue={0}
					maxValue={parseInt(maxPriceLimit, 10)}
					defaultValue={[Number(defaultMinPrice), Number(defaultMaxPrice)]}
					formatOptions={{
						style: "currency",
						currency,
						minimumFractionDigits: 1,
					}}
					className='fl-text-14/20 w-full'
					onChange={e => (Array.isArray(e) ? setBound(e) : null)}
					value={bound}
				/>
				<div className='flex space-x-4'>
					<Input
						placeholder={t("filterProductComponent.fromLabel")}
						// defaultValue={String(defaultMinPrice)}
						type='number'
						onChange={e =>
							setBound((prev: number[]) => [
								parseInt(e.target?.value || "0", 10),
								prev[1],
							])
						}
						value={bound[0].toString()}
						className='w-full grow'
						size={"sm"}
					/>
					<Input
						placeholder={t("filterProductComponent.toLabel")}
						// defaultValue={String(defaultMaxPrice)}
						type='number'
						onChange={e =>
							setBound((prev: number[]) => [
								prev[0],
								parseInt(e.target?.value || "1000", 10),
							])
						}
						value={bound[1].toString()}
						className='w-full grow'
						size={"sm"}
					/>
				</div>
			</div>
		</div>
	);
}
