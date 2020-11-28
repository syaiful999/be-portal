const dashboard = `
    type dashboard_model {
        total:Int!
        description:String
        bulan:String
        tahun:String
    }
    type dashboard {
        data:[dashboard_model!]!  
    }
    extend type Query {
        dashboard(skip:Int!, take:Int!, filter:String):dashboard!
    }
`
export default dashboard