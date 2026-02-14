import { Product, ProductRaw } from "@/modules/products/model/types";
import { User } from "@/modules/users/model/types";
import {
	type CurrencyCode,
	getCurrency,
	getLang,
	Lang,
	type LocaleCode,
} from "@/i18n/localization";
import { Shipping, ShippingRaw } from "@/modules/shipping/model/types";
import { routing } from "@/i18n/routing";

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

export type PaymentDataRaw = {
	paymentStatus: "paid" | "pending" | "failed";
	paymentAmount: {
		rub: number;
		usd: number;
	};
	paymentPaid: boolean;
};

export type OrderItemRaw = {
	id: number;
	productRaw: ProductRaw;
	totalPrice: {
		rub: number;
		usd: number;
	};
	quantity: number;
};

// export type ShippingMethodRaw = {
// 	id: number;
// 	name: {
// 		ru: string;
// 		en: string;
// 	};
// 	price: number;
// };

export type OrderStatus =
	| "pending"
	| "waiting_for_capture"
	| "paid"
	| "preparing"
	| "delivering"
	| "shipped"
	| "cancelled"
	| "refund_requested";

export type OrderRaw = {
	id: number;
	paymentDataRaw: PaymentDataRaw;
	shippingMethodRaw: ShippingRaw;
	items: OrderItemRaw[];
	orderedBy: User;
	address: string;
	city: string;
	zip: string;
	phone: string;
	status: OrderStatus;
	isRefunded: boolean;
	updatedAt: string;
	createdAt: string;
};

export class Order {
	private currency: CurrencyCode;
	private lang: Lang = getLang(routing.defaultLocale);

	constructor(public raw: OrderRaw, public locale: LocaleCode) {
		this.currency = getCurrency(locale);
		this.lang = getLang(locale);
	}

	get id() {
		return this.raw.id;
	}

	get status() {
		return this.raw.status;
	}

	get items() {
		const currencyKey =
			this.currency.toLowerCase() as keyof typeof this.raw.paymentDataRaw.paymentAmount;

		return this.raw.items.map(p => ({
			...p,
			product: new Product(p.productRaw, this.locale),
			totalPrice: p.totalPrice[currencyKey],
		}));
	}

	get orderedBy() {
		return this.raw.orderedBy;
	}

	get shippingMethod() {
		const currencyKey =
			this.currency.toLowerCase() as keyof typeof this.raw.paymentDataRaw.paymentAmount;

		return {
			...this.raw.shippingMethodRaw,
			name: this.raw.shippingMethodRaw.name[this.lang],
			price: this.raw.shippingMethodRaw.price[currencyKey],
		};
	}

	get isRefunded() {
		return this.raw.isRefunded;
	}

	get createdAt() {
		return this.raw.createdAt;
	}

	get updatedAt() {
		return this.raw.updatedAt;
	}

	get paymentStatus() {
		return this.raw.paymentDataRaw.paymentStatus;
	}

	get paymentAmount() {
		const currencyKey =
			this.currency.toLowerCase() as keyof typeof this.raw.paymentDataRaw.paymentAmount;
		return this.raw.paymentDataRaw.paymentAmount[currencyKey];
	}

	get paymentPaid() {
		return this.raw.paymentDataRaw.paymentPaid;
	}

	get products() {
		return this.raw.items.map(item => item.productRaw);
	}

	get phone() {
		return this.raw.phone ?? "";
	}

	get address() {
		return this.raw.address ?? "";
	}
	get city() {
		return this.raw.city ?? "";
	}

	get zip() {
		return this.raw.zip ?? "";
	}

	toString() {
		return JSON.stringify(this.raw);
	}
}
