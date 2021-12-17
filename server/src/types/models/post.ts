import { objectType } from 'nexus'
import { Context } from '../../utils/context'

// const DateTime = asNexusMethod(DateTimeResolver, 'date')
// t.nonNull.field('updatedAt', { type: 'DateTime' })

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.string('title')
    t.string('content')
    t.boolean('published')
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author()
      },
    })
  },
})
