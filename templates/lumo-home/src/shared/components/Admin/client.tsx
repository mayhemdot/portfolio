'use client'
import { Card, Link, Button } from '@payloadcms/ui'
import { cancelOrderOrRefundAction } from './actions'
import { useActionState, useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Order } from '@/payload-types'
import toast from 'react-hot-toast'

export function ActiveOrdersClient({ actives }: { actives: Order[] }) {
  const [state, action, isLoading] = useActionState(cancelOrderOrRefundAction, {
    error: null,
  })
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <div className="dashboard__card-list">
      {actives?.map(order => (
        <Card
          key={order.id}
          title={String(order.id)}
          buttonAriaLabel="Orders"
          href={`/admin/collections/orders/${order.id}`}
          actions={[
            <form action={action} key="cancel-order-form">
              <Button key="cancel-order" type="submit">
                Cancel
                {isLoading ? (
                  <Loader className="size-3 animate-spin mr-2" />
                ) : null}
              </Button>
            </form>,
            <Link
              key="see-order"
              href={`/admin/collections/orders/${order.id}`}
            >
              View order
            </Link>,
          ]}
        />
      ))}
    </div>
  )
}
