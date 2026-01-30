// import z from 'zod'

// const password = z
//   .string()
//   .min(8, { message: 'Password must be at least 8 characters long' })
//   .max(32, { message: 'Password must be at most 32 characters long' })
//   .regex(/[A-Z]/, {
//     message: 'Password must contain at least one uppercase letter',
//   })
//   .regex(/[a-z]/, {
//     message: 'Password must contain at least one lowercase letter',
//   })
//   .regex(/[0-9]/, { message: 'Password must contain at least one number' })
// // .regex(/[^A-Za-z0-9]/, {
// //   message: "Password must contain at least one special character",
// // });

// export const loginSchema = z.object({
//   email: z.string().email().min(5).max(255),
//   password,
// })

// export type LoginActionSchema = z.infer<typeof loginSchema>

// export type LoginActionZodFieldErrors =
//   z.typeToFlattenedError<LoginActionSchema>['fieldErrors'] & {
//     root?: string[] | string
//   }

// /////////////////////////////////////////////////////////
// export const registerSchema = z
//   .object({
//     email: z.string().email().min(5).max(255),
//     password: password.refine(
//       password =>
//         !['password', '12345678', 'qwerty'].includes(password.toLowerCase()),
//       {
//         message: 'Password is too common or weak',
//       },
//     ),
//     repeatPassword: password,
//   })
//   .refine(data => data.password === data.repeatPassword, {
//     message: 'Passwords do not match',
//     path: ['repeatPassword'],
//   })

// export type RegisterActionSchema = z.infer<typeof registerSchema>

// export type RegisterActionZodFieldErrors =
//   z.typeToFlattenedError<RegisterActionSchema>['fieldErrors'] & {
//     root?: string[] | string
//   }

// /////////////////////////////////////////////////////////
// export const restorePasswordSchema = z
//   .object({
//     password: password.refine(
//       password =>
//         !['password', '12345678', 'qwerty'].includes(password.toLowerCase()),
//       {
//         message: 'Password is too common or weak',
//       },
//     ),
//     repeatPassword: password,
//     code: z.string(),
//   })
//   .refine(data => data.password === data.repeatPassword, {
//     message: 'Passwords do not match',
//     path: ['repeatPassword'],
//   })

// export type RestorePasswordActionSchema = z.infer<typeof restorePasswordSchema>

// export type RestorePasswordActionZodFieldErrors =
//   z.typeToFlattenedError<RestorePasswordActionSchema>['fieldErrors'] & {
//     root?: string[] | string
//   }

// /////////////////////////////////////////////////////////

// export const forgotPasswordSchema = z.object({
//   email: z.string().email().min(5).max(255),
// })

// export type ForgotPasswordActionSchema = z.infer<typeof forgotPasswordSchema>

// export type ForgotPasswordActionZodFieldErrors =
//   z.typeToFlattenedError<ForgotPasswordActionSchema>['fieldErrors'] & {
//     root?: string[] | string
//   }
