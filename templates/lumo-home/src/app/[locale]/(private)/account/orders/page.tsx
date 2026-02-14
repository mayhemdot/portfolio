import OrderPageClient from "./page.client";
import {
	createLoader,
	parseAsIndex,
	parseAsNumberLiteral,
	parseAsString,
} from "nuqs/server";

import { Metadata } from "next";
import { constructMetadata } from "@/shared/utils/meta";
import { ROUTES } from "@/shared/utils/constants";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { OrderStatus } from "@/modules/orders/model/types";
import { retrieveCustomer } from "@/modules/users/actions/getUser";
import { searchOrders } from "@/modules/orders/queries/searchOrders";
import { LocaleCode } from "@/i18n/localization";

export const metadata: Metadata = constructMetadata({
	title: "Заказы",
	url: ROUTES.ORDERS,
	description: "Заказы.",
});

const pageItemsList = [10, 20, 30, 40, 50] as const;

const pageSearchParams = {
	q: parseAsString.withDefault("").withOptions({
		shallow: false,
	}),
	page: parseAsIndex.withDefault(0),
	pageItems: parseAsNumberLiteral(pageItemsList),
};

// Then pass it to the parser
const loadSearchParams = createLoader(pageSearchParams);

type Props = {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{
		[key: string]: string | string[];
	}>;
};

export default async function PageOrders({ params, searchParams }: Props) {
	const { locale } = await params;

	const userProfile = await retrieveCustomer();

	const { pageItems, page, q: query } = loadSearchParams(await searchParams);

	const ordersData = await searchOrders(
		{
			userId: Number(userProfile.id),
			page,
			pageItems,
			localeCode: locale as LocaleCode,
		},
		query,
	);

	// const { docs: orders, totalDocs, totalPages } = ordersData;

	const ORDER_STATUS_LIST: OrderStatus[] = [
		// Ожидание оплаты
		"pending", //or created
		// Ожидание подтверждения товара
		"waiting_for_capture",
		// Оплачен и подтвержден
		"paid",
		// Подготовка к отправке
		"preparing",
		// Осуществляется доставка
		"delivering",
		// Доставлено
		"shipped",
		//  Отменен
		"cancelled",
	];

	return (
		<div className='container mx-auto'>
			{/* <DynamicBreadcrumb
        breadcrumbs={[
          { label: 'Главная', url: '/' },
          { label: 'Аккаунт', url: '/account' },
          { label: 'Заказы' },
        ]}
      /> */}
			<OrderPageClient
				userId={Number(userProfile.id)}
				ordersData={{ ...ordersData, docs: ordersData?.docs.map(o => o.raw) }}
				statusList={ORDER_STATUS_LIST}
				locale={locale as LocaleCode}
			/>
		</div>
	);
}
