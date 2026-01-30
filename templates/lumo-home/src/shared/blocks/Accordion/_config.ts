// import type { Block } from 'payload'

// import {
//   FixedToolbarFeature,
//   HeadingFeature,
//   InlineToolbarFeature,
//   lexicalEditor,
// } from '@payloadcms/Text-lexical'

// export const Accordion: Block = {
//   slug: 'accordion',
//   interfaceName: 'AccordionBlock',
//   fields: [
//     // {
//     //   name: "title",
//     //   type: "text",
//     //   required: true,
//     // },

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
//       name: 'items',
//       type: 'array',
//       // defaultValue: "collection",
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           required: true,
//         },
//         {
//           name: 'content',
//           type: 'Text',
//           editor: lexicalEditor({
//             features: ({ rootFeatures }) => {
//               return [
//                 ...rootFeatures,
//                 HeadingFeature({
//                   enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
//                 }),
//                 FixedToolbarFeature(),
//                 InlineToolbarFeature(),
//               ]
//             },
//           }),
//         },
//       ],
//     },
//   ],
//   labels: {
//     plural: 'Accordions',
//     singular: 'Accordion',
//   },
// }
