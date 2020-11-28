const masterVisitor = `
    type visitor_model {
        id:Int!
        user_type:Int
        name:String
        nik:String
        dob:DateTime
        phone_no:String
        email:String
        address:String
        intended_person:String
        relation:String
        purpose:String
        arrived_date:DateTime
        departed_date:DateTime
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
        user_photo_1:String
        user_photo_2:String
        reason:String
    }
    type visitor {
        total:Int!
        data:[visitor_model!]!  
    }
    type average_visitor {
        average:Int!
    }
    input inputMasterVisitor {
        name:String
        user_type:Int
        nik:String
        dob:DateTime
        phone_no:String
        email:String
        address:String
        intended_person:String
        relation:String
        purpose:String
        arrived_date:DateTime
        departed_date:DateTime
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
        is_active:Boolean
        user_photo_1:String
        user_photo_2:String
        reason:String
    }
    extend type Query {
        visitor(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):visitor!
        average_visitor:average_visitor!
    }
    extend type Mutation {
        create_master_visitor(data:inputMasterVisitor!):visitor_model!
        update_master_visitor(data:inputMasterVisitor!, id:Int!):visitor_model!
    }
`
export default masterVisitor