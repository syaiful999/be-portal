const masterWeapon = `
    type master_weapon_model {
        id:Int!
        type:String
        description:String
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
    }

    input inputMasterWeapon {
        type:String
        description:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    
    type master_weapon {
        total:Int!
        data:[master_weapon_model!]!  
    }
    extend type Query {
        master_weapons(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_weapon!
    }
    extend type Mutation {
        create_master_weapon(data:inputMasterWeapon!):master_weapon_model!
        update_master_weapon(data:inputMasterWeapon!, id:Int!):master_weapon_model!
    }
`
export default masterWeapon