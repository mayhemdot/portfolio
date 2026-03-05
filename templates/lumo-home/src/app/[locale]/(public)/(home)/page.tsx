import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PromoRoundBlock } from "@/app/[locale]/(public)/(home)/_ui/PromoRoundBlock";
import type { LocaleCode } from "@/i18n/localization";
import { FormBlock } from "@/widgets/Form/Component";
import { MarqueeBlock } from "@/widgets/MarqueeBlock/Component";
import { MediaBlock } from "@/widgets/MediaBlock/Component";
import { BenefitsSection } from "./_ui/Benefits";
import { CategorySection } from "./_ui/CategorySection";
import { Hero } from "./_ui/HeroSection";
import { ProductSection } from "./_ui/ProductSection";
// import { PromoBlock } from "./_ui/PromoBlock";

type Args = {
	params: Promise<{
		slug?: string;
		locale: Locale;
	}>;
};

const MEDIA = {
	id: 10,
	alt: {
		en: "alt",
		ru: "alt",
	},
	caption: {
		en: "alt",
		ru: "alt",
	},
	url: "/images/video_preview.png",
	mimeType: "image/png",
	width: 1920,
	height: 1080,
	updatedAt: new Date().toISOString(),
	createdAt: new Date().toISOString(),
};

export default async function HomePage({ params }: Args) {
	const { locale } = await params;

	const t = await getTranslations("HomePage");

	return (
		<>
			<Hero />
			<CategorySection locale={locale as LocaleCode} />
			<ProductSection locale={locale as LocaleCode} />
			<PromoRoundBlock id={"promo"} introContent={t("PromoSection.title")} />
			<BenefitsSection />
			<MediaBlock
				title={t("MediaSection.title")}
				introContent={t("MediaSection.description")}
				media={MEDIA}
			/>
			<FormBlock
				introContent={t("FormSection.title")}
				enableIntro={true}
				width={400}
			/>
			{/* <CallToActionBlock/> */}
			{/* <MediaBlock/> */}
			<MarqueeBlock />
		</>
	);
}
