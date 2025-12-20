import { useState } from "react";
import SwiperSlider from "@/components/SwiperSlider";
import type { StoreCategory, StoreProduct } from "@/modules/products/types";
import classes from "./../index.module.scss";

export function SliderContent({
	docs,
	sort,
	categories,
	relationTo,
}: {
	docs: (StoreProduct | string | number)[];
	sort: string;
	categories: StoreCategory[];
	relationTo: string;
}) {
	// const {
	// 	data: results,
	// 	isLoading,
	// 	error,
	// 	fetchNextPage,
	// 	hasNextPage,
	// } = getFilteredInfinityProductList<
	// 	Result,
	// 	any,
	// 	{ pages: Result[]; pageParams?: number }
	// >({
	// 	relationTo,
	// 	sort,
	// 	filters: { categories },
	// });

	const [slidesPerView, setSlidesPerView] = useState(1);

	// const handleSlideChange = swiper => {
	// 	// Если активный слайд — последний, загружаем следующую страницу
	// 	const total =
	// 		results?.pages?.reduce(
	// 			(prev, page) => prev + page?.docs?.length || 0,
	// 			0
	// 		) || 0;
	// 	if (
	// 		(swiper.activeIndex === swiper.slides.length - 1 && hasNextPage) ||
	// 		(hasNextPage && total && slidesPerView + 1 > total)
	// 	) {
	// 		fetchNextPage();
	// 	}
	// };

	const handleSwiperUpdate = (swiper: any) =>
		setSlidesPerView(swiper.params.slidesPerView || 1);

	// if (isLoading) return <SkeletonCard />;
	const hasNextPage = false;

	function fetchNextPage() {}
	return (
		<SwiperSlider
			onResize={handleSwiperUpdate}
			onInit={handleSwiperUpdate}
			onSlideChange={(swiper: any) => console.log("onSlideChange")} //handleSlideChange
			onReachEnd={() => hasNextPage && fetchNextPage()}
			relationTo={relationTo}
			docs={docs} //[...results?.pages?.flatMap(page => page.docs)]
		/>
	);
}
