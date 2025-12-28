"use client";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
	type MouseEvent,
	type MouseEventHandler,
	useState,
} from "react";
import { LoaderSpin } from "@/components/elements/loader/LoaderSpin";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/modules/cart/store";
import { BASE_LINKS } from "@/modules/common/data/urls";
import type {
	StoreProduct,
	StoreProductVariant,
} from "@/modules/products/types";
import { Button as ButtonLink } from "../Button";

type AddToCartProps = {
	variant: StoreProductVariant;
	product?: StoreProduct;
	isSmall: boolean;
	className?: string;
};

const AddToCartButton = ({
	variant,
	product,
	isSmall,
	className,
}: AddToCartProps) => {
	const { addItem, isProductInCart } = useCartStore();
	// const { addItem, isProductInCart } = useCartStore();
	const router = useRouter();

	const [status, setStatus] = useState<{
		isLoading: boolean;
		isSubmitted: boolean;
	}>({
		isLoading: false,
		isSubmitted: false,
	});

	const addProductToCart: MouseEventHandler<HTMLButtonElement> = (
		e: MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		e.stopPropagation();

		if (!product) {
			throw new Error(
				"Для добавление в корзину необходима информация о продукте"
			);
		}

		if (!variant) {
			throw new Error("Продукта с такими параметрами не существует");
		}
		// const { ...productProps } = product;
		// const clonedProduct = {} as StoreProduct;
		// Object.assign(clonedProduct, product);
		// const { created_at, updated_at, ...params } = clonedProduct;

		// variant.product = { ...params };
		// Object.assign(variant.product!, product);
		console.log("variant", variant);
		addItem({
			variant: variant,
			name: product.title,
			price: variant.calculated_price?.calculated_amount || 0,
			currency: variant.calculated_price?.currency_code || "rub",
			images: product.images,
		});
		setStatus(prev => ({ ...prev, isLoading: true, isSubmitted: false }));
		const timeout = setTimeout(() => {
			setStatus(prev => ({ ...prev, isLoading: false, isSubmitted: true }));
		}, 400);
		return () => clearTimeout(timeout);
	};
	const [isInCart, setIsInCart] = useState<boolean>(false);

	React.useEffect(() => {
		console.log("isProductInCart(variant.id)", isProductInCart(variant.id));
		setIsInCart(isProductInCart(variant.id));
	}, [isProductInCart, variant]);

	if (isSmall) {
		return (
			<>
				{!status.isSubmitted && !isInCart ? (
					<Button
						size={"cube"}
						aria-label='Добавить в корзину'
						aria-disabled={status.isLoading || status.isSubmitted}
						disabled={status.isLoading || status.isSubmitted}
						onClick={addProductToCart}
						className='size-9 rounded-xl'
					>
						<span className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-black xl:block'>
							В корзину
						</span>
						{status.isLoading ? (
							<LoaderSpin className='size-4' />
						) : (
							<Plus className='size-4' />
						)}
					</Button>
				) : (
					<Link
						href={BASE_LINKS.CART}
						className={buttonVariants({
							size: "cube",
							className: "size-9! rounded-xl",
						})}
					>
						<span className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-black sm:flex'>
							<span>Корзина</span>
						</span>
						<ArrowRight className='size-4' />
					</Link>
				)}
			</>
		);
	} else {
		return (
			<ButtonLink
				disabled={status.isLoading}
				href={isInCart ? BASE_LINKS.CART : undefined}
				type={!isInCart ? "button" : undefined}
				label={isInCart ? `✓ В корзине` : `В корзину`}
				el={isInCart ? "link" : undefined}
				appearance={"default"}
				// className={[className, appearance === "default", !hasInitializedCart && classes.hidden].filter(Boolean).join(" ")}
				className={buttonVariants({
					variant: "default",
					className: className,
					// [!hasInitializedCart && classes.hidden]: "hidden",
				})}
				onClick={(e: MouseEvent<HTMLButtonElement>) => {
					e.preventDefault();
					if (isInCart) {
						router.push(BASE_LINKS.CART);
					} else {
						addProductToCart(e);
						setIsInCart(true);
					}
				}}
			>
				{status.isLoading ? (
					<LoaderSpin className='size-4' />
				) : (
					<Plus className='size-4' />
				)}
			</ButtonLink>
		);
	}
};

export default AddToCartButton;
