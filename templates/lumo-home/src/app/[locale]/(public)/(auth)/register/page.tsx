import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { LocaleCode } from "@/i18n/localization";
import { LayoutAuth } from "@/modules/auth/ui/auth/LayoutAuth";
import { RegisterFormClient } from "@/modules/auth/ui/auth/RegisterForm";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { btnVariants } from "@/shared/components/ui/button";
import { constructMetadata } from "@/shared/utils/meta";



type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("Register");
  return constructMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    onlyName: false,
    locale: locale as LocaleCode,
    url: `/register`,
  });
}

export default async function Register({ params }: Props) {
  // const session = await getSession();
  // if (session?.user)  redirect("/");

  await params;

  const t = await getTranslations("Register");

  const breadcrumbs = [
    { label: t("breadcrumbs.home"), url: "/" },
    { label: t("breadcrumbs.register"), url: "" },
  ];

  return (
    <>
      <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
      <LayoutAuth
        imageSrc={"/images/product_2.jpg"}
        title={t("title")}
        description={t("description")}
        footer={""}
        action={
          <Link
            href="/login"
            className={btnVariants({
              variant: "link",
              className: "text-blue-600! p-0!",
              size: "sm",
            })}
          >
            {t("logIn")}
          </Link>
        }
      >
        <RegisterFormClient />
      </LayoutAuth>
    </>
  );
}
