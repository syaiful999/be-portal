const masterRoomCategory = `
    type master_room_category_model {
        id:Int!
        name:String
        description:String
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
    }

    input inputMasterRoomCategory {
        name:String
        description:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }

    type master_room_category {
        total:Int!
        data:[master_room_category_model!]!  
    }
    extend type Query {
        master_room_categorys(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_room_category!
    }
    extend type Mutation {
        create_master_room_category(data:inputMasterRoomCategory!):master_room_category_model!
        update_master_room_category(data:inputMasterRoomCategory!, id:Int!):master_room_category_model!
    }
`
export default masterRoomCategory