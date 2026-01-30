import { STATUS } from './types'

export function canCancelPayment(
  orderStatus: string,
  paymentStatus: string,
): boolean {
  return (
    orderStatus === STATUS.waiting_for_capture &&
    paymentStatus === STATUS.waiting_for_capture
  )
}

export function canEarlyCancelPayment(
  orderStatus: string,
  paymentStatus: string,
): boolean {
  return orderStatus === STATUS.pending && paymentStatus === STATUS.pending
}

export function canRequestCancelPayment(
  orderStatus: string,
  paymentStatus: string,
) {
  return orderStatus === STATUS.paid && paymentStatus === STATUS.succeeded
}
