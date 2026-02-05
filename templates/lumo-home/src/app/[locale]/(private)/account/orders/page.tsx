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
import { Order } from "@/modules/orders/model/types";
import { retrieveCustomer } from "@/modules/users/actions/getUser";
import { searchOrders } from "@/modules/orders/queries/searchOrders";

export const metadata: Metadata = constructMetadata({
	title: "Заказы",
	url: ROUTES.ORDERS,
	description: "Заказы.",
});

const pageItemsList = [10, 20, 30, 40, 50] as const;

export const pageSearchParams = {
	q: parseAsString.withDefault("").withOptions({
		shallow: false,
	}),
	page: parseAsIndex.withDefault(0),
	pageItems: parseAsNumberLiteral(pageItemsList),
};

// Then pass it to the parser
export const loadSearchParams = createLoader(pageSearchParams);

type Props = {
	searchParams: Promise<{
		[key: string]: string | string[];
	}>;
};

export default async function PageOrders({ searchParams }: Props) {
	const userProfile = await retrieveCustomer();

	const { pageItems, page, q: query } = loadSearchParams(await searchParams);

	const ordersData = await searchOrders(
		{
			userId: Number(userProfile.id),
			page,
			pageItems,
		},
		query,
	);

	// const { docs: orders, totalDocs, totalPages } = ordersData;

	const ORDER_STATUS_LIST: Order["status"][] = [
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
				ordersData={ordersData}
				statusList={ORDER_STATUS_LIST}
			/>
		</div>
	);
}
