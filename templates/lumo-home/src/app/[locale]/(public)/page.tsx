import { draftMode } from "next/headers";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { LocaleCode } from "@/i18n/localization";
import { CATEGORIES } from "@/modules/categories/model/data";
import { CategoriesBlock } from "@/shared/blocks/CategoriesBlock/Component";
import { FormBlock } from "@/shared/blocks/Form/Component";
import { MainHero } from "@/shared/blocks/Heros/HomeHero";
import { MarqueeBlock } from "@/shared/blocks/MarqueeBlock/Component";
import { MediaBlock } from "@/shared/blocks/MediaBlock/Component";
import { PromoBlock } from "@/shared/blocks/PromoBlock/Component";
import { SliderBlock } from "@/shared/blocks/SliderBlock/Component";

// import { MediaBlock } from "@/shared/blocks/MediaBlock/config";
// import { PayloadRedirects } from "@/shared/components/PayloadRedirects";
// import { getPayload } from "@/shared/lib/better-auth/payload";
// import { RenderBlocks } from "@/shared/blocks/RenderBlocks";

// import ScrollVelocity from '@/shared/components/ScrollVelocity'
// import '../styles.css'

type Args = {
	params: Promise<{
		slug?: string;
		locale: Locale;
	}>;
};

export default async function HomePage({ params }: Args) {
	const slug = "home";
	const { locale } = await params;

	// console.log("bah", locale);
	const { isEnabled: draft } = await draftMode();

	const url = "/" + slug;
	const t = await getTranslations("HomePage");
	// const payload = await getPayload();

	// const { docs: categories } = await payload.find({
	//   collection: "categories",
	//   limit: 10,
	//   draft,
	//   locale,
	// });

	// const pages = await payload.find({
	//   collection: 'pages',
	//   draft: false,
	//   limit: 1000,
	//   overrideAccess: false,
	//   pagination: false,
	//   select: {
	//     slug: true,
	//   },
	// })

	// const page: RequiredDataFromCollectionSlug<"pages"> | null =
	//   await queryPageBySlug({
	//     slug,
	//     locale,
	//   });

	// if (!page) {
	//   return <PayloadRedirects url={url} />;
	// }

	// const { layout } = page;

	//  "PromoSection": {
	//   "title": "Откройте для себя мир эстетики\r\n с нашей тщательно отобранной\r\n коллекцией мебели"
	// },
	// "MediaSection": {
	//   "title": "       Соответствуют самым высоким мировым стандартам качества и нашим строгим обязательствам"
	// },
	// "FormSection": {
	//   "title": "Оставайтесь с нами и получайте эксклюзивные\r\n скидки и предложения"
	// }
	return (
		<>
			<MainHero />
			<CategoriesBlock categories={CATEGORIES} locale={locale as LocaleCode} />
			<SliderBlock
				introContent={"Products"}
				limit={100}
				populateBy={"collection"}
				locale={locale}
			/>
			<PromoBlock
				introContent={t("PromoSection.title")}
				// "Step into a world of beauty with\r\n our meticulously curated\r\n collection of furniture"
			/>
			<MediaBlock
				// "The highest quality standards\r\n and align with our commitment"
				introContent={t("MediaSection.title")}
				media={{
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
				}}
			/>

			<FormBlock
				introContent={t("FormSection.title")}
				// "Stay with us and get exclusive\r\n discounts and offers"
				enableIntro={true}
				width={400}
			/>
			{/* <CallToActionBlock/> */}
			{/* <MediaBlock/> */}

			{/* <RenderBlocks blocks={layout} /> */}

			{/* formBlock: FormBlock,
        promo: PromoBlock,
        slider: SliderBlock,
        archive: ArchiveBlock,
        accordion: AccordionBlock,
        banner: BannerBlock,
        cta: CallToActionBlock,
        mediaBlock: MediaBlock, */}
			<MarqueeBlock />
		</>
	);
}
