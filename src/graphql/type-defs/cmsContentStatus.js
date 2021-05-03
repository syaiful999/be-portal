const contentStatus = `
  type cms_content_status {
    id:Int!
    status_name:String
  }
  type cmsContentStatusReturn {
    total:Int!
    data:[cms_content_status!]!
  }
  extend type Query {
    content_status(skip:Int!, take:Int!, filter:filterInput, sort:sortInput):cmsContentStatusReturn!
  }
`
export default contentStatus