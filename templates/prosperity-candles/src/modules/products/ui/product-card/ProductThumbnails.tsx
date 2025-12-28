"use client";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Media } from "@/components/Media";
import { useProductCardContext } from "./ProductCardContext";

function ProductThumbnails() {
	const { setThumbsSwiper, images } = useProductCardContext();
	return (
		<>
			{/* {loaded ? (
        <div className="flex max-w-full w-full gap-4">
          {Array([]).map((_: number, i: number) => (
            <div
              key={i}
              className="h-full w-32 aspect-square rounded-2xl border border-dark-color"
            ></div>
          ))}
        </div>
      ) : ( */}
			{images?.length > 0 && (
				<Swiper
					modules={[Thumbs]}
					watchSlidesProgress
					onSwiper={p => setThumbsSwiper(p)}
					className='mr-auto! ml-0! relative h-40 w-20 overflow-hidden rounded-3xl md:h-64 md:w-32 2xl:h-[512px] 2xl:w-64'
					effect={"fade"}
					direction='vertical'
					slidesPerView={2}
					allowTouchMove={true}
					spaceBetween={16}
					loop={false}
					// pagination={{ type: "bullets", clickable: true }}
				>
					{images
						.filter(image => typeof image?.url === "string")
						.map((image, index) => (
							<SwiperSlide
								key={`thumbnail-image-${image.id}-${index}`}
								className='aspect-square w-20 grayscale md:w-32 xl:w-64'
							>
								<Media
									imgClassName={
										"rounded-3xl h-full object-cover transition-all"
									}
									alt={`Уменьшенное изображение товара`}
									url={image.url}
									fill
								/>
							</SwiperSlide>
						))}
				</Swiper>
			)}
		</>
	);
}

export default ProductThumbnails;
