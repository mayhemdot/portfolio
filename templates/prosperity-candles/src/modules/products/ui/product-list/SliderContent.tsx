import { useState } from "react";
import type { Swiper } from "swiper/types";
import SwiperSlider from "@/components/SwiperSlider";
import type { StoreCategory, StoreProduct } from "@/modules/products/types";

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
	const pages = docs?.map(doc => doc as StoreProduct) || [];
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

	const handleSlideChange = (swiper: Swiper) => {
		// Если активный слайд — последний, загружаем следующую страницу
		const total =
			pages?.reduce((prev, page) => prev + docs?.length || 0, 0) || 0;
		if (
			(swiper.activeIndex === swiper.slides.length - 1 && hasNextPage) ||
			(hasNextPage && total && slidesPerView + 1 > total)
		) {
			fetchNextPage();
		}
	};

	const handleSwiperUpdate = (swiper: Swiper) =>
		setSlidesPerView((swiper.params.slidesPerView as number) || 1);

	// if (isLoading) return <SkeletonCard />;
	const hasNextPage = false;

	function fetchNextPage() {}
	return (
		<SwiperSlider
			onResize={handleSwiperUpdate}
			onInit={handleSwiperUpdate}
			onSlideChange={swiper => handleSlideChange(swiper)} //handleSlideChange
			onReachEnd={() => hasNextPage && fetchNextPage()}
			relationTo={relationTo}
			docs={docs} //[...results?.pages?.flatMap(page => page.docs)]
		/>
	);
}
