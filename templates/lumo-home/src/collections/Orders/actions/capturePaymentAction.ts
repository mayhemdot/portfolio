'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { yoo } from '@/collections/Orders/hooks/createYooPayment'
import { ICapturePayment } from '@a2seven/yoo-checkout'
import { headers as getHeaders } from 'next/headers'
import { canCancelPayment } from '@/modules/orders/model/helpers'
import { userIsAdmin } from '@/shared/access/admins'

// This action works only with two-step payments and order status is 'waiting_for_capture'
export async function capturePaymentAction(
  _: any,
  id: string | number | undefined,
) {
  try {
    // const user = await getUserFromSession()
    const payload = await getPayload({ config: config })
    const headers = await getHeaders()
    const auth = await payload.auth({ headers })

    if (!userIsAdmin({ user: auth?.user })) {
      throw new Error('You are not authorized to perform this action')
    }

    if (!id) {
      throw new Error('Order Id is required')
    }

    const orderData = await payload.findByID({
      collection: 'orders',
      id,
      depth: 2,
    })

    if (!orderData) {
      throw new Error('Order not found')
    }

    const paymentObject =
      typeof orderData.payment === 'object' ? orderData.payment : undefined

    if (!paymentObject) {
      throw new Error('Payment not found for this order')
    }

    const {
      status: paymentStatus,
      paymentId,
      idempotencyKey,
      amount,
    } = paymentObject

    if (!canCancelPayment(orderData.status, paymentStatus)) {
      throw new Error('Payment is not waiting for capture')
    }

    const result = await yoo.capturePayment(
      paymentId,
      {
        amount: {
          value: amount.value,
          currency: amount.currency,
        },
        // receipt: {
        //   email: paymentObject.receipt.email,
        //   phone: paymentObject.receipt.phone,
        // }
      } as ICapturePayment,
      idempotencyKey!,
    )

    if (result.status !== 'succeeded') {
      throw new Error('Payment capture failed with error: ' + result.status)
    }

    const updatedOrder = await payload.update({
      collection: 'orders',
      id: id,
      data: {
        status: 'paid',
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
  } catch (error: unknown) {
    console.log(error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Something went wrong',
    }
  }
}
