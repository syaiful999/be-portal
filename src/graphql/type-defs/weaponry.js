const weapon = `
    type weapon_transact_model{
        id:Int!
        weapon_code:String
        weapon_name:String
        created_date:DateTime
        equipment_pick_date:DateTime
        equipment_return_date:DateTime
        equipment_condition:String
        rack_description:String
        employee_id:Int
        weapon_id:Int
    }

    type weapon_model{
        id:Int!
        weapon_name:String
        weapon_code:String
        weapon_type_id:Int
        weapon_type_name:String
        amount_1:Int
        weapon_image:String
        weapon_image_2:String
        weapon_image_3:String
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
        rack_name:String
        rack_id:Int
        status:String
        usage_period:String
        equipment_pick_date:DateTime
        equipment_return_date:DateTime
        equipment_condition:String
        rack_description:String
        employee_id:Int
        description:String
        employee:String
    }
    type weapon_inuse_total_model{
        total:Int
        employee_id:String
        equipment_pick_date:DateTime
        created_date:String
    }

    input inputWeapon {
        weapon_name:String
        weapon_type_id:Int
        amount_1:Int
        weapon_image:String
        weapon_image_2:String
        weapon_image_3:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
        rack_id:Int 
        weapon_code:String
        status_id:Int   
    }

    input inputWeaponTransact {
        weapon_code:String
        weapon_name:String
        created_date:DateTime
        equipment_pick_date:DateTime
        equipment_return_date:DateTime
        equipment_condition:String
        rack_description:String
        employee_id:Int
        weapon_id:Int
    }
    
    type weapon {
        total:Int!
        total_in_use:Int
        total_available:Int
        data:[weapon_model!]!  
    }
    type weapon_transact{
        total:Int!
        data:[weapon_transact_model!]!
    }
    type weapon_inuse_total{
        data:[weapon_inuse_total_model]!
    }
    extend type Query {
        weapon(skip:Int!, take:Int!, filter:filterInput, sort:sortInput,status:String,amount:Boolean):weapon!
        weapon_inuse_total(skip:Int!, take:Int!):weapon_inuse_total!
    }
    extend type Mutation {
        create_weapon(data:inputWeapon!):weapon_model!
        update_weapon(data:inputWeapon!, id:Int!):weapon_model!
        create_weapon_transact(data:inputWeaponTransact!):weapon_transact_model!
    }
`
export default weapon