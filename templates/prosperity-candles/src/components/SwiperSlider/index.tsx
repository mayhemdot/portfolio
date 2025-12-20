import { FreeMode } from "swiper/modules";
import { Swiper, type SwiperProps, SwiperSlide } from "swiper/react";
import type { StoreProduct } from "@/modules/products/types";
import { Card } from "../Card";

function SwiperSlider({
	docs,
	relationTo = "products",
	...props
}: {
	relationTo: string;
	docs: (StoreProduct | number | string)[];
} & SwiperProps) {
	return (
		<Swiper
			{...props}
			className='relative h-auto max-w-full'
			modules={[FreeMode]}
			breakpoints={{
				1: { slidesPerView: 1, spaceBetween: 8 },
				320: { slidesPerView: 2, spaceBetween: 8 },
				640: {
					slidesPerView: 2,
					spaceBetween: 8,
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 8,
				},
				1024: { slidesPerView: 3, spaceBetween: 24 },
				1280: { slidesPerView: 4, spaceBetween: 24 },
				1720: { slidesPerView: 5, spaceBetween: 32 },
			}}
			freeMode={{
				enabled: true,
				minimumVelocity: 0.01,
				momentum: true,
				momentumRatio: 0.7,
			}}
			draggable={true}
			allowTouchMove={true}
			spaceBetween={16}
			loop={false}
		>
			{docs?.map((doc, i) => {
				if (typeof doc === "object" && doc !== null) {
					return (
						<SwiperSlide
							key={`${doc.title}-${i}`}
							style={{ height: "auto", maxWidth: "100%" }}
						>
							{/* <ProductCardItem key={result.title} product={result} /> */}
							<Card product={doc} relationTo={relationTo} showCategories />
						</SwiperSlide>
					);
				}
				return null;
			})}
		</Swiper>
	);
}

export default SwiperSlider;
