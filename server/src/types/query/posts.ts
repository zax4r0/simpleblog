import { extendType } from 'nexus'
import { Context } from '../../utils/context'

export const PostssQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.post.findMany()
      },
    })
  },
})
