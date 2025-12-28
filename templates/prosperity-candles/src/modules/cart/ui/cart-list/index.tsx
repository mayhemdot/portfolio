import React from "react";
import { Table } from "@/components/elements/Table";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { CartLineItem } from "@/modules/cart/store";
import CartListItem from "./CartListItem";

type CartListProps = {
	items: CartLineItem[];
	isSubmitting?: boolean;
};

function CartList({ items, ...rest }: CartListProps) {
	// const isExisted = items?.filter((item) => item.variant.in_stock != 0 && item.variant.in_stock - item.quantity >= 0);
	const existedItems = items.filter(
		item => (item.variant.calculated_price?.calculated_amount || 0) > 0
	);
	const notExistedItems = items.filter(
		item => (item.variant.calculated_price?.calculated_amount || 0) === 0
	);

	return (
		<>
			{existedItems?.length ? (
				<CartListTable
					title={"В корзине"}
					items={existedItems}
					isDisabled={false}
					{...rest}
				/>
			) : null}
			{notExistedItems?.length ? (
				<CartListTable
					title={"Недоступны для заказа"}
					isDisabled={true}
					items={notExistedItems}
					{...rest}
				/>
			) : null}
		</>
	);
}

function CartListTable({
	title,
	items,
	isDisabled = false,
	...rest
}: {
	title?: string;
	items: CartLineItem[];
	isDisabled?: boolean;
	isSubmitting?: boolean;
}) {
	return (
		<>
			{title && <div className='mt-8'>{title}</div>}
			<Card className={cn("relative w-full max-w-full grow")}>
				<CardContent className='mt-8'>
					<Table>
						{items?.map((item, index) => (
							<React.Fragment key={`cart-${item.variant?.id}`}>
								<CartListItem
									item={item}
									index={index}
									isDisabled={isDisabled}
									{...rest}
								/>
								{index !== (items?.length || 0) - 1 ? (
									<Separator className='my-4' />
								) : null}
							</React.Fragment>
						))}
					</Table>
				</CardContent>
			</Card>
		</>
	);
}

export default CartList;
