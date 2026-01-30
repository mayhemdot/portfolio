'use client'
import {
  Button,
  TextInput,
  toast,
  useField,
  // useDocumentInfo,
  // useForm,
} from '@payloadcms/ui'
import { useActionState, useEffect, useRef, useTransition } from 'react'
import { paybackAction } from '../../actions/paybackAction'
import { Drawer, DrawerToggler } from '@payloadcms/ui'
import { Order } from '@/payload-types'

const drawerSlug = 'my-custom-drawer'

export default function PaybackButtonClient({ order }: { order: Order }) {
  const { setValue } = useField({ path: 'isRefunded' })
  const { setValue: setCancelled } = useField({ path: 'status' })

  const [state, paybackActionHandler, isLoading] = useActionState<any, any>(
    paybackAction,
    {
      success: undefined,
      // status: "" as "succeeded" | "canceled",
      error: null,
    },
  )
  const [isPending, startTransition] = useTransition()
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (state.success === true) {
      toast.success('Payment refunded')
      setValue(true)
      setCancelled('cancelled')

      startTransition(() => {
        try {
          ref.current?.click()
        } catch (err) {
          toast.error('Payment refund failed')
        }
      })
    } else if (state.success === false) {
      toast.error('Payment refund failed')
    }
  }, [state.success])

  const payment = typeof order?.payment === 'object' ? order.payment : undefined

  return (
    <>
      <DrawerToggler
        className={'btn btn--style-secondary btn--size-large'}
        style={{ flexGrow: 1, width: '100%' }}
        slug={drawerSlug}
        disabled={isLoading || isPending}
        slot="button"
      >
        Refund the order payment
        {/* <CircleX className="size-2 top-1/2 r-0 absolute translate-x-1/2 -translate-y-1/2" /> */}
      </DrawerToggler>

      <Drawer slug={drawerSlug}>
        {!payment ? (
          <p className="text-red-600 py-4">{'Payment not found'}</p>
        ) : null}

        {payment && !state.status ? (
          <div>
            <h3>Форма возврата платежа</h3>

            <form>
              <TextInput
                label="Payment Id"
                path={'paymentId'}
                readOnly={true}
                value={payment?.paymentId}
              />
              <TextInput
                label="Amount"
                path={'amount'}
                readOnly={true}
                value={payment?.amount.value}
              />
              <TextInput
                label="Currency"
                path={'currency'}
                readOnly={true}
                value={payment?.amount.currency}
              />
              <TextInput
                label="idempotencyKey"
                path={'idempotencyKey'}
                readOnly={true}
                value={payment?.idempotencyKey || ''}
              />

              <Button
                buttonStyle={'primary'}
                type="button"
                disabled={isLoading}
                size="medium"
                onClick={() =>
                  startTransition(async () => {
                    const formData = new FormData()
                    formData.set('paymentId', payment?.paymentId || '')
                    formData.set('amount', payment?.amount.value || '')
                    formData.set('currency', payment?.amount.currency || '')
                    formData.set(
                      'idempotencyKey',
                      payment?.idempotencyKey || '',
                    )
                    paybackActionHandler(formData)
                  })
                }
                className="w-full"
              >
                Отправить
              </Button>
              <button ref={ref} className="hidden" hidden>
                Save
              </button>
            </form>

            {state?.error && <p className="text-red-600 py-4">{state.error}</p>}
          </div>
        ) : state.status === 'succeeded' ? (
          <p className="text-green-600 py-4">{'Payment refunded'}</p>
        ) : (
          <p className="text-red-600 py-4">{'Payment refund failed'}</p>
        )}
      </Drawer>
    </>
  )
}

//   const toggle = DrawerToggler(drawerSlug);

//   const handleClick = async (id: string | number | undefined) => {
//     if (!id) return;

//     const formData = new FormData();
//     formData.set("id", String(id));
//     await paybackActionHandler(formData);
//   };

//   const formMethods = useForm();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//     setValue,
//     getValues,
//   } = formMethods;
// '{
//         "amount": {
//           "value": "2.00",
//           "currency": "RUB"
//         },
//         "payment_id": "21740069-000f-50be-b000-0486ffbf45b0"
//       }'
