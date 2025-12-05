import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import RegisterForm from "@/modules/account/components/RegisterForm";
import { FormLayout } from "@/modules/common/components/Form/FormLayout/form-layout";
import LayoutWithBreadcrumbs from "@/modules/common/components/LayoutWithBreadcrumbs";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import { generateMeta, SITE_NAME } from "@/shared/utils/generateMeta";
import { ROUTES } from "@/shared/utils/routes";

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
        title: `${SITE_NAME} - ${t("seo.register.title")}`,
        description: t("seo.register.description"),
        image: null,
      },
    },
  });
}

export default async function ({ params }: Props) {
  // const countryCode = getCountryCodeFromLocale(locale);
  // const customer = await retrieveCustomer().catch(() => null);

  const { locale = routing.defaultLocale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
  });
  // if (customer) {
  //   redirect(ROUTES.dashboard(countryCode));
  // }

  // let page: Page | null = await queryPageBySlug({
  //   slug: "signup",
  // });

  // if (!page) {
  //   page = STATIC_PAGE("Sign up", countryCode);
  // }

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
          label: t("breadcrumbs.register") || "Sign up",
          url: `!`,
        },
      ]}
    >
      {/* <RenderHero {...page.hero} /> */}
      <FormLayout
        testid={"register-page"}
        description={t("register.title") || "Create your account, and get access to an enhanced shopping experience."}
        actions={[
          <div key="register" className="mt-6">
            {t("register.form.links.already_have_an_account")}{" "}
            <LocalizedClientLink href={ROUTES.login()} className="cursor-pointer text-primary/80 hover:underline">
              {t("register.form.links.login_link")}
            </LocalizedClientLink>
          </div>,
        ]}
      >
        <RegisterForm locale={locale} />
      </FormLayout>
    </LayoutWithBreadcrumbs>
  );
}

// export type { generateMetadata };
