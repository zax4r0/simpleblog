import { nonNull, extendType, stringArg } from 'nexus'
import { Context } from '../../utils/context'
import { getUserId } from '../../utils/getUserById'

export const AddPostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('AddPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        const userId = getUserId(context)
        return context.prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
            author: { connect: { id: String(userId) } },
          },
        })
      },
    })
  },
})
