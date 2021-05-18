const news = `
  type cms_news_model {
    id:Int!
    news_title:String
    news_content:String
    news_category_id:Int
    category_name:String
    author:String
    is_quote:Boolean
    is_highlight:Boolean
    status_id:Int
    status_name:String
    is_active:Boolean
    created_by:Int
    created_date:DateTime
    modified_by:Int
    modified_date:DateTime
    file_image:String
    news_image:String
    tags:String
  }
  input input_news_model {
    news_title:String
    news_content:String
    news_category_id:Int
    is_quote:Boolean
    is_highlight:Boolean
    status_id:Int
    is_active:Boolean
    created_by:Int
    created_date:DateTime
    modified_by:Int
    modified_date:DateTime
    file_image:String
    news_image:String
  }
  type cmsNewsReturn {
    total:Int!
    data:[cms_news_model!]!
  }
  extend type Query {
    cms_news(skip:Int!, take:Int!, must_active:Boolean, filter:filterInput, sort:sortInput):cmsNewsReturn!
  }
  extend type Mutation {
    create_news(data:input_news_model!):cms_news_model!
    update_news(data:input_news_model!, id:Int!):cms_news_model!
  }
`
export default news