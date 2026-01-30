import { getPayload } from 'payload'
import config from '@payload-config'
import PaybackButtonClient from './PaybackButtonClient'

export default async function PaybackButton(props: any) {
  const { id } = props

  if (!id) {
    return (
      <span>
        "OrderId" is required. The button should only be available when editing
        an existing order and not during order creation.
      </span>
    )
  }

  const payload = await getPayload({ config })

  const order = await payload.findByID({
    collection: 'orders',
    id: Number(id),
    depth: 2,
  })

  return <PaybackButtonClient order={order} label={props?.label} />
}
