import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldWeaponView = '"id", "weapon_name", "weapon_code", "weapon_type_id", "weapon_type_name", "rack_id", "rack_name", "acquisition_type_id", "acquisition_type", "condition_type_id", "condition_type", "ownership_type_id", "ownership_type", "status_id", "status_type", "employee_id", "employee_name", "equipment_pick_date", "equipment_condition", "expected_maintenance_date", "maintenance_date", "input_date", "weapon_image", "weapon_image_2", "weapon_image_3", "document", "description", "created_date", "created_by", "modified_date", "modified_by", "is_active", "jumlah" '

const WeaponResolverQuery = {
  weapons: async (_parent, { skip, take, filter, sort, must_active = true, status, weapon_code }) => {
    let query = `select ${fieldWeaponView} from v_weapon `
    let countQuery = 'select count(id) as total from v_weapon '
    let totalInUse = 'select count(id) as total_in_use from v_weapon where "status_id" = 2 and "is_active" = true'
    let totalAvailable = 'select count(id) as total_available from v_weapon where "status_id" = 1 and "is_active" = true'
    if (filter) {
      query += whereGenerator.filter({ ...filter })
      countQuery += whereGenerator.filter({ ...filter })
    }
    if (must_active) {
      const isActiveQueryString = (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
    if (status) {
      if (status == 99) {
        const statusQuery = (must_active || filter ? '' : 'where 1=1 ') + ' and not "status_id" = 3'
        query += statusQuery
        countQuery += statusQuery
      } else {
        const statusQuery = (must_active || filter ? '' : 'where 1=1 ') + ' and "status_id" = ' + status
        query += statusQuery
        countQuery += statusQuery
      }
    }
    if (weapon_code) {
      const weaponCodeQuery = (must_active || filter || status ? '' : 'where 1=1 ') + ' and UPPER("weapon_code") = \'' + weapon_code.toUpperCase() + '\''
      query += weaponCodeQuery
      countQuery += weaponCodeQuery
    }
    if (sort) query += whereGenerator.sort({ ...sort })
    query += whereGenerator.limit(skip, take)
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      const countReturnQuery = await client.query(countQuery)
      const totalInUseQuery = await client.query(totalInUse)
      const totalAvailableQuery = await client.query(totalAvailable)
      const [{ total_in_use }] = totalInUseQuery.rows
      const [{ total_available }] = totalAvailableQuery.rows
      const [{ total }] = countReturnQuery.rows
      client.release()
      return { total, total_in_use, total_available, data: rows }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  acquisition_type: async () => {
    let query = 'select * from weapon_acquisition_type '
    let countQuery = 'select count(id) as total from weapon_acquisition_type '
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      const countReturnQuery = await client.query(countQuery)
      const [{ total }] = countReturnQuery.rows
      client.release()
      return { total, data: rows }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  ownership_type: async () => {
    let query = 'select * from weapon_ownership_type '
    let countQuery = 'select count(id) as total from weapon_ownership_type '
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      const countReturnQuery = await client.query(countQuery)
      const [{ total }] = countReturnQuery.rows
      client.release()
      return { total, data: rows }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  condition_type: async () => {
    let query = 'select * from weapon_condition_type '
    let countQuery = 'select count(id) as total from weapon_condition_type '
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      const countReturnQuery = await client.query(countQuery)
      const [{ total }] = countReturnQuery.rows
      client.release()
      return { total, data: rows }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default WeaponResolverQuery