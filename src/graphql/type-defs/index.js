import { gql } from 'apollo-server-express'
import { whereCondition } from '../../utils/where-condition-query'
import masterUser from './master-user'
import masterFieldUser from './master-field-user'
import masterRankAndStructure from './master-rank-and-structure'
import masterRole from './master-role'
import masterFieldUserType from './master-field-user-type'
import uploadFile from './upload-file'
import occupant from './occupant'
import masterTools from './master-tools'
import masterBuilding from './master-building'
import transactMaintenanceTools from './transact-maintenance-tools'
import transactMaintenanceSchedule from './transact-maintenance-schedule'
import masterRoom from './master-room'
import masterRoomCategory from './master-room-category'
import masterVisitor from './visitor'
import masterInventory from './inventory'
import masterInventoryType from './master-inventory-type'
import masterRack from './master-rack'
import housekeeping from './housekeeping'
import masterFloor from './master-floor'
import masterWeapon from './master-weapon'
import transactRoleModule from './transact-role-module'
import masterModule from './master-module'
import dashboard from './dashboard'
import alsus from './alsus'
import alsusHistory from './alsus-history'
import reportHouseKeeping from './report-housekeeping'
import mediaCms from './media-cms'
import weapon from './weapon'
import weaponHistory from './weapon-history'
import portalRegister from './portal-register'
import transactChat from './transact-chat'
import cmsUser from './cms-user'
import portalUser from './portal-user'
import penugasan from './penugasan'
import transactMasterRoom from './transact-master-room'
import dahuaFR from './dahua-fr'
import smartlock from './smartlock'

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
    ${masterRankAndStructure}
    ${masterRole}
    ${masterFieldUserType}
    ${uploadFile}
    ${occupant}
    ${masterTools}
    ${masterBuilding}
    ${transactMaintenanceTools}
    ${transactMaintenanceSchedule}
    ${masterRoomCategory}
    ${masterRoom}
    ${masterVisitor}
    ${masterInventory}
    ${masterInventoryType}
    ${masterRack}
    ${housekeeping}
    ${masterFloor}
    ${masterWeapon}
    ${transactRoleModule}
    ${masterModule}
    ${dashboard}
    ${alsus}
    ${reportHouseKeeping}
    ${mediaCms}
    ${weapon}
    ${portalRegister}
    ${transactChat}
    ${cmsUser}
    ${portalUser}
    ${penugasan}
    ${transactMasterRoom}
    ${dahuaFR}
    ${weaponHistory}
    ${alsusHistory}
    ${smartlock}
`
export default typeDefs