import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import type { LocaleCode } from "@/i18n/localization";
import { Footer } from "@/shared/components/Footer/Component";
import { Header } from "@/shared/components/Header/Component";
import { constructMetadata } from "@/shared/utils/meta";


export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    onlyName: true,
    locale: locale as LocaleCode,
    url: `/`,
  });
}

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100dvh-112px)]">{children}</main>
      <Footer />
    </>
  );
}
