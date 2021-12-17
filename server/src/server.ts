import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import cors from 'cors'
import Express from 'express'
import session from 'express-session'
// import { redis } from './config/redis'
import Redis from 'ioredis'

import { schema } from './schema'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const main = async () => {
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res,
      prisma,
    }),
    validationRules: [
      // queryComplexity({
      //   // The maximum allowed query complexity, queries above this threshold will be rejected
      //   maximumComplexity: 8,
      //   // The query variables. This is needed because the variables are not available
      //   // in the visitor of the graphql-js library
      //   variables: {},
      //   // Optional callback function to retrieve the determined query complexity
      //   // Will be invoked weather the query is rejected or not
      //   // This can be used for logging or to implement rate limiting
      //   onComplete: (complexity: String) => {
      //     console.log("Query Complexity:", complexity);
      //   },
      //   estimators: [
      //     // Using fieldConfigEstimator is mandatory to make it work with type-graphql
      //     fieldConfigEstimator(),
      //     // This will assign each field a complexity of 1 if no other estimator
      //     // returned a value. We can define the default value for field not explicitly annotated
      //     simpleEstimator({
      //       defaultComplexity: 1
      //     })
      //   ]
      // }) as any
    ],
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
    ],
  })

  const app = Express()

  const RedisStore = connectRedis(session)

  const redis = new Redis(process.env.REDIS_URL)

  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
    }),
  )

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'qid',
      secret: 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    }),
  )
  app.get('/', function (req, res) {
    if (req.session.views) {
      req.session.views++
    } else {
      req.session.views = 1
    }
    res.send(`${req.session.views} views ${req.session.userId}`)
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' })

  app.listen(4000, () => {
    console.log('server started on 🚀 http://localhost:4000/graphql🍇')
  })
}

main().catch((err) => console.error(err))
