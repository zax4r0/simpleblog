import { extendType, nonNull, stringArg } from 'nexus'
import { Context } from '../../utils/context'

export const PublishPostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nullable.field('togglePublishPost', {
      type: 'Post',
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.post.update({
          where: { id: String(args.postId) },
          data: { published: true },
        })
      },
    })
  },
})
