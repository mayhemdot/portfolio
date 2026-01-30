"use client";
import { Text } from "@/shared/components/Text";
import type { Product } from "../../model/types";
import { ProductItem } from "./product-item";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="container min-h-dvh mx-auto">
      <Text comp={"h3"} weight={"bold"} className="mb-4">Catalog</Text>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
