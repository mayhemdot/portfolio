import { PayloadRequest } from 'payload'
import { mapPaymentStatusToOrderStatus } from '../helpers/mapPaymentStatusToOrderStatus'
import { PaymentNotification } from '../types'

export const paymentNotificationHandler = async (req: PayloadRequest) => {
  if (!req.json) {
    return Response.json({ error: 'Request body not valid' }, { status: 400 })
  }
  const data: PaymentNotification = await req.json()

  if (!data?.object?.id) {
    return Response.json({ error: 'Error response not valid' }, { status: 400 })
  }

  try {
    const {
      docs: [paymentUpdated],
    } = await req.payload.update({
      collection: 'payments',
      where: {
        paymentId: {
          equals: data.object.id,
        },
      },
      data: {
        status: data.object.status,
        paid: data.object.paid || false,
      },
    })

    if (!paymentUpdated) {
      throw new Error('Payment not found')
    }

    // console.log('data.object.status', data.object.status)
    const {
      docs: [orderUpdated],
    } = await req.payload.update({
      collection: 'orders',
      where: {
        payment: {
          equals: paymentUpdated.id,
        },
      },
      data: {
        status: mapPaymentStatusToOrderStatus(data.object.status),
      },
    })

    if (!orderUpdated) {
      throw new Error('Order not found')
    }

    return Response.json({
      status: 200,
      message: 'Payment and order updated successfully.',
    })
  } catch (e: unknown) {
    console.log(e)
    return Response.json({
      status: 400,
      message: e instanceof Error ? e.message : 'Error updating payment info',
    })
  }
}
