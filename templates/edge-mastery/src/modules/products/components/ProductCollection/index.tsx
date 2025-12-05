import type { Locale } from "next-intl";
import type { StoreRegion } from "@/modules/common/lib/get-region-action";
import { listProducts } from "../../actions/listProducts";
import type { StoreCollection } from "../../types";
import ProductsSlider from "./ProductSlider";

type ProductCollectionProps = {
	collection: StoreCollection;
	region: StoreRegion;
	isWishlisted: boolean;
	locale: Locale;
};

async function ProductsCollection({
	isLast,
	collection,
	region,
	isWishlisted,
	locale,
}: ProductCollectionProps & { isLast?: boolean }) {
	const {
		response: { products },
	} = await listProducts({
		locale,
		queryParams: {
			collection_id: collection.id,
			category_ids: collection?.category_id
				? [collection?.category_id]
				: undefined,
			fields:
				"*categories,*categories.parent_category,*variants.calculated_price",
		},
	});

	if (!products?.length) {
		return (
			<div className='text-center'>Products list (in collection) is empty</div>
		);
	}
	if (isLast) {
		// TODO: fix this
	}

	return (
		<ProductsSlider
			bestName={collection.title || ""}
			isWishlisted={isWishlisted}
			products={products}
		/>
	);
}

type ProductCollectionsProps = Omit<ProductCollectionProps, "collection"> & {
	collections?: StoreCollection[];
};

export async function ProductsCollections({
	collections,
	region,
	isWishlisted,
	locale,
}: ProductCollectionsProps) {
	return (
		<div className='space-y-8'>
			{collections?.map(collection => (
				<ProductsCollection
					isWishlisted={isWishlisted}
					key={collection.id}
					collection={collection}
					region={region}
					locale={locale}
				/>
			))}

			{collections?.length === 0 && (
				<div className='text-center'>Collections list is empty</div>
			)}
		</div>
	);
}

export default ProductsCollections;
