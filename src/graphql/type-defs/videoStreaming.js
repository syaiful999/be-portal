const videoStreaming = `
  type cms_video_streaming_model {
    id:Int!
    title:String
    description:String
    status_id:Int
    status_name:String
    is_active:Boolean
    created_by:Int
    created_date:DateTime
    modified_by:Int
    modified_date:DateTime
    file_video:String
    video_name:String
    is_special_access:Boolean
  }
  input input_video_streaming_model {
    title:String
    description:String
    status_id:Int
    is_active:Boolean
    created_by:Int
    created_date:DateTime
    modified_by:Int
    modified_date:DateTime
    file_video:String
    video_name:String
  }
  type cmsVideoStreamingReturn {
    total:Int!
    data:[cms_video_streaming_model!]!
  }
  extend type Query {
    cms_video_streaming(skip:Int!, take:Int!, must_active:Boolean, filter:filterInput, sort:sortInput):cmsVideoStreamingReturn!
  }
  extend type Mutation {
    create_video_streaming(data:input_video_streaming_model!):cms_video_streaming_model!
    update_video_streaming(data:input_video_streaming_model!, id:Int!):cms_video_streaming_model!
  }
`
export default videoStreaming