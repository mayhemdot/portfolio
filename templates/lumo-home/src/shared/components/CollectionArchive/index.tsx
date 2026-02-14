import type React from "react";
import type { LocaleCode } from "@/i18n/localization";
import { Product, type ProductRaw } from "@/modules/products/model/types";
import { Card } from "@/shared/components/Card";
import { cn } from "@/shared/lib/utils";

export type Props = {
  products: ProductRaw[];
  localeCode: LocaleCode;
};

export const CollectionArchive: React.FC<Props> = (props) => {
  const { products, localeCode } = props;
  const productList = products.map((p) => new Product(p, localeCode));
  return (
    <div className={cn("container")}>
        <div className="grid grid-cols-4 gap-x-4 gap-y-4 sm:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8">
          {productList?.map((product, index) => {
            if (typeof product === "object" && product !== null) {
              return (
                <div className="col-span-4" key={String(index)}>
                  <Card
                    className="h-full"
                    doc={product.raw}
                    locale={localeCode}
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
  );
};
