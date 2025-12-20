import type React from "react";
import { useCartStore } from "@/modules/cart/store";
import type { StoreProductVariant } from "@/modules/products/types";
import classes from "./index.module.scss";

export const RemoveFromCartButton: React.FC<{
	className?: string;
	variant: StoreProductVariant;
}> = props => {
	const { className, variant } = props;

	const { removeItem, isProductInCart } = useCartStore();

	const productIsInCart = isProductInCart(variant.id);

	if (!productIsInCart) {
		return <div>Item is not in the cart</div>;
	}

	return (
		<button
			type='button'
			onClick={() => {
				removeItem(
					variant.id,
					variant.calculated_price?.currency_code || "rub"
				);
			}}
			className={[className, classes.removeFromCartButton]
				.filter(Boolean)
				.join(" ")}
		>
			Remove
		</button>
	);
};
