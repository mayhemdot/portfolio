// import z from 'zod'

// export const SignUpSchema = z
//   .object({
//     email: z.string().email({ message: 'Please enter a valid email address' }),
//     password: z
//       .string()
//       .min(6, { message: 'Password must be at least 6 characters' })
//       .max(32, { message: 'Password must be at most 32 characters' }),
//     passwordConfirm: z.string().min(6, { message: 'Password must be at least 6 characters' }),
//   })
//   .refine((data) => data.password === data.passwordConfirm, {
//     message: 'Passwords must match',
//     path: ['passwordConfirm'], // This sets the error on `passwordConfirm`
//   })

// export type SignUpSchemaType = z.infer<typeof SignUpSchema>

// export const LogInSchema = z.object({
//   email: z.string().email({ message: 'Please enter a valid email address' }),
//   password: z
//     .string()
//     .min(6, { message: 'Password must be at least 6 characters' })
//     .max(32, { message: 'Password must be at most 32 characters' }),
// })

// export type LogInSchemaType = z.infer<typeof LogInSchema>

// export const UpdateUserSchema = z.object({
//   id: z.number().or(z.string()),
//   name: z.string().min(2, { message: 'Name must be at least 2 characters' }).optional(),
//   email: z.string().email({ message: 'Please enter a valid email address' }),
// })

// export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>
