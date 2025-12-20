import { restApi } from "@/app/_api/restApi";
import { Category } from "@/payload/payload-types";

import * as qs from "qs-esm";

export function getFilteredProductList<Inp, Err, IRes>(props: {
	initialData: Inp;
	relationTo: string;
	isSlider: boolean;
	enabled?: boolean;
	filters: {
		price: { min: number; max: number };
		categories: Category[];
		limit: number;
		sort: string;
	};
	// sort: string
	currentPage: number;
}) {
	const {
		relationTo,
		isSlider,
		filters,
		filters: { price, categories, sort, limit },
		currentPage,
		initialData,
		enabled,
	} = props;
	console.log(filters, "filters");
	const sliderStr = isSlider ? "slider" : "grid";

	// return useQuery<Inp, Err, IRes>({
	// 	queryKey: [relationTo, sliderStr, filters, sort, currentPage, limit],
	// 	initialData: initialData,
	// 	queryFn: async () =>
	// 		await restApi(
	// 			`/api/products/product-list${qs.stringify(
	// 				{
	// 					depth: 4,
	// 					limit,
	// 					page: currentPage,
	// 					sort,
	// 					where: {
	// 						"variations.stripePriceUnitAmount": {
	// 							greater_than_equal: price?.min || 0,
	// 							less_than_equal: price?.max || 0,
	// 						},
	// 						...(categories
	// 							? {
	// 									categories: {
	// 										in: categories,
	// 									},
	// 							  }
	// 							: {}),
	// 					},
	// 				},
	// 				{ addQueryPrefix: true }
	// 			)}`
	// 		),
	// 	enabled: !!filters.price,
	// });
	return [];
}

export function getFilteredInfinityProductList<Inp, Err, IResp>(props: {
	relationTo: string;
	filters: { categories: Category[] };
	sort: string;
	isSlider?: boolean;
}) {
	const {
		relationTo,
		isSlider,
		sort,
		filters: { categories },
	} = props;

	const sliderStr = isSlider ? "slider" : "grid";
	return [];
}

// export function getFilteredInfinityProductList<Inp, Err, IResp>(props: {
// 	relationTo: string;
// 	filters: { categories: Category[] };
// 	sort: string;
// 	isSlider?: boolean;
// }) {
// 	const {
// 		relationTo,
// 		isSlider,
// 		sort,
// 		filters: { categories },
// 	} = props;

// 	const sliderStr = isSlider ? "slider" : "grid";

// 	return useInfiniteQuery<
// 		Inp & { nextPage: number; prevPage: number },
// 		any,
// 		IResp
// 	>({
// 		queryKey: [sliderStr, relationTo, sort],
// 		initialPageParam: 1,
// 		queryFn: ({ pageParam }) => {
// 			return restApi(
// 				`/api/products/product-list${qs.stringify(
// 					{
// 						depth: 3,
// 						limit: 5,
// 						page: pageParam,
// 						sort,
// 						where: {
// 							...(categories
// 								? {
// 										categories: {
// 											in: categories,
// 										},
// 								  }
// 								: {}),
// 						},
// 					},
// 					{ addQueryPrefix: true }
// 				)}`
// 			);
// 		},
// 		// select: (data) => ({ ...data }),
// 		getNextPageParam: lastPage => lastPage?.nextPage,
// 		getPreviousPageParam: firstPage => firstPage?.prevPage,
// 	});
// }
