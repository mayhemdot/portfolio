import type { Lang, LocaleCode } from "@/i18n/localization";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { constructMetadata } from "@/shared/utils/meta";
import { ProductClient } from "./page.client";

// export const dynamic = "force-static";
// export const revalidate = 600;

type Props = {
	params: Promise<{
		locale: LocaleCode;
	}>;
};

const BREADCRUMBS = {
	ru: [
		{ label: "Главная", url: "/" },
		{ label: "Каталог", url: "!" },
	],
	en: [
		{ label: "Home", url: "/" },
		{ label: "Catalog", url: "!" },
	],
};

export default async function Page({ params }: Props) {
	const { locale } = await params;
	const { language } = new Intl.Locale(locale);

	// TODO: Проверить на отличия на production
	// const tt = await getLocale();
	// console.log("Products Page", locale, tt);
	return (
		<div className='fl-px-8/32  container mx-auto w-full'>
			<DynamicBreadcrumb
				padding={false}
				breadcrumbs={BREADCRUMBS[language as Lang]}
			/>
			<ProductClient locale={locale as LocaleCode} />
		</div>
	);
}

export async function generateMetadata({ params }: Props) {
	const { locale } = await params;
	const { language } = new Intl.Locale(locale);

	return constructMetadata({
		title: BREADCRUMBS[language as Lang][1].label,
		url: "/products",
		description: "Каталог товаров",
	});
}
