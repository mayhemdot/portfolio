"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import type React from "react";
import type { LocaleCode } from "@/i18n/localization";
import { AddToCartButton } from "@/modules/cart/ui/AddToCartButton";
import { Product, type ProductRaw } from "@/modules/products/model/types";
import { Media } from "@/shared/components/Media";
import { Text } from "@/shared/components/Text";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import useClickableCard from "@/shared/utils/useClickableCard";
import { ViewTransition } from "react";

export const Card: React.FC<{
	alignItems?: "center";
	className?: string;
	doc?: ProductRaw;
	relationTo?: string;
	showCategories?: boolean;
	name?: string;
	title?: string;
	locale: LocaleCode;
}> = props => {
	const { card, link } = useClickableCard({});
	const {
		className,
		doc,
		relationTo = "products",
		name = "products",
		showCategories,
		locale,
		title: titleFromProps,
	} = props;

	if (!doc) notFound();

	const product = new Product(doc, locale);
	const { description, image: metaImage } = { description: "", image: "" }; // meta ||

	const categories = [product.category];

	const hasCategories =
		categories && Array.isArray(categories) && categories.length > 0;

	const titleToUse = titleFromProps || product.title || "";

	const sanitizedDescription = description?.replace(/\s/g, " "); // replace non-breaking space with white space

	const href = `/${relationTo}/${product.slug}`;

	return (
		<ViewTransition key={`${name}-product-${product.id}`}>
			<article
				className={cn(
					"bg-secondary aspect-10/16 relative flex flex-col overflow-hidden rounded-xl hover:cursor-pointer xl:rounded-3xl",
					className,
				)}
			>
				<div className='absolute right-0 top-0 z-10'>
					<div className='fl-px-8/20 fl-py-8/20'>
						<Badge
							variant='default'
							size='xs'
							className='text-background! fl-text-12/16 uppercase'
						>
							New
						</Badge>
					</div>
				</div>

				<div className='relative z-0 w-full grow'>
					<Link href={href} ref={link.ref}>
						{product.images && product.images.length > 0 && (
							<ViewTransition name={`${name}-product-${product?.id}`}>
								<Media
									url={product.images[0].url || ""}
									fill
									className='object-contain'
									imgClassName='object-cover mix-blend-multiply'
								/>
							</ViewTransition>
						)}
					</Link>
					<div className='fl-px-8/20 fl-py-8/20 absolute bottom-0 right-0 z-10'>
						<AddToCartButton
							product={product.raw}
							size={"iconXL"}
							variant={"ghost"}
							rounded={"default"}
						/>
					</div>
				</div>

				<div className='bg-secondary fl-gap-8/16 fl-px-8/24 fl-py-8/24 z-10 flex flex-row justify-between '>
					<div className='flex grow flex-col gap-1 2xl:gap-2'>
						<span className='fl-py-2/8 fl-px-8/16 bg-background rounded-full leading-tight'>
							<Text
								comp='h4'
								className='leading-none! w-full'
								weight={"medium"}
								variant={"secondary"}
								size={"xs"}
							>
								{product.prettyPrice()}
							</Text>
						</span>
						<div className='fl-py-2/8 fl-px-8/16 bg-background w-full rounded-lg font-semibold'>
							<Text
								comp='h4'
								className='leading-none! line-clamp-2 w-full'
								weight={"medium"}
								variant={"secondary"}
								size={"xs"}
							>
								{titleToUse}
							</Text>
						</div>
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
		</ViewTransition>
	);
};
