import { inputObjectType } from 'nexus'
// const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const PostOrderByUpdatedAtInput = inputObjectType({
  name: 'PostOrderByUpdatedAtInput',
  definition(t) {
    t.nonNull.field('updatedAt', { type: 'SortOrder' })
  },
})
