import { checkRole } from '@/collections/Users/checkRole'

export const adminsAndOrderedBy = ({ req: { user } }: any) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }

    return {
      'orderedBy.user.id': {
        equals: user.id,
      },
    }
  }

  return true
}
