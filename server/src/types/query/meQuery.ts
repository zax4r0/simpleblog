import { extendType } from 'nexus'
import { Context } from '../../utils/context'
import { getUserId } from '../../utils/getUserById'

export const MeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('me', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        const userId = getUserId(context)
        console.log(userId)
        return context.prisma.user.findUnique({
          where: {
            id: String(userId),
          },
        })
      },
    })
  },
})
