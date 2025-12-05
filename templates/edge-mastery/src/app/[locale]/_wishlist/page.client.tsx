"use client";

import { useWishlistStore } from "@/modules/cart/store/whishlist";
import { useRegionStore } from "@/modules/common/store/region";
import { ProductPreview } from "@/modules/products/components/ProductPreview";

export default function WishlistClient() {
  const { wishlist } = useWishlistStore();
  const region = useRegionStore.getState().region;
  return (
    <ul
      className="grid grid-cols-2 w-full md:grid-cols-3 3xl:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-4 lg:gap-y-6 xl:gap-y-8"
      data-testid="products-list"
    >
      {wishlist?.map((p) => {
        return (
          <li key={p.id}>
            <ProductPreview
              isWishlisted={true}
              defaultIsWishlisted={true}
              variants={[p.product_variant]}
              product={p.product_variant.product as any}
              region={region}
            />
          </li>
        );
      })}
    </ul>
  );
}
