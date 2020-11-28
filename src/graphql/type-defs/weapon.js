const weapon = `
    type weapon_model {
        id:Int!
        weapon_name:String
        weapon_code:String
        weapon_type_id:Int
        weapon_type_name:String
        rack_id:Int
        rack_name:String
        acquisition_type_id:Int
        acquisition_type:String
        ownership_type_id:Int
        ownership_type:String
        condition_type_id:Int
        condition_type:String
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
        document:String
        created_date:DateTime
        created_by:Int
        modified_date:DateTime
        modified_by:Int
        jumlah:Int
    }
    type acquisition_type {
        id:Int!
        acquisition_type:String
    }
    type ownership_type {
        id:Int!
        ownership_type:String
    }
    type condition_type {
        id:Int!
        condition_type:String
    }
    input inputWeapon {
        weapon_name:String
        weapon_code:String
        weapon_type_id:Int
        weapon_image:String
        weapon_image_2:String
        weapon_image_3:String
        document:String
        acquisition_type:Int
        ownership_type:Int
        employee_id:Int
        equipment_pick_date:DateTime
        equipment_condition:String
        condition_type:Int
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
    type weapon {
        total:Int!
        total_in_use:Int!
        total_available:Int!
        data:[weapon_model!]!  
    }
    type acquisition {
        total:Int!
        data:[acquisition_type!]!  
    }
    type ownership {
        total:Int!
        data:[ownership_type!]!  
    }
    type condition {
        total:Int!
        data:[condition_type!]!  
    }
    extend type Query {
        weapons(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean, status:Int, weapon_code:String):weapon!
        acquisition_type:acquisition!
        ownership_type:ownership!
        condition_type:condition!
    }
    extend type Mutation {
        create_weapon(data:inputWeapon!):weapon_model!
        update_weapon(data:inputWeapon!, id:Int!):weapon_model!
    }
`
export default weapon