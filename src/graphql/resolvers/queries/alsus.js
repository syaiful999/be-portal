import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldAlsusView = '"id","jumlah", "condition_type_id", "condition_type", "ownership_type_id", "ownership_type", "alsus_name", "alsus_code", "alsus_type_id", "alsus_type_name", "rack_id", "rack_name", "acquisition_type_id", "acquisition_type", "status_id", "status_type", "employee_id", "employee_name", "equipment_pick_date", "equipment_condition", "expected_maintenance_date", "maintenance_date", "input_date", "alsus_image", "alsus_image_2", "alsus_image_3", "document", "description", "created_date", "created_by", "modified_date", "modified_by", "is_active", "jumlah"'
const AlsusResolverQuery = {
  alsus: async (_parent, { skip, take, filter, sort, must_active = true, status, alsus_code }) => {
    let query = `select ${fieldAlsusView} from v_alsus `
    let countQuery = 'select count(id) as total from v_alsus '
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
    if (alsus_code) {
      const alsusCodeQuery = (must_active || filter || status ? '' : 'where 1=1 ') + ' and UPPER("alsus_code") = \'' + alsus_code.toUpperCase() + '\''
      query += alsusCodeQuery
      countQuery += alsusCodeQuery
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
export default AlsusResolverQuery