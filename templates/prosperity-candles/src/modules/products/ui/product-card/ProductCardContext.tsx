"use client";
import type { StaticImageData } from "next/image";
import type React from "react";
import {
	createContext,
	type Dispatch,
	type ReactNode,
	useContext,
	useState,
} from "react";
import type { Swiper as ISwiper } from "swiper/types";
import { fetchField } from "@/modules/cart/utils";
import type {
	StoreImage,
	StoreProduct,
	StoreProductVariant,
} from "@/modules/products/types";

// Определение типов
interface ProductCardContextType {
	sortedVariations: StoreProductVariant[];
	selectedProductVariation?: StoreProductVariant;
	product: StoreProduct;
	images: StoreImage[]; // You might want to type this more strictly, e.g., { url: string; alt: string; }[]
	selectedProductVariationId: StoreProductVariant["id"] | null;
	selectProductVariationId: Dispatch<
		React.SetStateAction<StoreProductVariant["id"] | null>
	>;
	hasVariations: boolean;
	thumbsSwiper: ISwiper | null;
	setThumbsSwiper: Dispatch<React.SetStateAction<ISwiper | null>>;
}

const ProductCardContext = createContext<ProductCardContextType | undefined>(
	undefined
);

export const ProductCardProvider: React.FC<{
	children: ReactNode;
	product: StoreProduct;
}> = ({ product, children }) => {
	const { images = [], variants = [] } = product;
	// const images = typeof metaImage === "object" ? [metaImage] : [];

	const hasVariations =
		variants && Array.isArray(variants) && variants.length > 0;

	const [selectedProductVariationId, selectProductVariationId] = useState<
		string | null
	>(
		hasVariations
			? variants.map(pv => fetchField(pv, "id")).at(0)
			: // .filter(pv => (fetchField(pv, "stock") || 0) > 0 || false)
			  // .map(pv => fetchField(pv, "id"))
			  // .at(0)
			  null
	);
	const selectedProductVariation = variants?.find(
		pv => fetchField(pv) === selectedProductVariationId
	);

	const [thumbsSwiper, setThumbsSwiper] = useState<ISwiper | null>(null);

	const sortedVariations = hasVariations
		? variants.sort(
				(a, b) =>
					(a?.calculated_price?.calculated_amount || 0) -
					(b?.calculated_price?.calculated_amount || 0)
		  )
		: [];
	return (
		<ProductCardContext.Provider
			value={{
				setThumbsSwiper,
				thumbsSwiper,
				product,
				hasVariations,
				selectProductVariationId,
				selectedProductVariationId,
				selectedProductVariation,
				sortedVariations: sortedVariations,
				images,
			}}
		>
			{children}
		</ProductCardContext.Provider>
	);
};

// Хук для использования контекста
export const useProductCardContext = (): ProductCardContextType => {
	const context = useContext(ProductCardContext);
	if (!context) {
		throw new Error(
			"useThumbnailContext must be used within a ThumbnailProvider"
		);
	}
	return context;
};
