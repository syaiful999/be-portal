const masterRankAndStructure = `
    type master_role_model {
        id:Int!
        role_name:String
        is_active:Boolean
        created_date:DateTime
        modified_date:DateTime
        description:String
    }
    input input_master_role_model {
        role_name:String
        is_active:Boolean
        created_date:DateTime
        modified_date:DateTime
        description:String
    }
    type master_role {
        total:Int!
        data:[master_role_model!]!  
    }
    extend type Query {
        master_roles(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_role!
    }
    extend type Mutation {
        create_master_role(data:input_master_role_model!):master_role_model!
        update_master_role(data:input_master_role_model!, id:Int!):master_role_model!
    }
`
export default masterRankAndStructure