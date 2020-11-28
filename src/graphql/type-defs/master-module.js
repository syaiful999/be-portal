const masterModule = `
    type master_module_model {
        id:Int!
        module_name:String
        is_active:Boolean
    }
    type master_module {
        total:Int!
        data:[master_module_model!]!  
    }
    extend type Query {
        master_module(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_module!
    }
`
export default masterModule