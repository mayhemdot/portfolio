// import { CollectionConfig } from 'payload'

// export const Accounts: CollectionConfig = {
//   slug: 'accounts',
//   admin: {
//     useAsTitle: 'accountId',
//   },
//   fields: [
//     {
//       name: 'accountId',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'providerId',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'userId',
//       type: 'relationship',
//       relationTo: 'users', // предполагаем, что есть коллекция users
//       required: true,
//     },
//     {
//       name: 'accessToken',
//       type: 'text',
//     },
//     {
//       name: 'refreshToken',
//       type: 'text',
//     },
//     {
//       name: 'idToken',
//       type: 'text',
//     },
//     {
//       name: 'accessTokenExpiresAt',
//       type: 'date',
//     },
//     {
//       name: 'refreshTokenExpiresAt',
//       type: 'date',
//     },
//     {
//       name: 'scope',
//       type: 'text',
//     },
//     {
//       name: 'password',
//       type: 'text',
//       admin: {
//         readOnly: true,
//       },
//     },
//   ],
//   custom: {
//     betterAuthFieldKeys: {
//       accountId: 'accountId',
//       providerId: 'providerId',
//       userId: 'userId',
//       accessToken: 'accessToken',
//       refreshToken: 'refreshToken',
//       idToken: 'idToken',
//       accessTokenExpiresAt: 'accessTokenExpiresAt',
//       refreshTokenExpiresAt: 'refreshTokenExpiresAt',
//       scope: 'scope',
//       password: 'password',
//       createdAt: 'createdAt',
//       updatedAt: 'updatedAt',
//     },
//   },
//   timestamps: true, // создаст createdAt и updatedAt
// }
