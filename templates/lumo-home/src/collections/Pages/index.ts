// import type { CollectionConfig } from 'payload'
// import { authenticated } from '@/shared/access/authenticated'
// import { authenticatedOrPublished } from '@/shared/access/authenticatedOrPublished'
// import { CallToAction } from '@/shared/blocks/CallToAction/config'
// import { slugField } from '@/shared/fields/slug'
// import { populatePublishedAt } from './hooks/populatePublishedAt'
// import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
// import {
//   MetaDescriptionField,
//   MetaImageField,
//   MetaTitleField,
//   OverviewField,
//   PreviewField,
// } from '@payloadcms/plugin-seo/fields'
// import { MediaBlock } from '@/shared/blocks/MediaBlock/config'
// import { Banner } from '@/shared/blocks/Banner/config'
// import { hero } from '@/shared/blocks/Heros/config'
// import { Accordion } from '@/shared/blocks/Accordion/_config'
// import { generatePreviewPath } from '@/shared/utils/generatePreviewPath'
// import { Archive } from '@/shared/blocks/ArchiveBlock/config'
// import { Slider } from '@/shared/blocks/SliderBlock/config'
// import { Promo } from '@/shared/blocks/PromoBlock/config'
// import { FormBlock } from '@/shared/blocks/Form/config'

// export const Pages: CollectionConfig<'pages'> = {
//   slug: 'pages',
//   access: {
//     create: authenticated,
//     delete: authenticated,
//     read: authenticatedOrPublished,
//     update: authenticated,
//   },
//   // This config controls what's populated by default when a page is referenced
//   // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
//   // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
//   defaultPopulate: {
//     title: true,
//     slug: true,
//   },
//   admin: {
//     defaultColumns: ['title', 'slug', 'updatedAt'],
//     livePreview: {
//       url: ({ data, req }) => {
//         const path = generatePreviewPath({
//           slug: typeof data?.slug === 'string' ? data.slug : '',
//           collection: 'pages',
//           req,
//         })

//         return path
//       },
//     },
//     preview: (data, { req }) =>
//       generatePreviewPath({
//         slug: typeof data?.slug === 'string' ? data.slug : '',
//         collection: 'pages',
//         req,
//       }),
//     useAsTitle: 'title',
//   },
//   fields: [
//     {
//       name: 'title',
//       type: 'text',
//       required: true,
//     },
//     {
//       type: 'tabs',
//       tabs: [
//         {
//           fields: [hero],
//           label: 'Hero',
//         },
//         {
//           fields: [
//             {
//               name: 'layout',
//               type: 'blocks',
//               blocks: [
//                 CallToAction,
//                 MediaBlock,
//                 Banner,
//                 Accordion,
//                 Archive,
//                 Slider,
//                 Promo,
//                 FormBlock,
//               ], //Content, // Archive, FormBlock
//               required: true,
//               admin: {
//                 initCollapsed: true,
//               },
//             },
//           ],
//           label: 'Content',
//         },
//         {
//           name: 'meta',
//           label: 'SEO',
//           fields: [
//             OverviewField({
//               titlePath: 'meta.title',
//               descriptionPath: 'meta.description',
//               imagePath: 'meta.image',
//             }),
//             MetaTitleField({
//               hasGenerateFn: true,
//             }),
//             MetaImageField({
//               relationTo: 'media',
//             }),
//             MetaDescriptionField({}),
//             PreviewField({
//               // if the `generateUrl` function is configured
//               hasGenerateFn: true,
//               // field paths to match the target field for data
//               titlePath: 'meta.title',
//               descriptionPath: 'meta.description',
//             }),
//           ],
//         },
//       ],
//     },
//     {
//       name: 'publishedAt',
//       type: 'date',
//       admin: {
//         position: 'sidebar',
//       },
//     },
//     ...slugField(),
//   ],
//   hooks: {
//     afterChange: [revalidatePage],
//     beforeChange: [populatePublishedAt],
//     afterDelete: [revalidateDelete],
//   },
//   versions: {
//     drafts: {
//       autosave: {
//         interval: 100, // We set this interval for optimal live preview
//       },
//       schedulePublish: true,
//     },
//     maxPerDoc: 50,
//   },
// }
