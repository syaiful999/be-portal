const masterUser = `
    type master_system_user_model {
        id:Int!
        field_user_id:Int
        field_user_type_id:Int
        user_type:String
        role_id:Int
        role_name:String
        user_account:String
        name:String
        username:String
        password:String
        user_photo_1:String
        user_photo_2:String
        rank_id:Int
        rank:String
        level:String
        dob:DateTime
        email:String
        phone_no:String
        address:String
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
    }
    type master_system_user {
        total:Int!
        data:[master_system_user_model!]!
    }
    type login {
        authenticated:Boolean!
        token:String
    }
    input inputMasterSystemUserData {
        field_user_type_id:Int
        field_user_id:Int
        role_id:Int
        user_account:String
        name:String
        username:String
        password:String
        rank_id:Int
        dob:DateTime
        email:String
        phone_no:String
        address:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    type Query {
        master_system_users(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_system_user!
        login(username:String!, password:String!):login!
    }
    type Mutation {
        create_master_system_user(data:inputMasterSystemUserData!):master_system_user_model!
        update_master_system_user(data:inputMasterSystemUserData!, id:Int!):master_system_user_model!
    }
`
export default masterUser