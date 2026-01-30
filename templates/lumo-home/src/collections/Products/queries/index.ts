// import { Product } from '@/payload-types'
// import { restApi } from '@/shared/utils/restApi'
// import { PaginatedDocs } from 'payload'
// import { stringify } from 'qs-esm'

// export const fetchProductsWhere = async ({
//   search,
//   sortBy,
//   page,
//   locale,
// }: {
//   search: string
//   sortBy: string
//   page: string
//   locale: string
// }): Promise<PaginatedDocs<Product>> =>
//   await restApi(
//     `/api/products${stringify(
//       {
//         where: {
//           ...(search
//             ? {
//                 or: [
//                   {
//                     title: {
//                       like: search,
//                     },
//                   },
//                   {
//                     slug: {
//                       like: search,
//                     },
//                   },
//                 ],
//               }
//             : {}),
//         },
//         page: Number(page),
//         limit: 12,
//         sort: sortBy || 'title',
//         locale,
//       },
//       { addQueryPrefix: true },
//     )}`,
//   )
