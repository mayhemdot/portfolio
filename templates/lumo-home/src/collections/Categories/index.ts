import { slugField } from '@/shared/fields/slug'
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    group: 'Products',
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // если стоит false или сложная логика, category не загрузится
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
    },
    ...slugField(),
  ],
}
