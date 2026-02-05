// import type {
//   CollectionSlug,
//   Payload,
//   PayloadRequest,
//   File,
//   BasePayload,
//   RequiredDataFromCollectionSlug,
// } from 'payload'
// import { chairTransparent } from './chair-transparent'
// import { chairOrangeTransparent } from './chair-orange-transparent'
// import { tableVioletTransparent } from './table-violet-transparent'
// import { bathVioletTransparent } from './bath-violet-transparent'
// import { lampVioletTransparent } from './lamp-violet-transparent'

// // import { airmax270_black } from './airmax270_black'
// // import { airmaxSC_black } from './airmaxSC_black'
// // import { airmax270_white } from './airmax270_white'
// import { home } from './home'
// import { faq } from './faq-page'
// import { getClientSideURL } from '@/shared/utils/getUrl'
// import { BetterAuthReturn } from 'payload-auth/better-auth'
// import { BetterAuthPlugin } from 'better-auth/types'

// // import { contactForm as contactFormData } from "./contact-form";
// // import { contact as contactPageData } from "./contact-page";
// // import { home } from "./home";

// const collections: CollectionSlug[] = [
//   'categories',
//   'media',
//   'pages',
//   'products',
//   // 'search',
//   'variants',
//   'variantOptions',
//   'variantTypes',
//   // 'carts',
//   // 'forms',
//   // 'form-submissions',
// ]

// const colorVariantOptions = [
//   { label: 'Black', value: 'black' },
//   { label: 'White', value: 'white' },
//   { label: 'Orange', value: 'orange' },
// ]

// // const globals: GlobalSlug[] = ['header', 'footer']
// //
// // Next.js revalidation errors are normal when seeding the database without a server running
// // i.e. running `yarn seed` locally instead of using the admin UI within an active app
// // The app is not running to revalidate the pages and so the API routes are not available
// // These error messages can be ignored: `Error hitting revalidate route for...`
// export const seed = async ({
//   payload,
//   req,
// }: {
//   payload: BasePayload & {
//     betterAuth: BetterAuthReturn<BetterAuthPlugin[]>
//   }
//   req: PayloadRequest
// }): Promise<void> => {
//   payload.logger.info('Seeding database...')

//   // we need to clear the media directory before seeding
//   // as well as the collections and globals
//   // this is because while `yarn seed` drops the database
//   // the custom `/api/seed` endpoint does not
//   payload.logger.info(`— Clearing collections and globals...`)

//   // clear the database
//   //   await Promise.all(
//   //     globals.map((global) =>
//   //       payload.updateGlobal({
//   //         slug: global,
//   //         data: {
//   //           navItems: [],
//   //         },
//   //         depth: 0,
//   //         context: {
//   //           disableRevalidate: true,
//   //         },
//   //       })
//   //     )
//   //   );

//   await Promise.all(
//     collections.map(collection =>
//       payload.db.deleteMany({ collection, req, where: {} }),
//     ),
//   )

//   await Promise.all(
//     collections
//       .filter(collection =>
//         Boolean(payload.collections[collection].config.versions),
//       )
//       .map(collection =>
//         payload.db.deleteVersions({ collection, req, where: {} }),
//       ),
//   )

//   payload.logger.info(`— Seeding demo author and user...`)

//   await payload.delete({
//     collection: 'users',
//     depth: 0,
//     where: {
//       email: {
//         equals: 'mayhemdot@example.com',
//       },
//     },
//   })

//   payload.logger.info(`— Seeding media...`)

//   const [
//     chair_transparent_Buffer,
//     chair_transparent_orange_Buffer,
//     table_transparent_violet_Buffer,
//     bath_transparent_violet_Buffer,
//     lamp_transparent_violet_Buffer,
//   ] = await Promise.all([
//     fetchFileByURL('/images/product_1.jpg'),
//     fetchFileByURL('/images/product_2.jpg'),
//     fetchFileByURL('/images/product_3.jpg'),
//     fetchFileByURL('/images/product_4.jpg'),
//     fetchFileByURL('/images/product_5.jpg'),
//   ])

