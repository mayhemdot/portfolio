import { OrderStatus } from "@/modules/orders/model/types";
import {
	Package,
	Truck,
	CreditCard,
	RefreshCw,
	Star,
	CurrencyIcon,
	X,
} from "lucide-react";

// type OrderStatus = Order["status"];

export const getStatusColor = (status: OrderStatus) => {
	switch (status) {
		case "pending":
			return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
		case "delivering":
			return "bg-blue-100 text-blue-800 hover:bg-blue-100";
		case "waiting_for_capture":
			return "bg-orange-100 text-orange-800 hover:bg-orange-100";
		case "preparing":
			return "bg-orange-100 text-orange-800 hover:bg-orange-100";
		case "paid":
			return "bg-purple-100 text-purple-800 hover:bg-purple-100";
		case "shipped":
			return "bg-green-100 text-green-800 hover:bg-green-100";
		case "cancelled":
			return "bg-red-100 text-red-800 hover:bg-red-100";
		case "refund_requested":
			return "bg-orange-100 text-orange-800 hover:bg-orange-100";
		default:
			return "bg-gray-100 text-gray-800 hover:bg-gray-100";
	}
};

export const getStatusIcon = (status: OrderStatus) => {
	switch (status) {
		case "pending":
			return <Package className='icon-size' />;
		case "delivering":
			return <Truck className='icon-size' />;
		case "waiting_for_capture":
			return <CreditCard className='icon-size' />;
		case "preparing":
			return <RefreshCw className='icon-size animate-spin' />;
		case "paid":
			return <CreditCard className='icon-size' />;
		case "shipped":
			return <Truck className='icon-size' />;
		case "cancelled":
			return <X className='icon-size' />;
		case "refund_requested":
			return <CurrencyIcon className='icon-size' />;
		default:
			return <Package className='icon-size' />;
	}
};
