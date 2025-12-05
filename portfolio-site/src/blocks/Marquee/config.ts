import { Block } from 'payload'

export const Marquee: Block = {
  slug: 'marquee',
  interfaceName: 'MarqueeBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
