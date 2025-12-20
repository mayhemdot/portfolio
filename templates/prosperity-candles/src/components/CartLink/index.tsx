"use client";

import Link from "next/link";
import type React from "react";
import { Fragment, useEffect, useState } from "react";
import { useCartStore } from "@/modules/cart/store";
import classes from "./index.module.scss";

export const CartLink: React.FC<{
	className?: string;
}> = props => {
	const { className } = props;
	// const { cart } = useCart();
	const { items } = useCartStore();
	const [length, setLength] = useState<number>();

	useEffect(() => {
		setLength(items?.length || 0);
	}, [items]);

	return (
		<Link
			className={[classes.cartLink, className].filter(Boolean).join(" ")}
			href='/cart'
		>
			Cart
			{typeof length === "number" && length > 0 && (
				<small className={classes.quantity}>({length})</small>
			)}
		</Link>
	);
};
