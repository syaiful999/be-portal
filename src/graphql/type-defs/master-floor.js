const masterFloor = `
    type master_floor_model {
        id:Int!
        floor_name:String
        description:String
        building_name:String
        building_id:Int
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
        
    }

    input inputMasterFloor {
        building_id:Int
        floor_name:String
        description:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }

    type master_floor {
        total:Int!
        data:[master_floor_model!]!  
    }
    extend type Query {
        master_floor(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_floor!
    }
    extend type Mutation {
        create_master_floor(data:inputMasterFloor!):master_floor_model!
        update_master_floor(data:inputMasterFloor!, id:Int!):master_floor_model!
    }
`
export default masterFloor