//   //   const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] =
//   //     await Promise.all([
//   //       fetchFileByURL(
//   //         "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp"
//   //       ),
//   //       fetchFileByURL(
//   //         "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp"
//   //       ),
//   //       fetchFileByURL(
//   //         "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp"
//   //       ),
//   //       fetchFileByURL(
//   //         "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp"
//   //       ),
//   //     ]);

//   // const parentCategory = await payload.create({
//   //   collection: 'categories',
//   //   data: {
//   //     name: 'Shoes',
//   //     slug: 'shoes',
//   //     breadcrumbs: [
//   //       {
//   //         label: 'Shoes',
//   //         url: '/shoes',
//   //       },
//   //     ],
//   //   },
//   // })
//   // image2Doc, image3Doc, imageHomeDoc, image1Doc
//   const [
//     // firstUser,
//     chair_transparent,
//     chair_transparent_orange,
//     table_transparent_violet,
//     bath_transparent_violet,
//     lamp_transparent_orange,
//     tables_category,
//     lamps_category,
//     chairs_category,
//     other_category,
//   ] = await Promise.all([
//     // payload.create({
//     //   collection: 'users',
//     //   data: {
//     //     name: 'mayhemdot',
//     //     email: 'mayhemdot@example.com',
//     //     password: 'password',
//     //   },
//     // }),

//     payload.create({
//       collection: 'media',
//       data: chairTransparent, // TODO: change this
//       file: chair_transparent_Buffer,
//     }),
//     payload.create({
//       collection: 'media',
//       data: chairOrangeTransparent, // TODO: change this
//       file: chair_transparent_orange_Buffer,
//     }),
//     payload.create({
//       collection: 'media',
//       data: tableVioletTransparent, // TODO: change this
//       file: table_transparent_violet_Buffer,
//     }),
//     payload.create({
//       collection: 'media',
//       data: bathVioletTransparent, // TODO: change this
//       file: bath_transparent_violet_Buffer,
//     }),
//     payload.create({
//       collection: 'media',
//       data: lampVioletTransparent, // TODO: change this
//       file: lamp_transparent_violet_Buffer,
//     }),
//     payload.create({
//       collection: 'categories',
//       data: {
//         name: 'Chairs',
//         slug: 'chairs',
//         parent: null, //parentCategory,
//         breadcrumbs: [
//           {
//             label: 'Chairs',
//             url: '/chairs',
//           },
//         ],
//       },
//     }),
//     payload.create({
//       collection: 'categories',
//       data: {
//         name: 'Tables',
//         slug: 'tables',
//         parent: null, //parentCategory,
//         breadcrumbs: [
//           {
//             label: 'Tables',
//             url: '/tables',
//           },
//         ],
//       },
//     }),

//     payload.create({
//       collection: 'categories',
//       data: {
//         name: 'Lamps',
//         slug: 'lamps',
//         parent: null, //parentCategory,
//         breadcrumbs: [
//           {
//             label: 'Lamps',
//             url: '/lamps',
//           },
//         ],
//       },
//     }),
//     payload.create({
//       collection: 'categories',
//       data: {
//         name: 'Others',
//         slug: 'others',
//         parent: null, //parentCategory,
//         breadcrumbs: [
//           {
//             label: 'Others',
//             url: '/others',
//           },
//         ],
//       },
//     }),
//   ])

//   payload.logger.info(`— Seeding variant types and options...`)

//   const colorVariantType = await payload.create({
//     collection: 'variantTypes',
//     data: {
//       name: 'color',
//       label: 'Color',
//     },
//   })

//   const [black, white, orange] = await Promise.all(
//     colorVariantOptions.map(option => {
//       return payload.create({
//         collection: 'variantOptions',
//         data: {
//           ...option,
//           variantType: colorVariantType.id,
//         },
//       })
//     }),
//   )

//   payload.logger.info(`— Seeding products...`)

//   // Do not create posts with `Promise.all` because we want the posts to be created in order
//   // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
//   const [_modernGlassChair, orangeGlassChair] = await Promise.all([
//     payload.create({
//       collection: 'products',
//       depth: 0,
//       context: {
//         disableRevalidate: true,
//       },
//       data: productModernGlassChair({
//         galleryImage: chair_transparent,
//         category: chairs_category,
//         variantTypes: [colorVariantType],
//       }),
//     }),

