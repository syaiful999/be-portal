const filter = `
  enum logicFilterEnum {
    AND
    OR
  } 
  input subFilterInput {
    field:String!
    value:String
    type:String!
    operator:String!
  }
  input filterInput {
    logic:logicFilterEnum!
    filters:[subFilterInput!]!
  }
`
const sort  = `
  enum sortDirEnum {
    ASC
    DESC
  }
  input sortInput {
    field:String!
    dir:sortDirEnum!
  }
`
export const whereCondition = { filter, sort }