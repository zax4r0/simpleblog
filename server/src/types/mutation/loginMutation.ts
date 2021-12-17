import { compare } from 'bcryptjs'
import { stringArg, nonNull, extendType } from 'nexus'
import { Context } from '../../utils/context'

export const LoginMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        if (context.req.session.userId) {
          context.req.session.userId = user.id
        } else {
          context.req.session.userId = user.id
        }
        // console.log(context.req.session)
        return {
          user,
        }
      },
    })
  },
})
