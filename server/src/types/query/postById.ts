import { stringArg, extendType } from 'nexus'
import { Context } from '../../utils/context'

export const PostByIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('PostById', {
      type: 'Post',
      args: {
        id: stringArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.post.findUnique({
          where: { id: args.id || undefined },
        })
      },
    })
  },
})
