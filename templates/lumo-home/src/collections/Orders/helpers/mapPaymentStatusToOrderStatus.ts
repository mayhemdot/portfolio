import { Order } from '@/payload-types'
import { IPaymentStatus } from '@a2seven/yoo-checkout'

export function mapPaymentStatusToOrderStatus(
  status: IPaymentStatus,
): Order['status'] {
  switch (status) {
    case 'pending':
      return 'pending'
    case 'waiting_for_capture':
      return 'waiting_for_capture'
    case 'succeeded':
      return 'paid'
    case 'canceled':
      return 'cancelled'
    default:
      throw new Error('Unknown payment status')
  }
}
