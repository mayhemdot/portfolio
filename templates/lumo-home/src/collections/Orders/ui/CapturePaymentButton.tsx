'use client'
import { Button, toast, useDocumentInfo, useField } from '@payloadcms/ui'
import { useTransition, useActionState, useEffect, useRef } from 'react'
import { capturePaymentAction } from '../actions/capturePaymentAction'
import { useRouter } from 'next/navigation'

export default function CapturePaymentButton() {
  const router = useRouter()
  const { id } = useDocumentInfo()
  const [isPending, startTransition] = useTransition()
  const { setValue: setCancelled } = useField({ path: 'status' })

  const [state, capturePaymentHandler, isLoading] = useActionState<
    {
      success?: boolean
      error?: string | null
    },
    any
  >(capturePaymentAction, {
    success: undefined,
    error: null,
  })
  const hasHandledStatusRef = useRef(false)

  useEffect(() => {
    if (hasHandledStatusRef.current) return

    if (state.success === true) {
      toast.success('Payment captured')
      setCancelled('paid')
      hasHandledStatusRef.current = true
      router.refresh()
    } else if (state.success === false) {
      toast.error('Payment refund failed')
      hasHandledStatusRef.current = true
    }
  }, [state.success, setCancelled])
  // const capturePaymentDebounced = useDebouncedCallback(
  //   (id) => startTransition(async () => capturePaymentHandler(id)),
  //   1000
  // );

  return (
    <span style={{ padding: '0px 8px' }}>
      <Button
        type="submit"
        buttonStyle={'primary'}
        onClick={() => startTransition(async () => capturePaymentHandler(id))}
        disabled={isLoading || isPending}
        className="w-full"
      >
        Capture the order payment
      </Button>
      {state?.error && <p className="text-red-600 py-4">{state.error}</p>}
    </span>
  )
}
