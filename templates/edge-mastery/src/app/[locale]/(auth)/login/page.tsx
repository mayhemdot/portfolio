import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { GoogleAuthButton } from "@/modules/account/components/LoginForm/GoogleAuthButton";
import { FormLayout } from "@/modules/common/components/Form/FormLayout/form-layout";
import LayoutWithBreadcrumbs from "@/modules/common/components/LayoutWithBreadcrumbs";
import { LoginForm } from "@/modules/users/components/LoginForm";
import { generateMeta, SITE_NAME } from "@/shared/utils/generateMeta";

// import { getCountryCodeFromLocale } from "@/modules/common/lib/get-region";
// import { retrieveCustomer } from "@/modules/users/actions/retriveCustomer";

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
      slug: "/login",
      meta: {
        title: `${SITE_NAME} - ${t("seo.login.title")}`,
        description: t("seo.login.description"),
        image: null,
      },
    },
  });
}

export default async function ({ params }: Props) {
  const { locale = routing.defaultLocale } = await params;

  // const countryCode = getCountryCodeFromLocale(locale);
  // const customer = await retrieveCustomer().catch(() => null);

  const t = await getTranslations({
    locale: locale as Locale,
  });
  // if (customer) {
  //   redirect(ROUTES.dashboard(countryCode));
  // }

  //   let page: Page | null = await queryPageBySlug({
  //     slug: "login",
  //   });

  //   if (!page) {
  //     page = STATIC_PAGE("Log in", countryCode);
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
          label: t("breadcrumbs.login") || "Log in",
          url: `!`,
        },
      ]}
    >
      {/* <RenderHero {...page.hero} /> */}
      <FormLayout
        testid={"login-page"}
        description={t("login.description")} //"Sign in to access an enhanced shopping experience."
        actions={[<GoogleAuthButton key="google-auth-button" />]}
      >
        <LoginForm locale={locale} />
      </FormLayout>
    </LayoutWithBreadcrumbs>
  );
}
