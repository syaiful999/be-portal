import rootQuery from './queries'
import rootMutation from './mutations'

const resolvers = {
  Query:{
    ...rootQuery
  },
  Mutation:{
    ...rootMutation
  },
}
export default resolvers