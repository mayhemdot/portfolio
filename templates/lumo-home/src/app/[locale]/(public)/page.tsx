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

// import ScrollVelocity from '@/shared/components/ScrollVelocity'
// import '../styles.css'

type Args = {
  params: Promise<{
    slug?: string;
    locale: Locale;
  }>;
};

export default async function HomePage({ params }: Args) {
  const { locale } = await params;
  const t = await getTranslations("HomePage");

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
