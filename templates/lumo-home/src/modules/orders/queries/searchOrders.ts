import { LocaleCode } from "@/i18n/localization";
import { ORDERS } from "@/modules/orders/model/data";
import { Order } from "@/modules/orders/model/types";

export async function searchOrders(
	{
		userId,
		page,
		pageItems,
		localeCode,
	}: {
		userId: number;
		page: number;
		localeCode: LocaleCode;
		pageItems: 10 | 20 | 30 | 40 | 50 | null;
	},
	query?: string,
) {
	// const payload = await getPayload();
	// const ordersData = await payload.find({
	// 	collection: "orders",
	// 	where: whereQ({ userId, query }) as any,
	// 	limit: (pageItems as number) || 10,
	// 	page: page + 1,
	// });

	return {
		docs: ORDERS.map(order => new Order(order, localeCode)),
		page: Number(1),
		limit: 10,
		totalDocs: ORDERS.length || 0,
		totalPages: 1,
	};
}
