import CheckoutClient from "@/modules/checkout/ui/checkout";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { getLang, LocaleCode } from "@/i18n/localization";
import { getShippings } from "@/modules/shipping/queries/getShippings";
import { retrieveCustomer } from "@/modules/users/actions/getUser";
import { getLocale } from "next-intl/server";

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

export default async function Page({ params }: Props) {
	const { locale } = await params;
	const lang = getLang(locale);

	const userData = await retrieveCustomer();

	const shippings = getShippings({ localeCode: locale });

	return (
		<div className='container mx-auto'>
			<DynamicBreadcrumb breadcrumbs={BREADCRUMBS[lang]} />
			<CheckoutClient
				shippings={shippings.docs.map(s => s.raw)}
				user={userData}
				locale={locale}
			/>
		</div>
	);
}
