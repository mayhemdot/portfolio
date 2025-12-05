import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
// import { populateAuthors } from './hooks/populateAuthors'
// import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'
// projects
export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    year: true,
    gallery: true,
    // meta: {
    //   image: true,
    //   description: true,
    // },
  },
  admin: {
    defaultColumns: ['title', 'year', 'gallery'],
    // livePreview: {
    //   url: ({ data, req }) =>
    //     generatePreviewPath({
    //       slug: data?.slug,
    //       collection: 'projects',
    //       req,
    //     }),
    // },
    // preview: (data, { req }) =>
    //   generatePreviewPath({
    //     slug: data?.slug as string,
    //     collection: 'projects',
    //     req,
    //   }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'mediaItem',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
