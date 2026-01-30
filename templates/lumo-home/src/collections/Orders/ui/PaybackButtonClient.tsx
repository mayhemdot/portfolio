'use client'
import { Button, TextInput, toast, useField } from '@payloadcms/ui'
import { useActionState, useEffect, useRef, useTransition } from 'react'
import { PaybackActionZodFieldErrors } from '../actions/types'
import { paybackAction } from '../actions/paybackAction'
import { Drawer, DrawerToggler } from '@payloadcms/ui'
import { Order } from '@/payload-types'
import Link from 'next/link'

const drawerSlug = 'my-custom-drawer'

type Props = {
  order: Order
  label: string
}

export default function PaybackButtonClient({ order, label }: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  const { setValue } = useField({ path: 'isRefunded' })
  const { setValue: setCancelled } = useField({ path: 'status' })

  const [state, paybackActionHandler, isLoading] = useActionState<
    {
      success?: boolean
      error?: PaybackActionZodFieldErrors
    },
    any
  >(paybackAction, {
    success: undefined,
    error: undefined,
  })
  const [isPending, startTransition] = useTransition()

  const hasHandledStatusRef = useRef(false)
  const payment = typeof order?.payment === 'object' ? order.payment : undefined

  useEffect(() => {
    if (hasHandledStatusRef.current) return

    if (state.success === true) {
      toast.success('Payment refunded')
      setValue(true)
      setCancelled('cancelled')
      ref.current?.click()
      hasHandledStatusRef.current = true
    } else if (state.success === false) {
      toast.error('Payment refund failed')
      hasHandledStatusRef.current = true
    }
  }, [state.success, setValue])

  const handleRefund = () => {
    if (!payment) return

    const formData = new FormData()
    formData.set('paymentId', payment.paymentId || '')
    formData.set('amount', payment.amount.value || '')
    formData.set('currency', payment.amount.currency || '')
    formData.set('idempotencyKey', payment.idempotencyKey || '')

    startTransition(() => {
      paybackActionHandler(formData)
    })
  }

  return (
    <>
      {/* <div className="label-wrapper">
        <FieldLabel htmlFor={`field-refund`} label={label} />
      </div> */}

      <DrawerToggler
        className="btn btn--style-secondary btn--size-large"
        style={{ flexGrow: 1, width: '100%' }}
        slug={drawerSlug}
        slot="button"
      >
        Refund the order payment
      </DrawerToggler>

      <Drawer slug={drawerSlug}>
        {!payment && <p className="text-red-600 py-4">Payment not found</p>}

        {payment && state.success === undefined && (
          <div>
            <h3>Форма возврата платежа</h3>

            <form>
              <TextInput
                label="Payment Id"
                path={'paymentId'}
                readOnly={true}
                showError={!!state?.error?.paymentId}
                Error={state.error?.paymentId}
                value={payment?.paymentId}
              />
              <TextInput
                label="Amount"
                path={'amount'}
                readOnly={true}
                showError={!!state?.error?.amount}
                Error={state.error?.amount}
                value={payment?.amount.value}
              />
              <TextInput
                label="Currency"
                path={'currency'}
                readOnly={true}
                showError={!!state?.error?.currency}
                Error={state.error?.currency}
                value={payment?.amount.currency}
              />
              <TextInput
                label="idempotencyKey"
                path={'idempotencyKey'}
                readOnly={true}
                showError={!!state?.error?.idempotencyKey}
                Error={state.error?.idempotencyKey}
                value={payment?.idempotencyKey || ''}
              />

              <Button
                buttonStyle="primary"
                type="submit"
                size="medium"
                disabled={isLoading || isPending}
                onClick={handleRefund}
                className="w-full"
              >
                Отправить
              </Button>
            </form>

            {state?.error?.root && (
              <p className="text-red py-4">{state.error.root}</p>
            )}
          </div>
        )}

        {state.success === true && (
          <div className="w-full flex flex-col gap-2">
            <p className="text-green-600 py-4">Payment refunded</p>
            <Link
              href={`${process.env.NEXT_PUBLIC_YOOKASSA_PAYMENTS_URL}`}
              className={'underline'}
            >
              Please verify in YooKassa that your payment status has been
              updated to 'refunded'
            </Link>
          </div>
        )}

        {state.success === false && (
          <p className="text-red py-4">Payment refund failed</p>
        )}
      </Drawer>
    </>
  )
}
// 💡 Кратко, что улучшено:
// Удалён ref.current?.click() и скрытая кнопка.

// startTransition теперь используется только в обработчике кнопки — логично и безопасно.

// toast.success и toast.error обёрнуты логикой hasHandledStatusRef, чтобы не триггерить их повторно.

// Код стал проще и читаемее.

// Если тебе всё же нужно сохранять документ автоматически после возврата, можешь вернуть useForm().submit() в useEffect или просто передать callback наверх.

// Хочешь, могу адаптировать код, если ты всё же хочешь триггерить submit() формы Payload.

// В твоем коде setValue будет после того как отправлю форму и

// Файл не выбранФайл не выбран
// ChatGPT может допускать ошибки. Проверьте важную информацию. См. настройки cookie-файлов.
