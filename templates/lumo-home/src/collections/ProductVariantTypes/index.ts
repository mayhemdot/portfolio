// import { CollectionConfig } from 'payload'

// export const VariantTypes: CollectionConfig = {
//   slug: 'variantTypes',
//   labels: {
//     singular: 'Variant Type',
//     plural: 'Variant Types',
//   },
//   admin: {
//     group: 'Products',
//     useAsTitle: 'label',
//   },
//   fields: [
//     {
//       name: 'label',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'name',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'options',
//       type: 'join',
//       collection: 'variantOptions',
//       on: 'variantType',
//       admin: {
//         allowCreate: false,
//         // defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
//       },
//     },
//   ],
//   timestamps: true,
// }
