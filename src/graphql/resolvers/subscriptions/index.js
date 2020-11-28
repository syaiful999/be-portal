import transactRoleModule from './transacrt-role-module'
import transactChat from './chat-message'

const rootSubscription = {
  ...transactRoleModule,
  ...transactChat
}
export default rootSubscription