import NonSSRWrapper from "@/shared/components/NonSSRWrapper";
import { ROUTES } from "@/shared/utils/constants";
import { constructMetadata } from "@/shared/utils/meta";
import { AccountPageClient } from "./page.client";
import { retrieveCustomer } from "@/modules/users/actions/getUser";
import { routing } from "@/i18n/routing";
import { LocaleCode } from "@/i18n/localization";
import { getOrders } from "@/modules/orders/queries/getOrders";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
	const t = await getTranslations("AccountPage");

	return constructMetadata({
		title: t("breadcrumbs.account"),
		url: ROUTES.PROFILE,
		description: t("breadcrumbs.account"),
	});
}

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
	const { locale = routing.defaultLocale } = await params;
	const userProfile = await retrieveCustomer();
	const orders = getOrders({ localeCode: locale as LocaleCode });

	return (
		<NonSSRWrapper>
			<AccountPageClient
				userProfile={userProfile}
				ordersData={{ ...orders, docs: orders?.docs.map(o => o.raw) }}
				locale={locale as LocaleCode}
			/>
		</NonSSRWrapper>
	);
}
