import { APIError, CollectionAfterChangeHook } from 'payload'
import { Order, Product } from '@/payload-types'
import { sendMessage } from '@/shared/lib/telegram/queries'
import { formatDate } from '@/shared/utils/formatDate'
import {
  IsCancelled,
  IsPaid,
  IsWaitingForCapture,
} from '@/collections/Orders/helpers/checkStatus'

export const sendToTelegramOnComplete: CollectionAfterChangeHook<
  Order
> = async ({ doc, previousDoc, req, data, operation }) => {
  if (operation !== 'update') return

  console.log('operation ', operation)
  const date = formatDate(doc.updatedAt)
  //  !IsWaitingForCapture(previousDoc.status))
  if (
    IsWaitingForCapture(doc.status) &&
    !IsWaitingForCapture(previousDoc.status)
  ) {
    console.log('operation ', doc.status, previousDoc.status)
    try {
      await sendMessage(
        process.env.TELEGRAM_CHAT_ID!,
        `🛒 Новый заказ ожидает подтверждения!!\nНомер: #${doc.id}\nСумма: ${doc.paymentData?.paymentAmount}\nClient: ${doc.orderedBy?.name}\nPhone:${doc.phone}\nEmail:${doc.orderedBy?.email}\nDate: ${date}`,
      )
    } catch (error: unknown) {
      console.log(error)
      // send error to sentry
      // throw new APIError(
      //   `This slug will create a conflict with an existing path.`,
      //   400,
      //   [
      //     {
      //       field: 'slug',
      //       message: `This slug will create a conflict with an existing path.`,
      //     },
      //   ],
      //   false,
      // )
    }
  } else if (IsPaid(doc.status) && !IsPaid(previousDoc.status)) {
    try {
      await sendMessage(
        process.env.TELEGRAM_CHAT_ID!,
        `💰 Оплата заказа #${doc.id} прошла успешно!\n\n${doc.paymentData?.paymentAmount}`,
      )
    } catch (error: unknown) {
      console.log(error)
    }
  } else if (IsCancelled(doc.status) && !IsCancelled(previousDoc.status)) {
    try {
      await sendMessage(
        process.env.TELEGRAM_CHAT_ID!,
        `❌ Заказ отменен!\nНомер: #${doc.id}\nСтатус: ${doc.status}`,
      )
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return doc
}
