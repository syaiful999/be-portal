const newsCategory = `
  type cms_news_category_model {
    id:Int!
    category_name:String
    is_active:Boolean
  }
  input input_news_category_model {
    category_name:String
    is_active:Boolean
  }
  type cmsNewsCategoryReturn {
    total:Int!
    data:[cms_news_category_model!]!
  }
  extend type Query {
    cms_news_category(skip:Int!, take:Int!, most_used:Boolean,must_active:Boolean, filter:filterInput, sort:sortInput):cmsNewsCategoryReturn!
  }
  extend type Mutation {
    create_news_category(data:input_news_category_model!):cms_news_category_model!
  }
`
export default newsCategory