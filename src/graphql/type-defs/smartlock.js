const smartlockTypeDefs = `
  type smartlockDeviceType {
    id:Int
    lock_alias:String
    lock_data:String
    lock_id:String
    lock_mac:String
    room_id:Int
    room_name:String
    room_no:String
    room_category_id:Int
    room_category_name:String
    room_category_description:String
  }
  type smartlockPasscodeType {
    id:Int
    master_smartlock_id:String
    occupant_id:Int
    employee_id:Int
    employee_name:String
    employee_nik:String
    passcode:String
    sciener_passcode_id:String
    master_smartlock_alias:String
    room_id:Int
    room_no:String
    room_code:String
    room_name:String
    is_active:Boolean
    valid_start_date:DateTime
    valid_end_date:DateTime
    created_by:String
    created_date:DateTime
    modified_by:String
    modified_date:DateTime
  }
  type smartlockICCardType {
    id:Int
    master_smartlock_id:String
    occupant_id:Int
    employee_id:Int
    employee_name:String
    employee_nik:String
    card_no:String
    sciener_card_id:String
    master_smartlock_alias:String
    room_id:Int
    room_no:String
    room_code:String
    room_name:String
    is_active:Boolean
    valid_start_date:DateTime
    valid_end_date:DateTime
    created_by:String
    created_date:DateTime
    modified_by:String
    modified_date:DateTime
  }
  type smartlockDeviceData {
    data:[smartlockDeviceType!]!
    total:Int!
  }
  type smartlockPasscodeData {
    data:[smartlockPasscodeType!]!
    total:Int!
  }
  type smartlockICCardData {
    data:[smartlockICCardType!]!
    total:Int!
  }
  input smartlockPasscodeMutationType {
    master_smartlock_id:String
    sciener_passcode_id:String
    occupant_id:Int
    passcode:String
    is_active:Boolean
    valid_start_date:DateTime
    valid_end_date:DateTime
    created_by:Int
    created_date:DateTime
    modified_by:Int
    modified_date:DateTime
  }
  input smartlockICCardMutationType {
    master_smartlock_id:String
    sciener_card_id:String
    occupant_id:Int
    card_no:String
    is_active:Boolean
    valid_start_date:DateTime
    valid_end_date:DateTime
    created_by:Int
    created_date:DateTime
    modified_by:Int
    modified_date:DateTime
  }
  extend type Query {
    master_smartlock_devices(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):smartlockDeviceData!
    transact_smartlock_passcodes(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):smartlockPasscodeData!
    transact_smartlock_ic_cards(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):smartlockICCardData!
  }
  extend type Mutation {
    create_smartlock_passcode(data:smartlockPasscodeMutationType!):smartlockPasscodeType!
    update_smartlock_passcode(data:smartlockPasscodeMutationType!, id:Int!):smartlockPasscodeType!
    delete_smartlock_passcode(id:Int!, sciener_passcode_id:String!, master_smartlock_id:String!):smartlockPasscodeType!
    
    create_smartlock_ic_card(data:smartlockICCardMutationType!):smartlockICCardType!
    update_smartlock_ic_card(data:smartlockICCardMutationType!, id:Int!):smartlockICCardType!
    delete_smartlock_ic_card(id:Int!, sciener_card_id:String!, master_smartlock_id:String!):smartlockICCardType!
  }
`
export default smartlockTypeDefs