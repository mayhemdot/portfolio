import z from 'zod'

export const paybackActionSchema = z.object({
  paymentId: z.string(),
  amount: z.string(),
  currency: z.string().optional().default('RUB'),
  idempotencyKey: z.string(),
})

export type PaybackActionSchema = z.infer<typeof paybackActionSchema>

export type PaybackActionZodFieldErrors =
  z.typeToFlattenedError<PaybackActionSchema>['fieldErrors'] & {
    root?: string
  }
