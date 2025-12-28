"use client";

import type { VariantProps } from "class-variance-authority";
import { Trash } from "lucide-react";
import InputInc from "@/components/elements/InputInc";
import NoImage from "@/components/elements/NoImage";
import { Media } from "@/components/Media";
import Price from "@/components/Price/Price";
import { Text } from "@/components/Text";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { type CartLineItem, useCartStore } from "@/modules/cart/store";
import classes from "./index.module.scss";

type CartTableItemProps = {
	item: CartLineItem;
	index: number;
	isSubmitting?: boolean;
	isDisabled?: boolean;
};

function CartListItem({ item, isSubmitting, isDisabled }: CartTableItemProps) {
	const { updateQuantity, removeItem, setItemSelected } = useCartStore();
	const {
		thumbnail,
		title,
		variant: { product, inventory_quantity },
	} = item;

	const isImagesExisted = (product?.images?.length || 0) > 0;

	const firstImage =
		thumbnail ||
		(isImagesExisted && typeof product?.images?.[0] === "object"
			? product?.images?.[0]
			: null);

	const amount = item.variant.calculated_price?.calculated_amount || 0;
	return (
		<div
			className={cn(
				"flex flex-col items-start justify-between gap-x-4 gap-y-2 md:flex-row",
				{
					"opacity-70": isDisabled,
				}
			)}
		>
			<div className='inline-flex items-start gap-3 md:gap-4'>
				<Checkbox
					disabled={isSubmitting || isDisabled}
					id={item.variant.id.toString()}
					className={cn("size-4", {
						hidden: isDisabled,
					})}
					onCheckedChange={checked => {
						setItemSelected(item.id, Boolean(checked));
					}}
					checked={item.isSelected}
				/>

				<div
					className={cn("relative  aspect-square w-12 shrink-0", {
						[classes.mediaWrapper]: firstImage,
					})}
				>
					{firstImage ? (
						<Media
							className={classes.media}
							imgClassName={classes.image}
							url={thumbnail || ""}
							fill
						/>
					) : (
						<NoImage />
					)}
				</div>

				<div className='min-w-56 lg:min-w-80 flex flex-col'>
					<Text comp='span' size='sm'>
						{title}
					</Text>
					<span className='fsSmall text-muted-foreground'>
						Размер: {item.variant.title}
					</span>
					<Price
						amount={Number(amount)}
						className={cn("block md:hidden", { hidden: isDisabled })}
					/>
				</div>
			</div>

			<div className='flex w-full grow justify-between gap-4 md:w-fit'>
				<Price
					amount={Number(amount)}
					className={cn("hidden md:block", { hidden: isDisabled })}
				/>
				<InputInc
					className='digits inline-flex'
					isDisabled={isDisabled}
					maxValue={inventory_quantity || 0}
					minValue={Math.min(1, inventory_quantity || 0)}
					onChangeValue={
						value => updateQuantity(item.id.toString(), "rub", value) //{ ...item, quantity: Math.min(value, stock!) }
					}
					defaultValue={Math.min(item.quantity, inventory_quantity || 0)}
				/>
				<RemoveButton
					isSubmitting={isSubmitting}
					onClick={() => removeItem(item.id, "rub")}
					variant={"primary"}
				/>
			</div>
		</div>
	);
}

export default CartListItem;

function RemoveButton({
	isSubmitting,
	onClick,
	variant,
}: {
	isSubmitting?: boolean;
	onClick: () => void;
	variant: VariantProps<typeof buttonVariants>["variant"];
}) {
	return (
		<Button
			aria-label='Удалить товар из корзины'
			aria-disabled={isSubmitting}
			className={buttonVariants({
				variant: "secondary",
				size: "cube",
				className:
					"m-0 rounded-xl bg-transparent p-0 transition-colors hover:bg-transparent/5",
			})}
			disabled={isSubmitting}
			onClick={e => {
				e.preventDefault();
				onClick();
				// toast.success(`Товар успешно удален из корзины!`, {
				//   style: TOAST_STYLE,
				// });
			}}
		>
			<Trash color='gray' className='size-3 md:size-4 hover:text-black' />
		</Button>
	);
}
