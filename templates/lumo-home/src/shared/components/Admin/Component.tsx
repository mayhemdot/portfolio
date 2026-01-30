import { Gutter, Banner } from '@payloadcms/ui'
import { getPayload } from 'payload'
import type { AdminViewServerProps } from 'payload'
import config from '@payload-config'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { ActiveOrdersClient } from './client'

export default async function ActiveOrders({
  initPageResult,
  params,
  searchParams,
}: AdminViewServerProps) {
  const payload = await getPayload({ config: config })

  const { docs } = await payload.find({
    collection: 'orders',
    depth: 0,
    limit: 100,
  })
  const actives = docs?.filter(
    item => item.status !== 'shipped' && item.status !== 'cancelled',
  )

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <div>
        <Gutter>
          <Banner>Active Orders</Banner>
        </Gutter>

        <Gutter>
          <ActiveOrdersClient actives={actives} />
        </Gutter>
      </div>
    </DefaultTemplate>
  )
}
