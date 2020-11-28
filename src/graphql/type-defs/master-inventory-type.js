const masterInventoryType = `
    type master_inventory_type_model {
        id:Int!
        type_code:Int
        type_name:String
        is_active:Boolean
    }
    type master_inventory_type {
        total:Int!
        data:[master_inventory_type_model!]!  
    }
    extend type Query {
        master_inventory_type(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_inventory_type!
    }
`
export default masterInventoryType