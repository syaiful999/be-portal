const transactRoleModule = `
    type transact_role_module_model {
        id:Int
        role_id:Int
        role_name:String
        module_id:Int
        module_name:String
        can_create:Boolean
        can_view:Boolean
        can_edit:Boolean
        can_delete:Boolean
        is_active:Boolean
    }
    input input_transact_role_module_model {
        role_id:Int
        module_id:Int
        can_create:Boolean
        can_view:Boolean
        can_edit:Boolean
        can_delete:Boolean
        is_active:Boolean
    }
    type transact_role_module {
        total:Int!
        data:[transact_role_module_model!]!  
    }
    type count_role_used {
        role_used:Int!
    }
    type check_if_role_module_is_exist {
        role_module_used:Int!
    }
    type get_module_by_role_id {
        data:[transact_role_module_model!]!  
    }
    type transact_role_module_subscription {
        mutation:mutation_type_enum!
        data:transact_role_module_model!
    }
    extend type Query {
        transact_role_module(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):transact_role_module!
        count_role_used(id:Int!):count_role_used!
        check_if_role_module_is_exist(role_id:Int!, module_id:Int!):check_if_role_module_is_exist!
        get_module_by_role_id(role_id:Int!):get_module_by_role_id
    }
    extend type Mutation {
        create_transact_role_module(data:input_transact_role_module_model!):transact_role_module_model!
        update_transact_role_module(data:input_transact_role_module_model!, id:Int!):transact_role_module_model!
        remove_transact_role_module_by_role_id(id:Int!):transact_role_module_model
    }
    type Subscription {
        subcribe_transact_role_module:transact_role_module_subscription!
    }
`
export default transactRoleModule