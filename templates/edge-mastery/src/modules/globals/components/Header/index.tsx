// import CartDropdown from "@modules/layout/components/cart-dropdown";
// import { Badge, Button, Calendar, Link } from "@heroui/react";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
// import type { StoreRegion } from "@medusajs/types";
// import Logo from "@modules/common/components/Logo";
import { LogIn } from "lucide-react";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link, Link as NextLink } from "next-view-transitions";
import React from "react";
import CartDropdown, { CartButton } from "@/modules/cart/components/CartDropdown";
import { WishlistLink } from "@/modules/cart/components/WislistLink";
import { retrieveCart } from "@/modules/cart/queries/cart";
import { retrieveWishlist } from "@/modules/cart/queries/wishlist";
import { CountrySelect } from "@/modules/common/components/CountrySelect";
import { getCountryCodeFromLocale } from "@/modules/common/lib/get-region";
import { listRegions, type StoreRegion } from "@/modules/common/lib/get-region-action";
import { ROUTES } from "@/shared/utils/routes";
import { DrawerMenu } from "./DrawerMenu";
import DropdownUserMenu from "./DropdownUserMenu";
import HeaderLayout from "./HeaderLayout";
import { SearchBar } from "./SearchBar";
// import { retrieveCart } from "@/lib/data/cart";
// import { listRegions } from "@/lib/data/regions";
// import { retrieveWishlist } from "@/lib/data/wishlist";
// import { ROUTES } from "@/lib/util/routes";
// import { WishlistLink } from "@/modules/layout/components/wishlist-link";
// import { CMSLink } from "@/payload/components/Link";
// import { DrawerMenuButton } from "@/payload/globals/Header/ui/DrawerMenu";
// import HeaderLayout from "@/payload/globals/Header/ui/HeaderLayout";
// import { getCachedGlobal } from "@/payload/utils/getGlobal";
// import type { Config, Header } from "@/payload-types";
// import DropdownUserMenu from "./ui/DropdownUserMenu";
// import { SearchBar } from "./ui/SearchBar";

// type Locale = Config["locale"];

export async function HeaderCmp({ locale, customer }: { locale: string; customer: any }) {
  const cart = await retrieveCart().catch(() => null);
  const wishlist = await retrieveWishlist().catch(() => null);
  const regions = await listRegions().then((regions: StoreRegion[]) => regions);
  const countryCode = getCountryCodeFromLocale(locale);

  //   const headerData: Header = await getCachedGlobal("header", countryCode, 2)();
  //   const additional = headerData.additional?.map(({ link }) => (
  //     <CMSLink key={link.url} {...link} appearance="outline" />
  //   ));

  const t = await getTranslations({
    locale: locale as Locale,
    // namespace: "login",
  });

  const additional = [
    <Link key={ROUTES.catalog(countryCode)} href={ROUTES.catalog(countryCode)}>
      Store
    </Link>,
  ];

  return (
    <HeaderLayout>
      {/* <CartDropdown /> */}
      <CountrySelect regions={regions} locale={locale} isShort={true} className="hidden h-fit lg:flex" />
      <CartButton />
      {customer && <WishlistLink countryCode={countryCode} count={wishlist?.items.length || 0} />}
      <SearchBar
        className="hidden w-full lg:flex lg:w-fit"
        title={t("header.search.placeholder")}
        inModal={false}
        actions={<Link href={ROUTES.catalog(locale)}>Store</Link>}
      />
      {customer ? (
        <DropdownUserMenu user={customer} />
      ) : (
        <Button
          isIconOnly={false}
          as={NextLink}
          href={ROUTES.login(locale)}
          variant="faded"
          size="md"
          endContent={<LogIn className="size-4 shrink-0" />}
        >
          {t("header.login")}
        </Button>
      )}
      <DrawerMenu
        title={t("header.menu.title")}
        searchBarTitle={t("header.search.placeholder")}
        regions={regions}
        locale={locale}
        actions={additional}
      />
    </HeaderLayout>
  );
}
