import { hash } from 'bcryptjs'
import { stringArg, nonNull, extendType } from 'nexus'
import { Context } from '../../utils/context'

export const SignupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password, 10)
        const user = await context.prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            password: hashedPassword,
          },
        })
        return {
          // token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })
  },
})
