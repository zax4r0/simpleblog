import { stringArg, extendType } from 'nexus'
import { Context } from '../../utils/context'

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('users', {
      type: 'User',
      args: {
        id: stringArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user.findUnique({
          where: { id: args.id || undefined },
        })
      },
    })
  },
})
