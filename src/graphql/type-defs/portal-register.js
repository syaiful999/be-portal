const portalRegister = `
    type portal_register_model {
        id:Int!
        fullname:String
        email:String
        username:String
        password:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    input input_portal_register_model {
        fullname:String
        email:String
        username:String
        password:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    type portal_register {
        total:Int!
        data:[portal_register_model!]!  
    }
     type portal_master_field_user_model {
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
    }
    type portal_master_field_user {
        total:Int!
        data:[portal_master_field_user_model!]!
    }
    extend type Query {
        portal_register(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):portal_register!
        get_user_by_nik(nik:String):portal_master_field_user!
    }
    extend type Mutation {
        create_portal_register(data:input_portal_register_model!):portal_register_model!
        update_portal_register(data:input_portal_register_model!, id:Int!):portal_register_model!
    }
`
export default portalRegister