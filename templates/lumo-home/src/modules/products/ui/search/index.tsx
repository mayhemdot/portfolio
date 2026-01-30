import { createLoader, parseAsString } from 'nuqs/server'
import SearchInputClient from './search'
// import { getPayload } from 'payload'
// import config from '@payload-config'

export const pageSearchParams = {
  query: parseAsString.withDefault('').withOptions({
    shallow: false,
  }),
}

export const loadSearchParams = createLoader(pageSearchParams)

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] }>
}

export async function SearchInput({ searchParams }: Props) {
  console.log(searchParams)
  // const { query } = loadSearchParams(await searchParams)
  // const payload = await getPayload({ config: config })

  // const products = await payload.find({
  //   collection: 'products',
  //   depth: 1,
  //   limit: 12,
  //   pagination: false,
  //   ...(query
  //     ? {
  //         where: {
  //           or: [
  //             {
  //               title: {
  //                 like: query,
  //               },
  //             },
  //             {
  //               'meta.description': {
  //                 like: query,
  //               },
  //             },
  //             {
  //               'meta.title': {
  //                 like: query,
  //               },
  //             },
  //             {
  //               slug: {
  //                 like: query,
  //               },
  //             },
  //           ],
  //         },
  //       }
  //     : {}),
  // })

  return <SearchInputClient />
}
