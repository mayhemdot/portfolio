import { Order } from "@/modules/orders/model/types";
import { PRODUCTS } from "@/modules/products/model/data";
import { CUSTOMER } from "@/modules/users/model/data";

export const ORDERS: Order[] = [
	{
		id: 2,
		// payment?: (number | null) | Payment;
		paymentData: {
			paymentStatus: "paid",
			paymentAmount: "23000",
			paymentPaid: true,
		},
		orderedBy: CUSTOMER,
		items: [
			{
				id: 1,
				product: PRODUCTS[0],

				totalPrice: PRODUCTS[0].price,
				quantity: 1,
			},
		],
		address: "Kensington 123",
		city: "London",
		zip: "11111",
		phone: "+7 (999) 999 99 99",
		status: "pending",

		shippingMethod: {
			id: 1,
			name: "Standard",
			price: 0,
		} as any,
		isRefunded: true,
		updatedAt: "2025-10-31T14:30:00.000Z",
		createdAt: "2025-10-31T14:30:00.000Z",
	},
];

// | 'waiting_for_capture'
// | 'paid'
// | 'preparing'
// | 'delivering'
// | 'shipped'
// | 'cancelled'
// | 'refund_requested';
// product: {
// 	id: 1,
// 	title: "Modern orange glass chair 111",
// 	price: 23000,
// 	slug: "modern-orange-glass-chair-104",
// 	slugLock: false,
// 	updatedAt: "2025-10-31T14:30:00.000Z",
// 	createdAt: "2025-10-31T14:30:00.000Z",
// 	category: {
// 		id: 2,
// 		name: "Tables",
// 		slug: "tables",
// 	},
// 	description: null,
// } as Product,
