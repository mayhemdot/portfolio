// import { cn } from "@/react"

// import type { HttpTypes } from "@medusajs/types";
// import { LocalizedClientLink } from "@modules/common/components/localized-client-link";
// import { ProductFavoriteButton } from "@modules/products/components/product-favorite"
// import PreviewPrice from "@modules/products/components/product-preview/price";
// import type { StoreRegion } from "@modules/store/types";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import type { StoreRegion } from "@/modules/common/lib/get-region-action";
import { Text } from "@/shared/components/Text";
import { cn } from "@/shared/utils/cn";
import { LocalizedClientLink } from "../../../common/components/LocalizedClientLink";
import type { StoreProductVariant, StoreProduct } from "../../types";
import { ProductFavoriteButton } from "../ProductFavorite";
import PreviewPrice from "./PricePreview";
import { Chip } from "@heroui/chip";

type ProductPreviewProps = {
	product: StoreProduct;
	variants?: StoreProductVariant[];
	type?: "line" | "default";
	isWishlisted?: boolean;
	region: StoreRegion | null;
	className?: string;
	isFeatured?: boolean;
	defaultIsWishlisted?: boolean;
};

export const ProductPreview: FC<ProductPreviewProps> = ({
	variants,
	product,
	className,
	region,
	isFeatured,
	isWishlisted = false,
	defaultIsWishlisted = false,
	type = "default",
}) => {
	// const { cheapestPrice } = getProductPrice({
	//   product,
	// })
	const t = useTranslations();
	return (
		<div
			className={cn(
				"fl-px-12/24 fl-py-12/24 group relative flex grow flex-col gap-2 rounded-2xl border border-[#2A2A2A] md:gap-4",
				className,
				{
					"w-full rounded-xl p-3 transition-colors hover:bg-default/40 md:flex-row md:items-end":
						type === "line",
				}
			)}
		>
			{/* <AddToCartButton
        className={cn("bottom-2 right-2 invisible", {
          "top-4 right-4 visible": type === "line",
        })}
      /> */}

			<div className='size-full sm:min-w-40 relative min-w-full grow space-y-2 rounded-2xl md:min-w-[220px]'>
				<div className='absolute flex w-full max-w-full flex-col flex-wrap justify-between gap-x-1 leading-normal xl:flex-row'>
					{/* {isWishlisted ? (
            <ProductFavoriteButton
              defaultIsWishlisted={defaultIsWishlisted}
              productVariantId={product?.variants?.[0]?.id || variants?.[0]?.id}
              className={cn("bottom-2 right-2 hidden", {
                "top-4 right-4 absolute flex": type === "line",
              })}
            />
          ) : null} */}
					{/* <h3 className="fsNormal">{product.title}</h3>{" "} */}
					<Text font='mono' size='xs' variant='secondary'>
						{product.title}
					</Text>
					{product?.variants?.[0]?.calculated_price && (
						<PreviewPrice product={product} />
					)}
				</div>
				<div className='relative w-full max-w-full'>
					<LocalizedClientLink
						href={`/products/${product.handle}`}
						className='size-full relative z-0 w-full max-w-full'
					>
						<div
							className={
								"roundProductCard md:aspect-3/2 aspect-3/4 relative z-0 flex w-full max-w-full items-center justify-center group-hover:border-primary/60"
							}
						>
							<Image
								src={
									product?.images?.[0].url ||
									product?.thumbnail ||
									"/placeholder.svg"
								}
								fill
								alt=''
								className='z-10 w-full max-w-full object-contain'
							/>
						</div>
					</LocalizedClientLink>
					{/* {isWishlisted ? (
            <ProductFavoriteButton
              defaultIsWishlisted={defaultIsWishlisted}
              productVariantId={product?.variants?.[0]?.id || variants?.[0]?.id}
              className={cn("absolute bg-default top-2 right-2 z-20", {
                hidden: type === "line",
              })}
            />
          ) : null} */}
				</div>
			</div>
			{/* <div className='size-full relative flex flex-1 gap-2 md:gap-4'> */}
			{/* <div className={"info flex flex-1 flex-col gap-1 basis-2/3 fsSmall"}>
          <div className="flex justify-between gap-2 md:gap-4">
            <span>{t("product.weight")}</span>
            <span>{product?.weight ? `${product?.weight}g` : "-"}</span>
          </div>
          <div className="flex justify-between gap-2 md:gap-4">
            <span>{t("product.dimensions")}</span>
            <span>
              {(product?.height &&
                product?.length &&
                product?.width &&
                `${product?.height}x${product?.length}x${product?.width}`) ||
                "-"}
            </span>
          </div>
          <div className="flex justify-between gap-2 md:gap-4">
            <span>Твердость</span>
            <span>{product?.hardness || "-"}</span>
          </div>
        </div> */}
			{/* <div className='flex basis-1/3'>
					<div className={"marks flex flex-col gap-2"}>
						{product?.categories?.map(category => (
							<Chip
								key={category?.id}
								color='warning'
								size='lg'
								variant={"faded"}
							>
								{category?.name || "-"}
							</Chip>
						))}{" "}
					</div>
				</div> */}
			{/* </div> */}
		</div>
	);
};
