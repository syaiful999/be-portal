import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldRoleModule = '"id", "role_id", "role_name", "module_id", "module_name", "can_view", "can_create", "can_edit", "can_delete"'

const transactRoleModuleResolverQuery = {
  transact_role_module: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${fieldRoleModule} from v_transact_role_module `
    let countQuery = 'select count(id) as total from v_transact_role_module '
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
  },
  count_role_used: async (_parent, { id }) => {
    let countQuery = 'select count(id) as role_used from master_system_user where role_id = ' + id
    const client = await pool.connect()
    try {
      const countReturnQuery = await client.query(countQuery)
      const [{ role_used }] = countReturnQuery.rows
      client.release()
      return { role_used }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  check_if_role_module_is_exist: async (_parent, { role_id, module_id }) => {
    let countQuery = 'select count(id) as role_module_used from v_transact_role_module where role_id = ' + role_id + ' and module_id = ' + module_id + ' and is_active = true'
    const client = await pool.connect()
    try {
      const countReturnQuery = await client.query(countQuery)
      const [{ role_module_used }] = countReturnQuery.rows
      client.release()
      return { role_module_used }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  get_module_by_role_id: async (_parent, { role_id }) => {
    let countQuery = 'select * from v_transact_role_module where role_id = ' + role_id + ' and is_active = true and can_view = true'
    const client = await pool.connect()

    try {
      const countReturnQuery = await client.query(countQuery)
      const { rows } = countReturnQuery
      client.release()
      return { data: rows }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default transactRoleModuleResolverQuery