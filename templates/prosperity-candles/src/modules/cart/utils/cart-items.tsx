// import { priceFromJSON } from "@/components/Price";
import type { CartLineItem } from "@/modules/cart/store";
import type { StoreProductVariant } from "@/modules/products/types";

// import type { CartItem } from "@/app/_providers/Cart/reducer";
// import type { ProductVariant } from "@/payload/payload-types";

type TCartItem = {
	variation: StoreProductVariant;
	quantity: number;
	isSelected: boolean;
	price: number;
};

// priceFromJSON(
// 							item.variant.stripePriceId,
// 							item.variant.product,
// 							item.quantity,
// 							true
// 					  )

// export function formattedCartItems(
// 	items?: CartLineItem[]
// ): Array<TCartItem> | null | undefined {
// 	return items
// 		?.filter(item => typeof item.variant === "object")
// 		.map(item => ({
// 			...item,
// 			variant: item.variant as StoreProductVariant,
// 			quantity: item?.quantity || 1,
// 			// isSelected: item.isSelected || false,
// 		}))
// 		.map(item => ({
// 			...item,
// 			price:
// 				item.variant.product?.variants?.[0]?.calculated_price
// 					?.calculated_amount || 0,
// 			// typeof item.variant.product === "object"
// 			// 	? priceFromJSON(
// 			// 			item.variant.stripePriceId,
// 			// 			item.variant.product,
// 			// 			item.quantity,
// 			// 			true
// 			// 	  )
// 			// 	: undefined,
// 		}))
// 		.filter(Boolean);
// }

// export function calculateTotal(items?: TCartItem[]): number {
// 	if (!items?.length) return 0;

// 	return items.reduce(
// 		(acc, item) => acc + (Number(item.price) || 0) * item.quantity,
// 		0
// 	);
// }