//     payload.create({
//       collection: 'products',
//       depth: 0,
//       context: {
//         disableRevalidate: true,
//       },
//       data: productOrangeGlassChair({
//         galleryImage: chair_transparent_orange,
//         category: chairs_category,
//         variantTypes: [colorVariantType],
//       }),
//     }),
//     payload.create({
//       collection: 'products',
//       depth: 0,
//       context: {
//         disableRevalidate: true,
//       },
//       data: productVioletGlassTable({
//         galleryImage: table_transparent_violet,
//         category: tables_category,
//         variantTypes: [colorVariantType],
//       }),
//     }),
//     payload.create({
//       collection: 'products',
//       depth: 0,
//       context: {
//         disableRevalidate: true,
//       },
//       data: productVioletGlassBath({
//         galleryImage: bath_transparent_violet,
//         category: other_category,
//         variantTypes: [colorVariantType],
//       }),
//     }),
//     payload.create({
//       collection: 'products',
//       depth: 0,
//       context: {
//         disableRevalidate: true,
//       },
//       data: productOrangeGlassLamp({
//         galleryImage: lamp_transparent_orange,
//         category: lamps_category,
//         variantTypes: [colorVariantType],
//       }),
//     }),
//     // payload.create({
//     //   collection: 'products',
//     //   depth: 0,
//     //   context: {
//     //     disableRevalidate: true,
//     //   },
//     //   data: product5({
//     //     images: [lamp_transparent_violet],
//     //   }),
//     // }),
//   ])
//   payload.logger.info(`— Seeding variants of products...`)

//   await Promise.all([
//     payload.create({
//       collection: 'variants',
//       data: {
//         product: orangeGlassChair,
//         options: [orange.id],
//         price: orangeGlassChair.price,
//         // variantType: colorVariantType.id,
//         // variantOption: black.id,
//         //  _status: 'published',
//       },
//     }),
//     // payload.create({
//     //   collection: 'variants',
//     //   data: {
//     //     product: ,
//     //     variantType: colorVariantType.id,
//     //     variantOption: orange.id,
//     //   },
//     // })
//   ])
//   payload.logger.info(`— Seeding shippings...`)
//   const _shippings = Promise.all([
//     payload.create({
//       collection: 'shippings',
//       depth: 0,
//       context: {
//         disableRevalidate: true,
//       },
//       data: {
//         name: 'Express Shipping',
//         price: 599,
//         slug: 'express',
//       },
//     }),
//     payload.create({
//       collection: 'shippings',
//       depth: 0,
//       context: {
//         disableRevalidate: true,
//       },
//       data: {
//         name: 'Standard Shipping',
//         price: 199,
//         slug: 'standard',
//       },
//     }),
//   ])

//   payload.logger.info(`— Seeding globals...`)
//   payload.logger.info(`— Seeding pages...`)

//   const _pages = await Promise.all([
//     payload.create({
//       collection: 'pages',
//       depth: 0,
//       data: home({}),
//     }),
//     payload.create({
//       collection: 'pages',
//       depth: 0,
//       data: faq(),
//     }),
//   ])

//   payload.logger.info(`— Seeding globals...`)

//   //   await Promise.all([
//   //     payload.updateGlobal({
//   //       slug: "header",
//   //       data: {
//   //         navItems: [
//   //           {
//   //             link: {
//   //               type: "custom",
//   //               label: "Posts",
//   //               url: "/posts",
//   //             },
//   //           },
//   //           {
//   //             link: {
//   //               type: "reference",
//   //               label: "Contact",
//   //               reference: {
//   //                 relationTo: "pages",
//   //                 value: contactPage.id,
//   //               },
//   //             },
//   //           },
//   //         ],
//   //       },
//   //     }),
//   //     payload.updateGlobal({
//   //       slug: "footer",
//   //       data: {
//   //         navItems: [
//   //           {
//   //             link: {
//   //               type: "custom",
//   //               label: "Admin",
//   //               url: "/admin",
//   //             },
//   //           },
//   //           {
//   //             link: {
//   //               type: "custom",
//   //               label: "Source Code",
//   //               newTab: true,
//   //               url: "https://github.com/payloadcms/payload/tree/main/templates/website",
//   //             },
//   //           },
//   //           {
//   //             link: {
//   //               type: "custom",
//   //               label: "Payload",
//   //               newTab: true,
//   //               url: "https://payloadcms.com/",
//   //             },
//   //           },
//   //         ],
//   //       },
//   //     }),
//   //   ]);

