"use client";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { type MouseEvent, type MouseEventHandler, useState } from "react";
import { LoaderSpin } from "@/components/elements/loader/LoaderSpin";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/modules/cart/store";
import { BASE_LINKS } from "@/modules/common/data/urls";
import type {
	StoreProduct,
	StoreProductVariant,
} from "@/modules/products/types";

type AddToCartProps = {
	variant: StoreProductVariant;
	product?: StoreProduct;
};

const AddToCartButton = ({ variant, product }: AddToCartProps) => {
	const { addItem } = useCartStore();

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

		// Add product in the product variation object
		const { variants, ...productProps } = product;
		variant.product = {
			...productProps,
		};

		addItem({
			variant: variant,
			name: product.title,
			price: variant.calculated_price?.calculated_amount || 0,
			currency: variant.calculated_price?.currency_code || "rub",
			images: product.images,
			// isSelected: true,
			// id: variant.id.toString(),
		});

		setStatus(prev => ({ ...prev, isLoading: true, isSubmitted: false }));

		const timeout = setTimeout(() => {
			setStatus(prev => ({ ...prev, isLoading: false, isSubmitted: true }));
		}, 1000);
		return () => clearTimeout(timeout);
	};

	return (
		<>
			{!status.isSubmitted ? (
				<Button
					size={"cube"}
					aria-label='Добавить в корзину'
					aria-disabled={status.isLoading || status.isSubmitted}
					disabled={status.isLoading || status.isSubmitted}
					onClick={addProductToCart}
					className='size-9 rounded-xl'
				>
					<span className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-black sm:block'>
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
};
export default AddToCartButton;
