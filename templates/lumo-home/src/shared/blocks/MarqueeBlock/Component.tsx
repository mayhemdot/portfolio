"use client";
import { Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function MarqueeBlock() {
	return (
		<div className='bg-primary flex py-16'>
			{/* <ScrollVelocity
          texts={['Inspiration', 'Exclusive', '+Vibe', 'Inspiration']}
          velocity={1}
          className="custom-scroll-text"
        /> */}
			<Swiper
				className='relative w-full overflow-hidden'
				modules={[Mousewheel, Autoplay]}
				// allowTouchMove={true}
				onSwiper={swiper => {
					swiper.wrapperEl.style.transitionTimingFunction = "linear";
				}}
				breakpoints={{
					0: { slidesPerView: 1, spaceBetween: 8 },
					768: { slidesPerView: 2, spaceBetween: 8 },
					1024: { slidesPerView: 3, spaceBetween: 16 },
				}}
				preventInteractionOnTransition={true}
				autoplay={{
					delay: 0,
					disableOnInteraction: false,
				}}
				speed={6000}
				slidesPerView={3}
				spaceBetween={"16px"}
				loop={true}
			>
				{[
					"Inspiration",
					"Exclusive",
					"+Vibe",
					"Inspiration",
					"Exclusive",
					"Vibe",
				].map((p, i) => (
					<SwiperSlide
						key={`marquee-slide-${p}-${String(i)}`}
						style={{ height: "100%", width: "400px" }}
						className='fl-text-64/120 text-center uppercase text-white'
					>
						{p}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
