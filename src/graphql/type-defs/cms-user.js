const cmsUser = `
  type cmsUserModel {
    id:Int!
    user_id:Int
    field_user_id:Int
    username:String
    password:String
    real_password:String
    user_account:String
    fullname:String
    role_id:Int
    role_name:String
    user_type_id:Int
    email:String
    profile_photo:String
    post_count:Int
    is_active:Boolean
    created_by:Int
    created_date:DateTime
    modified_by:Int
    modified_date:DateTime
  }

  input input_cms_model {
    user_id:Int
    field_user_id:Int
    username:String
    password:String
    real_password:String
    user_account:String
    fullname:String
    role_id:Int
    role_name:String
    email:String
    profile_photo:String
    post_count:Int
    is_active:Boolean
    created_by:Int
    created_date:DateTime
    modified_by:Int
    modified_date:DateTime
  }

  type cmsUserDataReturn {
    total:Int!
    data:[cmsUserModel!]!
  }

  type loginCms {
    authenticated:Boolean!
    token:String
  }

  extend type Query {
    cms_users(skip:Int!, take:Int!, must_active:Boolean, filter:filterInput, sort:sortInput):cmsUserDataReturn!
    loginCms(username:String!, password:String!):loginCms!
  }

  extend type Mutation {
    create_cms_user(data:input_cms_model!):cmsUserModel!
    update_cms_user(data:input_cms_model!, id:Int!):cmsUserModel!
  }
  `;
export default cmsUser;
