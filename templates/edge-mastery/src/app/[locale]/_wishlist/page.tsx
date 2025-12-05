import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getOrSetWishlist } from "@/modules/cart/queries/wishlist";
import LayoutWithBreadcrumbs from "@/modules/common/components/LayoutWithBreadcrumbs";
import { getCountryCodeFromLocale } from "@/modules/common/lib/get-region";
import { getRegion } from "@/modules/common/lib/get-region-action";
import { retrieveCustomer } from "@/modules/users/actions/retriveCustomer";
import { ROUTES } from "@/shared/utils/routes";
import WishlistClient from "./page.client";

type Props = {
  params: Promise<{ locale?: string }>;
};

export default async function ({ params }: Props) {
  const { locale = routing.defaultLocale } = await params;
  const customer = await retrieveCustomer();

  const t = await getTranslations({
    locale: locale,
  });
  if (!customer) {
    redirect(ROUTES.login(locale));
  }
  const countryCode = getCountryCodeFromLocale(locale);
  const region = await getRegion(countryCode);
  const wishlist = await getOrSetWishlist();

  //   let page: Page | null = await queryPageBySlug({
  //     slug: "wishlist",
  //   });

  //   if (!page) {
  //     page = STATIC_PAGE("Wishlist", countryCode);
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
          label: t("breadcrumbs.wishlist") || "Wishlist",
          url: `!`,
        },
      ]}
    >
      {/* <RenderHero {...page.hero} /> */}
      <WishlistClient />

      {/* {totalPages > 1 && (
          <Pagination
            data-testid="product-pagination"
            page={page}
            totalPages={totalPages}
          />
        )} */}
    </LayoutWithBreadcrumbs>
  );
}

// export { generateMetadata };
