"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import NoImage from "@/components/elements/NoImage";
import { cn } from "@/lib/utils";
import type { StoreProduct } from "@/modules/products/types";
import { Media } from "../Media";
import { Price } from "../Price";
import { Text } from "../Text";

import classes from "./index.module.scss";

type Args = {
	alignItems?: "center";
	className?: string;
	showCategories?: boolean;
	hideImagesOnMobile?: boolean;
	title?: string;
	relationTo?: string; // 'products'
	product?: StoreProduct;
};

export function Card(props: Args) {
	const {
		showCategories,
		title: titleFromProps,
		product,
		product: { slug, title, categories, variants } = {},
		className,
	} = props;

	// const { image: metaImage } = meta || {};

	const hasCategories =
		categories && Array.isArray(categories) && categories.length > 0;

	const hasVariations =
		variants && Array.isArray(variants) && variants.length > 0;

	// const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space

	const [variationId, setVariationId] = useState<null | number | string>(
		hasVariations ? variants[0]?.id : 0
	);

	const selectedProductVariation = variants?.find(pv => pv.id === variationId);

	return (
		<div key={slug || title} className={cn(classes.card, "group", className)}>
			<Link href={`/products/${slug}`} className={cn(classes.cardLink)}>
				{product?.images?.[0].url ? (
					<Image
						className={cn(classes.cardImage, "group-hover:scale-105")}
						src={product?.images?.[0].url}
						fill
						alt={title || slug || "card image"}
					/>
				) : (
					<NoImage />
				)}
			</Link>
			<div className={"grid w-full grid-cols-1 space-y-3 md:grid-cols-6"}>
				<Text
					comp={"h3"}
					size={"smd"}
					variant={"primary"}
					className='col-span-6 line-clamp-2 min-h-[3em]'
				>
					{titleFromProps || title}
				</Text>
				<div className='col-span-6 flex items-center gap-2'>
					{hasVariations
						? variants?.map(variation => (
								<button
									type='button'
									key={variation.id}
									className={cn(
										"fsNormal digits bg-beige-color flex h-9 flex-1 cursor-pointer items-center justify-center rounded-xl py-1 text-center ",
										{
											"bg-dark-color text-white": variationId === variation.id,
										}
									)}
									onClick={() => setVariationId(variation.id)}
								>
									{typeof variation === "object" ? `${variation.title}` : ""}
								</button>
						  ))
						: null}
				</div>
				<div className='bg-beige-color relative col-span-6 flex w-full items-center justify-between rounded-2xl py-2 pl-4 pr-2'>
					{selectedProductVariation ? (
						<>
							<div className={"digits flex items-center gap-1"}>
								{/* <Price product={product} button={false} /> */}
								{product && (
									<Price variant={selectedProductVariation} size={"smd"} />
								)}
							</div>
							<AddToCartButton
								variant={selectedProductVariation}
								product={product}
							/>
						</>
					) : (
						<span>Добавьте варианты товара</span>
					)}
				</div>
			</div>
		</div>
	);
}

///////////////////////////////////////////////////////////////////////////////////////////
// const priceFromJSON = (priceJSON): string => {
//   let price = ''

//   if (priceJSON) {
//     try {
//       const parsed = JSON.parse(priceJSON)?.data[0]
//       const priceValue = parsed.unit_amount
//       const priceType = parsed.type
//       price = `${parsed.currency === 'usd' ? '$' : ''}${(priceValue / 100).toFixed(2)}`
//       if (priceType === 'recurring') {
//         price += `/${
//           parsed.recurring.interval_count > 1
//             ? `${parsed.recurring.interval_count} ${parsed.recurring.interval}`
//             : parsed.recurring.interval
//         }`
//       }
//     } catch (e) {
//       console.error(`Cannot parse priceJSON`) // eslint-disable-line no-console
//     }
//   }

//   return price
// }
///////////////////////////////////////////////////////////////////////////////////////////

// const priceFromJSON = (priceJSON): string => {
//   let price = ''

//   if (priceJSON) {
//     try {
//       const parsed = JSON.parse(priceJSON)?.data[0]
//       const priceValue = parsed.unit_amount
//       const priceType = parsed.type
//       price = `${parsed.currency === 'usd' ? '$' : ''}${(priceValue / 100).toFixed(2)}`
//       if (priceType === 'recurring') {
//         price += `/${
//           parsed.recurring.interval_count > 1
//             ? `${parsed.recurring.interval_count} ${parsed.recurring.interval}`
//             : parsed.recurring.interval
//         }`
//       }
//     } catch (e) {
//       console.error(`Cannot parse priceJSON`) // eslint-disable-line no-console
//     }
//   }

//   return price
// }

// const [
//   price, // eslint-disable-line no-unused-vars
//   setPrice,
// ] = useState(() => priceFromJSON(priceJSON));

// useEffect(() => {
//   setPrice(priceFromJSON(priceJSON));
// }, [priceJSON]);

// export const CardOld: React.FC<{
//   alignItems?: "center";
//   className?: string;
//   showCategories?: boolean;
//   hideImagesOnMobile?: boolean;
//   title?: string;
//   relationTo?: "products";
//   doc?: Product;
// }> = (props) => {
//   const { showCategories, title: titleFromProps, doc, doc: { slug, title, categories, meta, priceJSON } = {}, className } = props;

//   const { description, image: metaImage } = meta || {};

//   const hasCategories = categories && Array.isArray(categories) && categories.length > 0;
//   const titleToUse = titleFromProps || title;
//   const sanitizedDescription = description?.replace(/\s/g, " "); // replace non-breaking space with white space
//   const href = `/products/${slug}`;

//   const [
//     price, // eslint-disable-line no-unused-vars
//     setPrice,
//   ] = useState(() => priceFromJSON(priceJSON));

//   useEffect(() => {
//     setPrice(priceFromJSON(priceJSON));
//   }, [priceJSON]);

//   return (
//     <div className={[classes.card, className].filter(Boolean).join(" ")}>
//       <Link href={href} className={classes.mediaWrapper}>
//         {!metaImage && <div className={classes.placeholder}>No image</div>}
//         {metaImage && typeof metaImage !== "string" && <Media imgClassName={classes.image} resource={metaImage} fill />}
//       </Link>
//       <div className={classes.content}>
//         {showCategories && hasCategories && (
//           <div className={classes.leader}>
//             {showCategories && hasCategories && (
//               <div>
//                 {categories?.map((category, index) => {
//                   if (typeof category === "object" && category !== null) {
//                     const { title: titleFromCategory } = category;

//                     const categoryTitle = titleFromCategory || "Untitled category";

//                     const isLast = index === categories.length - 1;

//                     return (
//                       <Fragment key={index}>
//                         {categoryTitle}
//                         {!isLast && <Fragment>, &nbsp;</Fragment>}
//                       </Fragment>
//                     );
//                   }

//                   return null;
//                 })}
//               </div>
//             )}
//           </div>
//         )}
//         {titleToUse && (
//           <h4 className={classes.title}>
//             <Link href={href} className={classes.titleLink}>
//               {titleToUse}
//             </Link>
//           </h4>
//         )}
//         {description && <div className={classes.body}>{description && <p className={classes.description}>{sanitizedDescription}</p>}</div>}
//         {doc && <Price product={doc} />}
//       </div>
//     </div>
//   );
// };
