import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Lang, LocaleCode } from "@/i18n/localization";
import { AccordionBlock } from "@/shared/blocks/Accordion/Component";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { constructMetadata } from "@/shared/utils/meta";

type Args = {
	params: Promise<{
		locale: Locale;
	}>;
};

const BREADCRUMBS = {
	ru: [
		{ label: "Главная", url: "/" },
		{ label: "Пользовательское соглашение", url: "!" },
	],
	en: [
		{ label: "Home", url: "/" },
		{ label: "Terms & Conditions", url: "!" },
	],
};

const SECTIONS = [
	"intro",
	"useOfService",
	"registration",
	"orders",
	"delivery",
	"returns",
	"intellectualProperty",
	"liability",
	"changes",
	"contact",
] as const;

export async function generateMetadata({ params }: Args): Promise<Metadata> {
	const { locale } = await params;
	const { language } = new Intl.Locale(locale);

	return constructMetadata({
		title: BREADCRUMBS[language as Lang][1].label,
		description: BREADCRUMBS[language as Lang][1].label,
		onlyName: false,
		locale: locale as LocaleCode,
		url: `/terms-and-conditions`,
	});
}

export default async function TermsAndConditionsPage({ params }: Args) {
	const { locale } = await params;
	const { language } = new Intl.Locale(locale);

	const t = await getTranslations("TermsOfServicePage");

	const items = SECTIONS.map((section, i) => ({
		id: `terms-${i + 1}`,
		title: t(`${section}.title`),
		content: t(`${section}.content`),
	}));

	return (
		<>
			<div className='container mx-auto'>
				<DynamicBreadcrumb
					padding={false}
					breadcrumbs={BREADCRUMBS[language as Lang]}
				/>
			</div>
			<div className='container mx-auto'>
				<AccordionBlock introContent={t("introText")} items={items} />
			</div>
		</>
	);
}
