const masterBuilding = `
    type master_building_model {
        id:Int!
        name:String
        location:String
        building_code:String
        latitude:Float
        longitude:Float
        description:String
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
    }

    input inputMasterBuildingData {
        id:Int
        name:String
        building_code:String
        latitude:Float
        location:String
        longitude:Float
        is_active:Boolean
        description:String
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }

    type master_building {
        total:Int!
        data:[master_building_model!]!  
    }
    extend type Query {
        master_buildings(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_building!
    }

    extend type Mutation {
        create_master_building(data:inputMasterBuildingData!):master_building_model!
        update_master_building(data:inputMasterBuildingData!, id:Int!):master_building_model!
    }
`
export default masterBuilding
