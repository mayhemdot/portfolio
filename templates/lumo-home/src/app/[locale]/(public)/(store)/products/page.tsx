import { getLang, type LocaleCode } from "@/i18n/localization";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { constructMetadata } from "@/shared/utils/meta";
import { ProductClient } from "./page.client";

// import { getLocale } from "next-intl/server";
// export const dynamic = "force-static";
// export const revalidate = 600;

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

const META = {
  ru: {
    title: "Каталог товаров",
  },
  en: {
    title: "Product catalog",
  },
};

type Props = {
  params: Promise<{
    locale: LocaleCode;
  }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;

  const breadcrumbs = BREADCRUMBS[locale as keyof typeof BREADCRUMBS];

  // TODO: Проверить на отличия на production
  // const tt = await getLocale();
  // console.log("Products Page", locale, tt);
  return (
    <div className="fl-px-8/8 md:px-0! container mx-auto w-full">
      <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
      <ProductClient locale={locale as LocaleCode} />
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const lang = getLang(locale);

  return constructMetadata({
    title: META[lang].title || "Product Catalog",
    url: "/products",
    description: "Каталог товаров",
  });
}
