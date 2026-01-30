import { adminOrSelf } from '@/shared/access/adminOrSelf'
import { admins } from '@/shared/access/admins'
import { anyone } from '@/shared/access/anyone'
import type { CollectionConfig } from 'payload'

export const Carts: CollectionConfig = {
  slug: 'carts',
  admin: {
    useAsTitle: 'user',
  },
  access: {
    read: adminOrSelf,
    update: adminOrSelf,
    create: anyone,
    delete: admins,
  },
  timestamps: true,
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'purchasedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'subtotal',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
        },
        {
          name: 'variant',
          type: 'relationship',
          relationTo: 'variants',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
}
