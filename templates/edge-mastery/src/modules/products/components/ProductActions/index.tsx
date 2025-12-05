"use client";

// import { Button } from "@heroui/button";
import { isEqual } from "lodash";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { useCartStore } from "@/modules/cart/store/cart";
import { useIntersection } from "@/modules/common/hooks/use-in-view";
import type { StoreRegion } from "@/modules/common/lib/get-region-action";
import { Button } from "@/shared/components/ui/Button";
import type { StoreProduct, StoreProductVariant } from "../../types";
import { ProductFavoriteButton } from "../ProductFavorite";
import ProductPrice from "../ProductPrice";
import OptionSelect from "./option-select";

type ProductActionsProps = {
	product: StoreProduct;
	region: StoreRegion;
	isWishlisted: boolean;
	disabled?: boolean;
	// currencyCode: string;
};

const optionsAsKeymap = (variantOptions: StoreProductVariant["options"]) => {
	return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
		acc[varopt.option_id] = varopt.value;
		return acc;
	}, {});
};

export default function ProductActions({
	product,
	region,
	disabled,
	isWishlisted,
}: ProductActionsProps) {
	// console.log("REBUILD..............");
	const [options, setOptions] = useState<Record<string, string | undefined>>(
		{}
	);
	const [isAdding, setIsAdding] = useState(false);
	const t = useTranslations();
	const { addItem } = useCartStore();
	// If there is only 1 variant, preselect the options
	useEffect(() => {
		if (product.variants && product.variants?.length === 1) {
			const variantOptions = optionsAsKeymap(product.variants[0].options);
			setOptions(variantOptions ?? {});
		}
	}, [product.variants]);

	const selectedVariant = useMemo(() => {
		if (!product.variants || product.variants.length === 0) {
			return;
		}

		return product.variants.find(v => {
			const variantOptions = optionsAsKeymap(v.options);
			return isEqual(variantOptions, options);
		});
	}, [product.variants, options]);

	// update the options when a variant is selected
	const setOptionValue = (optionId: string, value: string) => {
		setOptions(prev => ({
			...prev,
			[optionId]: value,
		}));
	};

	//check if the selected options produce a valid variant
	const isValidVariant = useMemo(() => {
		return product.variants?.some(v => {
			const variantOptions = optionsAsKeymap(v.options);
			return isEqual(variantOptions, options);
		});
	}, [product.variants, options]);

	// check if the selected variant is in stock
	const inStock = useMemo(() => {
		// If we don't manage inventory, we can always add to cart
		if (selectedVariant && !selectedVariant.manage_inventory) {
			return true;
		}

		// If we allow back orders on the variant, we can add to cart
		if (selectedVariant?.allow_backorder) {
			return true;
		}

		// If there is inventory available, we can add to cart
		if (
			selectedVariant?.manage_inventory &&
			(selectedVariant?.inventory_quantity || 0) > 0
		) {
			return true;
		}

		// Otherwise, we can't add to cart
		return false;
	}, [selectedVariant]);

	const actionsRef = useRef<HTMLDivElement>(null);

	const inView = useIntersection(actionsRef, "0px");

	// console.log("[IN_VIEW]", selectedVariant?.calculated_price?.currency_code);
	// add the selected variant to the cart
	const handleAddToCart = (e: any) => {
		e.preventDefault();
		if (!selectedVariant?.id) return null;
		console.log("[ADD_TO_CART]", selectedVariant);
		const price = selectedVariant?.prices?.find(
			p => p.currency_code === region.currency_code
		);
		setIsAdding(true);
		// console.log("[ADD_TO_CART]", selectedVariant);
		// startTransition(async () => {
		addItem({
			images: product?.images,
			variant: selectedVariant,
			description: product?.description,
			name: product.title || "",
			price: price?.amount || 0,
			currency: price?.currency_code || "usd",
			// price: selectedVariant.calculated_price?.calculated_amount || 0,
			// currency: selectedVariant.calculated_price?.currency_code || "USD",
		});
		// });

		setIsAdding(false);
	};
	// console.log("[SELECT_VARIANT]", selectedVariant);
	return (
		<div className='flex flex-col gap-y-2 lg:gap-y-4' ref={actionsRef}>
			{(product.variants?.length ?? 0) > 1 && (
				<div className='flex flex-col gap-y-4'>
					{(product.options || []).map(option => {
						return (
							<div key={option.id}>
								<OptionSelect
									option={option}
									current={options[option.id]}
									updateOption={setOptionValue}
									title={option.title ?? ""}
									data-testid='product-options'
									disabled={!!disabled || isAdding}
								/>
							</div>
						);
					})}
				</div>
			)}

			<ProductPrice product={product} variant={selectedVariant} />

			<div className='flex items-center space-x-3 lg:space-x-4'>
				{isWishlisted && (
					<ProductFavoriteButton
						className='min-h-12 min-w-12'
						productVariantId={selectedVariant?.id ?? ""}
					/>
				)}
				<Button
					size='md'
					className='flex-1 cursor-pointer font-extralight'
					onClick={handleAddToCart}
					disabled={
						!inStock ||
						!selectedVariant ||
						!!disabled ||
						isAdding ||
						!isValidVariant
					}
					// isLoading={isAdding}
					data-testid='add-product-button'
				>
					{!selectedVariant && !options
						? t("product.selectVariantBtn") //"Select variant"
						: !inStock || !isValidVariant
						? t("product.outOfStockBtn") //"Out of stock" // "Add to cart"
						: t("product.addToCartBtn")}
				</Button>
			</div>
			{/* Mobile */}
		</div>
	);
}

/* <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
      /> */
