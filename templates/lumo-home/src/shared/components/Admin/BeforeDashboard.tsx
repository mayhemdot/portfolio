import { Card, Button } from '@payloadcms/ui'
import { Payload } from 'payload'
import { stringify } from 'qs-esm'
import { SeedButton } from './SeedButton'
import { User } from '@/payload-types'

type Props = {
  user: User
  payload: Payload
}

export default async function BeforeDashboard({ payload }: Props) {
  const query = {
    where: {
      and: [
        {
          status: {
            not_equals: 'shipped',
          },
        },
        {
          status: {
            not_equals: 'cancelled',
          },
        },
      ],
    },
  }

  const { docs } = await payload.find({
    collection: 'orders',
    depth: 0,
    where: query.where,
    limit: 100,
  })

  const queryString = stringify(query, { addQueryPrefix: true })
  return (
    <>
      <SeedButton />
      <Card
        title="Active Orders"
        buttonAriaLabel="Active Orders"
        href={`/admin/collections/orders${queryString}`}
        actions={[
          // <Link href="/orders" title="Orders" icon={<UserIcon />} />
          // <Link key="see-all" href="/admin/collections/orders">
          //   View all
          // </Link>,
          <Button
            key={'active-orders'}
            size="medium"
            buttonStyle="primary"
            disabled={true}
            round={true}
          >
            <span>Actives:</span>
            <span>{docs?.length || 0}</span>
          </Button>,
        ]}
      />
    </>
  )
}
