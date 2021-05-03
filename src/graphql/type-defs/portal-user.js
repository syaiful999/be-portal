const portalUserTypedefs = `
  type portalUserViewModel {
    id: Int!
    username: String
    password: String
    user_account: String
    fullname: String
    user_photo_1: String
    user_photo_2: String
    is_active: Boolean
    created_by: String
    created_date: DateTime
    modified_by: String
    modified_date: DateTime
    is_special_access: Boolean
  }
  type portalUserData {
    data:[portalUserViewModel!]!
    total:Int!
  }
  type loginPortal {
    authenticated:Boolean!
    token:String
  }
  extend type Query {
    portal_users(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):portalUserData!
    loginPortal(username:String!, password:String!):loginPortal!
  }
`
export default portalUserTypedefs