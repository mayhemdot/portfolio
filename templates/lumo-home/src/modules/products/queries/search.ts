// import { Product } from '@/payload-types'
// import { PaginatedDocs } from 'payload'
// import { stringify } from "qs-esm";
import type { Product } from "@/modules/products/model/types";

type Props = {
  term: string;
};

export type PaginatedDocs<T> = { docs: T[] }

export async function searchProducts({
  term,
}: Props): Promise<PaginatedDocs<Product>> {
  // const result = await fetch(
  //   `/api/products${stringify(
  //     {
  //       ...(term
  //         ? {
  //             where: {
  //               or: [
  //                 {
  //                   title: {
  //                     like: term,
  //                   },
  //                 },
  //                 // {
  //                 //   "meta.description": {
  //                 //     like: term,
  //                 //   },
  //                 // },
  //                 // {
  //                 //   "meta.title": {
  //                 //     like: term,
  //                 //   },
  //                 // },
  //                 {
  //                   slug: {
  //                     like: term,
  //                   },
  //                 },
  //               ],
  //             },
  //           }
  //         : {}),
  //     },
  //     {
  //       addQueryPrefix: true,
  //     },
  //   )}`,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Credentials: "include",
  //     },
  //   },
  // );

  // if (!result.ok) {
  //   throw new Error(result.statusText);
  // }

  // return await result.json();
  return {docs: [] as Product[]}
}
