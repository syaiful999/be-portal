import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "type_name", "type_code", "is_active"'

const masterInventoryTypeResolverQuery = {
  master_inventory_type: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${fieldUserView} from v_master_inventory_type `
    let countQuery = 'select count(id) as total from v_master_inventory_type '
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
export default masterInventoryTypeResolverQuery