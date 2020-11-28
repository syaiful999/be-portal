import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldWeaponView = '"id", "weapon_name", "weapon_code", "weapon_type_id", "weapon_type_name", "rack_id", "rack_name", "acquisition_type_id", "acquisition_type", "status_id", "status_type", "employee_id", "employee_name", "equipment_pick_date", "equipment_condition", "expected_maintenance_date", "maintenance_date", "input_date", "weapon_image", "weapon_image_2", "weapon_image_3", "description", "created_date", "created_by", "modified_date", "modified_by", "is_active"'

const WeaponHistoryResolverQuery = {
  weapons_history: async (_parent, { skip, take, filter, sort, must_active = true, status, weapon_code }) => {
    let query = `select ${fieldWeaponView} from v_weapon_history `
    let countQuery = 'select count(id) as total from v_weapon_history '
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
      const statusQuery = (must_active || filter ? '' : 'where 1=1 ') + ' and "status_id" = ' + status
      query += statusQuery
      countQuery += statusQuery
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
      const [{ total }] = countReturnQuery.rows
      client.release()
      return { total, data: rows }
    } catch (e) {
      client.release()
      throw new Error(e)

    }
  },
}
export default WeaponHistoryResolverQuery