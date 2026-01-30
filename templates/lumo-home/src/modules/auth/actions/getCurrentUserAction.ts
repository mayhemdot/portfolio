// import { getPayload } from '@/shared/lib/better-auth/payload'
// import { getSession } from '@/modules/auth/queries/getSession'
// import { redirect } from 'next/navigation'

// type Props = {
//   depth: number
//   redirectUrl?: string | null
// }

// export async function getCurrentUserAction({
//   depth = 2,
//   redirectUrl = '/login',
// }: Props) {
//   const payload = await getPayload()
//   const session = await getSession(payload)

//   if (!session?.user && redirectUrl) {
//     redirect(redirectUrl)
//   }

//   if (session?.user) {
//     try {
//       const user = await payload.findByID({
//         collection: 'users',
//         id: session.user.id,
//         depth,
//       })
//       return user
//     } catch (error: unknown) {
//       console.error(error)
//       if (redirectUrl) {
//         redirect(redirectUrl)
//       }
//     }
//   }
//   return null
// }
