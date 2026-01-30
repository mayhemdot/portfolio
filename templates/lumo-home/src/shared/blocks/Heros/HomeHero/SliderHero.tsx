"use client";
import Image from "next/image";
import { useState } from "react";
import { Controller, EffectFlip } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const SLIDES = [
  {
    title: 2007,
    description:
      "30 июня 2007 г. открывается первый Fitness House на Стрелке Васильевского острова, в самом центре Санкт-Петербурга.",
    src: "/images/product_1.jpg",
  },
  {
    title: 2011,
    description:
      "К началу 2011 г. сеть насчитывает 26 клубов в разных районах Санкт-Петербурга. Конец 2011 г. отмечен открытием первого клуба новой линейки фитнес-клубов премиум класса Fitness House Prestige на Левашовском проспекте.",
    src: "/images/product_2.jpg",
  },
  {
    title: 2017,
    description:
      "В начале 2017 г. сеть насчитывает 43 клуба, из них — 34 клуба с бассейными комплексами, 5 клубов без бассейнов, 4 клуба премиум класса Fitness House Prestige. В этом году Fitness House начинает покорять регионы. Осенью открываются первые клубы в Нижнем Новгороде и Казани.",
    src: "/images/product_3.jpg",
  },
];

export const SliderHero: React.FC = () => {
  const [firstSwiper, setFirstSwiper] = useState<any>(null);
  const [secondSwiper, setSecondSwiper] = useState<any>(null);

  return (
    <>
      <Swiper
        modules={[Controller, EffectFlip]}
        onSwiper={setFirstSwiper}
        initialSlide={0}
        controller={{ control: secondSwiper }}
        className="relative mx-0! h-auto! w-full overflow-hidden max-w-[70%]"
        // effect={'flip'}
        allowTouchMove={true}
        spaceBetween={32}
        loop={false}
      >
        {[...SLIDES.slice(1, SLIDES.length), ...SLIDES.slice(0, 1)].map(
          (p, i) => (
            <SwiperSlide key={p.title + String(i)} className="h-full w-full space-y-2">
              <Image
                src={p.src}
                data-fancybox="gallery"
                blurDataURL={p.src}
                placeholder="blur"
                width={640}
                height={320}
                quality={100}
                className="cursor-fancy aspect-9/12 h-full w-full rounded-2xl object-cover transition-all"
                alt={`Историческая справка по клубу ${p.title}`}
              />
            </SwiperSlide>
          ),
        )}
      </Swiper>

      <Swiper
        modules={[Controller, EffectFlip]}
        onSwiper={setSecondSwiper}
        controller={{ control: firstSwiper }}
        initialSlide={1}
        className="mx-0! translate-x-full -mt-[30%] w-[45%]"
        // className="!mx-0 translate-x-[60%] translate-y-[100%]  h-auto w-full overflow-hidden max-w-[320px]"
        // effect={'flip'}
        allowTouchMove={true}
        spaceBetween={32}
        loop={false}
      >
        {SLIDES.map((p, i) => (
          <SwiperSlide key={p.title} className="h-full w-full space-y-2">
            <Image
              src={p.src}
              data-fancybox="gallery"
              blurDataURL={p.src}
              placeholder="blur"
              width={640}
              height={320}
              quality={100}
              className="cursor-fancy aspect-9/12 h-full w-full rounded-2xl object-cover transition-all"
              alt={`Историческая справка по клубу ${p}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

