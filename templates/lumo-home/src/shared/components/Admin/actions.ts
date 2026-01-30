'use server'

import { yoo } from '@/collections/Orders/hooks/createYooPayment'
import { getPayload } from '@/shared/lib/better-auth/payload'

export async function cancelOrderOrRefundAction(_: any, formData: FormData) {
  const payload = await getPayload()

  const id = formData.get('id') as string

  try {
    if (!id) {
      throw new Error('Order Id is required')
    }
    const updatedOrder = await payload.update({
      collection: 'orders',
      id,
      data: {
        status: 'cancelled',
      },
      depth: 2,
    })

    if (!updatedOrder) {
      throw new Error('Order not found')
    }

    const payment =
      typeof updatedOrder.payment === 'object'
        ? updatedOrder.payment
        : undefined

    if (!payment) {
      throw new Error('Payment not found')
    }

    if (!payment?.idempotencyKey) {
      throw new Error('idempotencyKey not found')
    }

    if (payment.status === 'succeeded') {
      // проверить что он сделан меньше года назад
      yoo.createRefund(
        {
          amount: {
            value: payment.amount.value,
            currency: payment.amount.currency,
          },
          payment_id: payment.paymentId,
        },
        payment.idempotencyKey!,
      )
    } else if (payment.status === 'waiting_for_capture') {
      yoo.cancelPayment(String(payment.paymentId))
    }

    // updatedOrder.payment
    // if (updatedOrder.payment) {
    //   await payload.update({
    //     collection: "payments",
    //     id: updatedOrder.payment.id,
    //     data: {
    //       status: "canceled",
    //     },
    //   });
    // }
    return {
      error: null,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      error: error instanceof Error ? error.message : 'Something went wrong',
    }
  }

  //   toast.success("Order cancelled");

  return null
}
