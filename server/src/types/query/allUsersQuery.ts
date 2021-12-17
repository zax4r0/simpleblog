import { extendType } from 'nexus'
import { Context } from '../../utils/context'

export const AllUsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany()
      },
    })
  },
})
