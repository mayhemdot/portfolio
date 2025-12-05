import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const AboutUs: Block = {
  slug: 'aboutUs',
  interfaceName: 'AboutUs',
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Title',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Description',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'richText',
          editor: lexicalEditor({
            // features: ({ rootFeatures }) => {
            //   return [
            //     ...rootFeatures,
            //     HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            //     FixedToolbarFeature(),
            //     InlineToolbarFeature(),
            //   ]
            // },
          }),
          label: 'Feature',
        },
      ],
    },
    // {
    //   name: 'description',
    //   type: 'text',
    //   required: true,
    // },
  ],
}
