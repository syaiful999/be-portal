import masterUser from './master-user'
import masterFieldUser from './master-field-user'
import masterRankAndStructure from './master-rank-and-structure'
import masterRole from './master-role'
import masterFieldUserType from './master-field-user-type'
import downloadFiles from './download-file'
import masterTools from './master-tools'
import masterBuilding from './master-building'
import transactMaintenanceTools from './transact-maintenance-tools'
import transactMaintenanceSchedule from './transact-maintenance-schedule'
import masterRoomCategory from './master-room-category'
import masterRoom from './master-room'
import occupant from './occupant'
import visitor from './visitor'
import inventory from './inventory'
import masterInventoryType from './master-inventory-types'
import masterRack from './master-rack'
import housekeeping from './housekeeping'
import masterFloor from './master-floor'
import masterWepaon from './master-weapon'
import transactRoleModule from './transact-role-module'
import masterModule from './master-module'
import dashboard from './dashboard'
import weapon from './weapon'
import weaponHistory from './weapon-history'
import alsus from './alsus'
import alsusHistory from './alsus-history'
import reportHouseKeeping from './report-housekeeping'
import mediaCms from './media-cms'
import portalRegister from './portal-register'
import transactChat from './transact-chat'
import cmsUser from './cms-user'
import portalUser from './portal-user'
import penugasan from './penugasan'
import transactPersonil from './transact-personil'


const rootQuery = {
  ...masterUser,
  ...masterFieldUser,
  ...masterRankAndStructure,
  ...masterRole,
  ...masterFieldUserType,
  ...downloadFiles,
  ...masterBuilding,
  ...masterTools,
  ...transactMaintenanceTools,
  ...transactMaintenanceSchedule,
  ...occupant,
  ...masterRoomCategory,
  ...masterRoom,
  ...visitor,
  ...inventory,
  ...masterInventoryType,
  ...masterRack,
  ...housekeeping,
  ...masterFloor,
  ...masterWepaon,
  ...transactRoleModule,
  ...masterModule,
  ...dashboard,
  ...weapon,
  ...alsus,
  ...reportHouseKeeping,
  ...mediaCms,
  ...portalRegister,
  ...transactChat,
  ...cmsUser,
  ...portalUser,
  ...penugasan,
  ...transactPersonil,
  ...weaponHistory,
  ...alsusHistory,
}
export default rootQuery