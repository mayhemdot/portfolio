export function whereQ({ userId, query }: { userId: number; query?: string }) {
  return {
    and: [
      {
        'orderedBy.user': {
          equals: userId,
        },
      },
      {
        ...(query
          ? {
              or: [
                // {
                //   id: {
                //     equals: Number(query),
                //   },
                // },
                // {
                //   status: {
                //     equals: query as any,
                //   },
                // },
                {
                  'items.product.title': {
                    like: `%${query}%`,
                  },
                },
              ],
            }
          : {}),
      },
    ],
  }
}
