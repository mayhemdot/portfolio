import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { getLang, type LocaleCode } from "@/i18n/localization";
import { Logo } from "@/shared/components/Header/Logo";
import { CMSLink } from "@/shared/components/Link";
import { btnVariants } from "@/shared/components/ui/button";
import { SITE_NAME } from "@/shared/utils/constants";

export async function Footer() {
  const locale = (await getLocale()) as LocaleCode;
  const t = await getTranslations("Global.Footer");

  const lang = getLang(locale);

  const footer = {
    navItems: [
      {
        link: {
          url: "/",
          label: {
            en: "Home",
            ru: "Главная",
          },
        },
      },
      {
        link: {
          url: "/about",
          label: {
            en: "About",
            ru: "O нас",
          },
        },
      },
      {
        link: {
          url: "/products",
          label: {
            en: "Catalog",
            ru: "Каталог",
          },
        },
      },
      {
        link: {
          url: "/contacts",
          label: {
            en: "Contacts",
            ru: "Контакты",
          },
        },
      },
    ],
    logo: {
      url: "/logo.svg",
    },
    socialLinks: [
      {
        link: {
          url: "https://twitter.com/payloadcms",
          label: "VK",
        },
      },
      {
        link: {
          url: "https://github.com/payloadcms/payload",
          label: "Telegram",
        },
      },
    ],
    policy: [
      {
        url: "/privacy-policy",
        label: {
          en: "Privacy Policy",
          ru: "Политика конфиденциальности",
        },
      },
      {
        url: "/terms-and-conditions",
        label: {
          en: "Terms & Conditions",
          ru: "Условия использования",
        },
      },
    ],
  };

  return (
    <footer className="bg-secondary dark:bg-card text-foreground w-full">
      <div className="container mx-auto py-8 px-4 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="w-full flex flex-col xl:flex-row justify-between gap-4 xl:gap-8">
          {/* <Logo logo={footer.logo} /> */}

          <p className="fl-text-80/140 text-foreground font-medium">
            {SITE_NAME}
          </p>
          <div className="inline-flex py-8 xl:py-16 items-start md:flex-row fl-gap-16/32 md:items-start">
            {/* <ThemeSelector /> */}
            <div className="flex flex-col fl-gap-4/16">
              <h3 className="mb-2 text-center fl-text-20/24">
                {t("headers.resources")}
              </h3>
              <nav className="flex flex-col fl-gap-4/16">
                {footer?.navItems?.map(({ link: { url, label } }, index) => (
                  <CMSLink
                    size={"sm"}
                    label={label[lang]}
                    className={btnVariants({
                      variant: "ghost",
                      className: "w-full px-8! fl-text-20/24",
                    })}
                    key={String(index)}
                    url={url}
                  />
                ))}
              </nav>
            </div>

            <div className="flex flex-col fl-gap-4/16">
              <h3 className="mb-2 text-center fl-text-20/24">
                {t("headers.followUs")}
              </h3>
           
              <div className="flex flex-col fl-gap-4/16">
                {footer.socialLinks?.map(({ link }, index: number) => (
                  <CMSLink
                    size={"sm"}
                    key={String(index)}
                    {...link}
                    className={btnVariants({
                      variant: "ghost",
                      className: "w-full px-8! fl-text-20/24",
                    })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t-2 mx-auto p-4 justify-between flex items-center">
        <div className="flex items-center fl-gap-4/8">
          <Link
            href={"/terms-and-conditions"}
            className={btnVariants({
              variant: "link",
              className: "fl-text-10/16",
            })}
          >
            Terms & Conditions
          </Link>
          <span>|</span>
          <Link
            href={"/privacy-policy"}
            className={btnVariants({
              variant: "link",
              className: "fl-text-10/16",
            })}
          >
            Privacy Policy
          </Link>
        </div>
        <div className="fl-text-10/16">© 2025 Lumo. {t("policy.rights")}.</div>
      </div>
    </footer>
  );
}
