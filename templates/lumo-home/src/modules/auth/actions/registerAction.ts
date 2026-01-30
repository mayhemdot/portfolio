// 'use server'

// import { redirect } from 'next/navigation'
// import { registerSchema } from '../model/schemas'
// import { appAuthClient } from '@/shared/lib/auth'

// export const registerUser = async (prev: any, formData: FormData) => {
//   const parsedData = registerSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//     repeatPassword: formData.get('repeatPassword'),
//   })

//   if (!parsedData.success) {
//     return {
//       success: false,
//       data: undefined,
//       errors: parsedData.error?.flatten().fieldErrors,
//     }
//   }

//   try {
//     const payload = await getPayload({ config: config })

//     const { email, password } = parsedData.data

//     const countData = await payload.count({
//       collection: 'users',
//       where: {
//         email: { equals: email },
//       },
//     })

//     if (countData?.totalDocs > 0) {
//       return {
//         success: false,
//         data: undefined,
//         errors: {
//           root: ['User already exists. Please login.'],
//         },
//       }
//     }

//     const createdUser = await payload.create({
//       collection: 'users',
//       data: {
//         email,
//         password,
//       },
//     })

//     if (!createdUser) {
//       return {
//         success: false,
//         data: undefined,
//         errors: {
//           root: ['Something went wrong. Please try again.'],
//         },
//       }
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
//   redirect('/login')
// }

// export const registerUserWithPlugin = async (prev: any, formData: FormData) => {
//   const parsedData = registerSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//     repeatPassword: formData.get('repeatPassword'),
//   })

//   if (!parsedData.success) {
//     return {
//       success: false,
//       data: undefined,
//       errors: parsedData.error?.flatten().fieldErrors,
//     }
//   }

//   try {
//     // const payload = await getPayload({ config: config })
//     const { email, password } = parsedData.data

//     // const countData = await payload.count({
//     //   collection: 'appUsers',
//     //   where: {
//     //     email: { equals: email },
//     //   },
//     // })

//     // if (countData?.totalDocs > 0) {
//     //   return {
//     //     success: false,
//     //     data: undefined,
//     //     errors: {
//     //       root: ['User already exists. Please login.'],
//     //     },
//     //   }
//     // }
//     const register = appAuthClient.register()

//     const res = await register.password({
//       email,
//       password,
//     })

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
//     return {
//       success: false,
//       data: undefined,
//       errors: {
//         root: [error instanceof Error ? error.message : 'Something went wrong'],
//       },
//     }
//   }
//   redirect('/login')
// }
