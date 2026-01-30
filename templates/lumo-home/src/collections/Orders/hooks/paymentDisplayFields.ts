import { getPaymentId } from '@/collections/Payments/helpers/getPaymentId'
import { formatPrice } from '@/shared/utils/formatPrice'
import { FieldHookArgs } from 'payload'

export const paymentPaidPreview = async ({ data, req }: FieldHookArgs) => {
  const id = getPaymentId(data?.payment)

  if (!id) return false

  try {
    const payment = await req.payload.findByID({
      collection: 'payments',
      id,
    })

    return payment?.paid
  } catch (error: unknown) {
    req.payload.logger.error(error)
    return false
  }
}

export const paymentStatusPreview = async ({ data, req }: FieldHookArgs) => {
  const id = getPaymentId(data?.payment)

  if (!id) return 'Unknown'

  try {
    const payment = await req.payload.findByID({
      collection: 'payments',
      id,
    })

    return payment?.status || 'Unknown'
  } catch (error: unknown) {
    req.payload.logger.error(error)
    return 'Unknown'
  }
}

export const paymentAmountPreview = async ({ data, req }: FieldHookArgs) => {
  const id = getPaymentId(data?.payment)

  if (!id) return 'Unknown'

  try {
    const payment = await req.payload.findByID({
      collection: 'payments',
      id,
    })
    return formatPrice(Number(payment.amount.value), {
      currency_code: payment.amount.currency,
      // locale: 'en-US',
    })
  } catch (error: unknown) {
    req.payload.logger.error(error)
    return 'Unknown'
  }
}
