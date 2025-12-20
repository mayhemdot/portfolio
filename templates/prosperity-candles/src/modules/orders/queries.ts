import type { Order } from "@/modules/orders/types";

export const ORDERS: Order[] = [
	{
		id: 1,
		status: "completed",
		total: 3500,
		orderedBy: 1,
		items: [
			{
				variant: {
					id: "variant_1",
					title: "Vanilla Caramel",
					sku: "VC-01",
					inventory_quantity: 10,
					allow_backorder: false,
					manage_inventory: true,
				},
				price: 3500,
				quantity: 1,
			},
		],
		createdAt: "2023-10-27T10:00:00Z",
		updatedAt: "2023-10-27T12:00:00Z",
	},
	{
		id: 2,
		status: "pending",
		total: 7000,
		orderedBy: 1,
		items: [
			{
				variant: {
					id: "variant_2",
					title: "Orange & Cinnamon",
					sku: "OC-01",
					inventory_quantity: 5,
					allow_backorder: false,
					manage_inventory: true,
				},
				price: 3500,
				quantity: 2,
			},
		],
		createdAt: "2023-10-28T14:30:00Z",
		updatedAt: "2023-10-28T14:30:00Z",
	},
];
