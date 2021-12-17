import { extendType } from 'nexus'
import { Context } from '../../utils/context'

export const LogoutMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('logout', {
      type: 'AuthPayload',
      resolve: async (_parent, _, context: Context) => {
        context.res.clearCookie('qid')
        return {
          //   user,
        }
      },
    })
  },
})
