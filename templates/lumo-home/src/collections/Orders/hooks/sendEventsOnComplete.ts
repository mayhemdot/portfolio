import { CollectionAfterChangeHook } from 'payload'
import { Order } from '@/payload-types'
import { sendMessage } from '@/shared/lib/telegram/queries'
import { formatDate } from '@/shared/utils/formatDate'
import {
  IsPaid,
  IsWaitingForCapture,
  IsPending,
  IsCancelled,
  IsRefundRequested,
} from '@/collections/Orders/helpers/checkStatus'

// Вспомогательная функция для форматирования информации о заказе
const formatOrderInfo = (doc: Order, date: string) => {
  return `Номер: #${doc.id}\nСумма: ${doc.paymentData?.paymentAmount}\nКлиент: ${doc.orderedBy?.name}\nТелефон: ${doc.phone}\nEmail: ${doc.orderedBy?.email}\nДата: ${date}`
}

// Вспомогательная функция для отправки сообщений в Telegram
const sendTelegramNotification = async (message: string, req: any) => {
  try {
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (!chatId) {
      req.payload.logger.error('TELEGRAM_CHAT_ID не настроен')
      return
    }
    await sendMessage(chatId, message)
  } catch (error: unknown) {
    req.payload.logger.error('Ошибка отправки сообщения в Telegram:', error)
  }
}

export const sendEmailOnComplete: CollectionAfterChangeHook<Order> = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  if (
    operation === 'update' &&
    doc.status === 'shipped' &&
    previousDoc.status !== 'shipped'
  ) {
    // Отправляем письмо клиенту о доставке заказа
    if (doc.orderedBy?.email) {
      req.payload.sendEmail({
        to: doc.orderedBy.email,
        subject: `Заказ #${doc.id} доставлен`,
        text: `Ваш заказ #${doc.id} успешно доставлен!\n\nСпасибо за покупку!`,
      })
    }
  }

  return doc
}

export const sendToTelegramOnComplete: CollectionAfterChangeHook<
  Order
> = async ({ doc, previousDoc, req, data, operation }) => {
  // console.log('operation ', operation)

  const date = formatDate(doc.updatedAt)
  const orderInfo = formatOrderInfo(doc, date)

  // 1. Уведомление о создании нового заказа
  // if (operation === 'create') {
  //   await sendTelegramNotification(
  //     `🆕 Новый заказ создан!\n${orderInfo}\nСтатус: ${doc.status}`,
  //     req,
  //   )
  //   return doc
  // }

  // 2. Уведомления при изменении статуса (только для update операций)
  if (operation === 'update' && previousDoc) {
    const previousStatus = previousDoc.status
    const currentStatus = doc.status

    // Уведомление о подтверждении оплаты
    if (
      IsWaitingForCapture(currentStatus) &&
      !IsWaitingForCapture(previousStatus)
    ) {
      await sendTelegramNotification(
        `⏳ Заказ ожидает подтверждения!\n${orderInfo}\nСтатус: ${currentStatus}`,
        req,
      )
    }

    // Уведомление об успешной оплате
    if (
      IsPaid(currentStatus) &&
      !IsPaid(previousStatus)
      // !IsWaitingForCapture(previousStatus)
    ) {
      await sendTelegramNotification(
        `✅ Заказ оплачен!\n${orderInfo}\nСтатус: ${currentStatus}`,
        req,
      )
    }

    // Уведомление о подготовке к отправке
    // if (currentStatus === 'preparing' && previousStatus !== 'preparing') {
    //   await sendTelegramNotification(
    //     `📦 Заказ готовится к отправке!\n${orderInfo}\nСтатус: ${currentStatus}`,
    //     req,
    //   )
    // }

    // Уведомление о доставке
    // if (
    //   currentStatus === 'delivering' &&
    //   previousStatus !== 'delivering'
    // ) {
    //   await sendTelegramNotification(
    //     `🚚 Заказ в доставке!\n${orderInfo}\nСтатус: ${currentStatus}`,
    //     req
    //   )
    // }

    // Уведомление о доставке
    // if (
    //   currentStatus === 'shipped' &&
    //   previousStatus !== 'shipped'
    // ) {
    //   await sendTelegramNotification(
    //     `🎉 Заказ доставлен!\n${orderInfo}\nСтатус: ${currentStatus}`,
    //     req
    //   )
    // }

    // Уведомление об отмене заказа
    if (IsCancelled(currentStatus) && !IsCancelled(previousStatus)) {
      await sendTelegramNotification(
        `❌ Заказ отменен!\n${orderInfo}\nСтатус: ${currentStatus}`,
        req,
      )
    }

    // Уведомление о запросе возврата
    if (
      IsRefundRequested(currentStatus) &&
      !IsRefundRequested(previousStatus)
    ) {
      await sendTelegramNotification(
        `🔄 Запрошен возврат!\n${orderInfo}\nСтатус: ${currentStatus}`,
        req,
      )
    }
  }

  return doc
}

export const sendRefundNotification: CollectionAfterChangeHook<Order> = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  // Проверяем, был ли выполнен возврат средств
  if (
    operation === 'update' &&
    doc.isRefunded === true &&
    previousDoc?.isRefunded !== true
  ) {
    const date = formatDate(doc.updatedAt)
    const orderInfo = formatOrderInfo(doc, date)

    await sendTelegramNotification(
      `💰 Возврат средств выполнен!\n${orderInfo}\nСтатус заказа: ${doc.status}`,
      req,
    )
  }

  return doc
}
