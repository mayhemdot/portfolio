"use client";

import { useWindowWidth } from "@react-hook/window-size";
import Image from "next/image";
import { useState } from "react";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { StoreImage } from "../../types";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// SwiperCore.use([Zoom])
// useWindowWidth
export function ImageGallerySlider({ images }: { images: StoreImage[] }) {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const windowWidth = useWindowWidth();
	//   const measure = useMeasure();
	return (
		<div className='relative grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6 xl:gap-8'>
			<div className='relative order-2 block md:order-1 md:col-span-1'>
				<div className='product-card-swiper bg-muted relative h-full max-h-full overflow-hidden rounded-lg'>
					<Swiper
						onSwiper={setThumbsSwiper}
						spaceBetween={10}
						slidesPerView='auto'
						freeMode={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className='product-images-slider-thumbs h-20 md:h-[500px]'
						direction={windowWidth > 768 ? "vertical" : "horizontal"}
					>
						{[...images]
							?.filter(image => Boolean(image.url))
							.map((image, index) => (
								<SwiperSlide
									key={image.id}
									className='size-full max-w-20 max-h-20'
								>
									<div className='roundProductCard size-full relative overflow-hidden rounded-2xl border border-[#2A2A2A]'>
										<Image
											src={image.url}
											alt={`Thumbnail ${index + 1}`}
											fill
											className='object-contain p-1'
										/>
									</div>
								</SwiperSlide>
							))}
					</Swiper>
				</div>
			</div>
			<div className='relative order-1 h-full max-h-[600px] md:order-2 md:col-span-5'>
				{
					<Swiper
						thumbs={{ swiper: thumbsSwiper }}
						spaceBetween={10}
						slidesPerView={1}
						freeMode={true}
						// autoHeight={true}
						watchSlidesProgress={true}
						modules={[Navigation, Thumbs]}
						direction='horizontal'
						zoom={true}
						className='h-full w-[90%] md:w-full'
					>
						{images.map((img, index) => (
							<SwiperSlide key={img.id} className='max-h-full cursor-pointer'>
								<Image
									src={img.url}
									alt={`Product thumbnail ${index + 1}`}
									width={1000}
									height={1000}
									className='size-full max-h-full max-w-full rounded-xl object-contain'
									// sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
								/>
							</SwiperSlide>
						))}
					</Swiper>
				}
			</div>
		</div>
	);
}
