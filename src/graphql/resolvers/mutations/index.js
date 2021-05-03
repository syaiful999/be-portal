import masterUser from './master-user'
import masterFieldUser from './master-field-user'
import uploadFile from './upload-file'
import mediaCms from './media-cms'
import portalRegister from './portal-register'
import videoStreaming from './video-streaming'
import news from './news'
import newsCategory from './newsCategory'
import newsTag from './newsTag'
import cmsUser from './cmsUser'


const rootMutation = {
  ...masterUser,
  ...masterFieldUser,
  ...uploadFile,
  ...mediaCms,
  ...portalRegister,
  ...videoStreaming,
  ...news,
  ...newsCategory,
  ...newsTag,
  ...cmsUser
}
export default rootMutation