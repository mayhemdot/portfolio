// import { DefaultDocumentIDType, Tab, Where } from 'payload'

// export const PRODUCT_DETAILS = [
//   {
//     name: 'gallery',
//     type: 'array',
//     minRows: 1,
//     fields: [
//       {
//         name: 'image',
//         type: 'upload',
//         relationTo: 'media',
//         required: true,
//       },
//       {
//         name: 'variantOption',
//         type: 'relationship',
//         relationTo: 'variantOptions',
//         admin: {
//           condition: data => {
//             return (
//               data?.enableVariants === true && data?.variantTypes?.length > 0
//             )
//           },
//         },
//         filterOptions: ({ data }) => {
//           if (data?.enableVariants && data?.variantTypes?.length) {
//             const variantTypeIDs = data.variantTypes.map((item: any) => {
//               if (typeof item === 'object' && item?.id) {
//                 return item.id
//               }
//               return item
//             }) as DefaultDocumentIDType[]

//             if (variantTypeIDs.length === 0)
//               return {
//                 variantType: {
//                   in: [],
//                 },
//               }

//             const query: Where = {
//               variantType: {
//                 in: variantTypeIDs,
//               },
//             }

//             return query
//           }

//           return {
//             variantType: {
//               in: [],
//             },
//           }
//         },
//       },
//     ],
//   },
//   {
//     label: 'Description',
//     localized: true,
//     name: 'description',
//     type: 'Text',
//   },
//   {
//     label: 'Characteristics',
//     name: 'characteristics',
//     localized: true,
//     type: 'array',
//     fields: [
//       {
//         label: 'Characteristic Name',
//         name: 'name',
//         type: 'text',
//       },
//       {
//         label: 'Characteristic Value',
//         name: 'value',
//         type: 'text',
//       },
//     ],
//   },
//   {
//     label: 'Related Products',
//     name: 'relatedProducts',
//     type: 'relationship',
//     relationTo: 'products',
//     hasMany: true,
//     filterOptions: ({ id }: any) => {
//       if (id) {
//         return {
//           id: {
//             not_in: [id],
//           },
//         }
//       }
//       // ID comes back as undefined during seeding so we need to handle that case
//       return {
//         id: {
//           exists: true,
//         },
//       }
//     },
//   },
// ] as Tab['fields']
