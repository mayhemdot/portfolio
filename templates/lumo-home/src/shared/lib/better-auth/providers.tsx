// 'use client'

// import type { TypedUser } from 'payload'
// import { createContext, useContext, ReactNode } from 'react'
// import { Session } from '@/shared/lib/better-auth/client'
// import { Account, DeviceSession } from '@/shared/lib/better-auth/types'

// type UserContextType = {
//   sessionPromise: Promise<Session | null>
//   userAccountsPromise: Promise<Account[] | null>
//   deviceSessionsPromise: Promise<DeviceSession[] | null>
//   currentUserPromise: Promise<TypedUser | null>
// }

// const BetterAuthContext = createContext<UserContextType | null>(null)

// export function useBetterAuth(): UserContextType {
//   const context = useContext(BetterAuthContext)
//   if (context === null) {
//     throw new Error('useBetterAuth must be used within a BetterAuthProvider')
//   }
//   return context
// }

// export function BetterAuthProvider({
//   children,
//   sessionPromise,
//   userAccountsPromise,
//   deviceSessionsPromise,
//   currentUserPromise,
// }: {
//   children: ReactNode
//   sessionPromise: Promise<Session | null>
//   userAccountsPromise: Promise<Account[] | null>
//   deviceSessionsPromise: Promise<DeviceSession[] | null>
//   currentUserPromise: Promise<TypedUser | null>
// }) {
//   return (
//     <BetterAuthContext.Provider
//       value={{
//         sessionPromise,
//         userAccountsPromise,
//         deviceSessionsPromise,
//         currentUserPromise,
//       }}
//     >
//       {children}
//     </BetterAuthContext.Provider>
//   )
// }
