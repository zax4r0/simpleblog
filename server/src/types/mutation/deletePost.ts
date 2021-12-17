import { extendType, nonNull, stringArg } from 'nexus'
import { Context } from '../../utils/context'

export const DeletePostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nullable.field('deletePost', {
      type: 'Post',
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: async (_, args, context: Context) => {
        await context.prisma.post.delete({
          where: { id: String(args.postId) },
        })
        return null
      },
    })
  },
})
