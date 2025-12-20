"use client";

import type { VariantProps } from "class-variance-authority";
import React, { useState } from "react";
import { Text, type textVariants } from "@/components/Text";
import { cn } from "@/lib/utils";
import type { StoreProductVariant } from "@/modules/products/types";
import { formatPrice } from "@/modules/products/utils/formatPrice";
import classes from "./index.module.scss";

type Props = {
	variant: StoreProductVariant;
	quantity?: number;
	button?: "addToCart" | "removeFromCart" | false;
	size: VariantProps<typeof textVariants>["size"];
	className?: string;
};

export function Price(props: Props) {
	const {
		variant,
		button = "addToCart",
		size = "smd",
		quantity = 0,
		className,
	} = props;

	const [price, setPrice] = useState<{
		actualPrice: number;
		withQuantity: number;
	}>(() => {
		const amount = variant?.calculated_price?.calculated_amount || 0;
		return {
			actualPrice: amount,
			withQuantity: amount * (quantity || 1),
		};
	});

	React.useEffect(() => {
		const amount = variant?.calculated_price?.calculated_amount || 0;

		setPrice({
			actualPrice: amount,
			withQuantity: amount * (quantity || 1),
		});
	}, [quantity, variant]);

	return (
		<div
			className={"flex flex-wrap items-center gap-2 md:flex-col md:items-start"}
		>
			{typeof price?.actualPrice !== "undefined" &&
				price?.withQuantity !== undefined && (
					<div className={cn(classes.price, "flex gap-4", className)}>
						<Text comp='p' size={size}>
							{formatPrice(price?.withQuantity / 100)}
						</Text>
						{quantity > 1 && (
							<small className={classes.priceBreakdown}>
								{`${price.actualPrice / 100} x ${quantity}`}
							</small>
						)}
					</div>
				)}
			{/* {button && button === "addToCart" && <AddToCartButton className="!text-black [&_span]:text-[12px] fsSmall !text-normal" variant={variant} appearance="default" />} */}
			{/* {button && button === "removeFromCart" && <RemoveFromCartButton product={product} />} */}
		</div>
	);
}

// export const priceFromJSON = (
// 	stripePriceId: string,
// 	priceJSON: string,
// 	quantity: number = 1,
// 	raw?: boolean
// ): string => {
// 	let price = "";

// 	if (priceJSON) {
// 		try {
// 			const parsed = JSON.parse(priceJSON)?.data.find(
// 				price => price.id === stripePriceId
// 			);
// 			console.log("parsed ", parsed, stripePriceId);
// 			const priceValue = parsed.unit_amount * quantity;
// 			const priceType = parsed.type;

// 			if (raw) return priceValue.toString();

// 			price = (priceValue / 100).toLocaleString("en-US", {
// 				style: "currency",
// 				currency: "USD", // TODO: use `parsed.currency`
// 			});

// 			if (priceType === "recurring") {
// 				price += `/${
// 					parsed.recurring.interval_count > 1
// 						? `${parsed.recurring.interval_count} ${parsed.recurring.interval}`
// 						: parsed.recurring.interval
// 				}`;
// 			}
// 		} catch (e) {
// 			console.error(`Cannot parse priceJSON`); // eslint-disable-line no-console
// 		}
// 	}

// 	return price;
// };
{
	/* {(price?.withQuantity / 100).toLocaleString("ru-RU", {
								style: "currency",
								currency: "RUB",
							})} */
}
