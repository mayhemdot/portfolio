// import type { CollectionConfig } from 'payload'
// import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
// import { admins } from '@/shared/access/admins'
// import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'
// import { UsersAccounts } from './accounts'
// import { ownerOrAdmin } from '@/shared/access/ownerOrAdmin'
// import { withUsersCollection } from 'payload-auth-plugin/collection'

// export const Users: CollectionConfig = withUsersCollection({
//   slug: 'appUsers',
//   // auth: {
//   //   verify: true,
//   // },
//   admin: {
//     useAsTitle: 'email',
//   },
//   hooks: {
//     afterDelete: [deleteLinkedAccounts(UsersAccounts.slug)],
//   },
//   access: {
//     create: () => true, // Allow anyone to create users (for registration)
//     read: () => true, // Allow reading user data
//     update: ownerOrAdmin,
//     delete: ownerOrAdmin,
//   },
//   fields: [
//     {
//       label: 'Email',
//       name: 'email',
//       type: 'email',
//       required: true,
//     },
//     {
//       label: 'Name',
//       name: 'name',
//       type: 'text',
//       required: false,
//     },
//     {
//       name: 'avatar',
//       type: 'upload',
//       relationTo: 'media',
//       required: false,
//       admin: {
//         position: 'sidebar',
//       },
//     },
//     {
//       name: 'phone',
//       type: 'text',
//       required: false,
//     },
//     {
//       name: 'roles',
//       type: 'select',
//       hasMany: true,
//       defaultValue: ['customer'],
//       options: [
//         {
//           label: 'admin',
//           value: 'admin',
//         },
//         {
//           label: 'customer',
//           value: 'customer',
//         },
//       ],
//       hooks: {
//         beforeChange: [ensureFirstUserIsAdmin],
//       },
//       access: {
//         read: () => true, //adminsAndOrderedBy
//         create: admins,
//         update: admins,
//       },
//       admin: {
//         position: 'sidebar',
//       },
//     },
//     {
//       label: 'Purchases',
//       name: 'purchases',
//       type: 'relationship',
//       relationTo: 'products',
//       hasMany: true,
//     },
//     {
//       label: 'Orders',
//       name: 'orders',
//       type: 'join',
//       collection: 'orders',
//       on: 'orderedBy.user',
//       hasMany: true,
//     },
//     {
//       label: 'Cart',
//       name: 'cart',
//       type: 'group',
//       fields: [
//         {
//           name: 'items',
//           label: 'Items',
//           type: 'array',
//           fields: [
//             {
//               name: 'product',
//               type: 'relationship',
//               relationTo: 'products',
//             },
//             {
//               name: 'quantity',
//               type: 'number',
//               min: 1,
//               admin: {
//                 step: 1,
//               },
//             },
//           ],
//         },
//         // If you wanted to maintain a 'created on'
//         // or 'last modified' date for the cart
//         // you could do so here:
//         // {
//         //   name: 'createdOn',
//         //   label: 'Created On',
//         //   type: 'date',
//         //   admin: {
//         //     readOnly: true
//         //   }
//         // },
//         // {
//         //   name: 'lastModified',
//         //   label: 'Last Modified',
//         //   type: 'date',
//         //   admin: {
//         //     readOnly: true
//         //   }
//         // },
//       ],
//     },
//     // Email added by default
//     // Add more fields as needed
//   ],
// })
