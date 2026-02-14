import type { Metadata } from "next";
import { cache } from "react";
import { getLang, type Lang, type LocaleCode } from "@/i18n/localization";
import { CATEGORIES } from "@/modules/categories/model/data";
import { Category } from "@/modules/categories/model/types";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { generateMeta } from "@/shared/utils/generateMeta";
import { CategoryClient } from "./page.client";

type Args = {
  params: Promise<{
    locale: LocaleCode;
    slug: string;
  }>;
};

export default async function Page({ params }: Args) {
  const { slug, locale } = await params;

  const lang = getLang(locale);

  const category = queryCategoryBySlug({ slug, locale });

  return (
    <div className="fl-px-8/32 3xl:px-0! container mx-auto">
      <DynamicBreadcrumb padding={false} breadcrumbs={generateBreadcrumbs(category, lang)} />
      <CategoryClient categoryRaw={category.raw} locale={locale as LocaleCode} />
    </div>
  );
}

const queryCategoryBySlug = cache(
  ({ slug, locale }: { slug: string; locale: LocaleCode }) => {
    if (!slug) throw new Error("Slug not found");

    const categoryRaw = CATEGORIES.find((c) => c.slug === slug);

    if (!categoryRaw) throw new Error("Product not found");

    return new Category(categoryRaw, locale);
  },
);

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug, locale } = await paramsPromise;

  const product = queryCategoryBySlug({ slug, locale });

  return generateMeta({ doc: product });
}

function generateBreadcrumbs(
  category: Category,
  lang: Lang,
): { label: string; url: string }[] {
  return {
    ru: [
      { label: "Главная", url: "/" },
      { label: "Категории", url: "/categories" },
      { label: category.name, url: "!" },
    ],
    en: [
      { label: "Home", url: "/" },
      { label: "Categories", url: "/categories" },
      { label: category.name, url: "!" },
    ],
  }[lang];
}
