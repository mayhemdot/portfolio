import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { StoreRegion } from "@/modules/common/lib/get-region-action";
import ProductsCollections from "@/modules/products/components/ProductCollection";
import type { StoreCollection } from "@/modules/products/types";
import { Text } from "@/shared/components/Text";

type ProductCollectionProps = {
	region: StoreRegion;
	isWishlisted: boolean;
};

type Props = Omit<ProductCollectionProps, "collection"> & {
	collections?: StoreCollection[];
	title: string;
	locale: Locale;
};

export async function BestProducts({
	isWishlisted,
	title,
	collections,
	region,
	locale,
}: Props) {
	return (
		<section className='padding-x-4-8-16 z-2 min-h-dvh relative block bg-background pb-16 lg:pb-32'>
			<Text
				size='lg'
				variant='gradient'
				comp='h2'
				className='py-8 uppercase lg:py-16'
			>
				{/* Best for you */}
				{title}
			</Text>

			<ProductsCollections
				isWishlisted={isWishlisted}
				collections={collections}
				region={region}
				locale={locale}
			/>
			{/* <ProductsCollections isWishlisted={isWishlisted} collections={collections} region={region} /> */}
		</section>
	);
}
