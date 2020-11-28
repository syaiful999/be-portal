const masterMaintenanceSchedule = `
    type transact_maintenance_schedule_model {
        id:Int!
        assigned_employee_id:Int
        assigned_employee_name:String
        maintenance_start_date:String
        maintenance_start_time:String
        maintenance_end_date:String
        maintenance_end_time:String
        master_building_id:Int
        master_building_name:String
        master_building_code:String
        tools_required:String
        description:String
        config_maintenance_schedule_status_code:String
        config_maintenance_schedule_status_desc:String
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
    }
    input transactMaintenanceScheduleInput {
        assigned_employee_id:Int
        maintenance_start_date:String
        maintenance_start_time:String
        maintenance_end_date:String
        maintenance_end_time:String
        master_building_id:Int
        description:String
        config_maintenance_schedule_status:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    input transactMaintenanceScheduleToolsRequiredInput {
        transact_maintenance_schedule_id:Int
        master_tools_id:Int
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    type transactMaintenanceScheduleRequiredType {
        id:Int
        master_tools_id:Int
        tools_name:String
        transact_maintenance_schedule_id:Int
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
    }
    type transact_maintenance_schedule {
        total:Int!
        data:[transact_maintenance_schedule_model!]!  
    }
    type transact_maintenance_schedule_tools_model {
        total:Int!
        data:[transactMaintenanceScheduleRequiredType!]!
    }
    type totalMaintenanceAssigned {
        total:Int!
    }
    extend type Query {
        transact_maintenance_schedules(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):transact_maintenance_schedule!
        transact_maintenance_schedule_required_tools(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):transact_maintenance_schedule_tools_model!
        total_assigned_transact_maintenance_schedules(filter:filterInput, must_active:Boolean):totalMaintenanceAssigned!
    }
    extend type Mutation {
        create_transact_maintenance_schedule(data:transactMaintenanceScheduleInput!):transact_maintenance_schedule_model!
        update_transact_maintenance_schedule(data:transactMaintenanceScheduleInput!, id:Int!):transact_maintenance_schedule_model!
        create_transact_maintenance_schedule_tools_required(data:transactMaintenanceScheduleToolsRequiredInput!):transactMaintenanceScheduleRequiredType!
        update_transact_maintenance_schedule_tools_required(data:transactMaintenanceScheduleToolsRequiredInput!, id:Int!):transactMaintenanceScheduleRequiredType!
    }
`
export default masterMaintenanceSchedule
