import { gql } from 'apollo-server-express'
import { whereCondition } from '../../utils/where-condition-query'
import masterUser from './master-user'
import masterFieldUser from './master-field-user'
import masterRole from './master-role'
import masterFieldUserType from './master-field-user-type'
import uploadFile from './upload-file'
import mediaCms from './media-cms'
import portalRegister from './portal-register'
import cmsUser from './cms-user'
import portalUser from './portal-user'
import videoStreaming from './videoStreaming'
import news from './news'
import newsCategory from './news-category'
import contentStatus from './cmsContentStatus'
import newsTag from './newsTag'

const typeDefs = gql`
    scalar DateTime
    enum mutation_type_enum {
        CREATED
        UPDATED
        DELETED
    }
    ${whereCondition.filter}
    ${whereCondition.sort}
    ${masterUser}
    ${masterFieldUser}
    ${masterRole}
    ${masterFieldUserType}
    ${uploadFile}
    ${mediaCms}
    ${portalRegister}
    ${cmsUser}
    ${portalUser}
    ${videoStreaming}
    ${news}
    ${newsCategory}
    ${contentStatus}
    ${newsTag}
`
export default typeDefs