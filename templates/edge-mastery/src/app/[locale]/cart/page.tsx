import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import CartTemplate from "@/modules/cart/templates/CartTemplate";
import LayoutWithBreadcrumbs from "@/modules/common/components/LayoutWithBreadcrumbs";
import { retrieveCustomer } from "@/modules/users/actions/retriveCustomer";
import { generateMeta, SITE_NAME } from "@/shared/utils/generateMeta";

type Props = {
  params: Promise<{ locale?: string }>;
};

export async function generateMetadata(props: Props) {
  const { locale = routing.defaultLocale } = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
  });

  return generateMeta({
    doc: {
      slug: "/signup",
      meta: {
        title: `${SITE_NAME} - ${t("seo.cart.title")}`,
        description: t("seo.cart.description"),
        image: null,
      },
    },
  });
}

export default async function ({ params }: Props) {
  const customer = await retrieveCustomer().catch(() => null);
  const { locale = routing.defaultLocale } = await params;

  const t = await getTranslations({
    locale: locale,
  });

  //   const cart = await retrieveCart();
  //   let page: Page | null = await queryPageBySlug({
  //     slug: "cart",
  //   })

  //   if (!page) {
  //     page = STATIC_PAGE("Cart", countryCode)
  //   }

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
          label: t("breadcrumbs.cart") || "Cart",
          url: `!`,
        },
      ]}
    >
      {/* <RenderHero {...page.hero} /> */}
      <CartTemplate customer={customer} locale={locale} />
    </LayoutWithBreadcrumbs>
  );
}
