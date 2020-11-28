import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "tool_code", "master_tool_id", "tools_type", "tool_name", "is_active", "created_by", "created_date", "modified_by", "modified_date"'

const transactMaintenanceToolsResolverQuery = {
  transact_maintenance_tools: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${fieldUserView} from v_transact_maintenance_tool `
    let countQuery = 'select count(id) as total from v_transact_maintenance_tool '
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
  transact_used_maintenance_tools: async (_parent, { filter, must_active = true }) => {
    let query = 'select count(distinct master_tool_id) total from v_transact_maintenance_tool '
    if(filter) query += whereGenerator.filter({ ...filter })
    if(must_active) {
      const isActiveQueryString = (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
    }
    const client = await pool.connect()
    try { 
      const countReturnQuery = await client.query(query)
      const [{ total }] = countReturnQuery.rows
      client.release()
      return { total }
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default transactMaintenanceToolsResolverQuery