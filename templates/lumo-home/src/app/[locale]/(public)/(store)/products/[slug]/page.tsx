import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { cache } from "react";
import { getLang, type Lang, type LocaleCode } from "@/i18n/localization";
import { AddToCartButton } from "@/modules/cart/ui/AddToCartButton";
import { UpdateQuantityCart } from "@/modules/cart/ui/UpdateQuantity";
import { PRODUCTS } from "@/modules/products/model/data";
import { Product } from "@/modules/products/model/types";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { Media } from "@/shared/components/Media";
import { SliderArchive } from "@/shared/components/SliderArchive";
import { Text } from "@/shared/components/Text";
import { generateMeta } from "@/shared/utils/generateMeta";

// export const dynamic = 'force-static'
// export const revalidate = 600

type Args = {
	params: Promise<{
		slug?: string;
		locale: LocaleCode;
	}>;
};

export default async function ProductPage({ params }: Args) {
	const { slug = "" } = await params;
	const url = `/products/${slug}`;
	const t = await getTranslations("ProductPage");
	const localeCode = (await getLocale()) as LocaleCode;

	console.log("[[ProductPage code]]", localeCode);

	const product = queryProductBySlug({ slug, locale: localeCode });

	if (!product) notFound();

	const lang = getLang(localeCode);
	console.log("breadcrumbs", product.title, generateBreadcrumbs(product, lang));
	return (
		<div className='mx-auto'>
			<DynamicBreadcrumb breadcrumbs={generateBreadcrumbs(product, lang)} />
			<article className='pb-16'>
				{/* <PageClient /> */}
				<div className='mt-4 flex w-full max-w-full grow flex-col items-stretch xl:mt-8'>
					<div className='fl-mx-8/32 fl-px-32/64 fl-py-32/64 bg-secondary xl:rounded-t-4xl box-border max-w-full shrink-0 grow rounded-t-2xl'>
						<div className='relative grid max-w-full gap-4 xl:grid-cols-12 xl:gap-8'>
							{/* Product Images */}
							<div className='sm:max-w-1/2 md:max-w-1/3 absolute left-0 top-0 z-10 w-full md:left-4 md:top-4 xl:relative xl:col-span-3 xl:max-w-none'>
								{/* <h1 className="fl-text-32/64 leading-none max-w-full font-semibold mb-6">
                  {product.title}
                </h1> */}
								<Text
									comp='h1'
									variant={"secondary"}
									weight={"bold"}
									size={"md"}
									className='leading-none! font-bold! max-w-full'
								>
									{product.title}
								</Text>
								<div className='grid grid-cols-2 gap-2'>
									{product.images?.map((image, i) => (
										<div
											key={String(i)}
											className='max-w-12 md:max-w-16  xl:max-w-25 bg-muted relative aspect-square cursor-pointer overflow-hidden rounded-md transition-opacity hover:opacity-80'
										>
											<Media
												resource={image}
												fill
												imgClassName='object-cover'
												alt={`View ${i}`}
											/>
										</div>
									))}
								</div>
							</div>
							<div className='mt-16 space-y-4 xl:col-span-5'>
								<div className='bg-muted relative aspect-square overflow-hidden rounded-lg'>
									<Media
										resource={product.images?.[0]}
										fill
										imgClassName='object-cover !mix-blend-multiply'
										alt={product.title || "Product"}
									/>
								</div>
							</div>
							{/* Product Info */}
							<div className='space-y-6 xl:col-span-4'>
								<div className='space-y-4'>
									<Text
										comp='h3'
										variant={"secondary"}
										size={"sm"}
										className='font-medium!'
									>
										{/* Description */}
										{t("descriptionTitle")}
									</Text>
									<Text comp='p' variant={"secondary"} size={"xxs"}>
										{product.description}
									</Text>
								</div>
								<div className='space-y-4'>
									<Text
										comp='h3'
										variant={"secondary"}
										size={"sm"}
										className='font-medium!'
									>
										{t("characteristicsTitle")}
									</Text>
									<div className='flex flex-col'>
										{product.characteristics?.map((characteristic, i) => (
											<div
												key={String(i)}
												className='border-border flex items-center justify-between border-b py-2'
											>
												<span className='fl-text-16/20'>
													{characteristic.name}
												</span>
												<span className='fl-text-16/20'>
													{characteristic.value}
												</span>
											</div>
										))}
									</div>
								</div>
								{/* <div>
                  {product.category ? (
                    <Badge variant="secondary" className="mb-2">
                      {typeof product.category === 'object'
                        ? product.category!.name
                        : ''}
                    </Badge>
                  ) : null}
                  <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className="size-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      (127 отзывов)
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      {formatPrice(product.price!)}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.price! * 1.2)}
                    </span>
                    <Badge variant="destructive">-20%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Цена действительна при покупке в интернет-магазине
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Описание</h3>
                  {product.description ? (
                    <RichText
                      className="max-w-[48rem] mx-auto !text-muted-foreground"
                      data={product.description!}
                      enableGutter={false}
                    />
                  ) : (
                    <p className="text-muted-foreground">No description</p>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Основные характеристики</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {product.characteristics?.length ? (
                      product.characteristics?.map(attr => (
                        <div key={attr.id}>
                          <span className="text-muted-foreground">
                            {attr.name}:
                          </span>
                          <p>{attr.value}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No characteristics
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <AddToCartButton product={product} />
                  <Button variant="outline" size="lg">
                    <Heart className="size-4" />
                  </Button>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3 text-sm">
                    <Truck className="size-4 text-green-600" />
                    <span>Бесплатная доставка от 2000 ₽</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="size-4 text-blue-600" />
                    <span>Гарантия 2 года</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <RotateCcw className="size-4 text-orange-600" />
                    <span>Возврат в течение 14 дней</span>
                  </div>
                </div> */}
							</div>
						</div>
					</div>
					<div className='bg-primary fl-px-16/32 w-full py-6 2xl:py-10'>
						<div className='grid grid-cols-4 grid-rows-2 items-center gap-4 md:grid-cols-12 md:grid-rows-1 md:gap-6 xl:gap-8'>
							<div className='col-span-2 md:col-span-4'>
								<UpdateQuantityCart
									productId={product.id}
									enableVariants={product.enableVariants || false}
								/>
							</div>
							<div className='text-background fl-text-32/48 col-span-2 md:col-span-4'>
								<span className='text-muted-foreground fl-text-20/24 mr-2'>
									{t("price")}:
								</span>
								{product.prettyPrice()}
							</div>
							<div className='relative col-span-4 flex h-full md:col-span-4'>
								<AddToCartButton
									btnClassName='ml-auto justify-self-end w-full'
									product={product.raw}
									variant={"ghost"}
									size={"xl"}
									rounded={"default"}
								/>
							</div>
						</div>
					</div>
					<div className='fl-px-16/32 container max-w-full'>
						{product.relatedProducts && product.relatedProducts.length > 0 && (
							<SliderArchive
								products={PRODUCTS.filter(prod =>
									product.relatedProductsRaw.includes(prod.id),
								)}
								inCatalogButton={false}
								locale={localeCode}
								title='Related products'
							/>
						)}
					</div>
				</div>
			</article>
		</div>
	);
}

