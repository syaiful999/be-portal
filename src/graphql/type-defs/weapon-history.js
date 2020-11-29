const weaponHistory = `
    type weapon_history_model {
        id:Int!
        weapon_name:String
        weapon_code:String
        weapon_type_id:Int
        weapon_type_name:String
        rack_id:Int
        rack_name:String
        acquisition_type_id:Int
        acquisition_type:String
        status_id:Int
        status_type:String
        employee_id:Int
        employee_name:String
        equipment_condition:String
        equipment_pick_date:DateTime
        description:String
        maintenance_date:DateTime
        expected_maintenance_date:DateTime
        input_date:DateTime
        weapon_image:String
        weapon_image_2:String
        weapon_image_3:String
        created_date:DateTime
        created_by:Int
        modified_date:DateTime
        modified_by:Int
    }
    input input_weapon_history {
        id:Int!
        weapon_name:String
        weapon_code:String
        weapon_type_id:Int
        weapon_image:String
        weapon_image_2:String
        weapon_image_3:String
        acquisition_type:Int
        employee_id:Int
        equipment_pick_date:DateTime
        equipment_condition:String
        maintenance_date:DateTime
        expected_maintenance_date:DateTime
        input_date:DateTime
        rack_id:Int
        status_id:Int
        description:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    type weapon_history {
        total:Int!
        data:[weapon_history_model!]!  
    }
    extend type Query {
        weapons_history(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean, status:Int, weapon_code:String):weapon_history!
    }
    extend type Mutation {
        create_weapon_history(data:input_weapon_history!):weapon_history_model!
    }
`
export default weaponHistory