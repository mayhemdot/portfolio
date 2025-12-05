import type { Locale } from "next-intl";
import { Pagination } from "@/modules/common/components/Pagination";
import { getCountryCodeFromLocale } from "@/modules/common/lib/get-region";
import { getRegion } from "@/modules/common/lib/get-region-action";
import { listProductsWithSort } from "@/modules/products/actions/listProducts";
import { ProductPreview } from "@/modules/products/components/ProductPreview";
import type { SortOptions } from "../components/SortProducts";
import { CATEGORIES } from "@/modules/products/constants";

const PRODUCT_LIMIT = 10;

type PaginatedProductsParams = {
	limit: number;
	collection_id?: string[];
	category_id?: string[];
	id?: string[];
	order?: string;
};

export default async function PaginatedProducts({
	sortBy,
	page,
	collectionId,
	categoryId,
	selectedCategories,
	productsIds,
	locale,
	priceBoundaries,
	isWishlisted,
}: {
	sortBy?: SortOptions;
	page: number;
	collectionId?: string;
	selectedCategories?: string[];
	categoryId?: string;
	productsIds?: string[];
	locale: Locale;
	priceBoundaries?: { min?: string; max?: string };
	isWishlisted: boolean;
}) {
	const queryParams: PaginatedProductsParams = {
		// limit: 12,
		limit: PRODUCT_LIMIT,
	};

	if (collectionId) {
		queryParams["collection_id"] = [collectionId];
	}

	if (categoryId) {
		queryParams["category_id"] = [categoryId];
	}
	if (selectedCategories?.length) {
		queryParams["category_id"] = selectedCategories;
	} else {
		queryParams["category_id"] = [CATEGORIES[0].id];
	}

	if (productsIds) {
		queryParams["id"] = productsIds;
	}

	if (sortBy === "created_at") {
		queryParams["order"] = "created_at";
	}

	// [TODO] price boundaries
	// if (priceBoundaries?.min) {
	//   queryParams["variants.calculated_price.calculated_amount[$gt]"] =
	//     priceBoundaries.min
	// }

	// if (priceBoundaries?.max) {
	//   queryParams["variants.calculated_price.calculated_amount[$lt]"] =
	//     priceBoundaries.max
	// }

	const countryCode = getCountryCodeFromLocale(locale);
	const region = await getRegion(countryCode);

	if (!region) {
		return null;
	}

	const {
		response: { products, count },
	} = await listProductsWithSort({
		page,
		queryParams,
		sortBy,
		locale,
	});
	console.log("products", products);

	const totalPages = Math.ceil(count / PRODUCT_LIMIT);

	const min = priceBoundaries?.min ? parseInt(priceBoundaries.min, 10) : 0;
	const max = priceBoundaries?.max ? parseInt(priceBoundaries.max, 10) : 0;

	let filteredProducts = products;
	if (max) {
		filteredProducts = products.filter(p =>
			p?.variants?.some(
				v =>
					!v.calculated_price?.calculated_amount ||
					(v.calculated_price?.calculated_amount >= min &&
						v.calculated_price?.calculated_amount <= max)
			)
		);
	}

	return (
		<>
			<ul
				className='3xl:grid-cols-4 fl-gap-16/24 grid w-full grid-cols-2 md:grid-cols-3'
				data-testid='products-list'
			>
				{filteredProducts?.map(product => {
					return (
						<li key={product.id}>
							<ProductPreview
								isFeatured={false}
								isWishlisted={isWishlisted}
								product={product}
								region={region}
							/>
						</li>
					);
				})}
			</ul>
			{totalPages > 1 && (
				<Pagination
					data-testid='product-pagination'
					page={page}
					totalPages={totalPages}
				/>
			)}
		</>
	);
}
