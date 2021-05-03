const newsTag = `
  type cms_news_tag_model {
    id:Int!
    tag_name:String
    is_active:Boolean
  }
  input input_news_tag_model {
    tag_name:String
    is_active:Boolean
  }
  type cmsNewsTagReturn {
    total:Int!
    data:[cms_news_tag_model!]!
  }
  extend type Query {
    cms_news_tag(skip:Int!, take:Int!,must_active:Boolean, filter:filterInput, sort:sortInput):cmsNewsTagReturn!
  }
  extend type Mutation {
    create_news_tag(data:input_news_tag_model!):cms_news_tag_model!
  }
`
export default newsTag