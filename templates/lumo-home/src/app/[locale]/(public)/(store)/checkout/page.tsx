import type { Metadata } from "next";
import type { Lang, LocaleCode } from "@/i18n/localization";
import CheckoutClient from "@/modules/checkout/ui/checkout";
import { getShippings } from "@/modules/shipping/queries/getShippings";
import { retrieveCustomer } from "@/modules/users/actions/getUser";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { constructMetadata } from "@/shared/utils/meta";

type Props = {
  params: Promise<{
    locale: LocaleCode;
  }>;
};

const BREADCRUMBS = {
  ru: [
    { label: "Главная", url: "/" },
    { label: "Оформление заказа", url: "!" },
  ],
  en: [
    { label: "Home", url: "/" },
    { label: "Checkout", url: "!" },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { language } = new Intl.Locale(locale);

  return constructMetadata({
    title: BREADCRUMBS[language as Lang][1].label,
    onlyName: false,
    locale: locale as LocaleCode,
    url: `/checkout`,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const { language } = new Intl.Locale(locale);

  const userData = await retrieveCustomer();

  const shippings = getShippings({ localeCode: locale });

  return (
    <div className="container mx-auto">
      <DynamicBreadcrumb breadcrumbs={BREADCRUMBS[language as Lang]} />
      <CheckoutClient
        shippings={shippings.docs.map((s) => s.raw)}
        user={userData}
        locale={locale}
      />
    </div>
  );
}
