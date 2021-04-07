import '@babel/polyfill'

import { ApolloServer, PubSub } from 'apollo-server'
import typeDefs from './graphql/type-defs'
import resolvers from './graphql/resolvers'
import { PORT } from './config/config.json'

const pubSub = new PubSub()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async args => {
    return {
      isAuthenticated: true,
      request: args.request,
      pubSub
    }
  }
})
process.setMaxListeners(100)
server.listen({ port: PORT }, () => {
  console.log(`Graphql Server start at port ${PORT}`)
})