const transactMasterRoom = `
    type transact_master_room_model {
        id:Int!
        gender:String
        master_room_id:Int
    }
    input transactMasterRoomInput {
        tool_code:String
        master_room_id:Int
        gender:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    type transact_master_room {
        total:Int!
        data:[transact_master_room_model!]!  
    }
    extend type Query {
        transact_master_rooms(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):transact_master_room!
    }
    extend type Mutation {
        create_transact_master_room(data:transactMasterRoomInput!):transact_master_room_model!
        update_transact_master_room(data:transactMasterRoomInput!, id:Int!):transact_master_room_model!
    }
`
export default transactMasterRoom