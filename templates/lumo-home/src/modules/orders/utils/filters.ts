import { Order, OrderRaw } from "@/modules/orders/model/types";

export const isActiveOrdersRaw = (orders: OrderRaw[]): OrderRaw[] => {
	return (
		orders?.filter(
			order => order.status !== "shipped" && order.status !== "cancelled",
		) || ([] as OrderRaw[])
	);
};

export const isActiveOrders = (orders: Order[]): Order[] => {
	return (
		orders?.filter(
			order => order.status !== "shipped" && order.status !== "cancelled",
		) || ([] as Order[])
	);
};

export const isShippedOrdersRaw = (orders: OrderRaw[]): OrderRaw[] => {
	return orders?.filter(order => order.status === "shipped") || [];
};

export const isShippedOrders = (orders: Order[]): Order[] => {
	return orders?.filter(order => order.status === "shipped") || [];
};

export const isRefundableOrderRaw = (order?: OrderRaw): boolean => {
	if (!order) return false;
	return (
		order.status === "pending" ||
		order.status === "waiting_for_capture" ||
		order.status === "paid"
	);
};
export const isRefundableOrder = (order?: Order): boolean => {
	if (!order) return false;
	return (
		order.status === "pending" ||
		order.status === "waiting_for_capture" ||
		order.status === "paid"
	);
};

// export const isInProcessingOrders = (orders: Order[]): Order[] => {
//   return orders?.filter((order) => order.status === "shipped");
// };
