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
  products: ProductRaw[];
  inCatalogButton?: boolean;
  locale: LocaleCode;
};

export function SliderArchive(props: Props) {
  const {
    products: productsRaw,
    title,
    locale,
    inCatalogButton = true,
  } = props;
  const products = productsRaw.map((product) => new Product(product, locale));
  const t = useTranslations("SliderArchive");

  const swiperRef = useRef<any>(null);

  return (
    <section className="w-full block relative fl-py-12/32 overflow-y-clip h-fit">
      <div className="flex justify-between w-full relative gap-2 mb-4 md:mb-8">
        <h3 className="fl-text-20/32">{title}</h3>
        <div className="space-x-2 md:space-x-4">
          <SlidePrevButton swiperRef={swiperRef} />
          <SlideNextButton swiperRef={swiperRef} />
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
        className="relative max-h-full" // h-[734px]
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
        {products?.map((product, index: number) => (
          <SwiperSlide key={product.title + index.toString()}>
            <Card
              doc={product.raw}
              relationTo="products"
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
            className: "w-full mt-4 md:mt-8",
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
  const swiper = useSwiper();

  return (
    <Button size="icon" onClick={() => swiperRef.current?.slideNext()}>
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
    <Button size="icon" onClick={() => swiperRef.current?.slidePrev()}>
      <ArrowLeftIcon />
    </Button>
  );
}

// <h3 className="font-semibold text-md mb-1 md:mb-2 line-clamp-1">
//       {product.title}
//     </h3>
//     <p className="text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2">
//       {/* {product?.description} */}
//       Best product in the world
//     </p>

//     <div className="flex items-center gap-2  mb-2 md:mb-3">
//       <div className="flex items-center gap-1">{renderStars(5)}</div>
//       <span className="text-sm text-muted-foreground">5.0 ({0})</span>
//     </div>

//     <div className="flex items-center gap-2">
//       <span className="text-md xl:text-2xl font-bold">
//         {formatPrice(product.price!)}
//       </span>
//       {product.price && (
//         <span className="text-xs xl:text-md text-muted-foreground line-through">
//           {formatPrice(product.price)}
//         </span>
//       )}
//     </div>

// import Link from 'next/link'
// import Image from 'next/image'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { EffectFlip, Thumbs } from 'swiper/modules'
// import { Category } from '@/payload-types'

// export const CategoriesBlock = ({ categories }: { categories: Category[] }) => {
//   return (
//     <section className="py-3 md:py-6 xl:py-8 mb-16 bg-card-foreground rounded-full px-4 md:px-8 xl:px-12">
//       <ul className="list-none flex items-center gap-4 md:gap-6 xl:gap-8">
//         <h2 className="hidden xl:block px-8 text-secondary text-md xl:text-lg 2xl:text-3xl">
//           Categories
//         </h2>
//         <Swiper
//           modules={[Thumbs, EffectFlip]}
//           className="relative !mx-0 xl:h-[80px] h-12 md:h-18 xl:min-h-[80px] w-full overflow-hidden [.swiper-wrapper]:h-auto"
//           allowTouchMove={true}
//           loop={false}
//           breakpoints={{
//             0: {
//               slidesPerView: 2,
//               spaceBetween: 12,
//             },
//             768: {
//               slidesPerView: 3,
//               spaceBetween: 24,
//             },
//             1024: {
//               slidesPerView: 4,
//               spaceBetween: 32,
//             },
//           }}
//         >
//           {categories?.map((category, index: number) => (
//             <SwiperSlide
//               key={category.name}
//               className="h-full flex items-center"
//             >
//               {/* grow !font-medium justify-center min-w-[300px] border-none group text-center relative overflow-hidden */}
//               <Link
//                 href={`/categories/${category.slug}`}
//                 className="text-center flex relative h-full !rounded-full grow !font-medium justify-center items-center border-none group overflow-hidden"
//               >
//                 <Image
//                   src={`/images/product_${index + 1}.jpg`}
//                   alt={''}
//                   fill
//                   className="object-cover blur-lg z-0 rounded-3xl group-hover:scale-125 transition-transform duration-500"
//                 />
//                 <span className="z-10 relative text-xl xl:text-2xl text-white">
//                   {category.name}
//                 </span>
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </ul>
//     </section>
//   )
// }
