"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type React from "react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { EffectFlip, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Product, type ProductRaw } from "@/modules/products/model/types";
import { Card } from "@/shared/components/Card";
import { Button, btnVariants } from "@/shared/components/ui/button";

import "swiper/css";
import "swiper/css/navigation";
import type { LocaleCode } from "@/i18n/localization";

export type Props = {
	title?: string;
	name?: string;
	products: ProductRaw[];
	inCatalogButton?: boolean;
	showNavigation?: boolean;
	locale: LocaleCode;
	relationTo: string;
};

export function SliderArchive(props: Props) {
	const {
		name,
		relationTo,
		products: productsRaw,
		title,
		locale,
		showNavigation = true,
		inCatalogButton = true,
	} = props;

	const products = productsRaw.map(product => new Product(product, locale));

	const t = useTranslations("SliderArchive");

	const swiperRef = useRef<any>(null);

	return (
		<section className='fl-py-12/32 relative block h-fit w-full overflow-y-clip'>
			{(title || (showNavigation && productsRaw.length > 4)) && (
				<div className='relative mb-4 flex w-full justify-between gap-2 md:mb-8'>
					{title && <h3 className='fl-text-20/32'>{title}</h3>}
					{showNavigation && (
						<div className='space-x-2 md:space-x-4'>
							<SlidePrevButton swiperRef={swiperRef} />
							<SlideNextButton swiperRef={swiperRef} />
						</div>
					)}
				</div>
			)}
			<Swiper
				onSwiper={swiper => {
					swiperRef.current = swiper;
					setTimeout(() => swiper.update(), 100);
				}}
				modules={[Navigation, EffectFlip]}
				direction='horizontal'
				// autoHeight={true}
				className='relative max-h-full'
				// className="relative !w-full !mx-0 [.swiper-wrapper]:h-auto [&>.swiper-wrapper]:flex"
				allowTouchMove={true}
				loop={false}
				slidesPerView={2}
				breakpoints={{
					0: {
						slidesPerView: 2,
						spaceBetween: 12,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 24,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 28,
					},
					// 1920: {
					//   slidesPerView: 5,
					//   spaceBetween: 32,
					// },
				}}
			>
				{products?.map(product => (
					<SwiperSlide key={product.id}>
						<Card
							doc={product.raw}
							name={name}
							relationTo={relationTo}
							showCategories
							title={product.title}
							locale={locale}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			{inCatalogButton && (
				<Link
					href={"/products"}
					className={btnVariants({
						variant: "secondary",
						size: "xl",
						className: "mt-4 w-full md:mt-8",
					})}
				>
					{t("inCatalog")}
				</Link>
			)}
		</section>
	);
}

export function SlideNextButton({
	swiperRef,
}: {
	swiperRef: React.RefObject<SwiperType>;
}) {
	return (
		<Button size='icon' onClick={() => swiperRef.current?.slideNext()}>
			<ArrowRightIcon />
		</Button>
	);
}

export function SlidePrevButton({
	swiperRef,
}: {
	swiperRef: React.RefObject<SwiperType>;
}) {
	return (
		<Button size='icon' onClick={() => swiperRef.current?.slidePrev()}>
			<ArrowLeftIcon />
		</Button>
	);
}
