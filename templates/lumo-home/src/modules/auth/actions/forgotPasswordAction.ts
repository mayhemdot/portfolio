// 'use server'
// import { getPayload } from 'payload'
// import config from '@payload-config'
// import { forgotPasswordSchema } from '../model/schemas'
// import { appAuthClient } from '@/shared/lib/auth'

// export const forgotPasswordAction = async (prev: any, formData: FormData) => {
//   const parsedData = forgotPasswordSchema.safeParse({
//     email: formData.get('email') as string,
//   })

//   if (!parsedData.success) {
//     return {
//       success: false,
//       errors: parsedData.error?.flatten().fieldErrors,
//     }
//   }
//   const payload = await getPayload({ config: config })

//   const { email } = parsedData.data

//   try {
//     const _user = await payload.forgotPassword({
//       collection: 'users',
//       data: {
//         email,
//       },
//     })

//     return {
//       success: true,
//       errors: undefined,
//     }
//   } catch (error: unknown) {
//     return {
//       success: false,
//       errors: {
//         root: [error instanceof Error ? error.message : 'Something went wrong'],
//       },
//     }
//   }
// }

// export const forgotPasswordWithPlugin = async (
//   prev: any,
//   formData: FormData,
// ) => {
//   const parsedData = forgotPasswordSchema.safeParse({
//     email: formData.get('email') as string,
//   })

//   if (!parsedData.success) {
//     return {
//       success: false,
//       errors: parsedData.error?.flatten().fieldErrors,
//     }
//   }

//   const { email } = parsedData.data

//   try {
//     const res = await appAuthClient.forgotPassword({
//       email: email,
//     })

//     if (res.isSuccess) {
//       return {
//         success: true,
//         errors: undefined,
//       }
//     }

//     return {
//       success: false,
//       errors: {
//         root: [res?.message || 'Something went wrong'],
//       },
//     }
//   } catch (error: unknown) {
//     return {
//       success: false,
//       errors: {
//         root: [error instanceof Error ? error.message : 'Something went wrong'],
//       },
//     }
//   }
// }
