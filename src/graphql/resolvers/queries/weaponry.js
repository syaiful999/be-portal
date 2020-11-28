import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldWeapon = '"id","weapon_name", "weapon_type_id", "weapon_type_name", "weapon_image","weapon_code","weapon_image_2","weapon_image_3","created_date","rack_id", "modified_date","created_by","modified_by", "is_active","rack_name","amount_1","status","usage_period","equipment_pick_date","equipment_return_date","equipment_condition","rack_description","employee_id","employee"'

const fieldInUseTotal =
  '"total", "equipment_pick_date", "employee_id","created_date"'

const WeaponResolverQuery = {
  weapon: async (_parent, { skip, take, filter, sort, must_active = true, status, amount }) => {
    let query = `select ${fieldWeapon} from v_weapon `
    let countQuery = 'select count(id) as total from v_weapon '
    let totalInUse = 'select count(id) as total_in_use from v_weapon where "status_id" = 2 and "is_active" = true and "amount_1" >= 1'
    let totalAvailable = 'select count(id) as total_available from v_weapon where "status_id" = 1 and "is_active" = true and "amount_1" >= 1'

    if (filter) {
      query += whereGenerator.filter({ ...filter })
      countQuery += whereGenerator.filter({ ...filter })
    }
    if (must_active) {
      const isActiveQueryString =
        (filter ? '' : ' where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
    if (amount) {
      const isActiveQueryString =
        ' and "amount_1" >= 1'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
    if (status) {
      const statusQuery = (filter ? '' : ' and "status" = ' + `'${status}'`)
      query += statusQuery
      countQuery += statusQuery
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

  weapon_inuse_total: async (
    _parent,
    { skip, take }
  ) => {
    let query = `select ${fieldInUseTotal} from v_weapon_assign `
    query += whereGenerator.limit(skip, take)
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      client.release()
      return { data: rows }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },

}
export default WeaponResolverQuery