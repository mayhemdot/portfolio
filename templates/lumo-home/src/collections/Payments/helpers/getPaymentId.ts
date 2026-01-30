import { Payment } from '@/payload-types'

export const getPaymentId = (
  payment: Payment | number | undefined | null,
): number | undefined | null =>
  typeof payment === 'object' && payment !== null ? payment.id : payment
