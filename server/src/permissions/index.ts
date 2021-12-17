import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils/getUserById'
import { Context } from '../utils/context'

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isPostOwner: rule()(async (_parent, args, context) => {
    const userId = getUserId(context)
    const author = await context.prisma.posts
      .findUnique({
        where: {
          id: String(args.id),
        },
      })
      .author()
    return userId === author.id
  }),
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    posts: rules.isAuthenticatedUser,
  },
  Mutation: {
    AddPost: rules.isAuthenticatedUser,
    // updateProfile: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
    // incrementPostViewCount: rules.isAuthenticatedUser,
    togglePublishPost: rules.isPostOwner,
  },
})
