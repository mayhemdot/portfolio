import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CartSheet } from "@/modules/cart/ui/CartSheet";
import { SearchInput } from "@/modules/products/ui/search";
import { ADMIN } from "@/modules/users/model/data";
import type { User } from "@/modules/users/model/types";
import { DesktopDropdownMenu } from "@/shared/components/Header/DesktopDropdownMenu";
import { LanguageSwitcher } from "@/shared/components/Header/LanguageSwitcher";
import { Logo } from "@/shared/components/Header/Logo";
import { MobileMenuSheet } from "@/shared/components/Header/MobileMenu";
import { CMSLink } from "@/shared/components/Link";
import { Media } from "@/shared/components/Media";
import { btnVariants } from "@/shared/components/ui/button";

type Props = {
  user?: User | null;
  searchIsHidden?: boolean;
};

export async function Header(props: Props) {
  // const user = await getCurrentUserAction({ depth: 2, redirectUrl: null });
  const user: User = ADMIN;

  return <HeaderBlock {...{ ...props, user: user }} />;
}

export async function HeaderBlock(props: Props) {
  const { searchIsHidden = false, user } = props;
  const t = await getTranslations("HeaderBlock");

  // const header: HeaderType = await getCachedGlobal("header", 1)();
  const HEADER = {
    navItems: [
      {
        link: {
          href: "/",
          label: "Home",
        },
      },
      {
        link: {
          href: "/about",
          label: "About",
        },
      },
      {
        link: {
          href: "/contact",
          label: "Contact",
        },
      },
    ],
    logo: null,
  };

  return (
    <header className="fl-pt-16/24 fl-px-8/32 sticky z-50 flex w-full items-center justify-between self-center">
      {/* <Link href="/" className={"block m-0! p-0! border-0! cursor-pointer relative aspect-square h-14! xl:h-16!"}>
        <Image
          src={"/Logo.svg"}
          loading="eager"
          fill
          unoptimized={false}
          className="block object-cover" alt={"Logo"}  />
      </Link> */}
      <Logo />
      <div className="fl-gap-x-8/16 flex items-center">
        {!searchIsHidden && (
          <div className={"hidden lg:block"}>
            {HEADER.navItems?.map((item, index) => (
              <CMSLink size={"sm"} key={String(index)} {...item} />
            ))}
            <SearchInput />
          </div>
        )}
        {!searchIsHidden && (
          <div className={"hidden lg:flex items-center bg-secondary p-2 md:p-3 rounded-full"}>
           <LanguageSwitcher isMobile={false} />
          </div>
        ) }
         
        <div className="fl-gap-x-12/16 fl-px-16/24 bg-secondary flex items-center rounded-full py-3">
          <CartSheet />
          {user ? (
            <DesktopDropdownMenu user={user} />
          ) : (
            <Link className={btnVariants({})} href={"/login"}>
              {t("logIn")}
            </Link>
          )}
          <MobileMenuSheet user={user} />
        </div>
      </div>
    </header>
  );
}
