import { TG_URL } from '@/shared/lib/telegram/data'
import { restApi } from '@/shared/utils/restApi'

// https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/getMe

const BOT_PREFIX = '/bot'
const QUERY_BOT = `${TG_URL}${BOT_PREFIX}`

type UserInfo = {
  id: number
  is_bot: boolean
  first_name: string
  username: string
  can_join_groups: boolean
  can_read_all_group_messages: boolean
  supports_inline_queries: boolean
  can_connect_to_business: boolean
  has_main_web_app: boolean
}

type TelegramBotErrorResult = {
  error_code: number
  description: string
}

type TGBotResponse<T> = {
  ok: boolean
  result: T | TelegramBotErrorResult
}

/**
 * Fetches information about the bot via the Telegram API.
 * @returns A Promise resolving to a TelegramBotSuccessResult object containing bot details if successful.
 * @throws An error if the Telegram API response is not successful or if there is no response.
 */

export async function getMe() {
  const response = await restApi<TGBotResponse<UserInfo>>(
    `${QUERY_BOT}${process.env.TELEGRAM_API_KEY}/getMe`,
  )

  if (!response) {
    throw Error('Telegram API error: No response')
  }

  const { ok, result } = response

  if (!ok) {
    const resp = response.result as TelegramBotErrorResult

    throw new Error(
      `Telegram API error (${resp?.error_code || 400}): ${resp?.description || 'No description'}`,
    )
  }
  return result
}

type SentMessageUser = {
  id: number
  is_bot: boolean
  first_name: string
  username?: string
  language_code?: string
}

type SentMessageChat = {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  type: 'private' | 'group' | 'supergroup' | 'channel'
}

type TGMessageEntity = {
  offset: number
  length: number
  type: 'bot_command' | string
}

type SentMessage = {
  message_id: number
  from: SentMessageUser
  chat: SentMessageChat
  date: number
  text: string
  entities?: TGMessageEntity[]
}

/**
 * Send a message to the specified chat.
 * @param chatId The identifier of the chat the message should be sent to.
 * @param text The text of the message to be sent.
 * @returns A TelegramBotInfo object as a Promise.
 *
 * Example usage with curl:
 *  curl -X POST ^
 *  -H "Content-Type: application/json" ^
 *  -d "{\"chat_id\": \"876996927\", \"text\": \"Hello, World!\"}" ^
 *  https://api.telegram.org/bot8322841183:AAHvnMNiCz77bM2UPjbgUGPhYhQOh_I-6dc/sendMessage
 *
 *
 * Example usage method:
 *  sendMessage(876996xxx, `🛒 Новый заказ!\nНомер: #123\nСумма: 1 500 ₽`)
 */

export async function sendMessage(chatId: string, text: string) {
  const response = await restApi<TGBotResponse<SentMessage>>(
    `${QUERY_BOT}${process.env.TELEGRAM_API_KEY}/sendMessage`,
    {
      method: 'POST',
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    },
  )
  if (!response) {
    throw new Error('Telegram API error (400): No response')
  }

  if (!response.ok) {
    const resp = response.result as TelegramBotErrorResult

    throw new Error(
      `Telegram API error (${resp?.error_code || 400}): ${resp?.description || 'No description'}`,
    )
  }

  return response.result
}

type TelegramUpdate = {
  update_id: number
  message?: SentMessage
}

/**
 * Retrieves any new updates for the bot from the Telegram API.
 * @returns A Promise resolving to an array of TelegramUpdate objects containing the new updates if successful.
 * @throws An error if the Telegram API response is not successful or if there is no response.
 * @see https://core.telegram.org/bots/api#getupdates
 */
export async function getUpdates() {
  const response = await restApi<TGBotResponse<TelegramUpdate[]>>(
    `${QUERY_BOT}${process.env.TELEGRAM_API_KEY}/getUpdates`,
  )

  if (!response) {
    throw new Error('Telegram API error (400): No response')
  }

  if (!response.ok) {
    const resp = response.result as TelegramBotErrorResult
    // console.log('[getUpdates] ', resp)
    throw new Error(
      `Telegram API error (${resp?.error_code || 400}): ${resp?.description || 'No description'}`,
    )
  }

  return response.result
}
