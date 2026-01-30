import { Payment } from '@/payload-types'

export const getPaymentOrNull = (
  payment: Payment | number | undefined | null,
): Payment | undefined | null =>
  typeof payment === 'object' && payment !== null ? payment : undefined
