import type React from "react";
import type { Product } from "@/modules/products/model/types";
import { Card } from "@/shared/components/Card";
import { cn } from "@/shared/lib/utils";

export type Props = {
  products: Product[];
};

export const CollectionArchive: React.FC<Props> = (props) => {
  const { products } = props;

  return (
    <div className={cn("container")}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {products?.map((product, index) => {
            if (typeof product === "object" && product !== null) {
              return (
                <div className="col-span-4" key={String(index)}>
                  <Card
                    className="h-full"
                    doc={product}
                    relationTo="products"
                    showCategories
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};
