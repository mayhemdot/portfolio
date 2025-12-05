import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { FormLayout } from "@/modules/common/components/Form/FormLayout/form-layout";
import LayoutWithBreadcrumbs from "@/modules/common/components/LayoutWithBreadcrumbs";
import { ForgotPasswordForm } from "@/modules/users/components/ForgotPasswordForm";
import { mergeOpenGraph } from "@/shared/utils/mergeOpenGraph";

// import { mergeOpenGraph } from "@/payload/utils/mergeOpenGraph";

type Params = {
  params: Promise<{ locale?: string }>;
};

export default async function ForgotPasswordPage({ params }: Params) {
  const { locale = routing.defaultLocale } = await params;

  const t = await getTranslations({
    locale: locale,
  });
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
          label: t("breadcrumbs.forgotPassword") || "Forgot password",
          url: `!`,
        },
      ]}
    >
      <FormLayout
        testid={"reset-password-page"}
        description={""}
        actions={
          [
            // <div key="join-us" className="text-center fsSmall mt-6">
            //   Not a member?{" "}
            //   <LocalizedClientLink
            //     className="underline fsSmall cursor-pointer"
            //     data-testid="reset-password-button"
            //     href={ROUTES.signup()}
            //   >
            //     Join us
            //   </LocalizedClientLink>
            // </div>,
          ]
        }
      >
        <ForgotPasswordForm />
      </FormLayout>
    </LayoutWithBreadcrumbs>
  );
}

export const metadata: Metadata = {
  description: "Enter your email address to recover your password.",
  openGraph: mergeOpenGraph({
    title: "Forgot Password",
    url: "/forgot-password",
  }),
  title: "Forgot Password",
};
