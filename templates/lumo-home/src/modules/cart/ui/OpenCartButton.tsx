"use client";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
// import { buttonVariants } from "@/shared/components/ui/button";
import { useCartItems } from "../model/helpers";
import { btnVariants } from "@/shared/components/ui/button";

export function CartButton() {
	const cartItems = useCartItems();

	return (
		<button
			type='button'
			className={btnVariants({
				variant: "outline",
				size: "icon",
				className: "relative flex cursor-pointer items-center justify-center",
			})}
		>
			<Badge className='size-4 -translate-y-1/6 absolute right-0 top-0 w-fit translate-x-1/2 rounded-full'>
				{cartItems?.length || 0}
			</Badge>
			<ShoppingCartIcon />
		</button>
	);
}
