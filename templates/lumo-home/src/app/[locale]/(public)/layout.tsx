import type { Metadata } from "next";
import type React from "react";
import { Footer } from "@/shared/components/Footer/Component";
import { Header } from "@/shared/components/Header/Component";
import { constructMetadata } from "@/shared/utils/meta";


export const metadata: Metadata = constructMetadata({
  title: "Modern furniture",
  url: "/",
  description: "Modern design and functionality.",
});

type Props = {
  children: React.ReactNode;
  searchParams: Promise<{ [key: string]: string | string[] }>;
  params: Promise<{ locale: string }>;
};

export default async function Layout(props: Props) {
  const { children, searchParams } = props;

  return (
    <>
      <Header searchParams={searchParams} />
      <main className="min-h-[calc(100dvh-112px)]">{children}</main>
      <Footer />
    </>
  );
}
