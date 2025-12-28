import type { SortOptions } from "@/app/(pages)/(public)/products/_old/SortProducts";
import { CollectionArchive } from "@/components/CollectionArchive";
import { Breadcrumbs } from "@/components/elements/Breadcrumbs";
import { SITE_DESCRIPTION, SITE_NAME } from "@/modules/common/data/constants";
import { PRODUCTS } from "@/modules/products/data";
import { generateMeta } from "@/utilities/generateMeta";

type Props = {
	searchParams: Promise<{
		sortBy?: SortOptions;
		page?: string;
		price_min?: string;
		price_max?: string;
		categories?: string[];
	}>;
	params: Promise<{
		locale: string;
	}>;
};

export async function generateMetadata() {
	return generateMeta({
		doc: {
			slug: "/products",
			meta: {
				title: `${SITE_NAME} - Каталог`,
				description: SITE_DESCRIPTION,
				image: null,
			},
		},
	});
}

// export const loadSearchParams = createLoader({
// 	categories: parseAsArrayOf(parseAsString).withDefault([]),
// });

export default async function ({ searchParams }: Props) {
	// const { sortBy, page: pageNumber, price_min, price_max } = await searchParams;

	return (
		<div>
			<Breadcrumbs
				breadcrumbs={[
					{ id: 1, name: "Главная", href: "/" },
					{ id: 2, name: "Каталог", href: `` },
				]}
			/>
			<div className='content-section mx-auto'>
				<CollectionArchive
					slider={false}
					relationTo={"products"}
					docs={PRODUCTS}
				/>
			</div>
		</div>
	);
}
