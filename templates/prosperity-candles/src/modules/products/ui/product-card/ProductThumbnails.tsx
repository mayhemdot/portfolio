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
					className='max-full relative h-full w-full overflow-hidden rounded-3xl'
					effect={"fade"}
					direction='vertical'
					slidesPerView={5}
					allowTouchMove={true}
					spaceBetween={16}
					loop={false}
					// pagination={{ type: "bullets", clickable: true }}
				>
					{images
						.filter(image => typeof image?.url === "string")
						.map(image => (
							<SwiperSlide
								key={`thumbnail-image-${image.id}`}
								className='size-16 md:size-32 aspect-square grayscale'
							>
								<Media
									imgClassName={
										"rounded-xl size-16 md:size-32 object-cover transition-all"
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
