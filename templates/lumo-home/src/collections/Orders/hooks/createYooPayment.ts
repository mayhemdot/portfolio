import { CollectionAfterChangeHook } from 'payload'
import {
  ICreatePayment,
  Payment as YooPaymentType,
  YooCheckout,
  IPaymentStatus,
} from '@a2seven/yoo-checkout'
import { Order } from '@/payload-types'
import { v4 as uuid } from 'uuid'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2022-11-15',
// })

export const yoo = new YooCheckout({
  shopId: process.env.YOO_SHOP_ID!,
  secretKey: process.env.YOO_SECRET_KEY!,
})

export const createPayment: CollectionAfterChangeHook<Order> = async ({
  doc,
  req,
  data,
  operation,
}) => {
  if (!data.items?.length) {
    throw new Error('Order must have at least one item')
  }

  if (operation === 'create') {
    let total =
      doc.items?.reduce(
        (prev, item) => Number(item.totalPrice) || 0 + prev,
        0,
      ) || 0

    if (typeof doc.shippingMethod === 'object') {
      if (!doc.shippingMethod?.price || doc.shippingMethod?.price === 0) {
        throw new Error('Shipping method price is required')
      }

      total += doc.shippingMethod.price || 0
    } else if (
      typeof doc.shippingMethod === 'number' ||
      typeof doc.shippingMethod === 'string'
    ) {
      // doc.shippingMethod = doc.shippingMethod
      const shipping = await req.payload.findByID({
        collection: 'shippings',
        id: doc.shippingMethod,
        depth: 0,
      })
      if (!shipping) {
        throw new Error('Shipping method not found')
      }

      if (!shipping?.price || shipping?.price === 0) {
        throw new Error('Shipping method price is required')
      }
      total += shipping.price || 0
    } else {
      throw new Error('Shipping method is required')
    }

    const createPayload: ICreatePayment = {
      // Автоматический прием  поступившего платежа. Возможные значения
      // true — оплата списывается сразу (платеж в одну стадию);
      // false — оплата холдируется и списывается по вашему запросу (платеж в две стадии ).
      capture: false,
      amount: {
        value: total.toString(),
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.NEXT_PUBLIC_URL,
      },
      // Custom fields
      metadata: {
        orderId: data.id,
        // userId:
      },
    }

    try {
      const idempotencyKey = uuid()

      const payment: YooPaymentType = await yoo.createPayment(
        createPayload,
        idempotencyKey,
      )

      const updatedOrder = await req.payload.create({
        collection: 'payments',
        data: {
          status: payment.status as IPaymentStatus,
          amount: payment.amount,
          recipient: payment.recipient,
          startedAt: payment.created_at,
          test: payment.test,
          paid: payment.paid,
          refundable: payment.refundable,
          metadata: payment.metadata,
          idempotencyKey: idempotencyKey,
          paymentId: payment.id,
          confirmation: {
            type: 'redirect',
            confirmation_url: payment.confirmation?.confirmation_url || '',
          },
        },
        req,
      })
      doc.payment = updatedOrder
      doc.status = payment.status as any

      await req.payload.update({
        collection: 'orders',
        id: doc.id,
        data: {
          payment: updatedOrder,
          status: 'pending', //"canceled" | "pending" | "completed"
        },
        req,
      })
      return doc
    } catch (error: unknown) {
      req.payload.logger.error(error)
      throw error
    }
  } else if (operation === 'update') {
    console.log('update....')
  }
  return doc
}

// const payment = {
//   id: "2ff67559-000f-5000-8000-1bb486fd3253",
//   status: "canceled",
//   amount: { value: "6929.00", currency: "RUB" },
//   recipient: { account_id: "1116378", gateway_id: "2484343" },
//   payment_method: {
//     type: "bank_card",
//     id: "2ff67559-000f-5000-8000-1bb486fd3253",
//     saved: false,
//     status: "inactive",
//   },
//   created_at: "2025-07-01T22:30:49.192Z",
//   test: true,
//   paid: false,
//   refundable: false,
//   metadata: {},
//   cancellation_details: {
//     party: "yoo_money",
//     reason: "expired_on_confirmation",
//   },
// };
