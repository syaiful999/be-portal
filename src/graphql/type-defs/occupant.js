const occupant = `
    type occupant_model {
        id:Int!
        name:String
        room_id:Int
        room_no:String
        room_name:String
        nik:String
        arrived_date:DateTime
        departed_date:DateTime
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
        position:String
        image:String
        phone_no:String
        room_category_id:Int
        room_category_name:String
        rank_id:Int
        email:String
        address:String
        employee_id:Int
        act_departed_date:DateTime
        reason:String
        is_late_checkout:Boolean
        user_photo_1:String
        user_photo_2:String
        gender:String
    }
    type occupantWithSmartlock {
        id:Int!
        name:String
        nik:String
        room_name:String
        room_code:String
        room_no:String
        lock_id:String
        lock_alias:String
    }
    input inputOccupantData {
        room_id:Int
        employee_id:Int
        arrived_date:DateTime
        departed_date:DateTime
        image:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
        act_departed_date:DateTime
        reason:String
    }

    type occupant {
        total:Int!
        data:[occupant_model!]!  
    }
    extend type Query {
        occupants(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):occupant!
        occupant_distinct_name(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):occupant!
        occupant_with_smartlock(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):[occupantWithSmartlock!]!
    }
    extend type Mutation {
        create_occupant(data:inputOccupantData!):occupant_model!
        update_occupant(data:inputOccupantData!, id:Int!):occupant_model!
    }
`
export default occupant