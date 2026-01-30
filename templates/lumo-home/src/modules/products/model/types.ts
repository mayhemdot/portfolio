import type { Category } from "@/modules/categories/model/types";
import type { MediaType } from "@/shared/components/Media/types";

export type Product = {
  id: number | string;
  slug: string;
  category: Category;
  description?: string;
  title: string;
  price: number;

  images?: MediaType[] | null;
  updatedAt: string;
  createdAt: string;
  inStock: boolean;

  variants?: ProductVariant[];
  enableVariants: boolean;
  meta?: {
     title: string,
     description: string,
  }
};

export type ProductVariant = {
  id: number | string;
};
