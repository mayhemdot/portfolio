import { redirect } from "next/navigation";
import CheckoutClient from "@/modules/checkout/ui/checkout";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { getLang, LocaleCode } from "@/i18n/localization";
import { getShippings } from "@/modules/shipping/queries/getShippings";
import { retrieveCustomer } from "@/modules/users/actions/getUser";

type Props = {
	params: Promise<{
		locale: LocaleCode;
	}>;
};

const BREADCRUMBS = {
	ru: [
		{ label: "Главная", url: "/" },
		{ label: "Категории", url: "!" },
	],
	en: [
		{ label: "Home", url: "/" },
		{ label: "Categories", url: "!" },
	],
};

export default async function Page({ params }: Props) {
	const { locale } = await params;
	const lang = getLang(locale);

	return (
		<div className='container mx-auto'>
			<DynamicBreadcrumb breadcrumbs={BREADCRUMBS[lang]} />
			<div>{}</div>
		</div>
	);
}
