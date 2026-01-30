// import { formatBytes } from '@/shared/utils/formatBytes'
// import z from 'zod'

// const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
// const MIN_DIMENSIONS = { width: 200, height: 200 }
// const MAX_DIMENSIONS = { width: 4096, height: 4096 }

// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp',
// ]

// export const updateProfileSchema = z.object({
//   userId: z.coerce.number(),
//   name: z.string().max(50).optional().nullable(),
//   // email: z.string().email().optional().nullable(),
//   phoneNumber: z.string().max(20).optional().nullable(),
//   // avatar: z
//   //   .instanceof(File)
//   //   .refine(file => file.size <= MAX_FILE_SIZE, {
//   //     message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`,
//   //   })
//   //   .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
//   //     message: 'Please upload a valid image file (JPEG, PNG, or WebP).',
//   //   })
//   //   .refine(
//   //     file =>
//   //       new Promise(resolve => {
//   //         const reader = new FileReader()
//   //         reader.onload = e => {
//   //           const img = new Image()
//   //           img.onload = () => {
//   //             const meetsDimensions =
//   //               img.width >= MIN_DIMENSIONS.width &&
//   //               img.height >= MIN_DIMENSIONS.height &&
//   //               img.width <= MAX_DIMENSIONS.width &&
//   //               img.height <= MAX_DIMENSIONS.height
//   //             resolve(meetsDimensions)
//   //           }
//   //           img.src = e.target?.result as string
//   //         }
//   //         reader.readAsDataURL(file)
//   //       }),
//   //     {
//   //       message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`,
//   //     },
//   //   )
//   //   .optional()
//   //   .nullable(),
// })

// export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>

// export type UpdateProfileZodFieldErrors =
//   z.typeToFlattenedError<UpdateProfileSchema>['fieldErrors'] & {
//     root?: string[] | string
//   }

// export const SaveImageSchema = z.object({
//   avatar: z
//     .instanceof(File)
//     .refine(file => file.size <= MAX_FILE_SIZE, {
//       message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`,
//     })
//     .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
//       message: 'Please upload a valid image file (JPEG, PNG, or WebP).',
//     })
//     .refine(
//       file =>
//         new Promise(resolve => {
//           const reader = new FileReader()
//           reader.onload = e => {
//             const img = new Image()
//             img.onload = () => {
//               const meetsDimensions =
//                 img.width >= MIN_DIMENSIONS.width &&
//                 img.height >= MIN_DIMENSIONS.height &&
//                 img.width <= MAX_DIMENSIONS.width &&
//                 img.height <= MAX_DIMENSIONS.height
//               resolve(meetsDimensions)
//             }
//             img.src = e.target?.result as string
//           }
//           reader.readAsDataURL(file)
//         }),
//       {
//         message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`,
//       },
//     )
//     .optional()
//     .nullable(),
// })

// export type SaveImageSchema = z.infer<typeof SaveImageSchema>

// export type SaveImageZodFieldErrors =
//   z.typeToFlattenedError<SaveImageSchema>['fieldErrors'] & {
//     root?: string[] | string
//   }
