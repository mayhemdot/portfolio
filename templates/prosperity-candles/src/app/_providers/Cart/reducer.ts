// import type {
// 	CartItems,
// 	Product,
// 	ProductVariant,
// 	User,
// } from "../../../original_src/payload/payload-types";

// export type CartItem = CartItems[0];

// type CartType = User["cart"];

// type CartAction =
// 	| {
// 			type: "SET_CART";
// 			payload: CartType;
// 	  }
// 	| {
// 			type: "MERGE_CART";
// 			payload: CartType;
// 	  }
// 	| {
// 			type: "ADD_ITEM";
// 			payload: CartItem;
// 	  }
// 	| {
// 			type: "SET_ITEM_SELECTED";
// 			payload: { variantId: number; isSelected: boolean };
// 	  }
// 	| {
// 			type: "SET_ALL_ITEMS_SELECTED";
// 			payload: boolean;
// 	  }
// 	| {
// 			type: "DELETE_ITEM";
// 			payload: ProductVariant;
// 	  }
// 	| {
// 			type: "DELETE_SELECTED_ITEMS";
// 	  }
// 	| {
// 			type: "CLEAR_CART";
// 	  };

// export const cartReducer = (cart: CartType, action: CartAction): CartType => {
// 	switch (action.type) {
// 		case "SET_CART": {
// 			return action.payload;
// 		}

// 		case "MERGE_CART": {
// 			const { payload: incomingCart } = action;

// 			const syncedItems: CartItem[] = [
// 				...(cart?.items || []),
// 				...(incomingCart?.items || []),
// 			].reduce((acc: CartItem[], item) => {
// 				// remove duplicates
// 				const productVariationId =
// 					typeof item.variant === "object"
// 						? item?.variant?.id
// 						: item.variant;

// 				const indexInAcc = acc.findIndex(({ variant }) =>
// 					typeof variant === "object"
// 						? variant?.id === variantId
// 						: variant === variantId
// 				); // eslint-disable-line function-paren-newline

// 				if (indexInAcc > -1) {
// 					acc[indexInAcc] = {
// 						...acc[indexInAcc],
// 						// customize the merge logic here, e.g.:
// 						// quantity: acc[indexInAcc].quantity + item.quantity
// 					};
// 				} else {
// 					acc.push(item);
// 				}
// 				return acc;
// 			}, []);

// 			return {
// 				...cart,
// 				items: syncedItems,
// 			};
// 		}

// 		case "ADD_ITEM": {
// 			// if the item is already in the cart, increase the quantity
// 			const { payload: incomingItem } = action;
// 			const pvId =
// 				typeof incomingItem.variant === "object"
// 					? incomingItem?.variant?.id
// 					: incomingItem.variant;

// 			const indexInCart = cart?.items?.findIndex(({ variant }) =>
// 				typeof variant === "object"
// 					? variant?.id === pvId
// 					: variant === pvId
// 			); // eslint-disable-line function-paren-newline

// 			let withAddedItem = [...(cart?.items || [])];

// 			if (indexInCart === -1) {
// 				withAddedItem.push(incomingItem);
// 			}

// 			if (typeof indexInCart === "number" && indexInCart > -1) {
// 				withAddedItem[indexInCart] = {
// 					...withAddedItem[indexInCart],
// 					quantity:
// 						(incomingItem.quantity || 0) > 0
// 							? incomingItem.quantity
// 							: undefined,
// 				};
// 			}

// 			return {
// 				...cart,
// 				items: withAddedItem,
// 			};
// 		}
// 		case "DELETE_SELECTED_ITEMS": {
// 			const withDeletedItem = { ...cart };
// 			const selectedItems = cart?.items?.filter(item => item.isSelected) || [];

// 			for (const selectedItem of selectedItems) {
// 				const incomingProductId =
// 					typeof selectedItem.variant === "object"
// 						? selectedItem?.variant.id
// 						: selectedItem.variant;

// 				const indexInCart = cart?.items?.findIndex(({ variant }) =>
// 					typeof variant === "object"
// 						? variant?.id === incomingProductId
// 						: variant === incomingProductId
// 				); // eslint-disable-line function-paren-newline

// 				if (
// 					typeof indexInCart === "number" &&
// 					withDeletedItem.items &&
// 					indexInCart > -1
// 				)
// 					withDeletedItem.items.splice(indexInCart, 1);
// 			}

// 			return withDeletedItem;
// 		}
// 		case "DELETE_ITEM": {
// 			const { payload: incomingProduct } = action;
// 			const withDeletedItem = { ...cart };

// 			const indexInCart = cart?.items?.findIndex(({ variant }) =>
// 				typeof variant === "object"
// 					? variant?.id === incomingProduct.id
// 					: variant === incomingProduct.id
// 			); // eslint-disable-line function-paren-newline

// 			if (
// 				typeof indexInCart === "number" &&
// 				withDeletedItem.items &&
// 				indexInCart > -1
// 			)
// 				withDeletedItem.items.splice(indexInCart, 1);

// 			return withDeletedItem;
// 		}

// 		case "CLEAR_CART": {
// 			return {
// 				...cart,
// 				items: [],
// 			};
// 		}
// 		case "SET_ITEM_SELECTED": {
// 			const {
// 				payload: { variantId, isSelected },
// 			} = action;
// 			console.log("incoming back", variantId);
// 			cart.items?.forEach(item => {
// 				if (
// 					typeof item.variant === "object" &&
// 					item.variant?.id === variantId
// 				) {
// 					item.isSelected = isSelected;
// 				}
// 			});
// 			return {
// 				...cart,
// 			};
// 		}
// 		case "SET_ALL_ITEMS_SELECTED": {
// 			const { payload: isSelected } = action;
// 			cart.items?.forEach(item => {
// 				item.isSelected = isSelected;
// 			});
// 			return {
// 				...cart,
// 			};
// 		}
// 		default: {
// 			return cart;
// 		}
// 	}
// };
