"use server";

// import { revalidateTag } from "next/cache";
import type { StoreProductVariant } from "@/modules/products/types";
// import { getAuthHeaders, getCacheOptions, getCacheTag } from "./cookies"

export type Wishlist = {
  id: string; // "01JN11NQ672ME71PETABNYP1JG"
  customer_id: string; // "cus_01JMZC59MBSKKYQGVE3NWX6J7Y"
  sales_channel_id: string; // "sc_01JGS1PVGVANR0MTY7G48N6ZN2"
  created_at: string; // "2025-02-26T11:53:31.591Z"
  updated_at: string; // "2025-02-26T11:53:31.591Z"
  deleted_at?: string | null;
  items: Array<{
    id: string;
    product_variant_id: string;
    product_variant: StoreProductVariant; // HttpTypes.StoreProductVariant
  }>;
};

export async function retrieveWishlist() {
  //   const headers = {
  //     ...(await getAuthHeaders()),
  //   };
  //   const next = {
  //     ...(await getCacheOptions("wishlist")),
  //   };
  //   return await sdk.client
  //     .fetch<any>(`/store/customers/me/wishlists`, {
  //       method: "GET",
  //       query: {
  //         fields: "*items",
  //       },
  //       headers,
  //       next,
  //       cache: "force-cache",
  //     })
  //     .then(({ wishlist }) => wishlist)
  //     .catch(() => null);

  return {
    id: "01JN11NQ672ME71PETABNYP1JG",
    customer_id: "cus_01JMZC59MBSKKYQGVE3NWX6J7Y",
    sales_channel_id: "sc_01JGS1PVGVANR0MTY7G48N6ZN2",
    created_at: "2025-02-26T11:53:31.591Z",
    updated_at: "2025-02-26T11:53:31.591Z",
    items: [
      {
        id: crypto.randomUUID(),
        product_variant_id: "01JN11NQ672ME71PETABNYP1JG",
        product_variant: {
          id: "01JN11NQ672ME71PETABNYP1JG",
          title: "Polo T-Shirt",
          handle: "polo-t-shirt",
          created_at: "2025-02-26T11:53:31.591Z",
          updated_at: "2025-02-26T11:53:31.591Z",
          product: {
            id: "01JN11NQ672ME71PETABNYP1JG",
            title: "Polo T-Shirt",
            handle: "polo-t-shirt",
            created_at: "2025-02-26T11:53:31.591Z",
            updated_at: "2025-02-26T11:53:31.591Z",
          },
        },
      },
    ],
  };
  //   return [{}];
}

export async function getOrSetWishlist() {
  const wishlist = await retrieveWishlist();

  //   const headers = {
  //     ...(await getAuthHeaders()),
  //   };

  //   if (!wishlist) {
  //     const next = {
  //       ...(await getCacheOptions("wishlist")),
  //     };
  //     wishlist = await sdk.client
  //       .fetch("/store/customers/me/wishlists", {
  //         method: "POST",
  //         next,
  //         headers,
  //       })
  //       .then(async (props: { wishlist: Wishlist }) => {
  //         revalidateTag(await getCacheTag("wishlist"));
  //         return props.wishlist;
  //       });
  //   }

  return wishlist;
}

export async function toggleItemInWishlist({ productVariantId }: { productVariantId?: string }) {
  if (!productVariantId) {
    // && !wishlistItemId
    throw new Error("Missing variant ID when adding to wishlist");
  }

  const wishlist = await getOrSetWishlist();

  if (!wishlist) {
    throw new Error("Error retrieving or creating wishlist");
  }

  //   const headers = {
  //     ...(await getAuthHeaders()),
  //   };

  //   const next = {
  //     ...(await getCacheOptions("wishlist")),
  //   };

  // TODO: fix this
  //   return await sdk.client
  //     .fetch("/store/customers/me/wishlists/toggle", {
  //       method: "POST",
  //       headers,
  //       next,
  //       body: {
  //         product_variant_id: productVariantId,
  //       },
  //     })
  //     .then(async ({ wishlist }: { wishlist: Wishlist }) => {
  //       revalidateTag(await getCacheTag("wishlist"));
  //       return wishlist;
  //     });

  return wishlist;
}

