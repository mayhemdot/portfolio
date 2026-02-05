// import {
//   FixedToolbarFeature,
//   HeadingFeature,
//   InlineToolbarFeature,
//   lexicalEditor,
// } from '@payloadcms/Text-lexical'
// import type { Block } from 'payload'

// export const MediaBlock: Block = {
//   slug: 'mediaBlock',
//   interfaceName: 'MediaBlock',
//   fields: [
//     {
//       name: 'introContent',
//       type: 'Text',
//       editor: lexicalEditor({
//         features: ({ rootFeatures }) => {
//           return [
//             ...rootFeatures,
//             HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
//             FixedToolbarFeature(),
//             InlineToolbarFeature(),
//           ]
//         },
//       }),
//       label: 'Intro Content',
//     },
//     {
//       name: 'description',
//       type: 'Text',
//       editor: lexicalEditor({
//         features: ({ rootFeatures }) => {
//           return [
//             ...rootFeatures,
//             HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
//             FixedToolbarFeature(),
//             InlineToolbarFeature(),
//           ]
//         },
//       }),
//       label: 'Intro Content',
//     },
//     {
//       name: 'media',
//       type: 'upload',
//       relationTo: 'media',
//       required: true,
//     },
//   ],
// }
