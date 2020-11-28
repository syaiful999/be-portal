const masterTools = `
    type master_tool_model {
        id:Int!
        type:String
        description:String
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
    }

    input inputMasterTool {
        type:String
        description:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    
    type master_tool {
        total:Int!
        data:[master_tool_model!]!  
    }
    extend type Query {
        master_tools(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_tool!
    }
    extend type Mutation {
        create_master_tool(data:inputMasterTool!):master_tool_model!
        update_master_tool(data:inputMasterTool!, id:Int!):master_tool_model!
    }
`
export default masterTools