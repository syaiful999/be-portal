import masterUser from './master-user'
import masterFieldUser from './master-field-user'
import uploadFile from './upload-file'
import transactMaintenanceTools from './transact-maintenance-tools'
import transactMaintenanceSchedule from './transact-maintenance-schedule'
import occupant from './occupant'
import visitor from './visitor'
import inventory from './inventory'
import masterRack from './master-rack'
import housekeeping from './housekeeping'
import masterFloor from './master-floor'
import masterTool from './master-tool'
import masterBuilding from './master-building'
import masterWeapon from './master-weapon'
import masterRoomCategory from './master-room-category'
import masterRank from './master-rank-and-structure'
import masterRole from './master-role'
import transactRoleModule from './transact_role_module'
import masterRoom from './master-room'
import weapon from './weapon'
import weaponHistory from './weapon-history'
import alsus from './alsus'
import alsusHistory from './alsus-history'
import mediaCms from './media-cms'
import portalRegister from './portal-register'
import transactChat from './transact-chat'
import penugasan from './penugasan'
import transactMasterRoom from './transact-master-room'


const rootMutation = {
  ...masterUser,
  ...masterFieldUser,
  ...uploadFile,
  ...transactMaintenanceTools,
  ...transactMaintenanceSchedule,
  ...occupant,
  ...visitor,
  ...inventory,
  ...masterRack,
  ...housekeeping,
  ...masterFloor,
  ...masterTool,
  ...masterBuilding,
  ...masterWeapon,
  ...masterRoomCategory,
  ...masterRank,
  ...masterRole,
  ...transactRoleModule,
  ...masterRoom,
  ...weapon,
  ...alsus,
  ...mediaCms,
  // ...weaponry,
  ...portalRegister,
  ...transactChat,
  ...penugasan,
  ...transactMasterRoom,
  ...weaponHistory,
  ...alsusHistory,
}
export default rootMutation