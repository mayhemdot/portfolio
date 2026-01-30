// 'use server'
// import { getPayload } from 'payload'
// import config from '@payload-config'
// import { restorePasswordSchema } from '../model/schemas'
// import { appAuthClient } from '@/shared/lib/auth'

// export const restorePasswordAction = async (prev: any, formData: FormData) => {
//   const parsedData = restorePasswordSchema.safeParse({
//     password: formData.get('password'),
//     code: formData.get('code'),
//   })

//   if (!parsedData.success) {
//     return {
//       success: false,
//       data: undefined,
//       errors: parsedData.error?.flatten().fieldErrors,
//     }
//   }

//   const { password, code } = parsedData.data

//   try {
//     const payload = await getPayload({ config: config })

//     const userData = await payload.resetPassword({
//       collection: 'users',
//       data: {
//         password,
//         token: code,
//       },
//       overrideAccess: true,
//     })

//     return {
//       success: true,
//       data: userData.user,
//       errors: undefined,
//     }
//   } catch (error: unknown) {
//     return {
//       success: false,
//       data: undefined,
//       errors: {
//         root: [error instanceof Error ? error.message : 'Something went wrong'],
//       },
//     }
//   }
// }

// export const restorePasswordActionWithPlugin = async (
//   prev: any,
//   formData: FormData,
// ) => {
//   const parsedData = restorePasswordSchema.safeParse({
//     password: formData.get('password'),
//     code: formData.get('code'),
//   })

//   if (!parsedData.success) {
//     return {
//       success: false,
//       data: undefined,
//       errors: parsedData.error?.flatten().fieldErrors,
//     }
//   }
//   console.log('parsedData.data', parsedData.data)
//   try {
//     const { password, code } = parsedData.data

//     const res = await appAuthClient.recoverPassword({
//       password,
//       code,
//     })
//     console.log('res', res)
//     if (res.isSuccess) {
//       return {
//         success: true,
//         data: undefined,
//         errors: undefined,
//       }
//     }

//     return {
//       success: false,
//       data: undefined,
//       errors: {
//         root: [res.message],
//       },
//     }
//   } catch (error: unknown) {
//     return {
//       success: false,
//       data: undefined,
//       errors: {
//         root: [error instanceof Error ? error.message : 'Something went wrong'],
//       },
//     }
//   }
// }
