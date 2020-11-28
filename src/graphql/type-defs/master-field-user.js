const masterUser = `
    type master_field_user_model {
        id:Int!
        field_user_type_id:Int
        user_type:String
        employee_no:String
        name:String
        rank_id:Int
        rank:String
        level:String
        dob:DateTime
        email:String
        phone_no:String
        address:String
        user_photo_1:String
        user_photo_2:String
        is_active:Boolean
        join_duration:String
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
        gender:String
        status:String
    }
    type master_field_user {
        total:Int!
        data:[master_field_user_model!]!
        
    }
    type average_employee {
        average:Int!
    }
    input inputMasterFieldUserData {
        field_user_type_id:Int
        employee_no:String
        name:String
        rank_id:Int
        dob:DateTime
        email:String
        phone_no:String
        address:String
        user_photo_1:String
        user_photo_2:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
        gender:String
        status:String
    }
    extend type Query {
        master_field_users(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_field_user!
        master_employee_users(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_field_user!
        average_master_employee_user:average_employee!
    }
    extend type Mutation {
        create_master_field_user(data:inputMasterFieldUserData!):master_field_user_model!
        update_master_field_user(data:inputMasterFieldUserData!, id:Int!):master_field_user_model!
    }
`
export default masterUser