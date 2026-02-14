import type { Metadata } from "next";
import { cache } from "react";
import type { Lang, LocaleCode } from "@/i18n/localization";
import { CATEGORIES } from "@/modules/categories/model/data";
import { Category } from "@/modules/categories/model/types";
import {
  type BreadcrumbType,
  DynamicBreadcrumb,
} from "@/shared/components/Breadcrumbs";
import { constructMetadata } from "@/shared/utils/meta";
import { CategoryClient } from "./page.client";

type Args = {
  params: Promise<{
    locale: LocaleCode;
    slug: string;
  }>;
};

export default async function Page({ params }: Args) {
  const { slug, locale } = await params;

  const { language } = new Intl.Locale(locale);

  const category = queryCategoryBySlug({ slug, locale });

  return (
    <div className="fl-px-8/32 3xl:px-0! container mx-auto">
      <DynamicBreadcrumb
        padding={false}
        breadcrumbs={generateBreadcrumbs(category, language as Lang)}
      />
      <CategoryClient
        categoryRaw={category.raw}
        locale={locale as LocaleCode}
      />
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

  const category = queryCategoryBySlug({ slug, locale });

  return constructMetadata({
    locale,
    title: category.name,
    url: `/categories/${category.slug}`,
  });
}

function generateBreadcrumbs(category: Category, lang: Lang): BreadcrumbType[] {
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
