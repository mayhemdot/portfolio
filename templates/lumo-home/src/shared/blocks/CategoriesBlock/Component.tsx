"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { EffectFlip, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { LocaleCode } from "@/i18n/localization";
import { Category, type CategoryRaw } from "@/modules/categories/model/types";

type Props = {
	categories: CategoryRaw[];
	locale: LocaleCode;
};

export const CategoriesBlock = ({ categories, locale }: Props) => {
	const t = useTranslations("CategoriesBlock");
	const categoryList = categories.map(
		category => new Category(category, locale)
	);
	return (
		<section className='padding-default'>
			<div className='fl-py-14/28 bg-card-foreground fl-px-16/32 mb-8 rounded-full xl:mb-16'>
				<ul className='fl-gap-16/32 flex list-none items-center'>
					<h2 className='text-secondary fl-text-24/32 hidden px-8 xl:block'>
						{t("title")}
					</h2>
					<Swiper
						modules={[Thumbs, EffectFlip]}
						className='mx-0! md:h-18 xl:min-h-20 [.swiper-wrapper]:h-auto relative h-12 w-full overflow-hidden xl:h-20'
						allowTouchMove={true}
						loop={false}
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
								spaceBetween: 32,
							},
						}}
					>
						{categoryList?.map((category, index: number) => (
							<SwiperSlide
								key={category.name}
								className='flex h-full w-auto items-center'
							>
								<Link
									href={`/categories/${category.slug}`}
									className='rounded-full! group relative flex h-full grow items-center justify-center overflow-hidden border-none text-center'
								>
									<Image
										src={`/images/product_${index + 1}.jpg`}
										alt={""}
										fill
										className='z-0 rounded-3xl object-cover blur-lg transition-transform duration-500 group-hover:scale-125'
									/>
									<span className='fl-text-24/32 relative z-10 text-white'>
										{category.name}
									</span>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				</ul>
			</div>
		</section>
	);
};
