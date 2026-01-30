// import z from 'zod'

// export const checkoutSchema = z.object({
//   orderedBy: z.object({
//     user: z.coerce.number().min(1, 'User ID is required'),
//   }),
//   // user: z.coerce.number().min(1, 'User ID is required'),
//   phone: z.string().optional().nullable(),
//   address: z.string().min(1, 'Address is required'),
//   city: z.string().min(1, 'City is required'),
//   zip: z.string().min(1, 'ZIP code is required'),
//   items: z
//     .array(
//       z.object({
//         product: z.coerce.number().min(1, 'Product ID is required'),
//         quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
//       }),
//     )
//     .min(1, 'At least one item is required'),
//   shippingMethod: z.coerce.number().min(1, 'Shipping method is required'),
// })

// // interface CartItem {
// //   product: number
// //   quantity: number
// //   id: string // может быть ID вариации товара, если используешь вариации
// // }

// export type CheckoutActionSchema = z.infer<typeof checkoutSchema>
