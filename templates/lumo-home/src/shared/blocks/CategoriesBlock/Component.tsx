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
    (category) => new Category(category, locale),
  );
  return (
    <section className="padding-default">
      <div className="fl-py-14/28 mb-8 xl:mb-16 bg-card-foreground rounded-full fl-px-16/32">
        <ul className="list-none flex items-center fl-gap-16/32">
          <h2 className="hidden xl:block px-8 text-secondary fl-text-24/32">
            {t("title")}
          </h2>
          <Swiper
            modules={[Thumbs, EffectFlip]}
            className="relative mx-0! xl:h-20 h-12 md:h-18 xl:min-h-20 w-full overflow-hidden [.swiper-wrapper]:h-auto"
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
                className="h-full w-auto flex items-center"
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-center flex relative h-full rounded-full! grow justify-center items-center border-none group overflow-hidden"
                >
                  <Image
                    src={`/images/product_${index + 1}.jpg`}
                    alt={""}
                    fill
                    className="object-cover blur-lg z-0 rounded-3xl group-hover:scale-125 transition-transform duration-500"
                  />
                  <span className="z-10 relative fl-text-24/32 text-white">
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
