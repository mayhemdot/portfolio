import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getLanguageFromLocale } from "@/modules/common/lib/get-region";
import { listRegions } from "@/modules/common/lib/get-region-action";
import { CATEGORIES } from "@/modules/products/constants";
import { generateMeta, SITE_NAME } from "@/shared/utils/generateMeta";
import { AboutUs } from "./_ui/AboutUs";
import { BestProducts } from "./_ui/BestProducts";
import { Features } from "./_ui/Features";
import { Hero } from "./_ui/Hero";
import { Newsletter } from "./_ui/Newsletter";

// import { DetailedGuide } from "./_ui/DetailedGuide";

type Props = {
	params: Promise<{ locale?: string }>;
};

export async function generateMetadata(props: Props) {
	const { locale = routing.defaultLocale } = await props.params;

	const t = await getTranslations({
		locale: locale as Locale,
	});

	return generateMeta({
		doc: {
			slug: "/",
			meta: {
				title: `${SITE_NAME} - ${t("seo.home.title")}`,
				description: t("seo.home.description"),
				keywords: t("seo.home.keywords"),
				image: null,
			},
		},
	});
}

export default async function Home({ params }: Props) {
	const { locale = routing.defaultLocale } = await params;
	const region = await listRegions();
	const countryCode = getLanguageFromLocale(locale);

	const t = await getTranslations({
		locale: locale as Locale,
	});
	return (
		<>
			<Hero
				title={t("home.hero.about")}
				toCatalogBtn={t("home.hero.toCatalogBtn")}
			/>
			<Features
				tip1={{
					title: t("home.features.tip1.title"),
					description: t("home.features.tip1.description"),
				}}
				tip2={{
					title: t("home.features.tip2.title"),
					description: t("home.features.tip2.description"),
				}}
			/>
			<AboutUs
				title={t("home.aboutUs.title")}
				description1={t("home.aboutUs.description1")}
				description2={t("home.aboutUs.description2")}
			/>
			<BestProducts
				isWishlisted={false}
				title={t("home.topSale.title")}
				collections={CATEGORIES.map(c => ({
					id: c.id,
					title: c.name[countryCode] || c.name.en,
					category_id: c.id,
				}))}
				region={
					region.find(r => r.countries?.some(c => c.iso_2 === "ru")) ||
					region[0]
				}
				locale={locale as Locale}
			/>
			{/* <DetailedGuide title={t("home.detailedGuide.title")} /> */}
			<Newsletter
				warning={t("messages.demo.subscription")}
				title={t("home.newsletter.title")}
				placeholder={t("home.newsletter.placeholder")}
				button={t("home.newsletter.button")}
			/>
		</>
	);
}
