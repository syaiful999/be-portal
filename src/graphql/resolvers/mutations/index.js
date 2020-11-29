import masterUser from './master-user'
import masterFieldUser from './master-field-user'
import uploadFile from './upload-file'
import mediaCms from './media-cms'
import portalRegister from './portal-register'


const rootMutation = {
  ...masterUser,
  ...masterFieldUser,
  ...uploadFile,
  ...mediaCms,
  ...portalRegister
}
export default rootMutation