"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { EffectFlip, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Text } from "@/shared/components/Text";
import { cn } from "@/shared/lib/utils";

export function BenefitsSection() {
  const swiperRef = useRef<any>(null);

  const t = useTranslations("HomePage.BenefitsSection");
  return (
    <div className="min-h-svh fl-gap-32/120 fl-px-16/32 my-8 flex flex-col pb-32  xl:my-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="w-full grow-0 space-y-4 xl:w-1/2">
          <Text
            comp="h4"
            variant={"secondary"}
            size={"lg"}
            className="font-bold leading-tight"
          >
            {t("title")}
          </Text>
          <Text
            comp="p"
            variant={"secondary"}
            size={"xs"}
            className="max-w-175 font-normal"
          >
            {t("description")}
          </Text>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setTimeout(() => swiper.update(), 100);
        }}
        modules={[Navigation, EffectFlip]}
        direction="horizontal"
        // autoHeight={true}
        className="mx-0! relative max-h-full min-w-0"
        // className="relative !w-full !mx-0 [.swiper-wrapper]:h-auto [&>.swiper-wrapper]:flex"
        allowTouchMove={true}
        loop={false}
        slidesPerView={2}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: -12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: -16,
          },
          1920: {
            slidesPerView: 5,
            spaceBetween: -16,
          },
        }}
      >
        {[
          {
            id: 1,
            url: "/images/lamp-rose-1.jpg",
            alt: "alt",
            scale: 80,
          },
          {
            id: 2,
            url: "/images/table-violet.jpg",
            alt: "alt",
            scale: 90,
          },
          {
            id: 3,
            url: "/images/chair-red.jpg",
            alt: "alt",
            scale: 100,
          },
          {
            id: 4,
            url: "/images/chair-orange-1.jpg",
            alt: "alt",
            scale: 90,
          },
          {
            id: 5,
            url: "/images/chair-transparent.jpg",
            alt: "alt",
            scale: 80,
          },
          {
            id: 6,
            url: "/images/lamp-orange-1.jpg",
            alt: "alt",
            scale: 90,
          },
        ]?.map((image) => (
          <SwiperSlide
            key={image.id}
            className={cn(
              `min-h-120 xl:min-h-140 aspect-13/9 flex! items-center! relative h-full w-full`,
            )}
          >
            <div
              className={`relative w-full shadow-2xl`}
              style={{ height: `${image.scale}%` }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className={cn(`block object-cover object-center`)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mx-auto flex w-full max-w-6xl  justify-end space-y-2">
        <div className="max-w-175 space-y-4 w-full self-end xl:w-1/2">
          <Text
            comp="h4"
            variant={"secondary"}
            size={"lg"}
            className="font-bold leading-tight"
          >
            {t("qualityTitle")}
          </Text>
          <Text
            comp="p"
            variant={"secondary"}
            size={"xs"}
            className="font-normal"
          >
            {t("qualityDescription")}
          </Text>
        </div>
      </div>
    </div>
  );
}
