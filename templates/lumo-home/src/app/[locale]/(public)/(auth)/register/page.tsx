import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { LayoutAuth } from "@/modules/auth/ui/auth/LayoutAuth";
import { RegisterFormClient } from "@/modules/auth/ui/auth/RegisterForm";

import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { btnVariants } from "@/shared/components/ui/button";
import { constructMetadata } from "@/shared/utils/meta";

export const metadata: Metadata = constructMetadata({
  title: "Аутентификация | Регистрация",
  url: "/",
  description: "Регистрация",
});

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

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
        imageSrc={'/images/product_2.jpg'}
        title={t('title')}
        description={t('description')}
        footer={''}
        action={
          <Link
            href="/login"
            className={btnVariants({
              variant: 'link',
              className: 'text-blue-600! p-0!',
              size: 'sm',
            })}
          >
            {t('logIn')}
          </Link>
        }
      >
        <RegisterFormClient />
      </LayoutAuth>
    </>
  )
}
