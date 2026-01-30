'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { yoo } from '@/collections/Orders/hooks/createYooPayment'
import {
  canCancelPayment,
  canEarlyCancelPayment,
} from '@/modules/orders/model/helpers'
import { userIsAdmin } from '@/shared/access/admins'
import { headers as getHeaders } from 'next/headers'
import { getPaymentOrNull } from '@/collections/Payments/helpers/getPaymentOrNull'

// This action works only with two-step payments and order status is 'waiting_for_capture'
export async function cancelPaymentAction(
  _: any,
  id: string | number | undefined,
) {
  try {
    const payload = await getPayload({ config: config })
    const headers = await getHeaders()
    const auth = await payload.auth({ headers })

    if (!userIsAdmin({ user: auth?.user })) {
      throw new Error('You are not authorized to perform this action')
    }

    if (!id) {
      throw new Error('Order Id is required')
    }

    const order = await payload.findByID({
      collection: 'orders',
      id: id,
      depth: 2,
    })

    if (!order) {
      throw new Error('Order not found')
    }

    const payment = getPaymentOrNull(order.payment)

    if (!payment) {
      throw new Error('Payment not found for this order')
    }

    const { status: paymentStatus, paymentId, idempotencyKey } = payment

    if (canEarlyCancelPayment(order.status, paymentStatus)) {
      const updatedOrder = await payload.update({
        collection: 'orders',
        id,
        data: {
          status: 'cancelled',
        },
        depth: 1,
      })

      if (!updatedOrder) {
        throw new Error('Order not found after payment capture')
      }

      const paymentUpdated = await payload.update({
        collection: 'payments',
        id: payment.id,
        data: {
          status: 'canceled',
        },
      })

      if (!paymentUpdated) {
        throw new Error('Order not found after payment capture')
      }

      return {
        success: true,
        error: null,
      }
    } else if (canCancelPayment(order.status, paymentStatus)) {
      const result = await yoo.cancelPayment(paymentId, idempotencyKey!)

      if (result.status !== 'canceled') {
        throw new Error('Something went wrong while canceling payment')
      }
      const updatedOrder = await payload.update({
        collection: 'orders',
        id,
        data: {
          status: 'cancelled',
        },
        depth: 1,
      })

      if (!updatedOrder) {
        throw new Error('Order not found after payment capture')
      }
      return {
        success: true,
        error: null,
      }
    } else {
      throw new Error('Payment is not waiting for capture or pending')
    }
  } catch (error: unknown) {
    console.log(error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Something went wrong',
    }
  }
}
