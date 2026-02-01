import { PRODUCTS } from "@/modules/products/model/data";
import type { Product } from "@/modules/products/model/types";

type Props = {
  term: string;
};

export type PaginatedDocs<T> = { 
  docs: T[] 
  totalDocs: number,
  page: number,
  totalPages:number,
  limit: number,
}

export  function searchProducts({
  term,
}: Props): PaginatedDocs<Product> {
  return { 
    docs: PRODUCTS, 
    page: Number(1), 
    limit: 10, 
    totalDocs: PRODUCTS.length || 0, 
    totalPages: 1 
  }
}



