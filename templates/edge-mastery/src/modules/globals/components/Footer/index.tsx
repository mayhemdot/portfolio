import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import { getCountryCodeFromLocale } from "@/modules/common/lib/get-region";
import { Text } from "@/shared/components/Text";
import { Nav } from "../Header/Nav";
import { ProductLinksNav } from "./ProductLinks";

export async function FooterCmp({ locale }: { locale: string }) {
  const countryCode = getCountryCodeFromLocale(locale);
  // const
  const t = await getTranslations({
    locale: locale as Locale,
  });
  return (
    <footer className="relative bg-background padding-4-8-16 pt-32! h-fit md:h-full md:min-h-[500px] md:max-h-[580px] z-100  py-12">
      <div className="flex flex-col h-full justify-between grow ">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div>
            <Text comp="h4" variant="gradient" size={"lg"} className="mb-4 uppercase">
              Edge Mastery
            </Text>
            <div className="text-sm text-neutral-400 mt-3">
              <Text comp="span" variant="secondary" size="xxs" className="mr-2">
                {/* Site developed by */}
                {t("footer.developed")}
              </Text>

              <LocalizedClientLink
                className="cursor-pointer hover:text-white underline text-gold"
                href="https://ge-production.com"
              >
                GE Production
              </LocalizedClientLink>
            </div>
          </div>

          <div className="flex gap-20">
            <div>
              <Text comp="h4" variant="gradient" size={"sm"} className="mb-4">
                {t("footer.categories")}
              </Text>
              <ProductLinksNav className="gap-2 fl-text-16/24" />
            </div>

            <div>
              <Text comp="h4" variant="gradient" size={"sm"} className="mb-4">
                {t("footer.site")}
              </Text>
              <Nav className="gap-2 flex flex-col fl-text-16/24" />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-12 pt-6 text-center text-sm text-neutral-500">
          © 2023–2025 Edge Mastery. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// <footer className="relative flex bg-background flex-col items-between justify-between padding-4-8-16 min-h-[500px] z-100">
//   <Text comp="h1" size="xl" variant="secondary">
//     EDGE MASTERY
//   </Text>
//   <div className="flex justify-between">
//     <span>2024 Edge Mastery</span>
//     <span>Privacy Policy</span>
//   </div>
// </footer>
