const masterMaintenanceTools = `
    type transact_maintenance_tool_model {
        id:Int!
        tool_code:String
        master_tool_id:Int
        tool_name:String
        tools_type:String
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
    }
    input transactMaintenanceScheduleToolsInput {
        tool_code:String
        master_tool_id:Int
        tool_name:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    type transact_maintenance_tool {
        total:Int!
        data:[transact_maintenance_tool_model!]!  
    }
    type used_maintenance_tool {
        total:Int!
    }
    extend type Query {
        transact_maintenance_tools(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):transact_maintenance_tool!
        transact_used_maintenance_tools(filter:filterInput, must_active:Boolean): used_maintenance_tool!
    }
    extend type Mutation {
        create_transact_maintenance_tool(data:transactMaintenanceScheduleToolsInput!):transact_maintenance_tool_model!
        update_transact_maintenance_tool(data:transactMaintenanceScheduleToolsInput!, id:Int!):transact_maintenance_tool_model!
    }
`
export default masterMaintenanceTools