// async function addToWishlist({ variantId }: { variantId: string }) {
//   if (!variantId) {
//     throw new Error("Missing variant ID when adding to wishlist")
//   }

//   const wishlist = await getOrSetWishlist()

//   if (!wishlist) {
//     throw new Error("Error retrieving or creating wishlist")
//   }

//   const headers = {
//     ...(await getAuthHeaders()),
//   }

//   const next = {
//     ...(await getCacheOptions("wishlist")),
//   }
//   // TODO: fix this
//   return await sdk.client
//     .fetch("/store/customers/me/wishlists/items", {
//       method: "POST",
//       headers,
//       next,
//       body: {
//         variant_id: variantId,
//       },
//     })
//     .then(async ({ wishlist }: { wishlist: Wishlist }) => {
//       revalidateTag(await getCacheTag("wishlist"))
//       return wishlist
//     })
// }

// async function removeFromWishlist({
//   wishlistItemId,
// }: {
//   wishlistItemId: string
// }) {
//   if (!wishlistItemId) {
//     throw new Error("Missing item ID when removing from wishlist")
//   }

//   const headers = {
//     ...(await getAuthHeaders()),
//   }

//   return await sdk.client
//     .fetch(`/store/customers/me/wishlists/items/${wishlistItemId}`, {
//       method: "DELETE",
//       headers,
//       // next,
//     })
//     .then(({ wishlist }) => wishlist)
// }

// export async function updateCart(data: HttpTypes.StoreUpdateCart) {
//   const cartId = await getCartId()

//   if (!cartId) {
//     throw new Error("No existing cart found, please create one before updating")
//   }

//   const headers = {
//     ...(await getAuthHeaders()),
//   }

//   return sdk.store.cart
//     .update(cartId, data, {}, headers)
//     .then(async ({ cart }) => {
//       const cartCacheTag = await getCacheTag("carts")
//       revalidateTag(cartCacheTag)
//       return cart
//     })
//     .catch(medusaError)
// }

// export async function addToCart({
//   variantId,
//   quantity,
//   countryCode,
// }: {
//   variantId: string
//   quantity: number
//   countryCode: string
// }) {
//   if (!variantId) {
//     throw new Error("Missing variant ID when adding to cart")
//   }

//   const cart = await getOrSetCart(countryCode)

//   if (!cart) {
//     throw new Error("Error retrieving or creating cart")
//   }

//   const headers = {
//     ...(await getAuthHeaders()),
//   }

//   await sdk.store.cart
//     .createLineItem(
//       cart.id,
//       {
//         variant_id: variantId,
//         quantity,
//       },
//       {},
//       headers
//     )
//     .then(async () => {
//       const cartCacheTag = await getCacheTag("carts")
//       revalidateTag(cartCacheTag)
//     })
//     .catch(medusaError)
// }

// export async function updateLineItem({
//   lineId,
//   quantity,
// }: {
//   lineId: string
//   quantity: number
// }) {
//   if (!lineId) {
//     throw new Error("Missing lineItem ID when updating line item")
//   }

//   const cartId = await getCartId()

//   if (!cartId) {
//     throw new Error("Missing cart ID when updating line item")
//   }

//   const headers = {
//     ...(await getAuthHeaders()),
//   }

//   await sdk.store.cart
//     .updateLineItem(cartId, lineId, { quantity }, {}, headers)
//     .then(async () => {
//       const cartCacheTag = await getCacheTag("carts")
//       revalidateTag(cartCacheTag)
//     })
//     .catch(medusaError)
// }

// export async function deleteLineItem(lineId: string) {
//   if (!lineId) {
//     throw new Error("Missing lineItem ID when deleting line item")
//   }

//   const cartId = await getCartId()

//   if (!cartId) {
//     throw new Error("Missing cart ID when deleting line item")
//   }

//   const headers = {
//     ...(await getAuthHeaders()),
//   }

//   await sdk.store.cart
//     .deleteLineItem(cartId, lineId, headers)
//     .then(async () => {
//       const cartCacheTag = await getCacheTag("carts")
//       revalidateTag(cartCacheTag)
//     })
//     .catch(medusaError)
// }
