import { notFound } from "next/navigation";
import * as qs from "qs-esm";
import { ORDERS } from "@/modules/orders/queries";
import OrderTable from "./OrderTable";

async function OrdersPage(params: {
	searchParams?: Promise<{
		status?: string;
		query?: string;
		page?: string;
		pageSize?: string;
		orderBy?: string;
	}>;
}) {
	// const { user } = await getMeUser({
	// 	nullUserRedirect: `/login?error=${encodeURIComponent(
	// 		"You must be logged in to view your orders."
	// 	)}&redirect=${encodeURIComponent("/orders")}`,
	// });

	const orders = ORDERS;
	const searchParams = await params.searchParams;
	// const status = searchParams?.status;
	// const { pageSize: limit, page, orderBy: sort } = searchParams || {};

	return <OrderTable orders={orders} />;
}

export default OrdersPage;
