import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const smartlockDeviceView = '"id", "lock_alias", "lock_data", "lock_id", "lock_mac", "room_id", "room_no", "room_code", "room_category_id, "room_category_name", "room_category_description"'
const smartlockPasscodeView = '"id", "master_smartlock_id", "occupant_id", "employee_id", "employee_name", "employee_nik", "passcode", "sciener_passcode_id", "master_smartlock_alias", "room_id", "room_no", "room_code", "room_name", "is_active", "valid_start_date", "valid_end_date", "created_by", "created_date", "modified_by", "modified_date"'
const smartlockICCardView = '"id", "master_smartlock_id", "occupant_id", "employee_id", "employee_name", "employee_nik", "card_no", "sciener_card_id", "master_smartlock_alias", "room_id", "room_no", "room_code", "room_name", "is_active", "valid_start_date", "valid_end_date", "created_by", "created_date", "modified_by", "modified_date"'

const smartlockResolver = {
  master_smartlock_devices: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${smartlockDeviceView} from v_master_smartlock_device `
    let countQuery = 'select count(id) as total from v_master_smartlock_device '
    if(filter) {
      query += whereGenerator.filter({ ...filter })
      countQuery += whereGenerator.filter({ ...filter })
    }
    if(must_active) {
      const isActiveQueryString = (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
    if(sort) query += whereGenerator.sort({ ...sort })
    query += whereGenerator.limit(skip, take)
    const client = await pool.connect()
    try { 
      const { rows } = await client.query(query)
      const countReturnQuery = await client.query(countQuery)
      const [{ total }] = countReturnQuery.rows
      client.release()
      return { total, data:rows }
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  transact_smartlock_passcodes: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${smartlockPasscodeView} from v_transact_smartlock_passcode `
    let countQuery = 'select count(id) as total from v_transact_smartlock_passcode '
    if(filter) {
      query += whereGenerator.filter({ ...filter })
      countQuery += whereGenerator.filter({ ...filter })
    }
    if(must_active) {
      const isActiveQueryString = (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
    if(sort) query += whereGenerator.sort({ ...sort })
    query += whereGenerator.limit(skip, take)
    const client = await pool.connect()
    try { 
      const { rows } = await client.query(query)
      const countReturnQuery = await client.query(countQuery)
      const [{ total }] = countReturnQuery.rows
      client.release()
      return { total, data:rows }
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  transact_smartlock_ic_cards: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${smartlockICCardView} from v_transact_smartlock_ic_card `
    let countQuery = 'select count(id) as total from v_transact_smartlock_ic_card '
    if(filter) {
      query += whereGenerator.filter({ ...filter })
      countQuery += whereGenerator.filter({ ...filter })
    }
    if(must_active) {
      const isActiveQueryString = (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
    if(sort) query += whereGenerator.sort({ ...sort })
    query += whereGenerator.limit(skip, take)
    const client = await pool.connect()
    try { 
      const { rows } = await client.query(query)
      const countReturnQuery = await client.query(countQuery)
      const [{ total }] = countReturnQuery.rows
      client.release()
      return { total, data:rows }
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default smartlockResolver