// 'use server'
// import { redirect } from 'next/navigation'
// import { loginSchema } from '../model/schemas'
// import { appAuthClient } from '@/shared/lib/auth'

// export const loginUserWithPlugin = async (prev: any, formData: FormData) => {
//   const parsedData = loginSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   })

//   if (!parsedData.success) {
//     return {
//       success: false,
//       data: undefined,
//       errors: parsedData.error?.flatten().fieldErrors,
//     }
//   }

//   const { email, password } = parsedData.data

//   try {
//     const signin = appAuthClient.signin()

//     const res = await signin.password({ email, password })

//     if (res.isError) {
//       return {
//         success: false,
//         data: undefined,
//         errors: {
//           root: [res.message],
//         },
//       }
//     }
//   } catch (error: unknown) {
//     console.log('[error]', error)
//     return {
//       success: false,
//       data: undefined,
//       errors: {
//         root: [
//           error instanceof Error ? error?.message : 'Something went wrong',
//         ],
//       },
//     }
//   }
//   redirect('/')
// }

// // export const loginUser = async (prev: any, formData: FormData) => {
// //   const parsedData = loginSchema.safeParse({
// //     email: formData.get('email'),
// //     password: formData.get('password'),
// //   })

// //   if (!parsedData.success) {
// //     return {
// //       success: false,
// //       data: undefined,
// //       errors: parsedData.error?.flatten().fieldErrors,
// //     }
// //   }

// //   const { email, password } = parsedData.data

// //   try {
// //     const payload = await getPayload({ config: config })

// //     const userData = await payload.login({
// //       collection: 'users',
// //       data: {
// //         email,
// //         password,
// //       },
// //       overrideAccess: false,
// //     })

// //     if (!userData || !userData?.token) {
// //       return {
// //         success: false,
// //         data: undefined,
// //         errors: {
// //           root: ['Invalid email or password'],
// //         },
// //       }
// //     }

// //     const cookieStore = await cookies()

// //     cookieStore.set('payload-token', userData.token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       sameSite: 'lax',
// //       path: '/',
// //     })
// //   } catch (error: unknown) {
// //     return {
// //       success: false,
// //       data: undefined,
// //       errors: {
// //         root: [error instanceof Error ? error.message : 'Something went wrong'],
// //       },
// //     }
// //   }
// //   redirect('/')
// // }
