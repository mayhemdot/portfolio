'use client'
import { Button } from '@/shared/components/ui/button'
import { cancelOrderAction } from '../actions/cancelOrderAction'
import { useActionState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@payloadcms/ui'
import { cn } from '@/shared/lib/utils'

export function CancelActionButton({
  id,
  className,
}: {
  id: string | number | undefined
  className?: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [state, cancelOrderHandler, isLoading] = useActionState<any, any>(
    cancelOrderAction,
    {
      success: null,
      status: 'pending',
      error: null,
    },
  )

  useEffect(() => {
    if (state?.success === true) {
      toast.success('Заказ успешно отменен')
      router.refresh()
    } else if (state?.success === false) {
      toast.error('Ошибка при отмене заказа')
      router.refresh()
    }
  }, [state?.status])
  //   const cancelOrderHandlerDebounced = useDebouncedCallback(
  //     cancelOrderHandler,
  //     1000
  //   );
  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => startTransition(async () => cancelOrderHandler(id))}
        disabled={isLoading || isPending}
        className={cn(
          'text-red-600 hover:text-red-700 bg-transparent',
          className,
        )}
      >
        Отменить заказ
      </Button>
      {state?.error && <p className="text-red-600 py-4">{state.error}</p>}
    </div>
  )
}
