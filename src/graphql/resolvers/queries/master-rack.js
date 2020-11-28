import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldMasterRackView = '"id", "inventory_room_id", "rack_no", "row_no", "rack_name", "floor_id", "floor_name", "room_id", "room_no", "room_name", "is_active", "description", "created_by", "created_date", "modified_by", "modified_date", "description"'

const masterRackTypeResolverQuery = {
  master_rack: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${fieldMasterRackView} from v_master_rack `
    let countQuery = 'select count(id) as total from v_master_rack '
    if (filter) {
      query += whereGenerator.filter({ ...filter })
      countQuery += whereGenerator.filter({ ...filter })
    }
    if (must_active) {
      const isActiveQueryString = (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
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
  }
}
export default masterRackTypeResolverQuery