import { DateTimeResolver } from 'graphql-scalars'
import { asNexusMethod, objectType } from 'nexus'
import { Context } from '../../utils/context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.string('name')
    t.nonNull.string('email')
    t.list.field('posts', {
      type: 'Post',
      resolve: (parent, _, context: Context) =>
        context.prisma.user
          .findUnique({
            where: { id: String(parent.id) },
          })
          .posts(),
    })
  },
})
