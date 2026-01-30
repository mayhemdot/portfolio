// import { Order, Variant } from '@/payload-types'
// import { FieldHookArgs } from 'payload'

// export const productVariantPreview = async ({
//   data,
//   req,
//   originalDoc,
// }: FieldHookArgs) => {
//   const id =
//     typeof data?.product === 'object' ? data.product?.id : data?.product

//   if (!id) return 'Unknown'

//   try {
//     const product = await req.payload.findByID({
//       collection: 'products',
//       id,
//     })

//     const optionTitles = originalDoc?.options?.map(
//       (order: number | string | { id: number | string }) =>
//         typeof order === 'object' ? order?.id : order,
//     )

//     const { docs: options } = await req.payload.find({
//       collection: 'variantOptions',
//       where: {
//         id: {
//           in: optionTitles,
//         },
//       },
//       depth: 2,
//     })
//     // console.log(options)
//     return `${product?.title} - ${options?.map(option => option.label).join(' ')}`
//   } catch (error: unknown) {
//     req.payload.logger.error(error)
//     return 'Unknown'
//   }
// }
