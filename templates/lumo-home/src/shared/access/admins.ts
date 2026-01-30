import { checkRole } from '@/collections/Users/checkRole'
import { User } from '@/payload-types'
import { Access, AccessArgs } from 'payload'

type isAdmin = (args: AccessArgs<User>) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
  return checkRole(['admin'], user!)
}

export const userIsAdmin = ({ user }: { user?: User | null }) => {
  if (!user) return false

  return checkRole(['admin'], user!)
}
