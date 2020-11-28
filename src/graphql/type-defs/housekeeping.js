const housekeeping = `
    type housekeeping_model {
        id:Int!
        name:String
        room_id:Int
        room_no:String
        nik:String
        start_date:String
        end_date:String
        is_active:Boolean
        start_time:String
        end_time:String
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
        position:String
        phone_no:String
        room_category_name:String
        rank_id:Int
        email:String
        address:String
        employee_id:Int
        description:String
        status_id:Int
        status:String        
        user_photo_1:String
        user_photo_2:String
        room_name:String
        room_code:String
        status_code:String
    }

    input inputhousekeepingData {
        id:Int
        employee_id:Int
        start_date:String
        end_date:String
        start_time:String
        end_time:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
        room_id:Int
        description:String
        status_id:Int
    }

    type housekeeping {
        total:Int!
        data:[housekeeping_model!]!  
    }
    
    type totalAssignedHouseKeeping{
        total:Int!
    }

    extend type Query {
        housekeepings(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):housekeeping!
        total_assign_housekeeping(filter:filterInput, must_active:Boolean):totalAssignedHouseKeeping!
    }
    extend type Mutation {
        create_housekeeping(data:inputhousekeepingData!):housekeeping_model!
        update_housekeeping(data:inputhousekeepingData!, id:Int!):housekeeping_model!
    }
`
export default housekeeping