import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import { permissions } from './permissions'
import * as types from './types'

export const schemaWithoutPermissions = makeSchema({
  types: types,
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./utils/context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

export const schema = applyMiddleware(schemaWithoutPermissions, permissions)
