import { LocaleCode } from "@/i18n/localization";
import { Product } from "@/modules/products/model/types";
import { PaginatedDocs } from "@/modules/products/queries/searchProducts";
import { routing } from "@/i18n/routing";
import { ORDERS } from "@/modules/orders/model/data";
import { Order } from "@/modules/orders/model/types";

export const getOrders = ({
	search,
	sortBy,
	page = String(1),
	localeCode = routing.defaultLocale,
}: {
	search?: string;
	sortBy?: string;
	page?: string;
	localeCode: LocaleCode;
}): PaginatedDocs<Order> => {
	return {
		docs: ORDERS.map(order => new Order(order, localeCode)),
		page: Number(1),
		limit: 10,
		totalDocs: ORDERS.length || 0,
		totalPages: 1,
	};
};
