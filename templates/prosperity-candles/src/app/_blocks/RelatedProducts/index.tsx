"use client";
import type React from "react";
import { Gutter } from "@/components/Gutter";
import SwiperSlider from "@/components/SwiperSlider";
import { Text } from "@/components/Text";

import type { StoreProduct } from "@/modules/products/types";
import classes from "./index.module.scss";

export type RelatedProductsProps = {
	blockType: "relatedProducts";
	blockName: string;
	introContent?: any;
	docs?: (StoreProduct | number)[];
	relationTo: "products";
};

export const RelatedProducts: React.FC<RelatedProductsProps> = props => {
	const { introContent, docs, relationTo } = props;

	if (!docs?.length) return null;

	return (
		<div className={classes.relatedProducts}>
			{introContent && (
				// <Gutter className={cn(classes.introContent, 'fsMiddle')}>  <RichText content={introContent} /></Gutter>
				<div className='mb-8 w-full text-left md:mb-12'>
					<Text comp={"h3"} variant={"primary"} size={"md"}>
						{introContent}
					</Text>
				</div>
			)}
			<Gutter>
				<SwiperSlider docs={docs} relationTo={relationTo} />
			</Gutter>
		</div>
	);
};
