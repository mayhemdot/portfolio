import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";
import { routing } from "@/i18n/routing";
import LayoutWithBreadcrumbs from "@/modules/common/components/LayoutWithBreadcrumbs";
import { getCountryCodeFromLocale } from "@/modules/common/lib/get-region";
import { maxProductPrice } from "@/modules/products/actions/listProducts";
import type { SortOptions } from "@/modules/store/components/SortProducts";
import StoreTemplate from "@/modules/store/templates";
import { generateMeta, SITE_NAME } from "@/shared/utils/generateMeta";

type Props = {
	searchParams: Promise<{
		sortBy?: SortOptions;
		page?: string;
		price_min?: string;
		price_max?: string;
		categories?: string[];
	}>;
	params: Promise<{
		locale: string;
	}>;
};

export async function generateMetadata(props: Props) {
	const { locale = routing.defaultLocale } = await props.params;

	const t = await getTranslations({
		locale: locale as Locale,
	});

	return generateMeta({
		doc: {
			slug: "/products",
			meta: {
				title: `${SITE_NAME} - ${t("seo.store.title")}`,
				description: t("seo.store.description"),
				image: null,
			},
		},
	});
}

export const loadSearchParams = createLoader({
	categories: parseAsArrayOf(parseAsString).withDefault([]),
});

export default async function ({ params, searchParams }: Props) {
	const { locale = routing.defaultLocale } = await params;
	const countryCode = getCountryCodeFromLocale(locale);
	const { sortBy, page: pageNumber, price_min, price_max } = await searchParams;
	const t = await getTranslations({
		locale: locale,
	});
	const isWishlisted = false;
	// (await retrieveCustomer()
	//   .catch(() => null)
	//   .then(Boolean)) || false;

	//   let page: Page | null = await queryPageBySlug({
	//     slug: "store",
	//   });

	//   if (!page) {
	//     page = STATIC_PAGE("Store", countryCode);
	//   }

	const { categories: selectedCategories } = await loadSearchParams(
		searchParams
	);

	const maxPrice = await maxProductPrice({ locale: locale as Locale });

	return (
		<LayoutWithBreadcrumbs
			breadcrumbs={[
				{
					id: "0",
					label: t("breadcrumbs.home") || "Home",
					url: `/`,
				},
				{
					id: "1",
					label: t("breadcrumbs.catalog") || "Catalog",
					url: `!`,
				},
			]}
		>
			{/* <RenderHero {...page.hero} /> */}
			<StoreTemplate
				isWishlisted={isWishlisted}
				sortBy={sortBy}
				selectedCategories={selectedCategories}
				page={pageNumber}
				maxPriceLimit={String(maxPrice) || String(100000)}
				priceBoundaries={{ min: price_min, max: price_max }}
				locale={locale as Locale}
			/>
		</LayoutWithBreadcrumbs>
	);
}
