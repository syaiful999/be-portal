import '@babel/polyfill'

import { ApolloServer, PubSub } from 'apollo-server'
import typeDefs from './src/graphql/type-defs'
import resolvers from './src/graphql/resolvers'
import { PORT } from './src/config/config.json'
// import { checkAuthentication, checkAuthorization } from './auth'
// import { AuthenticationError } from 'apollo-server-express'

const pubSub = new PubSub()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async args => {
    // const authenticated = await checkAuthentication(args, 'Basic')
    // const authorized = await checkAuthorization(args)
    // if (authenticated) {
    // }
    return {
      isAuthenticated: true,
      // authorization:authorized,
      request: args.request,
      pubSub
    }
    // throw new AuthenticationError('UNAUTHENTICATED')
  }
})
process.setMaxListeners(100)
server.listen({ port: PORT }, () => {
  console.log(`Graphql Server start at port ${PORT}`)
})