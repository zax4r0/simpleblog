import { AuthenticationError } from 'apollo-server-errors'
import { Context } from './context'

export function getUserId(context: Context) {
  if (context.req.session.userId) {
    return context.req.session.userId
  }
  throw new AuthenticationError('Not Authorized')
}
