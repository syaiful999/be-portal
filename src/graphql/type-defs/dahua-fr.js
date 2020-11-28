const dahuaFR = `
    type dahua_fr_model {
        id:Int!
        id_occupant:Int
        occupant_name:String
        occupant_account_id:String
        valid_start_date:DateTime
        valid_end_date:DateTime
        image_1:String
        image_2:String
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
    }
    type dahua_fr_remove_model {
        is_exist:Boolean
        is_deleted:Boolean
    }
    input dahuaFRData {
      id_occupant:Int
      valid_start_date:DateTime
      valid_end_date:DateTime
      image_1:String
      image_2:String
      is_active:Boolean
      created_by:Int
      created_date:DateTime
      modified_by:Int
      modified_date:DateTime
    }

    type dahuaFR {
        total:Int!
        data:[dahua_fr_model!]!  
    }
    extend type Query {
        dahua_face_recognitions(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):dahuaFR!
    }
    extend type Mutation {
        create_dahua_face_recognition(data:dahuaFRData!):dahua_fr_model!
        update_dahua_face_recognition(data:dahuaFRData!, id:Int!):dahua_fr_model!
        remove_dahua_face_recognition(id:Int!):dahua_fr_remove_model!
    }
`
export default dahuaFR