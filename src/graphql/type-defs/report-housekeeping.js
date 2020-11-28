const reporthousekeeping = `
    type reporthousekeeping_model {
        room_no:String
        name:String
        room_condition:String
        status:String
    }
    type reporthousekeeping {
        data:[reporthousekeeping_model!]!  
    }
    extend type Query {
        reporthousekeeping(skip:Int!, take:Int!, sort:sortInput, filter:filterInput, must_active:Boolean):reporthousekeeping!
    }
`
export default reporthousekeeping