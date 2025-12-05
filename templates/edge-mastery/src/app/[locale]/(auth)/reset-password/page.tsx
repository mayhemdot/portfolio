import { redirect } from "next/navigation";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ResetPasswordForm } from "@/modules/account/components/ResetPassword";
import { FormLayout } from "@/modules/common/components/Form/FormLayout/form-layout";
import LayoutWithBreadcrumbs from "@/modules/common/components/LayoutWithBreadcrumbs";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import { getCountryCodeFromLocale } from "@/modules/common/lib/get-region";
import { retrieveCustomer } from "@/modules/users/actions/retriveCustomer";
import { ROUTES } from "@/shared/utils/routes";

type Params = {
  params: Promise<{ locale?: string }>;
  searchParams: Promise<{ token?: string; email?: string }>;
};

export default async function ({ params, searchParams }: Params) {
  const { locale = routing.defaultLocale } = await params;
  const countryCode = getCountryCodeFromLocale(locale);
  const { token, email } = await searchParams;
  const t = await getTranslations({
    locale: locale as Locale,
  });
  if (!token || !email) {
    redirect(`${ROUTES.forgotPassword(countryCode)}?error=${encodeURIComponent("Token or email not found")}`);
  }
  const customer = await retrieveCustomer().catch(() => null);

  if (customer) {
    redirect(ROUTES.dashboard(countryCode));
  }

  //   let page: Page | null = await queryPageBySlug({
  //     slug: "reset-password",
  //   });

  //   if (!page) {
  //     page = STATIC_PAGE("Reset password", countryCode);
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
          label: t("breadcrumbs.resetPassword") || "Reset password",
          url: `!`,
        },
      ]}
    >
      <FormLayout
        testid={"reset-password-page"}
        description={"Fill in your email address to reset your password"}
        actions={[
          <div key="join-us" className="text-center fsSmall mt-6">
            Not a member?{" "}
            <LocalizedClientLink
              className="underline fsSmall cursor-pointer"
              data-testid="reset-password-button"
              href={ROUTES.signup()}
            >
              Join us
            </LocalizedClientLink>
          </div>,
        ]}
      >
        <ResetPasswordForm token={token.toString()} email={email.toString()} countryCode={countryCode.toString()} />
      </FormLayout>
    </LayoutWithBreadcrumbs>
  );
}

// export type { generateMetadata };
