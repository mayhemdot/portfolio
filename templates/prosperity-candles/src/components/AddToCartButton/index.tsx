// "use client";

// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { buttonVariants } from "@/components/ui/button";
// import { useCartStore } from "@/modules/cart/store";
// import type {
// 	StoreProduct,
// 	StoreProductVariant,
// } from "@/modules/products/types";
// import { Button, type Props } from "../Button";
// import classes from "./index.module.scss";

// export const AddToCartButton: React.FC<{
// 	variant: StoreProductVariant;
// 	product: StoreProduct;
// 	quantity?: number;
// 	className?: string;
// 	appearance?: Props["appearance"];
// }> = props => {
// 	const {
// 		variant,
// 		product,
// 		quantity = 1,
// 		className,
// 		appearance = "primary",
// 	} = props;
// 	const { ...productProps } = product;

// 	variant.product = {
// 		...productProps,
// 	};

// 	const { addItem, isProductInCart } = useCartStore();

// 	const [isInCart, setIsInCart] = useState<boolean>();
// 	const router = useRouter();

// 	React.useEffect(() => {
// 		setIsInCart(isProductInCart(variant.id));
// 	}, [isProductInCart, variant]);
// 	console.log("variant.calculated_price?.calculated_amount", variant);
// 	return (
// 		<Button
// 			href={isInCart ? "/cart" : undefined}
// 			type={!isInCart ? "button" : undefined}
// 			label={isInCart ? `✓ В корзине` : `В корзину`}
// 			el={isInCart ? "link" : undefined}
// 			appearance={appearance}
// 			// className={[className, appearance === "default", !hasInitializedCart && classes.hidden].filter(Boolean).join(" ")}
// 			className={buttonVariants({
// 				variant: "default",
// 				className: className,
// 				// [!hasInitializedCart && classes.hidden]: "hidden",
// 			})}
// 			onClick={() => {
// 				if (isInCart) {
// 					router.push("/cart");
// 				} else {
// 					addItem({
// 						variant,
// 						name: product.title,
// 						price: variant.calculated_price?.calculated_amount || 0,
// 						currency: variant.calculated_price?.currency_code || "ru",
// 						images: variant.product?.images,
// 					});
// 				}
// 			}}
// 		/>
// 	);
// };