//   payload.logger.info('Seeded database successfully!')
// }

// async function fetchFileByURL(url: string): Promise<File> {
//   const res = await fetch(`${getClientSideURL()}${url}`, {
//     credentials: 'include',
//     method: 'GET',
//   })

//   if (!res.ok) {
//     throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
//   }

//   const data = await res.arrayBuffer()

//   return {
//     name: url.split('/').pop() || `file-${Date.now()}`,
//     data: Buffer.from(data),
//     mimetype: `image/${url.split('.').pop()}`,
//     size: data.byteLength,
//   }
// }

// type CreateProductArgs = {
//   galleryImage: Media
//   variantTypes: VariantType[]
//   relatedProducts?: Product[]
//   category?: Category
//   metaImage?: Media
// }

// function productModernGlassChair({
//   galleryImage,
//   category,
// }: CreateProductArgs): RequiredDataFromCollectionSlug<'products'> {
//   return {
//     images: [galleryImage],
//     title: 'Modern glass chair 103',
//     slug: 'modern-glass-chair-103',
//     price: 17900,
//     category: category?.id,
//     meta: {
//       title: 'Modern glass chair 103',
//       description: 'The Modern Glass Chair 103 is a sleek and modern chair.',
//     },
//     // metaImage: null,
//     // heroImage: null,
//   }
// }

// function productOrangeGlassChair({
//   galleryImage,
//   category,
// }: CreateProductArgs): RequiredDataFromCollectionSlug<'products'> {
//   return {
//     images: [galleryImage],
//     title: 'Modern orange glass chair 111',
//     slug: 'modern-orange-glass-chair-104',
//     price: 23000,
//     category: category?.id,
//     meta: {
//       title: 'Modern orange glass chair 111',
//       description:
//         'The Modern Orange Glass Chair 111 is a sleek and modern chair.',
//     },
//     // metaImage: null,
//     // heroImage: null,
//   }
// }
// function productVioletGlassTable({
//   galleryImage,
//   category,
// }: CreateProductArgs): RequiredDataFromCollectionSlug<'products'> {
//   return {
//     images: [galleryImage],
//     title: 'Modern violet glass table 032',
//     slug: 'modern-violet-glass-table-032',
//     price: 23000,
//     category: category?.id,
//     meta: {
//       title: 'Modern violet glass table 032',
//       description:
//         'The Modern Violet Glass Table 032 is a sleek and modern table.',
//     },
//     // metaImage: null,
//     // heroImage: null,
//   }
// }
// function productVioletGlassBath({
//   galleryImage,
//   category,
// }: CreateProductArgs): RequiredDataFromCollectionSlug<'products'> {
//   return {
//     images: [galleryImage],
//     title: 'Modern violet glass bath 132',
//     slug: 'modern-violet-glass-bath-132',
//     price: 93000,
//     category: category?.id,
//     meta: {
//       title: 'Modern violet glass bath 132',
//       description:
//         'The Modern Violet Glass Bath 132 is a sleek and modern table.',
//     },
//     // metaImage: null,
//     // heroImage: null,
//   }
// }
// function productOrangeGlassLamp({
//   galleryImage,
//   category,
// }: CreateProductArgs): RequiredDataFromCollectionSlug<'products'> {
//   return {
//     images: [galleryImage],
//     title: 'Modern orange glass lamp 004',
//     slug: 'modern-orange-glass-lamp-004',
//     price: 11000,
//     category: category?.id,
//     meta: {
//       title: 'Modern orange glass lamp 004',
//       description:
//         'The Modern orange Glass Lamp 004 is a sleek and modern table.',
//     },
//     // metaImage: null,
//     // heroImage: null,
//   }
// }
