// type ProductSeed = {
//   title: string
//   slug: string
//   price: number
//   categorySlug: 'chairs' | 'tables' | 'lamps' | 'others'
//   meta: {
//     title: string
//     description: string
//   }
// }

import { CATEGORIES } from "@/modules/categories/model/data";
import type { Product } from "@/modules/products/model/types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Modern glass chair 103",
    slug: "modern-glass-chair-103",
    price: 17900,
    images: [
      {
        id: 1,
        url: "/images/product_1.png",
        alt: "Modern glass chair 103",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
     }],
    category: CATEGORIES[0],
    meta: {
      title: "Modern glass chair 103",
      description: "The Modern Glass Chair 103 is a sleek and modern chair.",
    },
    updatedAt: new Date().toISOString(), 
    createdAt: new Date().toISOString(), 
    inStock: true, 
    enableVariants:false
  },
  {
    id: 2,
    title: "Modern orange glass chair 111",
    slug: "modern-orange-glass-chair-104",
    price: 23000,
    images: [
      {
        id: 1,
        url: "/images/product_2.png",
        alt: "Modern glass chair 103",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
     }],
    category: CATEGORIES[0],
    meta: {
      title: "Modern orange glass chair 111",
      description:
        "The Modern Orange Glass Chair 111 is a sleek and modern chair.",
    },
     updatedAt: new Date().toISOString(), 
    createdAt: new Date().toISOString(), 
    inStock: true, 
    enableVariants:false
  },
  {
    id: 3,
    title: "Modern violet glass table 032",
    slug: "modern-violet-glass-table-032",
    price: 23000,
    images: [
      {
        id: 1,
        url: "/images/product_3.png",
        alt: "Modern violet table 032",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
     }],
    category: CATEGORIES[1],
    meta: {
      title: "Modern violet glass table 032",
      description:
        "The Modern Violet Glass Table 032 is a sleek and modern table.",
    },
    updatedAt: new Date().toISOString(), 
    createdAt: new Date().toISOString(), 
    inStock: true, 
    enableVariants:false
  },
  {
    id: 4,
    title: "Modern rose glass bath 132",
    slug: "modern-rose-glass-bath-132",
    price: 93000,
    images: [
      {
        id: 1,
        url: "/images/product_4.png",
        alt: "Modern violet table 032",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }],
    category: CATEGORIES[3],
    meta: {
      title: "Modern violet glass bath 132",
      description:
        "The Modern Violet Glass Bath 132 is a sleek and modern table.",
    },
    updatedAt: new Date().toISOString(), 
    createdAt: new Date().toISOString(), 
    inStock: true, 
    enableVariants:false
  },
  {
    id: 5,
    title: "Modern orange glass lamp 004",
    slug: "modern-orange-glass-lamp-004",
    price: 11000,
    images: [
      {
        id: 1,
        url: "/images/product_6.png",
        alt: "Modern violet table 032",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }],
    category: CATEGORIES[2],
    meta: {
      title: "Modern orange glass lamp 004",
      description:
        "The Modern orange Glass Lamp 004 is a sleek and modern table.",
    },

    updatedAt: new Date().toISOString(), 
    createdAt: new Date().toISOString(), 
    inStock: true, 
    enableVariants:false
  },
];
