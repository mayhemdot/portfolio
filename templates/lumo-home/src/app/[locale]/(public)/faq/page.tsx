import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Lang, LocaleCode } from "@/i18n/localization";
import { FAQ_ITEMS } from "@/modules/faq/data/faqData";
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
    { label: "Вопросы и ответы", url: "!" },
  ],
  en: [
    { label: "Home", url: "/" },
    { label: "FAQ", url: "!" },
  ],
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const { language } = new Intl.Locale(locale);

  return constructMetadata({
    title: BREADCRUMBS[language as Lang][1].label,
    onlyName: false,
    locale: locale as LocaleCode,
    url: `/faq`,
  });
}

export default async function FaqPage({ params }: Args) {
  const { locale } = await params;
  const { language } = new Intl.Locale(locale);

  const t = await getTranslations("FaqPage");

  return (
    <>
      <div className="container mx-auto">
        <DynamicBreadcrumb breadcrumbs={BREADCRUMBS[language as Lang]} />
      </div>
      {/* <LowImpactHero>
				<div className='space-y-4 text-center'>
					<Text comp='h1' size='lg' variant='primary'>
						{t("title")}
					</Text>
					<Text comp='p' size='sm' variant='mutedForeground'>
						{t("description")}{" "}
						<Link
							href='/admin'
							className='text-primary underline underline-offset-4 hover:opacity-80'
						>
							{t("adminLink")}
						</Link>{" "}
						{t("descriptionEnd")}
					</Text>
				</div>
			</LowImpactHero> */}
      <div className="container mx-auto">
        <AccordionBlock
          introContent={t("intro")}
          items={FAQ_ITEMS[language as Lang]}
        />
      </div>
    </>
  );
}
