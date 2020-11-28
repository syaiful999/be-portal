const alsusHistory = `
    type alsus_history_model {
        id:Int!
        alsus_name:String
        alsus_code:String
        alsus_type_id:Int
        alsus_type_name:String
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
        alsus_image:String
        alsus_image_2:String
        alsus_image_3:String
        created_date:DateTime
        created_by:Int
        modified_date:DateTime
        modified_by:Int
    }
    input input_alsus_history {
        id:Int!
        alsus_name:String
        alsus_code:String
        alsus_type_id:Int
        alsus_image:String
        alsus_image_2:String
        alsus_image_3:String
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
        ownership_type_id:Int
        condition_type_id:Int
    }
    type alsus_history {
        total:Int!
        data:[alsus_history_model!]!  
    }
    extend type Query {
        alsus_history(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean, status:Int, alsus_code:String):alsus_history!
    }
    extend type Mutation {
        create_alsus_history(data:input_alsus_history!):alsus_history_model!
    }
`
export default alsusHistory