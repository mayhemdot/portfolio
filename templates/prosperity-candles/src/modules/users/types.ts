import type { StoreProductVariant } from "@/modules/products/types";

export interface User {
	id: number;
	name?: string | null;
	roles?: ("admin" | "customer")[] | null;
	purchases?: (number | StoreProductVariant)[] | null;
	stripeCustomerID?: string | null;
	cart?: {
		items?: any;
	};
	skipSync?: boolean | null;
	updatedAt: string;
	createdAt: string;
	email: string;
	resetPasswordToken?: string | null;
	resetPasswordExpiration?: string | null;
	salt?: string | null;
	hash?: string | null;
	_verified?: boolean | null;
	_verificationToken?: string | null;
	loginAttempts?: number | null;
	lockUntil?: string | null;
	password: string | null;
}
