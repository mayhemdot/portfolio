'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { yoo } from '@/collections/Orders/hooks/createYooPayment'
// import { headers as getHeaders } from 'next/headers'

import payload from 'payload'

import {
  canCancelPayment,
  canEarlyCancelPayment,
  canRequestCancelPayment,
} from '../model/helpers'
import { STATUS } from '../model/types'

// This action works only with two-step payments and order status is 'waiting_for_capture'
export async function cancelOrderAction(
  _: any,
  id: string | number | undefined,
) {
  try {
    const payload = await getPayload({ config: config })

    if (!id) {
      throw new Error('Order Id is required')
    }

    const orderObject = await payload.findByID({
      collection: 'orders',
      id,
      depth: 2,
    })

    if (!orderObject) {
      throw new Error('Order not found')
    }

    const paymentObject =
      typeof orderObject.payment === 'object' ? orderObject.payment : undefined

    if (!paymentObject) {
      throw new Error('Payment not found for this order')
    }

    const { status: orderStatus } = orderObject
    const { status: paymentStatus, paymentId, idempotencyKey } = paymentObject

    if (!paymentId || !idempotencyKey) {
      throw new Error('PaymentId or IdempotencyKey is missing')
    }
    // Заказ не захвачен complete - complete	Можно отменить заказ, так как
    // администратор не подтвердил оплату и не началась отгрузка
    if (canCancelPayment(orderStatus, paymentStatus)) {
      const result = await yoo.cancelPayment(paymentId, idempotencyKey!)

      if (result.status !== 'succeeded') {
        throw new Error('Payment cancel failed with error: ' + result.status)
      }
      const updatedOrder = await payload.update({
        collection: 'orders',
        id,
        data: {
          status: STATUS.cancelled,
        },
        depth: 1,
      })

      if (!updatedOrder) {
        throw new Error('Order not found after payment capture')
      }
      return {
        status: updatedOrder.status,
        error: null,
      }
    }
    // Заказ ещё не оплачен	pending -pending	Можно отменить заказ без платёжных действий
    else if (canEarlyCancelPayment(orderStatus, paymentStatus)) {
      const updatedOrder = await payload.update({
        collection: 'orders',
        id,
        data: {
          status: STATUS.cancelled,
        },
        depth: 1,
      })

      if (!updatedOrder) {
        throw new Error('Order not found after payment capture')
      }
      return {
        status: updatedOrder.status,
        error: null,
      }
    } else if (canRequestCancelPayment(orderStatus, paymentStatus)) {
      // refund logic
      const updatedOrder = await payload.update({
        collection: 'orders',
        id,
        data: {
          status: STATUS.refund_requested,
        },
        depth: 1,
      })

      if (!updatedOrder) {
        throw new Error('Order not found after payment capture')
      }

      return {
        success: true,
        status: updatedOrder.status,
        error: null,
      }
    } else {
      payload.logger.error('Order cannot be canceled')
      return {
        success: false,
        status: orderStatus,
        error: 'Order cannot be canceled',
      }
    }
  } catch (error: unknown) {
    payload.logger.error(error)
    return {
      success: false,
      status: 'error',
      error: error instanceof Error ? error.message : 'Something went wrong',
    }
  }
}
