const masterFieldUserType = `
    type master_field_user_type_model {
        id:Int!
        field_username:String
        is_active:Boolean
        created_date:DateTime
    }
    type master_field_user_type {
        total:Int!
        data:[master_field_user_type_model!]!  
    }
    extend type Query {
        master_field_user_types(skip:Int!, take:Int!, filter:filterInput, sort:sortInput):master_field_user_type!
    }
`
export default masterFieldUserType