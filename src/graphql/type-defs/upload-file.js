const uploadFile = `
    type File {
        filename:String!
        path:String!
        mimetype:String!
        encoding:String!
    }
    input FileDownload {
        name:String!
    }
    type FileDownloadReturn {
        file:String!    
    }
    extend type Mutation {
        upload_files(files: [Upload!]!):[File!]!
        upload_string_file(data:String!, ext:String!, files: [Upload!]!):[File!]!
    }
    extend type Query {
        download_files(files:[FileDownload!]!):[FileDownloadReturn]!
        download_files_streaming(files:FileDownload!):String!
    }
`
export default uploadFile