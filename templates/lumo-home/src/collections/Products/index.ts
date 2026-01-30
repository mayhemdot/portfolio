// import { admins } from '@/shared/access/admins'
// import { slugField } from '@/shared/fields/slug'
// import { generatePreviewPath } from '@/shared/utils/generatePreviewPath'
// import type { CollectionConfig } from 'payload'

// export const Products: CollectionConfig = {
//   slug: 'products',
//   folders: {
//     browseByFolder: false,
//   },
//   admin: {
//     group: 'Products',
//     useAsTitle: 'title',
//     livePreview: {
//       url: ({ data, req }) => {
//         const path = generatePreviewPath({
//           slug: typeof data?.slug === 'string' ? data.slug : '',
//           collection: 'products',
//           req,
//         })

//         return path
//       },
//     },
//     preview: (data, { req }) =>
//       generatePreviewPath({
//         slug: typeof data?.slug === 'string' ? data.slug : '',
//         collection: 'products',
//         req,
//       }),
//   },
//   access: {
//     read: () => true,
//     create: admins,
//     update: admins,
//     delete: admins,
//   },
//   fields: [
//     {
//       label: 'Title',
//       localized: true,
//       name: 'title',
//       type: 'text',
//     },
//     {
//       label: 'Price',
//       localized: true,
//       name: 'price',
//       type: 'number',
//     },
//     {
//       label: 'Description',
//       localized: true,
//       name: 'description',
//       type: 'Text',
//       // editor: 'markdown',
//     },

//     ...slugField(),
//     {
//       label: 'Images',
//       localized: true,
//       name: 'images',
//       type: 'upload',
//       relationTo: 'media',
//       hasMany: true,
//       admin: {
//         position: 'sidebar',
//       },
//       // filterOptions: {
//       //   mimeType: {
//       //     in: ["image/png", "application/pdf"],
//       //   },
//       // },
//     },
//     {
//       label: 'Characteristics',
//       name: 'characteristics',
//       localized: true,
//       type: 'array',
//       admin: {
//         position: 'sidebar',
//       },
//       fields: [
//         {
//           name: 'name',
//           type: 'text',
//           label: 'Название характеристики',
//         },
//         {
//           name: 'value',
//           type: 'text',
//           label: 'Значение характеристики',
//         },
//       ],
//     },

//     {
//       label: 'Category',
//       name: 'category',
//       type: 'relationship',
//       relationTo: 'categories',
//       // localized: true,
//     },
//     {
//       name: 'relatedProducts',
//       type: 'relationship',
//       relationTo: 'products',
//       hasMany: true,
//       admin: {
//         position: 'sidebar',
//         description: 'Add related products',
//       },
//       filterOptions: ({ id }) => {
//         return {
//           id: {
//             not_in: [id],
//           },
//         }
//       },
//     },
//     {
//       label: 'In stock',
//       name: 'inStock',
//       type: 'checkbox',
//       defaultValue: true,
//       admin: {
//         description:
//           'If the product is in stock then it will be available for purchase and show up in the store.',
//       },
//     },
//     {
//       label: 'Enable Variants',
//       name: 'enableVariants',
//       type: 'checkbox',
//       admin: {
//         description: 'if you want to enable variants for this product',
//       },
//     },
//     {
//       label: 'Variants',
//       name: 'variants',
//       type: 'join',
//       collection: 'variants',
//       on: 'product',
//       admin: {
//         allowCreate: true,
//         condition: data => data?.enableVariants === true,
//         // allowDelete: true,
//         // defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
//       },
//     },
//     // {
//     //   label: 'Variants',
//     //   name: 'variants',
//     //   type: 'relationship',
//     //   relationTo: 'variants',
//     //   hasMany: true,
//     //   admin: {
//     //     condition: data => data?.enableVariants === true,
//     //     // defaultColumns: ["product"],
//     //   },
//     //   maxDepth: 2,
//     //   // admin: {
//     //   //   : ['productVariantLabel', 'price'],
//     //   // }
//     // },

//     // Email added by default
//     // Add more fields as needed
//   ],
// }
