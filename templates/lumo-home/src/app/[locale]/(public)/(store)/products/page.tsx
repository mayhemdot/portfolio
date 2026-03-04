import type { Lang, LocaleCode } from "@/i18n/localization";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { constructMetadata } from "@/shared/utils/meta";
import { ProductClient, SearchAndSort } from "./page.client";
import { Text } from "@/shared/components/Text";
import { getTranslations } from "next-intl/server";
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

	const t = await getTranslations("CatalogPage");

	// TODO: Проверить на отличия на production
	// const tt = await getLocale();
	// console.log("Products Page", locale, tt);
	return (
		<div className='fl-px-8/32 container mx-auto w-full'>
			<DynamicBreadcrumb
				padding={false}
				breadcrumbs={BREADCRUMBS[language as Lang]}
			/>
			<div className='mb-auto w-full space-y-4 md:space-y-6 xl:space-y-8'>
				<div className='flex w-full items-center justify-between gap-4'>
					<div className='prose dark:prose-invert mb-4 max-w-none'>
						<Text
							comp='h1'
							size='md'
							variant='secondary'
							className='font-semibold'
						>
							{t("title")}
						</Text>
					</div>
					<SearchAndSort />
				</div>

				<ProductClient locale={locale as LocaleCode} />
			</div>
		</div>
	);
}

export async function generateMetadata({ params }: Props) {
	const { locale } = await params;
	const { language } = new Intl.Locale(locale);

	return constructMetadata({
		title: BREADCRUMBS[language as Lang][1].label,
		url: "/products",
		description: BREADCRUMBS[language as Lang][1].label,
	});
}
