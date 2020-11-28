const masterInventory = `
    type master_inventory_model {
        id:Int!        
        name:String
        description:String
        type_code:Int
        type_name:String
        is_active:Boolean
        rack_id:Int
        rack_name:String
        join_duration:String
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
        barcode:String
    }
    type inventory {
        total:Int!
        data:[master_inventory_model!]!
        
    }
    input inputInventoryData {
        name:String
        description:String
        is_active:Boolean
        rack_id:Int
        type_code:Int
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
        barcode:String
    }
    extend type Query {
        inventory(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):inventory!
        
    }
    extend type Mutation {
        create_master_inventory(data:inputInventoryData!):master_inventory_model!
        update_master_inventory(data:inputInventoryData!, id:Int!):master_inventory_model!
    }
`
export default masterInventory