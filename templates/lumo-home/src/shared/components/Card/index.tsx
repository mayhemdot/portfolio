"use client";

import Link from "next/link";
import type React from "react";
import { AddToCartButton } from "@/modules/cart/ui/AddToCartButton";
import type { Product } from "@/modules/products/model/types";
import { Media } from "@/shared/components/Media";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { formatPrice } from "@/shared/utils/formatPrice";
import useClickableCard from "@/shared/utils/useClickableCard";

export type CardProductData = Pick<
  Product,
  | "title"
  | "price"
  | "slug"
  | "images"
  | "category"
  | "id"
  | "inStock"
  | "description"
  | "variants"
  | "enableVariants"
>;

export const Card: React.FC<{
  alignItems?: "center";
  className?: string;
  doc?: CardProductData;
  relationTo?: "products";
  showCategories?: boolean;
  title?: string;
  locale?: string;
}> = (props) => {
  const { card, link } = useClickableCard({});
  const {
    className,
    doc,
    relationTo,
    showCategories,
    locale,
    title: titleFromProps,
  } = props;

  const { slug, category, title, price, images } = doc || {};

  const { description, image: metaImage } = { description: "", image: "" }; // meta ||

  const categories = [category];

  const hasCategories =
    categories && Array.isArray(categories) && categories.length > 0;

  const titleToUse = titleFromProps || title;

  const sanitizedDescription = description?.replace(/\s/g, " "); // replace non-breaking space with white space

  const href = `/${relationTo}/${slug}`;

  return (
    <article
      className={cn(
        "relative flex bg-secondary flex-col rounded-xl xl:rounded-3xl overflow-hidden hover:cursor-pointer aspect-10/16",
        className,
      )}
    >
      <div className="absolute right-0 top-0 z-10">
        <div className="fl-px-8/20 fl-py-8/20">
          <Badge
            variant="default"
            size="xs"
            className="text-background! fl-text-12/16 uppercase"
          >
            New
          </Badge>
        </div>
      </div>

      <div className="grow z-0 w-full relative">
        <Link href={href} ref={link.ref}>
          {images && images.length > 0 && (
            <Media
              url={images[0].url || ""}
              fill
              className="object-contain"
              imgClassName="object-cover mix-blend-multiply"
            />
          )}
        </Link>
        <div className="absolute right-0 bottom-0 z-10 fl-px-8/20 fl-py-8/20">
          <AddToCartButton
            product={doc!}
            size={"iconXL"}
            variant={"ghost"}
            rounded={"default"}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between bg-secondary z-10 fl-gap-8/16 fl-px-8/24 fl-py-8/24 ">
        <div className="flex flex-col gap-1 2xl:gap-2 grow">
          <span className="fl-py-2/8 fl-px-8/16 leading-tight bg-background rounded-full fl-text-16/24">
            {formatPrice(price!, {
              locale: locale,
              currencyCode: "USD",
            })}
          </span>
          <h4 className="fl-py-2/8 fl-px-8/16 bg-background fl-text-16/24 rounded-full leading-tight w-full font-semibold line-clamp-1">
            {titleToUse}
          </h4>
        </div>
      </div>
      {/* <div className="relative w-full">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} size="33vw" />
        )}
      </div> */}
      {/* <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { name: titleFromCategory } = category as Category

                    const categoryTitle =
                      titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-2">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}
      </div> */}
    </article>
  );
};
