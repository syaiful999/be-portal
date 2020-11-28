const cmsUser = `
  type cmsUserModel {
    user_id:Int!
    field_user_id:Int
    username:String
    password:String
    user_account:String
    fullname:String
    role_id:Int
    role_name:String
    user_type_id:Int
    email:String
    profile_photo:String
    post_count:Int
    is_active:Boolean
  }
  type cmsUserDataReturn {
    total:Int!
    data:[cmsUserModel!]!
  }
  extend type Query {
    v_cms_users(skip:Int!, take:Int!, must_active:Boolean, filter:filterInput, sort:sortInput):cmsUserDataReturn!
  }
`
export default cmsUser