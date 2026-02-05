import { ProductRaw } from "@/modules/products/model/types";
import { User } from "@/modules/users/model/types";

export const STATUS = {
	pending: "pending",
	waiting_for_capture: "waiting_for_capture",
	refund_requested: "refund_requested",
	canceled: "cancelled",
	cancelled: "cancelled",
	succeeded: "succeeded",
	shipped: "shipped" as const,
	paid: "paid",
} as const;

export type PaymentData = {
	paymentStatus: "paid" | "pending" | "failed";
	paymentAmount: string;
	paymentPaid: boolean;
};

// export type OrderedBy = {
// 	user: number;
// 	name: string;
// 	email: string;
// };

export type OrderItem = {
	id: number;
	product: ProductRaw;
	totalPrice: {
		rub: number;
		usd: number;
	};
	quantity: number;
};

export type ShippingMethod = {
	id: number;
	name: string;
	price: number;
};

export type OrderStatus =
	| "pending"
	| "waiting_for_capture"
	| "paid"
	| "preparing"
	| "delivering"
	| "shipped"
	| "cancelled"
	| "refund_requested";

export type Order = {
	id: number;
	paymentData: PaymentData;
	orderedBy: User;
	items: OrderItem[];
	address: string;
	city: string;
	zip: string;
	phone: string;
	status: OrderStatus;
	shippingMethod: ShippingMethod;
	isRefunded: boolean;
	updatedAt: string;
	createdAt: string;
};
