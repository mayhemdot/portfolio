// import { CollectionConfig } from 'payload'
// import { mapPaymentStatusToOrderStatus } from '../Orders/helpers/mapPaymentStatusToOrderStatus'
// import { Payment } from '@/payload-types'
// import { formatPrice } from '@/shared/utils/formatPrice'

// export const Payments: CollectionConfig = {
//   slug: 'payments',
//   admin: {
//     useAsTitle: 'paymentId',
//     defaultColumns: ['paymentLabel', 'paid', 'createdAt'],
//   },
//   fields: [
//     {
//       label: 'Payment Label',
//       name: 'paymentLabel',
//       type: 'text',
//       admin: {
//         // hidden: true,
//         readOnly: true,
//       },
//       hooks: {
//         beforeChange: [
//           ({ siblingData }) => {
//             // ensures data is not stored in DB
//             delete siblingData['paymentLabel']
//           },
//         ],
//         afterRead: [
//           ({ data }: any) => {
//             return `${data.createdAt} | ${data?.paymentId} | ${data?.status}`
//           },
//         ],
//       },
//     },
//     {
//       label: 'Payment ID',
//       name: 'paymentId',
//       type: 'text',
//       required: true,
//       admin: {
//         readOnly: true,
//       },
//     },
//     {
//       label: 'Payment Status',
//       name: 'status',
//       type: 'select',
//       options: ['pending', 'succeeded', 'canceled', 'waiting_for_capture'],
//       required: true,
//     },
//     {
//       label: 'Idempotency Key',
//       name: 'idempotencyKey',
//       type: 'text',
//       // required: true,
//     },
//     {
//       name: 'paid',
//       type: 'checkbox',
//       required: true,
//       defaultValue: false,
//     },
//     {
//       name: 'amount',
//       type: 'group',
//       fields: [
//         {
//           name: 'value',
//           type: 'text', // Or type: 'number' if you'd rather store it as a float
//           required: true,
//         },
//         {
//           name: 'currency',
//           type: 'text',
//           required: true,
//         },
//       ],
//     },
//     {
//       name: 'confirmation',
//       type: 'group',
//       fields: [
//         {
//           name: 'type',
//           type: 'text',
//           required: true,
//         },
//         {
//           name: 'confirmation_url',
//           type: 'text',
//           required: true,
//         },
//       ],
//     },
//     {
//       name: 'startedAt',
//       type: 'date',
//       required: true,
//     },
//     {
//       name: 'description',
//       type: 'text',
//     },
//     {
//       name: 'metadata',
//       type: 'json',
//     },
//     {
//       name: 'recipient',
//       type: 'group',
//       fields: [
//         {
//           name: 'account_id',
//           type: 'text',
//           required: false,
//         },
//         {
//           name: 'gateway_id',
//           type: 'text',
//           required: true,
//         },
//       ],
//     },
//     {
//       name: 'refundable',
//       type: 'checkbox',
//       required: true,
//       defaultValue: false,
//     },
//     {
//       name: 'test',
//       type: 'checkbox',
//       required: true,
//       defaultValue: false,
//     },
//     {
//       name: 'order',
//       type: 'relationship',
//       relationTo: 'orders',
//       admin: {
//         readOnly: true,
//       },
//     },
//   ],
// }
