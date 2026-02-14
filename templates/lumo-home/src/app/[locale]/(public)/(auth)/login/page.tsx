import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { LocaleCode } from "@/i18n/localization";
import { GoogleLoginButton } from "@/modules/auth/ui/auth/GoogleLoginButton";
import { LayoutAuth } from "@/modules/auth/ui/auth/LayoutAuth";
import { LoginFormClient } from "@/modules/auth/ui/auth/LoginForm";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { btnVariants } from "@/shared/components/ui/button";
import { constructMetadata } from "@/shared/utils/meta";

// import { GoogleLoginButton } from "@/modules/auth/ui/better-auth/GoogleLoginButton";


type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("Login");
  
  return constructMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    onlyName: false,
    locale: locale as LocaleCode,
    url: `/login`,
  });
}

export default async function Login({ params }: Props) {
  // const session = await getSession();
  // if (session?.user)  redirect("/");

  await params;

  const t = await getTranslations("Login");

  const breadcrumbs = [
    { label: t("breadcrumbs.home"), url: "/" },
    { label: t("breadcrumbs.login"), url: "" },
  ];

  return (
    <>
      <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
      <LayoutAuth
        imageSrc={"/images/product_2.jpg"}
        title={t("title")}
        description={t("description")}
        footer={<GoogleLoginButton />}
        action={
          <Link
            href="/register"
            className={btnVariants({
              variant: "link",
              className: "text-blue-600! p-0!",
              size: "sm",
            })}
          >
            {t("signUp")}
          </Link>
        }
      >
        <LoginFormClient />
      </LayoutAuth>
    </>
  );
}
