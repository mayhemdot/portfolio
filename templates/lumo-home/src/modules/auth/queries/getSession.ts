// import { headers as getHeaders } from "next/headers";
// import { getPayload } from "@/shared/lib/better-auth/payload";
// import { BasePayload } from 'payload'
// import type { BetterAuthReturn } from 'payload-auth/better-auth'
// import { BetterAuthPlugin } from 'better-auth/types'

// export async function getUserFromSession(): Promise<User | undefined> {
//   const headers = await getHeaders()
//   const session = (await appAuthClient.getSession({ headers })) as {
//     data: { user: User | undefined }
//     isError: boolean
//   }

//   return session?.data?.user
// }

// export async function getSession(
//   payload?: BasePayload & {
//     betterAuth: BetterAuthReturn<BetterAuthPlugin[]>
//   },
// ) {
//   const headers = await getHeaders()

//   if (!payload) {
//     payload = await getPayload()
//   }

//   if (!payload.betterAuth) {
//     return null
//   }
//   const session = await payload.betterAuth.api.getSession({
//     headers,
//   })
//   return session
// }
