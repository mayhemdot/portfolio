"use client";

import Link from "next/link";
import type { JSX } from "react";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import { Icons } from "@/components/icons/Icons";
import { Price } from "@/components/Price";
import { Text } from "@/components/Text";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import classes from "./index.module.scss";
import { useProductCardContext } from "./ProductCardContext";

const ProductCardForm = (props: JSX.IntrinsicElements["div"]) => {
	const {
		selectProductVariationId,
		selectedProductVariationId,
		selectedProductVariation,
		hasVariations,
		sortedVariations,
		product,
	} = useProductCardContext();
	console.log(
		"Selected variant id",
		selectedProductVariationId,
		sortedVariations
	);
	return (
		<Card
			{...props}
			className={
				"flex h-fit max-w-[600px]  flex-col rounded-3xl border-0 md:min-w-[380px] xl:min-w-[480px] 2xl:min-w-[600px]"
			}
		>
			<CardHeader className='pb-6!'>
				<Text size={"md"} comp='h1' font='laguna'>
					{product.title}
				</Text>
				<span className={"text-muted-foreground text-left lowercase"}>
					{product.categories
						?.filter(category => typeof category === "object")
						.map(category => (
							<Badge
								key={category?.id}
								className='rounded-full'
								variant={"secondary"}
							>
								<Link href={`/products/${category?.handle || ""}`}>
									{`+ ${category?.name || "Неизвестная категория"}`}
								</Link>
							</Badge>
						))}
				</span>
			</CardHeader>
			<CardContent className={"space-y-4"}>
				<Text comp='h2' size={"smd"} className={"text-muted-foreground w-full"}>
					Доступные размеры
				</Text>
				<div className={"flex w-full flex-wrap gap-2"}>
					{hasVariations ? (
						<TooltipProvider>
							{sortedVariations
								?.filter(variation => typeof variation === "object")
								?.map(variation => (
									<Tooltip key={variation.id}>
										<TooltipTrigger asChild>
											<Button
												disabled={!variation?.inventory_quantity}
												key={variation.id}
												size={"xl"}
												className={buttonVariants({
													className: "box-border",
													size: "rectangleMini",
													variant:
														selectedProductVariationId === variation.id
															? "default"
															: "outline",
												})}
												onClick={() => selectProductVariationId(variation.id)}
											>
												{variation.title}
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<div>
												{/* TODO: Размер */}
												{`≈ ${variation.description}`}
											</div>
											{/* <div className='fsSmall text-center'>
											<span>Размер: {variation.options?.size} </span>
											{variation?.sizeUnit && (
												<span>| {variation?.sizeUnit}</span>
											)}
										</div>
										<div className='fsSmall'>
											{variation?.sizeDescription || "≈ 6 часов горения"}
										</div> */}
										</TooltipContent>
									</Tooltip>
								))}
						</TooltipProvider>
					) : (
						<div className='w-full bg-red-400 py-2 text-center'>
							Нет доступных вариантов
						</div>
					)}
				</div>
				{hasVariations &&
				sortedVariations
					.filter(variation => typeof variation === "object")
					.some(
						variation => !!variation.calculated_price?.calculated_amount
					) ? (
					<>
						<Separator className='h-px' />
						<div
							className={
								"flex grow items-center justify-between gap-4 pb-4 md:gap-8"
							}
						>
							<h3>
								{selectedProductVariationId && (
									<Price
										variant={selectedProductVariation!}
										className='fsMiddle font-bold'
										size={"md"}
									/>
								)}
							</h3>
							<div className={"fsSmallest flex items-center justify-end gap-2"}>
								<span>&#8776; цена без учета скидок</span>
								<ProductTooltip
									message={"Применить промокод можно при оформлении заказа."}
									icon={<Icons.info className='size-6 cursor-help' />}
								/>
							</div>
						</div>
					</>
				) : null}

				<div className={"relative flex w-full justify-between gap-4 md:gap-8"}>
					{(selectedProductVariation?.inventory_quantity || 0) > 0 ? (
						<AddToCartButton
							variant={selectedProductVariation!}
							className='fsNormal rounded-2xl! h-12 grow normal-case'
							product={product}
							isSmall={false}
						/>
					) : (
						<div className='w-full bg-red-400 py-2 text-center'>Распродано</div>
					)}
				</div>
			</CardContent>
			<CardFooter
				className={cn(
					"relative flex flex-col items-start justify-start gap-4",
					"fsSmall"
				)}
			>
				<h2 className='sr-only'>Описание</h2>
				<div className='space-y-3'>
					<Text
						size={"smd"}
						className={"text-muted-foreground w-full"}
						comp='h3'
					>
						Описание
					</Text>
					<Text comp='p' size='sm'>
						{product?.description?.["effect"] || "Описание отсутствует"}
					</Text>
				</div>
				<div className='space-y-3'>
					<Text
						size={"smd"}
						className={"text-muted-foreground w-full"}
						comp='h3'
					>
						Ноты
					</Text>
					<Text comp='p' size='sm'>
						{product?.description?.["notes"] || "Описание отсутствует"}
					</Text>
				</div>
				<div className='space-y-3'>
					<Text
						size={"smd"}
						className={"text-muted-foreground w-full"}
						comp='h3'
					>
						Особенности
					</Text>
					<Text comp='p' size='sm'>
						{product?.description?.["features"] || "Описание отсутствует"}
					</Text>
				</div>

				{/* {productLayout} */}
			</CardFooter>
		</Card>
	);
};

export default ProductCardForm;

function ProductTooltip({
	message,
	icon,
}: {
	message: string;
	icon: JSX.Element;
}) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{icon}</TooltipTrigger>
				<TooltipContent>
					<p className='fsSmall'>{message}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
