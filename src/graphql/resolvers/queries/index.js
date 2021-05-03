import masterUser from './master-user'
import masterFieldUser from './master-field-user'
import masterFieldUserType from './master-field-user-type'
import downloadFiles from './download-file'
import mediaCms from './media-cms'
import portalRegister from './portal-register'
import cmsUser from './cms-user'
import portalUser from './portal-user'
import videoStreaming from './video-streaming'
import news from './news'
import newsCategory from './newsCatergory'
import contentStatus from './contentStatus'
import newsTag from './newsTag'


const rootQuery = {
  ...masterUser,
  ...masterFieldUser,
  ...masterFieldUserType,
  ...downloadFiles,
  ...mediaCms,
  ...portalRegister,
  ...cmsUser,
  ...portalUser,
  ...videoStreaming,
  ...news,
  ...newsCategory,
  ...contentStatus,
  ...newsTag
}
export default rootQuery