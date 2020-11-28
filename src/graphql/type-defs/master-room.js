const masterRoom = `
    type master_room_model {
        id:Int!
        room_no:String
        room_name:String
        room_code:String
        room_image:String
        room_image_2:String
        room_image_3:String
        config_room_status:String
        room_status:String
        config_room_condition:String
        room_condition:String
        floor_id:Int
        floor_name:String
        room_category_id:Int
        room_category_name:String
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
        gender:String
        transact_id:Int
    }
    input masterRoomInput {
        room_no:String
        room_name:String
        room_code:String
        room_image:String
        room_image_2:String
        room_image_3:String
        config_room_status:String
        config_room_condition:String
        floor_id:Int
        room_category_id:Int
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    type reportMasterRoomOccupancy {
        id:Int
        room_no:String
        room_category:String
        occupant_name:String
        room_status:String
        arrived_date:DateTime
        departed_date:DateTime
    }
    type master_room {
        total:Int!
        data:[master_room_model!]!  
    }
    extend type Query {
        master_rooms(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_room!
        report_master_room_occupancies:[reportMasterRoomOccupancy!]!
    }
    extend type Mutation {
        create_master_room(data:masterRoomInput!):master_room_model!
        update_master_room(data:masterRoomInput!, id:Int!):master_room_model!
    }
`
export default masterRoom