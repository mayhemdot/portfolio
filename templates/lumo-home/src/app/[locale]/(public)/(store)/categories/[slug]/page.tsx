import type { Metadata } from "next";
import { cache } from "react";
import type { Lang, LocaleCode } from "@/i18n/localization";
import { CATEGORIES } from "@/modules/categories/model/data";
import { Category } from "@/modules/categories/model/types";
import {
	type BreadcrumbType,
	DynamicBreadcrumb,
} from "@/shared/components/Breadcrumbs";
import { constructMetadata } from "@/shared/utils/meta";
import { Text } from "@/shared/components/Text";
import { getTranslations } from "next-intl/server";
import { Card } from "@/shared/components/Card";
import { getProductsWhere } from "@/modules/products/queries/getProducts";

type Args = {
	params: Promise<{
		locale: LocaleCode;
		slug: string;
	}>;
};

export default async function Page({ params }: Args) {
	const { slug, locale } = await params;

	const { language } = new Intl.Locale(locale);

	const category = queryCategoryBySlug({ slug, locale });

	const t = await getTranslations("CatalogPage");

	const { docs: products } = getProductsWhere({
		categorySlug: category.slug,
		search: "",
		sortBy: "price",
		page: "1",
		localeCode: locale,
	});

	return (
		<div className='fl-px-8/32 3xl:px-0! container mx-auto'>
			<DynamicBreadcrumb
				padding={false}
				breadcrumbs={generateBreadcrumbs(category, language as Lang)}
			/>
			<div className='mb-auto w-full space-y-4 xl:space-y-8'>
				<div className='flex w-full items-center justify-between gap-4'>
					<Text
						comp='h1'
						size='md'
						variant='secondary'
						className='font-semibold'
					>
						{t("title")}
					</Text>
				</div>
				<div className='fl-gap-4/20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{products?.map(product => (
						<Card
							key={product.id}
							doc={product.raw}
							relationTo='products'
							locale={locale}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

const queryCategoryBySlug = cache(
	({ slug, locale }: { slug: string; locale: LocaleCode }) => {
		if (!slug) throw new Error("Slug not found");

		const categoryRaw = CATEGORIES.find(c => c.slug === slug);

		if (!categoryRaw) throw new Error("Product not found");

		return new Category(categoryRaw, locale);
	},
);

export async function generateMetadata({
	params: paramsPromise,
}: Args): Promise<Metadata> {
	const { slug, locale } = await paramsPromise;

	const category = queryCategoryBySlug({ slug, locale });

	return constructMetadata({
		locale,
		title: category.name,
		url: `/categories/${category.slug}`,
	});
}

function generateBreadcrumbs(category: Category, lang: Lang): BreadcrumbType[] {
	return {
		ru: [
			{ label: "Главная", url: "/" },
			{ label: "Категории", url: "/categories" },
			{ label: category.name, url: "!" },
		],
		en: [
			{ label: "Home", url: "/" },
			{ label: "Categories", url: "/categories" },
			{ label: category.name, url: "!" },
		],
	}[lang];
}
