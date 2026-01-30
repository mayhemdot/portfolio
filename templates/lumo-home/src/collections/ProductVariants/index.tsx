// import { productVariantPreview } from '@/collections/ProductVariants/hooks/productVariantPreview'
// import { admins } from '@/shared/access/admins'
// import type { CollectionConfig } from 'payload'

// export const ProductVariants: CollectionConfig = {
//   slug: 'variants',
//   labels: {
//     singular: 'Product Variant',
//     plural: 'Product Variants',
//   },
//   folders: {
//     browseByFolder: false,
//   },
//   admin: {
//     group: 'Products',
//     useAsTitle: 'productVariantLabel',
//   },
//   access: {
//     read: () => true,
//     create: admins,
//     update: admins,
//     delete: admins,
//   },
//   fields: [
//     {
//       label: 'Payment Label',
//       name: 'productVariantLabel',
//       type: 'text',
//       admin: {
//         // hidden: true,
//         readOnly: true,
//       },
//       // virtual: true,
//       hooks: {
//         beforeChange: [
//           ({ siblingData }) => {
//             // ensures data is not stored in DB
//             delete siblingData['productVariantLabel']
//           },
//         ],
//         afterRead: [productVariantPreview],
//       },
//     },
//     {
//       label: 'Price',
//       localized: true,
//       name: 'price',
//       type: 'number',
//       defaultValue: 0,
//     },
//     {
//       label: 'Product',
//       name: 'product',
//       type: 'relationship',
//       relationTo: 'products',
//       required: true,
//       hasMany: false,
//       admin: {
//         allowCreate: false,
//       },
//     },
//     {
//       name: 'options',
//       type: 'relationship',
//       relationTo: 'variantOptions',
//       hasMany: true,
//     },
//     {
//       label: 'Stock count',
//       name: 'stock',
//       type: 'number',
//       defaultValue: 0,
//     },
//   ],
//   defaultPopulate: {
//     product: true,
//     options: true,
//   },
//   // hooks: {
//   //   afterChange: [generatePreviewPath],
//   // },
// }
