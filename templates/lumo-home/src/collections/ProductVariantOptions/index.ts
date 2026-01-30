// import { CollectionConfig } from 'payload'

// export const VariantOptions: CollectionConfig = {
//   slug: 'variantOptions',
//   labels: {
//     singular: 'Variant Option',
//     plural: 'Variant Options',
//   },
//   admin: {
//     group: 'Products',
//     useAsTitle: 'label',
//   },
//   fields: [
//     {
//       name: 'variantType',
//       type: 'relationship',
//       relationTo: 'variantTypes',
//       required: true,
//       hasMany: false,
//     },
//     {
//       name: 'label',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'value',
//       type: 'text',
//       required: true,
//       admin: {
//         description:
//           'Должно быть либо задано, либо генерироваться динамически на основе label',
//       },
//     },
//     {
//       name: '_order',
//       type: 'text',
//       admin: {
//         description: 'Необязательное поле для порядка опций',
//       },
//     },
//   ],
//   timestamps: true,
// }