export async function generateMetadata({
	params: paramsPromise,
}: Args): Promise<Metadata> {
	const { slug = "", locale } = await paramsPromise;

	const product = queryProductBySlug({ slug, locale });

	return generateMeta({ doc: product });
}

const queryProductBySlug = cache(
	({ slug, locale }: { slug: string; locale: LocaleCode }) => {
		if (!slug) throw new Error("Slug not found");

		const productRaw = PRODUCTS.find(product => product.slug === slug);

		if (!productRaw) throw new Error("Product not found");

		return new Product(productRaw, locale);
	},
);

function generateBreadcrumbs(product: Product, lang: Lang) {
	const breadcrumbs = {
		ru: [
			{ label: "Главная", url: "/" },
			{ label: "Каталог", url: "/products" },
			{ label: product.title, url: "!" },
		],
		en: [
			{ label: "Home", url: "/" },
			{ label: "Catalog", url: "/products" },
			{ label: product.title, url: "!" },
		],
	} as Record<string, { label: string; url: string }[]>;
	// console.log("bbbb", breadcrumbs);
	return breadcrumbs[lang];
}

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })
//   const products = await payload.find({
//     collection: 'products',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   })

//   const params = products.docs.map(({ slug }) => {
//     return { slug }
//   })

//   return params
// }

// export async function generateStaticParams() {
// 	return PRODUCTS.map(product => ({
// 		slug: product.slug,
// 	}));
// }
