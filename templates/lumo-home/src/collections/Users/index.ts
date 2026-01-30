// import type { CollectionConfig } from 'payload'
// import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'
// import { Accounts } from './accounts'
// import { ensureFirstUserIsAdmin } from '@/collections/Users/hooks/ensureFirstUserIsAdmin'
// import { admins } from '@/shared/access/admins'
// import { checkRole } from '@/collections/Users/checkRole'
// import { adminOrSelf } from '@/shared/access/adminOrSelf'

// export const Users: CollectionConfig = {
//   slug: 'users',
//   access: {
//     admin: ({ req: { user } }) => checkRole(['admin'], user!),
//     create: () => true,
//     read: adminOrSelf,
//     update: adminOrSelf,
//     delete: admins,
//   },
//   admin: {
//     group: 'Users',
//     defaultColumns: ['name', 'email', 'roles'],
//     useAsTitle: 'email',
//   },
//   defaultPopulate: {
//     avatar: true,
//   },
//   fields: [
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
//       name: 'roles',
//       type: 'select',
//       hasMany: true,
//       defaultValue: ['admin'],
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
//         read: () => true,
//         create: ({ req }) => admins({ req }),
//         update: ({ req }) => admins({ req }),
//       },
//       admin: {
//         position: 'sidebar',
//       },
//     },
//     {
//       name: 'cart',
//       type: 'join',
//       collection: 'carts',
//       on: 'user',
//       admin: {
//         allowCreate: false,
//         defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
//       },
//     },

//     // {
//     //   name: 'phone',
//     //   type: 'text',
//     //   required: false,
//     // },
//     // {
//     //   label: 'Purchases',
//     //   name: 'purchases',
//     //   type: 'relationship',
//     //   relationTo: 'products',
//     //   hasMany: true,
//     // },
//     // {
//     //   label: 'Orders',
//     //   name: 'orders',
//     //   type: 'join',
//     //   collection: 'orders',
//     //   on: 'orderedBy.user',
//     //   hasMany: true,
//     // },
//     // {
//     //   label: 'Cart',
//     //   name: 'cart',
//     //   type: 'group',
//     //   fields: [
//     //     {
//     //       name: 'items',
//     //       label: 'Items',
//     //       type: 'array',
//     //       fields: [
//     //         {
//     //           name: 'product',
//     //           type: 'relationship',
//     //           relationTo: 'products',
//     //         },
//     //         {
//     //           name: 'quantity',
//     //           type: 'number',
//     //           min: 1,
//     //           admin: {
//     //             step: 1,
//     //           },
//     //         },
//     //       ],
//     //     },
//     //     // If you wanted to maintain a 'created on'
//     //     // or 'last modified' date for the cart
//     //     // you could do so here:
//     //     // {
//     //     //   name: 'createdOn',
//     //     //   label: 'Created On',
//     //     //   type: 'date',
//     //     //   admin: {
//     //     //     readOnly: true
//     //     //   }
//     //     // },
//     //     // {
//     //     //   name: 'lastModified',
//     //     //   label: 'Last Modified',
//     //     //   type: 'date',
//     //     //   admin: {
//     //     //     readOnly: true
//     //     //   }
//     //     // },
//     //   ],
//     // },
//     // Email added by default
//     // Add more fields as needed
//   ],
//   timestamps: true,
//   hooks: {
//     afterDelete: [deleteLinkedAccounts(Accounts.slug)],
//   },
// }
