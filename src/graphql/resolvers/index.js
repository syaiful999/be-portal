import rootQuery from './queries'
import rootMutation from './mutations'
import rootSubscription from './subscriptions'

const resolvers = {
  Query:{
    ...rootQuery
  },
  Mutation:{
    ...rootMutation
  },
  Subscription:{
    ...rootSubscription
  }
}
export default resolvers