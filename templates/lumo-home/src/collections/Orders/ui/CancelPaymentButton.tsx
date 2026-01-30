'use client'
import { Button, toast, useDocumentInfo, useField } from '@payloadcms/ui'
import { useActionState, useEffect, useRef, useTransition } from 'react'
import { cancelPaymentAction } from '../actions/cancelPaymentAction'
import { useRouter } from 'next/navigation'

export default function CancelPaymentButton() {
  const { setValue: setCancelled } = useField({ path: 'status' })
  const [isPending, startTransition] = useTransition()
  const { id } = useDocumentInfo()
  const router = useRouter()
  const hasHandledStatusRef = useRef(false)

  const [state, capturePaymentHandler, isLoading] = useActionState<
    {
      success?: boolean
      error?: string | null
    },
    any
  >(cancelPaymentAction, {
    success: undefined,
    error: null,
  })

  useEffect(() => {
    if (hasHandledStatusRef.current) return

    if (state.success === true) {
      toast.success('Payment cancelled')
      setCancelled('cancelled')
      hasHandledStatusRef.current = true
      router.refresh()
    } else if (state.success === false) {
      toast.error('Payment refund failed')
      hasHandledStatusRef.current = true
    }
  }, [state.success, setCancelled])
  // const cancelPaymentDebounced = useDebouncedCallback(
  //   (id: any) => startTransition(async () => capturePaymentHandler(id)),
  //   1000
  // );

  return (
    <span style={{ padding: '0px 8px', marginLeft: 'auto' }}>
      <Button
        type="submit"
        buttonStyle={'secondary'}
        onClick={() => startTransition(async () => capturePaymentHandler(id))}
        disabled={isLoading || isPending}
      >
        Cancel the order payment
      </Button>
      {state?.error && <p className="text-red-600 py-4">{state.error}</p>}
    </span>
  )
}

// "use client";
// import { Button, useDocumentInfo, useField } from "@payloadcms/ui";
// import { useActionState } from "react";
// import { confirmOrderAction } from "../actions/cancelPaymentAction";

// export default function ConfirmOrderButton() {
//   const { id } = useDocumentInfo();

//   const [state, confirmAction, isLoading] = useActionState(confirmOrderAction, {
//     error: null,
//   });
//   const handleClick = (id: string | number | undefined) => confirmAction(id);

//   return (
//     <span style={{ padding: "0px 8px" }}>
//       <Button
//         type="submit"
//         buttonStyle="primary"
//         onClick={() => handleClick(id)}
//         disabled={isLoading}
//         className="w-full"
//       >
//         Confirm the order payment
//       </Button>
//       {state?.error && <p className="text-red-600 py-4">{state.error}</p>}
//     </span>
//   );
// }
