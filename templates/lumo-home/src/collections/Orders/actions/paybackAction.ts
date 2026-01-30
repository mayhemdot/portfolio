'use server'
import { yoo } from '../hooks/createYooPayment'
import { userIsAdmin } from '@/shared/access/admins'
import { paybackActionSchema } from './types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'

export async function paybackAction(_: any, formData: FormData) {
  try {
    const parsedData = paybackActionSchema.safeParse({
      idempotencyKey: formData.get('idempotencyKey'),
      paymentId: formData.get('paymentId'),
      amount: formData.get('amount'),
      currency: formData.get('currency'),
    })

    if (!parsedData.success) {
      return {
        success: false,
        error: parsedData.error?.flatten().fieldErrors,
      }
    }

    const { paymentId, amount, currency, idempotencyKey } = parsedData.data

    const payload = await getPayload({ config })
    const headers = await getHeaders()
    const auth = await payload.auth({ headers })

    if (!userIsAdmin({ user: auth?.user })) {
      throw new Error('You are not authorized to perform this action')
    }

    const result = await yoo.createRefund(
      {
        amount: {
          value: amount,
          currency: currency,
        },
        payment_id: paymentId,
      },
      idempotencyKey,
    )

    if (result.status === 'canceled') {
      throw new Error('Something went wrong')
    }

    const updatedPayment = await payload.update({
      collection: 'payments',
      where: {
        paymentId: {
          equals: paymentId,
        },
      },
      data: {
        status: result.status,
      },
      depth: 1,
    })

    if (!updatedPayment) {
      throw new Error('Payment not found')
    }

    return {
      status: result.status,
      success: true,
      error: undefined,
    }
  } catch (e: unknown) {
    return {
      success: false,
      error: {
        root: e instanceof Error ? e.message : 'Something went wrong',
      },
    }
  }
}
