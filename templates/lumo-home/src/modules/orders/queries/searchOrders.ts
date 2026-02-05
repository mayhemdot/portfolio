import { ORDERS } from "@/modules/orders/model/data";

export async function searchOrders(
	{
		userId,
		page,
		pageItems,
	}: {
		userId: number;
		page: number;
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
		docs: ORDERS,
		page: Number(1),
		limit: 10,
		totalDocs: ORDERS.length || 0,
		totalPages: 1,
	};
}
