import Image  from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CartSheet } from "@/modules/cart/ui/CartSheet";
import { SearchInput } from "@/modules/products/ui/search";
import { ADMIN } from "@/modules/users/model/data";
import type { User } from "@/modules/users/model/types";
import { DesktopDropdownMenu } from "@/shared/components/Header/DesktopDropdownMenu";
import { Logo } from "@/shared/components/Header/Logo";
import { MobileMenuSheet } from "@/shared/components/Header/MobileMenu";
import { CMSLink } from "@/shared/components/Link";
import { Media } from "@/shared/components/Media";
import { btnVariants } from "@/shared/components/ui/button";

type Props = {
  user?: User | null;
  searchIsHidden?: boolean;
  searchParams?: Promise<{ [key: string]: string | string[] }>;
};

export async function Header(props: Props) {
  // const user = await getCurrentUserAction({ depth: 2, redirectUrl: null });
  const user: User = ADMIN;

  return <HeaderBlock {...{ ...props, user: user }} />;
}

export async function HeaderBlock(props: Props) {
  const { searchIsHidden = false, searchParams, user } = props;
  const t = await getTranslations("HeaderBlock");

  // const header: HeaderType = await getCachedGlobal("header", 1)();
  const header = {
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
    <header className="fl-pt-16/24 w-full z-50 fl-px-8/32 self-center sticky flex justify-between items-center">
      <Link href="/" className={"block m-0! p-0! border-0! cursor-pointer relative aspect-square h-14! xl:h-16!"}>
        <Image
          src={"/Logo-1.svg"}
          loading="eager"
          fill
          unoptimized={false}
          className="block object-cover" alt={"Logo"}  />
      </Link>
      <div className="flex items-center fl-gap-x-8/16">
        {!searchIsHidden && (
          <div className={"hidden lg:block"}>
            {header.navItems?.map((item, index) => (
              <CMSLink size={"sm"} key={String(index)} {...item} />
            ))}
            <SearchInput searchParams={props.searchParams} />
          </div>
        )}

        <div className="flex items-center fl-gap-x-12/16 fl-px-16/24 py-3 bg-secondary rounded-full">
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
