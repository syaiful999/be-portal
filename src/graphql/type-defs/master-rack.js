const masterRack = `
    type master_rack_model {
        id:Int!
        inventory_room_id:Int
        rack_id:Int
        rack_name:String
        rack_no:String
        row_no:String
        room_id:Int
        room_no:String
        room_name:String
        floor_id:Int
        floor_name:String
        is_active:Boolean
        description:String
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    input input_master_rack_model {
        inventory_room_id:Int
        rack_id:Int
        rack_name:String
        rack_no:String
        row_no:String
        room_id:Int
        floor_id:Int
        description:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    type master_rack {
        total:Int!
        data:[master_rack_model!]!  
    }
    extend type Query {
        master_rack(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_rack!
    }
    extend type Mutation {
        create_master_rack(data:input_master_rack_model!):master_rack_model!
        update_master_rack(data:input_master_rack_model!, id:Int!):master_rack_model!
    }
`
export default masterRack