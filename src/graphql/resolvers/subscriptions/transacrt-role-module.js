const transactRoleModuleSubscription = {
  subcribe_transact_role_module:{
    subscribe:(_parent, _args, { pubSub }) => {
      return pubSub.asyncIterator('transact_role_module_subcription')
    }
  } 
}
export default transactRoleModuleSubscription