import { checkRole } from '@/collections/Users/checkRole'
import { Access } from 'payload'

export const ownerOrAdmin: Access = ({ req: { user } }) => {
  if (checkRole(['admin'], user as any)) {
    return true
  }
  // Allow users to delete their own account
  if (user) {
    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}
