import type { StoreProductVariant } from "@/modules/products/types";
import type { User } from "@/modules/users/types";

export interface Order {
	id: number;
	orderedBy?: (number | null) | User;
	status?: ("pending" | "completed" | "cancelled") | null;
	stripePaymentIntentID?: string | null;
	total: number;
	items?:
		| {
				variant: number | StoreProductVariant;
				price?: number | null;
				quantity?: number | null;
				isSelected?: boolean | null;
				id?: string | null;
		  }[]
		| null;
	updatedAt: string;
	createdAt: string;
}
