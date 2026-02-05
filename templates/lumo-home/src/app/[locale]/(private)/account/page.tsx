import NonSSRWrapper from "@/shared/components/NonSSRWrapper";
import { ROUTES } from "@/shared/utils/constants";
import { constructMetadata } from "@/shared/utils/meta";
import { Metadata } from "next";
import { AccountPageClient } from "./page.client";
import { retrieveCustomer } from "@/modules/users/actions/getUser";
import { routing } from "@/i18n/routing";
import { ORDERS } from "@/modules/orders/model/data";
import { LocaleCode } from "@/i18n/localization";

export const metadata: Metadata = constructMetadata({
	title: "Личный кабинет",
	url: ROUTES.PROFILE,
	description: "Личный кабинет. Профиль пользователя",
});

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
	const { locale = routing.defaultLocale } = await params;

	// const payload = await getPayload()

	// const userProfile = await getCurrentUserAction({
	//   depth: 2,
	//   redirectUrl: '/login',
	// })
	const userProfile = await retrieveCustomer();

	// const { docs: orders } = await payload.find({
	//   collection: 'orders',
	//   where: {
	//     'orderedBy.user': {
	//       equals: userProfile!.id,
	//     },
	//   },
	//   limit: 200,
	// })

	return (
		<NonSSRWrapper>
			<AccountPageClient
				userProfile={userProfile!}
				orders={ORDERS}
				locale={locale as LocaleCode}
			/>
		</NonSSRWrapper>
	);
}
