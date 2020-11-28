const mediaCMS = `
    type media_cms_model {
        id:Int!
        photo:String
        photo_name:String
        media_type:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        size:String
        
    }

    input mediaCMS {
        photo:String
        photo_name:String
        media_type:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        size:String
    }

    type media_cms {
        total:Int!
        data:[media_cms_model!]!  
    }
    extend type Query {
        media_cms(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):media_cms!
    }
    extend type Mutation {
        create_media_cms(data:mediaCMS!):media_cms_model!
        update_media_cms(data:mediaCMS!, id:Int!):media_cms_model!
    }
`
export default mediaCMS