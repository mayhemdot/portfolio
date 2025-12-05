import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import LayoutWithBreadcrumbs from "@/modules/common/components/LayoutWithBreadcrumbs";
import { Text } from "@/shared/components/Text";

type Props = {
	params: Promise<{ locale?: string }>;
};

async function AboutUs({ params }: Props) {
	const { locale = routing.defaultLocale } = await params;

	const t = await getTranslations({
		locale: locale,
	});

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
					label: t("breadcrumbs.about") || "Catalog",
					url: `!`,
				},
			]}
		>
			<Text comp='h1' variant='gradient' size='xl' className='py-8'>
				About us
			</Text>
			<Text
				comp='p'
				variant='secondary'
				size='md'
				className='py-8 font-extralight'
			>
				WE ARE THE BEST
			</Text>
		</LayoutWithBreadcrumbs>
	);
}

export default AboutUs;
